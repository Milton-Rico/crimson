import React from 'react';
import HeroHome from '../components/home/HeroHome';
import AboutUs from '../components/home/AboutUs';
import MarqueeBanner from '../components/home/MarqueeBanner';
import MethodPhrase from '../components/home/MethodPhrase';
import Benefits from '../components/home/Benefits';
import GrowthSystem from '../components/home/GrowthSystem';
import ProjectsPreview from '../components/home/ProjectsPreview';
import FAQAccordion from '../components/home/FAQAccordion';
import DiagnosticForm from '../components/DiagnosticForm';
import BlogPreview from '../components/home/BlogPreview';

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero */}
      <HeroHome />

      {/* 2. About Us */}
      <AboutUs />

      {/* 3. Banner Marquee */}
      <MarqueeBanner />

      {/* 4. Crimson Method Phrase */}
      <MethodPhrase />

      {/* 5. Benefits */}
      <Benefits />

      {/* 6. Growth System */}
      <GrowthSystem />

      {/* 7. Projects Showcase */}
      <ProjectsPreview />

      {/* 8. FAQ Accordion */}
      <FAQAccordion />

      {/* 9. Diagnostic Form */}
      <DiagnosticForm />

      {/* 10. Blog / Insights */}
      <BlogPreview />
    </main>
  );
}
