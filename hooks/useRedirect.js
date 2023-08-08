export function redirectUser(req, path) {
  const user = req.session.user || null;
  if (user) {
    return {
      redirect: {
        destination: `/${path}`,
        permanent: false,
      },
    };
  }
  return {
    props: { user },
  };
}
