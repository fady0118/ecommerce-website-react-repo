import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/auth" Component={Auth} />
        <Route path="/checkout" Component={Checkout} />
      </Routes>
      <footer>footer</footer>
    </>
  );
}

export default App;
