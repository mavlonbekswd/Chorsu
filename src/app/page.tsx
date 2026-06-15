import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TradeRoute from "@/components/TradeRoute";
import Stalls from "@/components/Stalls";
import InsideStall from "@/components/InsideStall";
import MerchantPromise from "@/components/MerchantPromise";
import Caravans from "@/components/Caravans";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TradeRoute />
        <Stalls />
        <InsideStall />
        <MerchantPromise />
        <Caravans />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
