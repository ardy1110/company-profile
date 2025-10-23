// src/app/page.tsx

import About from "./components/About";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
// import Navbar from "./components/Navbar";
import SertifikasiLegalitas from "./components/SertifikatLegalitas";
import VisiMisi from "./components/VisiMisi";

export default function Home() {
  return (
    <>
    {/* <Navbar/> */}
    <Landing/>
    <About/>
    <VisiMisi/>
    <SertifikasiLegalitas/>
    <Footer/>
    </>
  );
}