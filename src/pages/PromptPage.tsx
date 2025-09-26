import Prompt from "../components/Prompt";
import styles from "./PromptPage.module.css";

const PromptPage = () => {
    return (
        <div className={styles.promptPage}>
            <Prompt />
        </div>
    )
}

export default PromptPage;