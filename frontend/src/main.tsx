import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "@trussworks/react-uswds/lib/uswds.css";
import "@trussworks/react-uswds/lib/index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/login.tsx";
import W2 from "./pages/filing/w2.tsx";
import SignUp from "./pages/signup.tsx";
import Account from "./pages/account.tsx";
import Review from "./pages/filing/review.tsx";
import Results from "./pages/filing/results.tsx";
import Personal from "./pages/filing/personal.tsx";
import Deductions from "./pages/filing/deductions.tsx";
import SelfEmployment from "./pages/filing/self-employment.tsx";
import FilingInformation from "./pages/filing/filing-information.tsx";

import { HeaderNav } from "./components/header.tsx";

import "./i18n.ts";
import { AuthProvider } from "./contexts/auth-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HeaderNav />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/filing/personal" element={<Personal />} />
          <Route
            path="/filing/filing-information"
            element={<FilingInformation />}
          />
          <Route path="/filing/w2" element={<W2 />} />
          <Route path="/filing/self-employment" element={<SelfEmployment />} />
          <Route path="/filing/deductions" element={<Deductions />} />
          <Route path="/filing/review" element={<Review />} />
          <Route path="/filing/results" element={<Results />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
