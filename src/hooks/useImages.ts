import { useEffect, useState } from 'react'

async function fetchImages() {
    const response = await fetch("/images.txt");
    const text = await response.text();
    return text.split("\n").map(l => l.trim()).filter(Boolean);
}

const useImages = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        fetchImages().then(setImages);
    })

    return images;
}

export default useImages;