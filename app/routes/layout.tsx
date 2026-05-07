import { Outlet, redirect } from "react-router";
import Header from "~/components/Header";
import Tabs from "~/components/Tabs";
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

  return null;
}

const LayoutPage = () => {
  return (
    <main className="flex-1 pb-28">
      <Header />
      <Outlet />
      <Tabs />
    </main>
  );
};

export default LayoutPage;
