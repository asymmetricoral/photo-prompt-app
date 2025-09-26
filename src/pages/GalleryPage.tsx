import useImages from "../hooks/useImages"
import "./Gallery.css"

const Gallery = () => {
    const images = useImages();

    return <>
        <div className="gallery">
            {images.map((src, i) => (
                <img key={i} src={src} alt={`Prompt submission ${i}`} />
            ))}
        </div>
    </>
}

export default Gallery;