import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Body from "./components/body/Body";
import useDragging from "./hooks/useDragging";

function App() {
  return (
    <>
      <Navbar />
      <Body />
      <Footer />
    </>
  );
}

export default App;
