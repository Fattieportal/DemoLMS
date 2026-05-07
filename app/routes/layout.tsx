import { Outlet } from "react-router";
import Header from "~/components/Header";
import Tabs from "~/components/Tabs";

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
