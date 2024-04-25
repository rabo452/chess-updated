import { AuthApi, TokenStorage } from "entities/auth";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "shared/ui/Button";
import styles from "./SignUpForm.module.css";

export const SignUpForm = () => {
    const navigate = useNavigate();

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");

    return (
        <div className={styles['signup-form-container']}>
            <h1>Create new user:</h1>
            <input type="text" onChange={(event) => setUsername(event.target.value)} placeholder="username" value={username} />
            <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)} value={password} />
            <Button text="create new user" onClick={() => {
                if (username.length < 8 || password.length < 8) {
                    setError("username and password should be at least 8 characters length!");
                    return; 
                }
                
                new Promise(async (resolve) => {
                    try {
                        var tokens = await AuthApi.createUser(username, password);
                        TokenStorage.accessToken = tokens.access;
                        TokenStorage.refreshToken = tokens.refresh;
                        return navigate("/");
                    }catch (e) {
                        setError("such user already exists");
                        return;
                    }
                })
                
            }}/>

            <div className={styles['error-block']}>
                {error}
            </div>
        </div>
    )
}