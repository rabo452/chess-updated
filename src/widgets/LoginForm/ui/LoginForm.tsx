import { AuthApi, TokenStorage } from "entities/auth";
import { useState } from "react"
import { redirect, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "shared/ui/Button";
import styles from "./LoginForm.module.css";

export const LoginForm = () => {
    const navigate = useNavigate();

    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");

    return (
        <div className={styles['login-form-container']}>
            <h1>Login into account:</h1>
            <input type="text" onChange={(event) => setUsername(event.target.value)} placeholder="username" value={username} />
            <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)} value={password} />
            <Button text="login" onClick={() => {
                if (username.length < 8 || password.length < 8) {
                    toast.dismiss();
                    toast("username and password should be at least 8 characters length!");
                    return; 
                }
                
                new Promise(async (resolve) => {
                    try {
                        var tokens = await AuthApi.login(username, password);
                        TokenStorage.accessToken = tokens.access;
                        TokenStorage.refreshToken = tokens.refresh;
                        return navigate("/");
                    }catch (e) {
                        toast(`${e}`);

                        return;
                    }
                })
                
            }}/>

            <ToastContainer />
        </div>
    )
}