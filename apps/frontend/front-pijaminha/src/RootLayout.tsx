import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { PijamasProvider } from "./stores/pijamasProvider";

export default function RootLayout() {
  return (
    <>
      <PijamasProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </PijamasProvider>
    </>
  );
}
