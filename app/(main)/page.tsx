// src/app/page.tsx

import About from "./components/About";
import CompanyValues from "./components/CompanyValue";
import EnvironmentalCommitment from "./components/EnviromentalComitment";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import SertifikasiLegalitas from "./components/SertifikatLegalitas";
import ServicesSection from "./components/ServiceSection.";
import VisiMisi from "./components/VisiMisi";

export default function Home() {
  return (
    <>
    <Landing/>
    <About/>
    <VisiMisi/>
    <CompanyValues/>
    <SertifikasiLegalitas/>
    <EnvironmentalCommitment/>
    <ServicesSection/>
    <Footer/>
    </>
  );
}