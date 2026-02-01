import {
  Header,
  Hero,
  About,
  Gallery,
  Reviews,
  FAQ,
  Location,
  Calendar,
  Footer,
} from "./components";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Reviews />
        <FAQ />
        <Location />
        <Calendar />
      </main>
      <Footer />
    </div>
  );
}

export default App;
