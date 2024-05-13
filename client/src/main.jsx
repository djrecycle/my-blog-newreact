import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { store, persistor } from "./redux/store.js";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App />
                <Toaster />
            </ThemeProvider>
        </Provider>
    </PersistGate>
);
