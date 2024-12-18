import "./reset.css";
import Header from "./components/header/Header";
import { CartProvider } from "./components/CartContext/CartContext";

import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <main>
          <Outlet />
        </main>
      </CartProvider>
    </>
  );
}

export default App;
