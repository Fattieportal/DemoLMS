import { redirect } from "react-router";
import Loading from "~/components/Loading";
import { useAuthStore } from "~/stores/auth.store";

export async function clientLoader() {
  const { token, validateToken } = useAuthStore.getState();
  if (!token) {
    throw redirect("/login");
  }
  const isValid = await validateToken();
  if (!isValid) {
    throw redirect("/login");
  }
  throw redirect("/dashboard");
  return null;
}

const IndexPage = () => {
  return <Loading />;
};

export default IndexPage;
