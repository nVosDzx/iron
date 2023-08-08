import { withSessionSsr } from "@/lib/utils/iron-session";
import { useRouter } from "next/router";
import { useRef } from "react";

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user || null;
  if (user) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: { user },
  };
});

export default function Login() {
  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email: <input type="text" ref={emailInput} />
        </label>
      </div>
      <div>
        <label>
          Password: <input type="password" ref={passwordInput} />
        </label>
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  );
}
