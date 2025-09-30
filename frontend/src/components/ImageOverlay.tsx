import type { ImageRecord } from "../hooks/useImages"
import "./ImageOverlay.css"

type ImageSetter = React.Dispatch<React.SetStateAction<ImageRecord | null>>;

interface ImageOverlayProps {
  img: ImageRecord;
  setSelected: ImageSetter;
}

const ImageOverlay = ({ img, setSelected }: ImageOverlayProps) => {
    return <div className="modal" onClick={() => setSelected(null)}>
        <img src={img.imageUrl} alt={img.imageDescription} />
    </div>
}

export default ImageOverlay;