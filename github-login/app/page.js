"use client";

import GitHubLogo from "./components/GitHubLogo";
import LoginForm from "./components/LoginForm";
import SSOButtons from "./components/SSOButtons";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <div className="container">
        {/* GitHub Logo */}
        <div className="logo">
          <GitHubLogo />
        </div>

        {/* Heading */}
        <h1 className="heading">Sign in to GitHub</h1>

        {/* Login Form Card */}
        <LoginForm />

        {/* Divider */}
        <div className="divider">
          <span>or</span>
        </div>

        {/* SSO Buttons */}
        <SSOButtons />

        {/* Footer Links */}
        <div className="footer-links">
          <p>
            New to GitHub?{" "}
            <a href="#" id="create-account-link">
              Create an account
            </a>
          </p>
          <a href="#" className="passkey-link" id="passkey-sign-in-link">
            Sign in with a passkey
          </a>
        </div>
      </div>

      {/* Page Footer */}
      <Footer />
    </>
  );
}
