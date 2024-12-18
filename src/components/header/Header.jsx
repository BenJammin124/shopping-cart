import styles from "./Header.module.css";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const { cartItems } = useCart();

  const amountOfItemsInCart = cartItems.length;
  return (
    <header>
      <div className={styles.headerWrapper}>
        <Link to="home">
          <h1 className={styles.logo}>Stop N Shop</h1>
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink
                to="home"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="shop"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                Shop
              </NavLink>
            </li>
            <li className={styles.theClass}>
              <NavLink
                to="cart"
                className={({ isActive }) =>
                  isActive ? ` ${styles.active}` : undefined
                }
              >
                <span
                  className={
                    amountOfItemsInCart > 0
                      ? styles.cartCount
                      : styles.displayNone
                  }
                >
                  {amountOfItemsInCart}
                </span>
                <ShoppingCart />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
