import styles from "./Navbar.module.css";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img
        src={logo}
        alt="Logo FitScan"
        className={styles.logo}
      />
    </nav>
  );
}

export default Navbar;