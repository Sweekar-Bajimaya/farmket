
import HomeHeroSection from "../components/home/HeroSection";
import HomeCategorySection from "../components/home/CategorySection";
import HomeBestSellerSection from "../components/home/BestSellerSection";
import HomeHighlightedFeaturesSection from "../components/home/HighlightedFeatures";
import HomeFooterSection from "../components/layout/Footer";

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