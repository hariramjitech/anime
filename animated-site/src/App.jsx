import { useState } from "react";
import HeartBlastAnimation from "./components/HeartBlastAnimation";
import StorySection from "./components/StorySection";
import GreetingCardFinale from "./components/GreetingCardFinale";

export default function App() {
  const [step, setStep] = useState("hearts");

  return (
    <>
      {step === "hearts" && 
        <HeartBlastAnimation onComplete={() => setStep("story")} />}
      {step === "story" && 
        <StorySection onComplete={() => setStep("card")} />}
      {step === "card" && 
        <GreetingCardFinale />}
    </>
  );
}
