import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AppRoutes } from "./Router";
import { GlobalStyles } from "./shared/styles/global";
import { defaultTheme } from "./shared/styles/themes/default";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <BrowserRouter>
                <ToastContainer />
                <AppRoutes />
            </BrowserRouter>
            <GlobalStyles />
        </ThemeProvider>
    );
}

export default App;
