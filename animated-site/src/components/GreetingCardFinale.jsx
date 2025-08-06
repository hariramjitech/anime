// components/GreetingCardFinale.jsx
import { motion } from "framer-motion";

export default function GreetingCardFinale() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-pink-200 via-rose-300 to-red-200 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Floating sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white text-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            delay: Math.random() * 5,
            repeat: Infinity
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Main love message */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center text-pink-900"
        style={{
          fontFamily: "'Great Vibes', cursive",
          textShadow: "0 0 15px rgba(255,255,255,0.8)"
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        I love you, Harsha Kutty ❤️
      </motion.h1>

      <motion.p
        className="text-2xl md:text-3xl text-pink-800 mt-4"
        style={{
          fontFamily: "'Dancing Script', cursive",
          textShadow: "0 0 10px rgba(255,255,255,0.6)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        Forever yours, Hari
      </motion.p>
    </div>
  );
}
