import { useState, useRef } from "react";
import HeartBlastAnimation from "./components/HeartBlastAnimation";
import StorySection from "./components/StorySection";
import GreetingCardFinale from "./components/GreetingCardFinale";
import musicFile from "./assets/The Distance of Love.mp3";

export default function App() {
  const [step, setStep] = useState("start"); // new start screen
  const audioRef = useRef(null);

  const startExperience = () => {
    if (audioRef.current) {
       audioRef.current.currentTime = 4;
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(err => console.log("Music blocked:", err));
    }
    setStep("hearts");
  };

  return (
    <>
      <audio ref={audioRef} src={musicFile} loop />

      {step === "start" && (
        <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-6">Our Story ❤️</h1>
          <button
            onClick={startExperience}
            className="px-6 py-3 bg-pink-500 rounded-full text-lg font-semibold hover:bg-pink-600 transition"
          >
            Start Experience
          </button>
        </div>
      )}

      {step === "hearts" && (
        <HeartBlastAnimation onComplete={() => setStep("story")} />
      )}

      {step === "story" && (
        <StorySection onComplete={() => setStep("card")} />
      )}

      {step === "card" && <GreetingCardFinale />}
    </>
  );
}
