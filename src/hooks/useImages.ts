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
    const response = await fetch("/images.txt");
    const text = await response.text();
    return text
        .split("\n")
        .map(
            l => (
                l.split(",").map(
                    w => w.trim()) as [string, string, string]
            ))
        .map(
            parts => new ImageRecord(parts)
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