import Navbar from "@/components/nav-bar/nav";
import "@/styles/globals.css";
import { SessionContext } from "@/context/sessionContext";

export default function App({ Component, pageProps }) {
  const session = pageProps.user; // Extract user from getServerSideProps result
  return (
    <SessionContext.Provider value={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionContext.Provider>
  );
}
