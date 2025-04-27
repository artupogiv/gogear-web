import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
