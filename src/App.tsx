import {
  Header,
  Hero,
  About,
  Gallery,
  FAQ,
  Location,
  Booking,
  Footer,
} from "./components";

// Reviews and Calendar (availability) sections are temporarily hidden —
// re-add them here once the review carousel is ready / iCal integration lands
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Gallery />
        <FAQ />
        <Location />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

export default App;
