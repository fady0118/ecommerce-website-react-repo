import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
function AuthPage() {
  const [mode, setMode] = useState("signup");
  const [error, setError] = useState(null);
  const { signUp, login, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    let result;
    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = login(data.email, data.password);
    }
    result.success ? navigate("/") : setError(result.error);
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {/* {user && <p>user Logged In {user.email}</p>}
          <button onClick={logout}>Logout</button> */}
          <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Login"}</h1>
          <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                name="email"
                id="email"
                {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email [name@example.com]" } })}
              />
              {errors.email && <span className="form-error">{errors.email.message}</span>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                type="password"
                name="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters" },
                  maxLength: { value: 16, message: "Password must not exceed 16 characters" },
                })}
              />
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>
            <button className="btn btn-primary btn-large" type="submit">
              {mode === "signup" ? "Sign up" : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            <p>
              {mode === "signup" ? "Already have an account? " : "Don't have an account? "}
              <span
                className="auth-link"
                onClick={() => {
                  mode === "signup" ? setMode("login") : setMode("signup");
                }}
              >
                {mode === "signup" ? "Login instead" : "Register"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AuthPage;
