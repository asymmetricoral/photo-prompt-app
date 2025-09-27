import { useState } from "react";
import useImages, { ImageRecord } from "../hooks/useImages"
import "./Gallery.css"
import ImageOverlay from "../components/ImageOverlay";
import ImageInfo from "../components/ImageInfo";

const Gallery = () => {
    const images = useImages();
    const [selected, setSelected] = useState<ImageRecord | null>(null)

    return <>
        {selected &&
            <ImageOverlay
                img={selected}
                setSelected={setSelected}
            />}
        <div className="gallery">
            {images.map((img, i) => (
                <div
                    key={i}
                    className="gallery-item"
                    onClick={() => setSelected(img)}>
                    <img src={img.imageUrl} alt={img.imageDescription} />
                    <div className="overlay">
                        <ImageInfo img={img} />
                    </div>
                </div>
            ))}
        </div>
    </>
}

export default Gallery;