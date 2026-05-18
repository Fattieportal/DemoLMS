import { redirect } from "react-router";
import Loading from "~/components/Loading";
import { useAuthStore } from "~/stores/auth.store";

export async function clientLoader() {
  const { isAuthenticated } = useAuthStore.getState();
  throw redirect(isAuthenticated ? "/dashboard" : "/login");
}

const IndexPage = () => {
  return <Loading />;
};

export default IndexPage;
