import styles from "./CartPage.module.css";
// import { useState } from "react";
import { useCart } from "../CartContext/CartContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CartSummary() {
  const { cartItems } = useCart();

  const totalEachItem = cartItems.map((item) => {
    return item.price * item.quantity;
  });

  const subTotal = totalEachItem
    .reduce((accumulator, currentVal) => accumulator + currentVal)
    .toFixed(2);

  const taxPercent = (subTotal * 0.08).toFixed(2);

  const estimatedTotal = (
    parseFloat(subTotal) + parseFloat(taxPercent)
  ).toFixed(2);

  console.log(subTotal);
  return (
    <section>
      <h2>Summary</h2>
      <div>
        <p>Sub-total</p>
        <p>{"$ " + subTotal}</p>
      </div>
      <div>
        <p>Estimated Tax</p>
        <p>$ {taxPercent}</p>
      </div>
      <hr />
      <div>
        <p>Estimated Total</p>
        <p>$ {estimatedTotal}</p>
      </div>
      <button>Checkout</button>
    </section>
  );
}

const CartItem = ({ product }) => {
  const { removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const totalPrice = product.price * product.quantity;

  // const handleQuantityChange = (e) => {
  //   const newQuantity = parseInt(e.target.value, 10);
  //   if (newQuantity > 0) {
  //     onQuantityChange(product.id, newQuantity);
  //   }
  // };

  const shortenDescription =
    product.description.length > 150
      ? product.description.substring(0, 150) + "..."
      : product.description;

  return (
    <div className={styles.cartItem}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.cartItemImage}
      />
      <div className={styles.cartItemDetails}>
        <div>
          <h4 className={styles.cartItemName}>{product.title}</h4>
          <p>{shortenDescription}</p>
        </div>
        <div className={styles.cartItemPriceDetailsDiv}>
          <p className={styles.cartItemPrice}>
            ${product.price.toFixed(2) + " " + "ea."}
          </p>
          <div className={styles.cartItemQuantity}>
            <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
            <button onClick={() => decrementQuantity(product)}>-</button>
            <input
              type="text"
              id={`quantity-${product.id}`}
              value={product.quantity}
              // onChange={handleQuantityChange}
              className={styles.quantityInput}
              min="1"
            />
            <button onClick={() => incrementQuantity(product)}>+</button>
          </div>

          <p className={styles.cartItemTotal}>
            Total: ${totalPrice.toFixed(2)}
          </p>
          <button
            className={styles.removeButton}
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    id: PropTypes.number,
    quantity: PropTypes.number,
  }),
};

export default function CartPage() {
  const { cartItems } = useCart();
  return (
    <div className={styles.cartPage}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your shopping cart is empty</p>
          <Link to="/shop">
            <button className={styles.shopButton}>Start Shopping!</button>
          </Link>
        </div>
      ) : (
        <div className={styles.flexCartPage}>
          <div className={styles.cartItemsContainer}>
            {cartItems.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </div>
          <div className={styles.cartSummary}>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
