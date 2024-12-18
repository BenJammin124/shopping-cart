import { useEffect, useState } from "react";
import styles from "./ShopPage.module.css";
import PropTypes from "prop-types";
import { useCart } from "../CartContext/CartContext";

const ProductCard = ({ product, increment, decrement }) => {
  const { addToCart } = useCart();

  function handleIncrement() {
    increment(product);
  }

  function handleDecrement() {
    decrement(product);
  }

  function onChange(e) {
    const value = parseInt(e.target.value);
    if (value > 0) {
      //
    }
  }

  function handleAddToCart() {
    addToCart(product);
  }

  const shortenDescription =
    product.description.length > 100
      ? product.description.substring(0, 100) + "..."
      : product.description;

  const shortenTitle =
    product.title.length > 32 ? product.title.substring(0, 32) : product.title;

  return (
    <div className={styles.productCard}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <div className={styles.productDetails}>
        <h3 className={styles.productName}>{shortenTitle}</h3>
        <p className={styles.productDescription}>{shortenDescription}</p>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        <div className={styles.quantityDiv}>
          <button onClick={handleDecrement}>-</button>{" "}
          <input
            type="text"
            className={styles.quantityInput}
            value={product.quantity}
            onChange={onChange}
          />{" "}
          <button onClick={handleIncrement}>+</button>
        </div>
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    quantity: PropTypes.number,
  }),
  increment: PropTypes.func,
  decrement: PropTypes.func,
};

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    let ignore = false;

    async function getProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        if (!ignore) {
          const addQuant = jsonResponse.map((product) => ({
            ...product,
            quantity: 1,
          }));
          setProducts(addQuant);
        }
      } catch (error) {
        console.error("Error Fetching products:", error);
      }
    }
    getProducts();

    return () => {
      ignore = true;
    };
  }, []);

  const incrementQuantity = (product) => {
    setProducts((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: product.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (product) => {
    if (product.quantity > 1) {
      setProducts((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: product.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <div className={styles.shopPage}>
      <h1>Shop Our Products</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            increment={incrementQuantity}
            decrement={decrementQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
