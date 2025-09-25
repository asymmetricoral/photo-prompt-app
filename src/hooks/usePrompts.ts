import { useEffect, useState } from 'react';

async function fetchPromptsFromFile() {
    const response = await fetch("/prompts.txt");
    const text = await response.text();
    return text.split("\n").map(l => l.trim()).filter(Boolean);
}

const usePrompts = () => {
    const [prompts, setPrompts] = useState<string[]>([]);

    useEffect(() => {
        fetchPromptsFromFile().then(setPrompts);
    }, []);

    return prompts;
}

export default usePrompts;