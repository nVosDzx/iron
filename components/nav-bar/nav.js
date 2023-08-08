import Link from "next/link";
import styles from "./nav.module.css";
import { useSessionContext } from "@/context/sessionContext";
const Navbar = () => {
  const session = useSessionContext();
  return (
    <div className={styles.main}>
      <Link href="/">Home</Link>
      {session ? (
        <Link href="/dashboard">Dashboard</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default Navbar;
