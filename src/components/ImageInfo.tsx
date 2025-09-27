import type { ImageRecord } from "../hooks/useImages"

const ImageInfo = ({img} : { img: ImageRecord }) => {
    return <>
        {img.imageDescription}
        <br />
        {new Date(img.createdAtUnixTimestamp * 1000).toLocaleString()}
    </>
}

export default ImageInfo;