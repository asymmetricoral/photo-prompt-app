import usePrompts from '../hooks/usePrompts';

const Prompt = () => {
    const prompts = usePrompts();
    const today = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const prompt = prompts.length > 0 ? prompts[today % prompts.length] : "Loading...";

    return <>
        <h1>{prompt}</h1>
        <h2>That's today's daily prompt.</h2>
    </>
}

export default Prompt;