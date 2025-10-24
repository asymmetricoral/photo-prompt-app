use axum::{Json, Router, http::Method, http::StatusCode, routing::get};
use serde::Serialize;
use std::io::BufRead;
use std::path::Path;
use std::{fs::File, str::FromStr};
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tower_http::cors::{Any, CorsLayer};
use anyhow::anyhow;

#[tokio::main]
async fn main() {
    let cors = CorsLayer::new()
        .allow_methods([Method::GET])
        .allow_origin(Any); // 👈 you can restrict this later

    let app = Router::new()
        .route("/api/getimage", get(return_images_from_file))
        .layer(cors); // 👈 add layer

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    let listener = TcpListener::bind(addr).await.unwrap();
    println!("Listening on {}", addr);

    axum::serve(listener, app).await.unwrap();
}

async fn return_images_from_file() -> (StatusCode, Json<Vec<Image>>) {
    let images = images_from_filepath("test/images.txt");
    match images {
        Ok(x) => (StatusCode::CREATED, Json(x)),
        Err(x) => (StatusCode::IM_A_TEAPOT, Json(vec![])) // return something with an error message
    }
}

fn images_from_filepath(filepath: &str) -> anyhow::Result<Vec<Image>> {
    let lines = read_lines(filepath)?;
    // Consumes the iterator, returns an (Optional) String
    let mut images = vec![];
    for line in lines.map_while(Result::ok) {
        images.push(line.parse()?);
    }
    Ok(images)
    
}

fn read_lines<P>(filename: P) -> std::io::Result<std::io::Lines<std::io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(std::io::BufReader::new(file).lines())
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
    createdAtUnixTimestamp: i64,
}

impl FromStr for Image {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> anyhow::Result<Image> {
        let [imageUrl, imageDescription, timestamp] = s.split("|").collect::<Vec<_>>()[..] else {
            return Err(anyhow!("The string is not in the required format."));
        };
        let imageUrl = imageUrl.to_owned();
        let imageDescription = imageDescription.to_owned();
       Ok(Image { imageUrl, imageDescription, createdAtUnixTimestamp: timestamp.parse()? })
    }
}