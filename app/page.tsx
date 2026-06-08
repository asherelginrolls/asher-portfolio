import { SignalField } from "@/components/SignalField";
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
      <SignalField />
      <div className="relative z-10">
        <Nav />
        <main id="top">
          {/* Hero sits transparent over the live signal field */}
          <Hero />
          {/* Everything below rides a dark scrim so the line only whispers
              through and the copy stays fully legible */}
          <div className="relative bg-paper/92">
            <Marquee />
            <ProofBar />
            <ScrollStory />
            <Work />
            <ClaimRight />
            <Workshop />
            <Contact />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
