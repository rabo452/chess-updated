import styles from "./button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
  }

const Button: React.FC<ButtonProps> = ({text, ...props}) => {
    return (
        <button className={styles.btn} {...props}>
            {text}
        </button>
    )
}

export default Button;