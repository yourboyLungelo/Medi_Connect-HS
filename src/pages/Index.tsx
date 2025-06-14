// Main landing page for the public healthcare system

import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="bg-gradient-to-b from-blue-50 to-white min-h-screen w-full">
      {/* Header */}
      <header className="w-full px-8 py-5 flex justify-between items-center shadow-sm bg-white/80 sticky top-0 z-10">
        <span className="font-extrabold text-2xl text-blue-800 tracking-tight">Public Health Portal</span>
        <div className="flex gap-2">
          <a
            href="/login"
            className="rounded-md text-blue-700 px-6 py-2 hover:bg-blue-50 font-semibold transition"
          >
            Log in
          </a>
          <a
            href="/register"
            className="bg-blue-600 rounded-md text-white px-6 py-2 font-semibold hover:bg-blue-700 transition shadow"
          >
            Register
          </a>
        </div>
      </header>

      {/* Sections */}
      <Hero />
      <Benefits />
      <HowItWorks />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Index;
