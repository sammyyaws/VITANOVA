import Image from "next/image";
import Hero from "../components/Hero";
import Services from "../components/Services";
import LiveUpdates from "../components/LiveUpdates";
export default function Home() {

  return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Hero />
           <Services />
           <LiveUpdates />
      </div>
  )
}
