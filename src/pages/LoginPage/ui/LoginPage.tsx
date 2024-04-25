import { LoginForm } from "widgets/LoginForm";
import styles from "./LoginPage.module.css";
import { Header } from "widgets/Header";

export const LoginPage = () => {
    return (
        <div className={styles['container']}>
            <Header />
            <div className={styles['login-form-wrapper']}>
                <LoginForm />
            </div>
        </div>
        
    )
}