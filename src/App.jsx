import { BrowserRouter } from "react-router-dom";

import { useState } from "react";
import "./App.css";
import { AppRoutes } from "./routes/Routes";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  console.log("✅ App rendered");
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
