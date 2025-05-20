
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import SolutionsSection from "@/components/homepage/SolutionsSection";
import PricingSection from "@/components/homepage/PricingSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import CTASection from "@/components/homepage/CTASection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <HeroSection />
      <FeaturesSection />
      <SolutionsSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default Index;
