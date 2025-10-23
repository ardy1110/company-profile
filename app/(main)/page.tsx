// src/app/page.tsx

import About from "./components/About";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import SertifikasiLegalitas from "./components/SertifikatLegalitas";
import VisiMisi from "./components/VisiMisi";

export default function Home() {
  return (
    <>
    <Landing/>
    <About/>
    <VisiMisi/>
    <SertifikasiLegalitas/>
    <Footer/>
    </>
  );
}