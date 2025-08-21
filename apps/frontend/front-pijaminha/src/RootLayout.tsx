import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { PijamasProvider } from "./stores/pijamasProvider";
import { FeedbacksProvider } from "./stores/feedbacksProvider";

export default function RootLayout() {
  return (
    <>
      <PijamasProvider>
        <FeedbacksProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </FeedbacksProvider>
      </PijamasProvider>
    </>
  );
}
