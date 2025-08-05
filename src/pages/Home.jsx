import Footer from "../components/Footer";
import Header from "../components/Header";
import Home from "../components/Home/Section";

const ScrapSmartHomepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

export default ScrapSmartHomepage;