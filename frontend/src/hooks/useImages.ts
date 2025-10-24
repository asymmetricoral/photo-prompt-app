import { useEffect, useState } from 'react'

export class ImageRecord {
    imageUrl: string;
    imageDescription: string;
    createdAtUnixTimestamp: number;

    constructor([imageUrl, imageDescription, createdAt]: [string, string, string]) {
        this.imageUrl = imageUrl;
        this.imageDescription = imageDescription;
        this.createdAtUnixTimestamp = parseInt(createdAt, 10);
    }
}

async function fetchImages() {
    const response = await fetch("http://127.0.0.1:3000/api/getimage");
    const images = await response.json(); // This IS the array
    return images.map(
        (element: {
            imageUrl: string;
            imageDescription: string;
            createdAtUnixTimestamp: number;
        }) =>
            new ImageRecord([
                element.imageUrl,
                element.imageDescription,
                element.createdAtUnixTimestamp.toString(),
            ])
    );
}
const useImages = () => {
    const [images, setImages] = useState<ImageRecord[]>([]);

    useEffect(() => {
        fetchImages()
            .then(setImages);
    }, [])

    return images;
}

export default useImages;