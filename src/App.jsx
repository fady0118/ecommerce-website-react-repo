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
        <Route path="/" element={Home} />
        <Route path="/auth" element={Auth} />
        <Route path="/checkout" element={Checkout} />
      </Routes>
      <footer>footer</footer>
    </>
  );
}

export default App;
