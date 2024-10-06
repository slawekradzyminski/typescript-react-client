import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./RouterComponent";
import { ToastProvider } from "../common/ToastProvider";
import ResponsiveAppBar from "../header/ResponsiveAppBar";
import Footer from "./Footer";
import "./styles.css";

const isProduction = process.env.NODE_ENV === 'production';
const basename = isProduction ? '/typescript-react-client' : '';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter basename={basename}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <ResponsiveAppBar />
            <RoutesComponent />
          <Footer />
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
}

export { App };
