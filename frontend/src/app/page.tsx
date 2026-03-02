
import HomeHeroSection from "./home-hero-section";
import HomeCategorySection from "./home-category-section";
import HomeBestSellerSection from "./home-best-seller-section";
import HomeHighlightedFeaturesSection from "./home-highlighted-features-section";
import HomeFooterSection from "./home-footer-section";

export default function Home() {
  return (
    <main style={{backgroundColor: "var(--background)"}} className="min-h-screen w-full">
      <HomeHeroSection />
      <HomeCategorySection />
      <HomeBestSellerSection />
      <HomeHighlightedFeaturesSection />
      <HomeFooterSection />
    </main>
  );
}