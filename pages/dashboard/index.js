import Link from "next/link";
import styles from "./dashboard.module.css";
import { withSessionSsr } from "@/lib/utils/iron-session";
import { useRouter } from "next/router";
import { getSession } from "@/hooks/getSession";

export const getServerSideProps = withSessionSsr(async ({ req, res }) => {
  const { user } = await getSession(req, res);
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { user },
  };
});

const Dashboard = ({ user }) => {
  const user_name = user?.username;
  const isAdmin = user?.isAdmin;
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      return router.push("/login");
    }
  };
  return (
    <div className={styles.main}>
      {isAdmin ? (
        <div className={styles.dash}>
          <h2>Dashboard page</h2>
          {user_name && <p>Hi again {user_name}</p>}
          <button onClick={handleLogout}>Exit</button>
        </div>
      ) : (
        <div>Not Authorized</div>
      )}
      <Link href="/">Back home</Link>
    </div>
  );
};

export default Dashboard;
