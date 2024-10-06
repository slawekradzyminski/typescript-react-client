import React from "react";
import { HashRouter } from "react-router-dom";
import RoutesComponent from "./RouterComponent";
import { ToastProvider } from "../common/ToastProvider";
import ResponsiveAppBar from "../header/ResponsiveAppBar";
import Footer from "./Footer";
import "./styles.css";

function App() {
  return (
    <ToastProvider>
      <HashRouter>
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
      </HashRouter>
    </ToastProvider>
  );
}

export { App };
