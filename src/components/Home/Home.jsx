import { Link } from "react-router-dom";
import openPhoto from "../../assets/open.jpg";
import storePhoto from "../../assets/store.jpg";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.p}>
        Welcome to Stop N Shop! Your one-stop destination for all your shopping
        needs. Whether you&apos;re looking for the latest gadgets, trendy
        fashion, or everyday essentials, we&apos;ve got you covered. Our
        user-friendly shopping experience makes it easy to browse, select, and
        purchase the products you love—all from the comfort of your home. At
        Stop N Shop, we strive to offer great deals, quality products, and
        exceptional customer service. Start shopping today and discover the
        convenience of shopping at your own pace!
      </p>
      <div className={styles.imageContainer}>
        <img className={styles.img} src={storePhoto} alt="storePhoto.jpg" />
        <img className={styles.img} src={openPhoto} alt="openSign.jpg" />
      </div>
      <Link to="/shop">
        <button className={styles.shopButton}>Start shopping!</button>
      </Link>
    </div>
  );
}
