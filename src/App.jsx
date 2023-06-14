import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Posts from "./components/Posts";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Posts />
      <Footer />
    </div>
  );
}

export default App;
