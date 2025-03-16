// pages/index.js
import Head from "next/head";
import HeroSection from "./Components/Hero";
import SpecialOffers from "./Components/SpecialOffers";
import Testimonials from "./Components/Testimonials";
import FeaturedDestinations from "./mainSections/FeaturedDestinations";
import SponsoredHotels from "./mainSections/SponsoredHotels";
import StoryStaysSection from "./mainSections/UserStory";
import PopularEventsSection from "./mainSections/PopularEvents";

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

      <main>
        <HeroSection />

        <section className=" bg-white dark:bg-zinc-900 mx-auto px-2 lg:px-4 ">
          {/* <Featured Destinations /> */}
          <FeaturedDestinations />
        </section>

        <section className=" bg-white dark:bg-zinc-900 mx-auto px-2 lg:px-4 py-10">
          {/* Sponsore dDestinations /> */}
          <SponsoredHotels />
        </section>

        <section className=" bg-white dark:bg-zinc-900 mx-auto px-3 lg:px-4 py-10">
          {/* <User Story /> */}
          <StoryStaysSection />
        </section>

        <section className="bg-white dark:bg-zinc-900 mx-auto px-2 lg:px-4 py-10">
          <div className="container mx-auto px-4">
            <SpecialOffers />
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 mx-auto px-2 lg:px-4 py-10">
          <div className="container mx-auto px-4">
            <PopularEventsSection />
          </div>
        </section>

        <section className="container mx-auto px-6 lg:px-4 py-16">
          <Testimonials />
        </section>
      </main>
    </div>
  );
}
