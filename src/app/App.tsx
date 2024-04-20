import { AppProvider } from "./providers";
import { AppRouter } from "./routes";
import "./styles/index.css";

const App = () => {
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    );
}

export default App;