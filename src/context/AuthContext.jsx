import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

  let currentUserEmail = { email: localStorage.getItem("currentUserEmail") };
  if (!currentUserEmail.email) {
    currentUserEmail = null;
  }
  const [user, setUser] = useState(currentUserEmail);
  // we will use localStorage to hold users data
  // this is not generally a good option but this will do for this project
  function signUp(email, password) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.length && users.some((user) => user.email === email)) {
      return { success: false, error: "User already exists" };
    }
    const newUser = { email, password };
    users.push(newUser);
    // save to localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);
    setUser({ email });
    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  function login(email, password) {
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((usr) => usr.email === email && usr.password === password);
    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }
    localStorage.setItem("currentUserEmail", email);
    setUser({ email });
    return { success: true };
  }
  return <AuthContext.Provider value={{ signUp, logout, login, user }}>{children}</AuthContext.Provider>;
}

// custom auth hook
export function useAuth() {
    const context = useContext(AuthContext)
    return context;
} 
