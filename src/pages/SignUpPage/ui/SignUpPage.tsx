import { SignUpForm } from "widgets/SignUpForm";
import styles from "./SignUpPage.module.css";
import { Header } from "widgets/Header";

export const SignUpPage = () => {
    return (
        <div className={styles['container']}>
            <Header />
            <div className={styles['signup-form-wrapper']}>
                <SignUpForm />
            </div>  
        </div>
    )
}