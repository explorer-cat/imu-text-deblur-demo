import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Teaser } from "@/components/Teaser";
import { Abstract } from "@/components/Abstract";
import { Method } from "@/components/Method";
import { Results } from "@/components/Results";
import { BibTeX } from "@/components/BibTeX";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <span id="top" />
      <Nav />
      <main>
        <Hero />
        <Teaser />
        <Abstract />
        <Method />
        <Results />
        <BibTeX />
      </main>
      <Footer />
    </>
  );
}
