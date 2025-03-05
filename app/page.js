// pages/index.js
import Head from "next/head";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/Hero";
import SearchBar from "./Components/SearchBar";
import FeaturedDestinations from "./Components/FeaturedDestination";
import PopularExperiences from "./Components/PopularExperience";
import SpecialOffers from "./Components/SpecialOffers";
import Footer from "./Components/Footer";
import Testimonials from "./Components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Sri Lanka Travels | Explore the Pearl of the Indian Ocean</title>
        <meta
          name="description"
          content="Discover the beauty of Sri Lanka with our exclusive travel deals, hotels, and experiences."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Navbar /> */}

      <main>
        <HeroSection />
        {/* <div className="container mx-auto px-4 -mt-16 relative z-10">
          <SearchBar />
        </div> */}

        <section className=" bg-white dark:bg-zinc-900 mx-auto px-12 py-16">
          <FeaturedDestinations />
        </section>

        <section className="bg-white dark:bg-zinc-900 mx-auto px-12 py-16">
          <PopularExperiences />
        </section>

        <section className="bg-blue-50 dark:bg-zinc-900 py-16">
          <div className="container mx-auto px-4">
            <SpecialOffers />
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <Testimonials />
        </section>
      </main>

      <Footer />
    </div>
  );
}
