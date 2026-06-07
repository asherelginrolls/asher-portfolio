import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProofBar } from "@/components/ProofBar";
import { ScrollStory } from "@/components/ScrollStory";
import { Work } from "@/components/Work";
import { ClaimRight } from "@/components/ClaimRight";
import { Workshop } from "@/components/Workshop";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Marquee />
        <ProofBar />
        <ScrollStory />
        <Work />
        <ClaimRight />
        <Workshop />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
