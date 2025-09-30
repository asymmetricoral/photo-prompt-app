use axum::{http::Method, http::StatusCode, routing::get, Json, Router};
use tower_http::cors::{CorsLayer, Any};
use serde::{Serialize};
use std::net::SocketAddr;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new()
        .allow_methods([Method::GET])
        .allow_origin(Any); // 👈 you can restrict this later

    let app = Router::new()
        .route("/api/getimage", get(return_image))
        .layer(cors); // 👈 add layer

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr).await.unwrap();
    println!("Listening on {}", addr);

    axum::serve(listener, app).await.unwrap();
}

async fn return_image() -> (StatusCode, Json<Image>) {
    let img_url = "https://cdn.pixabay.com/photo/2025/09/10/11/30/grief-9826220_1280.jpg";
    let img_desc = "a photo I took of something sad";
    let img_timestamp = "1758967333";
    let image = Image {
        imageUrl: img_url.to_string(),
        imageDescription: img_desc.to_string(),
        createdAtUnixTimestamp: 1_758_967_333,
    };
    (StatusCode::CREATED, Json(image))
}

#[derive(Serialize)]
struct Image {
    imageUrl: String,
    imageDescription: String,
    createdAtUnixTimestamp: i64
}