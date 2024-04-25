import { Button } from "shared/ui/Button";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthApi } from "entities/auth";
 
export const Header = () => {
    let navigate = useNavigate();

    var authBlock = !AuthApi.isAuthorizated() ? (
        <div className="auth-block">
            <Link to="/sign-up"><Button text="sign up" style={{marginRight: 15}}/></Link>
            <Link to="/login"><Button text="login" /></Link>
        </div>
    ) : (
        <div className="auth-block">
            <Button text="log out" onClick={() => {
                AuthApi.logout();
                return navigate("/");
            }} />
        </div>
    );

    return (
        <div className={styles['header-container']}>
            <Link to="/">
                <div className={styles["logo-block"]}>
                    CHESS.io
                </div>
            </Link>

            {authBlock}
        </div>
    )
}