import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

const scenes = [
  {
    img: "https://i.pinimg.com/1200x/41/02/af/4102af0fc123f0296e94fefa2037a870.jpg",
    text: "Back in school… I didn’t just see you — I *noticed* you. The way your laughter floated through the corridor, how sunlight caught in your hair. I didn’t know it then, but my heart had already decided… it was you.",
    pos: "top-16 right-10 text-right",
    color: "text-white",
    gradient: "bg-gradient-to-l from-black/90 via-purple-900/30 to-transparent",
    accent: "from-purple-400 to-pink-400",
    mood: "nostalgic"
  },
  {
    img: "https://i.pinimg.com/736x/ed/1b/d3/ed1bd33001783579cd98fbaa01585877.jpg",
    text: "Then life… pulled us apart. Different roads, different dreams. And yet — every night, you were still the thought I carried into my sleep, and the ache I woke up with.",
    pos: "top-16 left-10 text-left",
    color: "text-blue-100",
    gradient: "bg-gradient-to-r from-blue-900/70 via-black/60 to-transparent",
    accent: "from-blue-400 to-cyan-400",
    mood: "melancholy"
  },
  {
    img: "https://i.pinimg.com/1200x/bd/96/fc/bd96fc5b929abe22c8880c732e03e90d.jpg",
    text: "Years later… I walked into a gym, and the noise disappeared. You were there. Same eyes. Same smile. Same heartbeat in my chest, only louder now.",
    pos: "top-16 left-10 text-left",
    color: "text-amber-100",
    gradient: "bg-gradient-to-r from-amber-900/70 via-orange-800/40 to-transparent",
    accent: "from-amber-400 to-orange-400",
    mood: "hopeful"
  },
  {
    img: "https://i.pinimg.com/1200x/38/e7/05/38e705637a4b0f7a2f7ea7cf36768fea.jpg",
    text: "We talked like friends… but inside, I was fighting not to hold you. I told you how I felt. You told me to wait. And so I waited — not knowing that your heart was quietly learning the shape of mine.",
    pos: "bottom-20 left-10 text-left",
    color: "text-rose-100",
    gradient: "bg-gradient-to-t from-rose-900/70 via-pink-800/40 to-transparent",
    accent: "from-rose-400 to-pink-400",
    mood: "vulnerable"
  },
  {
    img: "https://i.pinimg.com/736x/6a/88/a5/6a88a5aebec6b3380fb4f2d8a02e2c2b.jpg",
    text: "March 27, 2024 — the day you chose me back. The day my world fit perfectly into your arms. And nothing… nothing has been the same since.",
    pos: "top-16 text-center",
    color: "text-pink-100",
    gradient: "bg-gradient-to-b from-pink-900/70 via-red-800/40 to-transparent",
    accent: "from-pink-400 to-red-400",
    mood: "euphoric"
  },
  {
    img: "https://i.pinimg.com/736x/f1/c4/b7/f1c4b7044df13c1ace33605279706355.jpg",
    text: "We’ve laughed until we couldn’t breathe. We’ve held each other through tears. We’ve fought — but always chose to come back. Always chose love.",
    pos: "top-16 right-10 text-right",
    color: "text-yellow-100",
    gradient: "bg-gradient-to-l from-yellow-900/70 via-amber-800/40 to-transparent",
    accent: "from-yellow-400 to-amber-400",
    mood: "joyful"
  },
  {
    img: "https://i.pinimg.com/736x/3f/2b/b3/3f2bb3d5da1b8021e2546fa7f0506f7e.jpg",
    text: "Miles apart… yet every time I close my eyes, I feel your hand in mine. Distance has nothing on us. Our hearts learned how to stay close.",
    pos: "bottom-20 text-center",
    color: "text-purple-100",
    gradient: "bg-gradient-to-t from-purple-900/70 via-indigo-800/40 to-transparent",
    accent: "from-purple-400 to-indigo-400",
    mood: "longing"
  },
  {
    img: "https://i.pinimg.com/736x/99/a8/e1/99a8e1381dc6129bac76f89ba6e85605.jpg",
    text: "We are not perfect. We fight, we stumble… but we always choose ‘us’. And that’s what makes it forever.",
    pos: "top-1/3 left-10 text-left",
    color: "text-red-100",
    gradient: "bg-gradient-to-r from-red-900/70 via-pink-800/40 to-transparent",
    accent: "from-red-400 to-pink-400",
    mood: "eternal"
  }
];


const TextRevealEffect = ({ text, onComplete, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000 + words.length * 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, words.length]);

  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isVisible ? { 
            opacity: 1, 
            y: 0, 
            rotateX: 0 
          } : {}}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const FloatingElements = ({ scene }) => {
  const elements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 12 + 6,
    delay: Math.random() * 4,
    duration: Math.random() * 6 + 8
  }));

  const getElementSymbol = (mood) => {
    switch (mood) {
      case 'euphoric': return '♥';
      case 'joyful': return '✨';
      case 'eternal': return '∞';
      case 'hopeful': return '☀';
      case 'melancholy': return '💧';
      case 'longing': return '🌙';
      default: return '✦';
    }
  };

  const getElementColor = (mood) => {
    switch (mood) {
      case 'euphoric': return 'text-red-300/60';
      case 'joyful': return 'text-yellow-300/60';
      case 'eternal': return 'text-pink-300/60';
      case 'hopeful': return 'text-amber-300/60';
      case 'melancholy': return 'text-blue-300/50';
      case 'longing': return 'text-purple-300/50';
      default: return 'text-white/40';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${getElementColor(scene.mood)}`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: `${element.size}px`,
            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))'
          }}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0.8, 1, 0],
            rotate: [0, 180, 360, 540],
            y: [0, -150, -300],
            opacity: [0, 1, 1, 0.8, 0]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeOut"
          }}
        >
          {getElementSymbol(scene.mood)}
        </motion.div>
      ))}
    </div>
  );
};

const EnhancedProgressBar = ({ currentIndex, total, accent }) => {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
      <motion.div 
        className="flex items-center space-x-4 bg-black/40 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="flex space-x-2">
          {Array.from({ length: total }, (_, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-full"
              animate={{ 
                width: i === currentIndex ? 60 : 8,
                height: 8
              }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className={`h-full rounded-full ${
                  i === currentIndex 
                    ? `bg-gradient-to-r ${accent} shadow-lg` 
                    : i < currentIndex 
                      ? 'bg-white/80' 
                      : 'bg-white/30'
                }`}
                animate={{
                  opacity: i === currentIndex ? 1 : i < currentIndex ? 0.9 : 0.4,
                  boxShadow: i === currentIndex ? [
                    '0 0 10px rgba(255,255,255,0.5)',
                    '0 0 20px rgba(255,255,255,0.8)',
                    '0 0 10px rgba(255,255,255,0.5)'
                  ] : 'none'
                }}
                transition={{ 
                  opacity: { duration: 0.3 },
                  boxShadow: { duration: 2, repeat: Infinity }
                }}
              />
              {i === currentIndex && (
                <motion.div
                  className="absolute inset-0 bg-white/40 rounded-full"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </motion.div>
          ))}
        </div>
        <motion.span 
          className="text-white/90 text-sm font-semibold ml-2 tracking-wider"
          animate={{ 
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {currentIndex + 1} / {total}
        </motion.span>
      </motion.div>
    </div>
  );
};

const CinematicTransition = ({ isVisible, accent, transitionType = 'wipe' }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shimmer effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${accent} opacity-30`}
        animate={{
          x: ['-200%', '200%']
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
      
      {/* Particle burst */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 0%)',
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 20%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 50%, transparent 100%)'
          ]
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Smooth overlay */}
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{
          opacity: [0, 0.8, 0]
        }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

const MoodLighting = ({ scene }) => {
  const getLightingColor = (mood) => {
    switch (mood) {
      case 'euphoric': return 'rgba(255, 20, 147, 0.15)';
      case 'joyful': return 'rgba(255, 215, 0, 0.15)';
      case 'hopeful': return 'rgba(255, 165, 0, 0.12)';
      case 'melancholy': return 'rgba(70, 130, 180, 0.1)';
      case 'longing': return 'rgba(138, 43, 226, 0.12)';
      case 'eternal': return 'rgba(220, 20, 60, 0.15)';
      default: return 'rgba(255, 255, 255, 0.08)';
    }
  };

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none mix-blend-overlay"
      animate={{
        background: [
          `radial-gradient(circle at 20% 30%, ${getLightingColor(scene.mood)} 0%, transparent 60%)`,
          `radial-gradient(circle at 80% 70%, ${getLightingColor(scene.mood)} 0%, transparent 60%)`,
          `radial-gradient(circle at 20% 30%, ${getLightingColor(scene.mood)} 0%, transparent 60%)`
        ]
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

export default function StorySection({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Auto-advance scenes
  useEffect(() => {
    if (typingDone && !isCompleted) {
      const timer = setTimeout(() => {
        if (index < scenes.length - 1) {
          setShowTransition(true);
          setTimeout(() => {
            setIndex(index + 1);
            setTypingDone(false);
            setShowTransition(false);
          }, 1200);
        } else {
          setIsCompleted(true);
          if (onComplete) {
            setTimeout(onComplete, 3000);
          }
        }
              }, 2500); // Faster animation timing
      return () => clearTimeout(timer);
    }
  }, [typingDone, index, onComplete, isCompleted]);

  const currentScene = scenes[index];

  if (isCompleted) {
    return (
      <motion.div 
        className="w-screen h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="text-center text-white"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 2, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl font-bold mb-4"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255,255,255,0.5)',
                '0 0 40px rgba(255,20,147,0.8)',
                '0 0 20px rgba(255,255,255,0.5)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Our Story ♥
          </motion.h1>
          <motion.p 
            className="text-2xl opacity-80"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Forever and Always
          </motion.p>
        </motion.div>
        <FloatingElements scene={{ mood: 'eternal' }} />
      </motion.div>
    );
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-black">
      {/* Enhanced ambient effects */}
      <FloatingElements scene={currentScene} />
      <MoodLighting scene={currentScene} />
      
      {/* Cinematic transition */}
      <AnimatePresence>
        <CinematicTransition 
          isVisible={showTransition} 
          accent={currentScene.accent} 
        />
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1, rotateY: 5 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.95, rotateY: -5 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Static background with enhanced filters for attractiveness */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${currentScene.img})`,
              filter: 'brightness(0.65) contrast(1.4) saturate(1.8) hue-rotate(10deg)'
            }}
          />

          {/* Rich attractive gradients - static but beautiful */}
          <div className={`absolute inset-0 ${currentScene.gradient}`} />
          
          {/* Enhanced multi-layer overlays for depth */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 30% 20%, rgba(0,0,0,0.2) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0.3) 0%, transparent 60%),
                linear-gradient(45deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)
              `
            }}
          />
          
          {/* Color accent overlay based on mood */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${currentScene.accent} opacity-20 mix-blend-overlay`}
          />
          
          {/* Cinematic bars for movie feel */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Text container without background box */}
          <motion.div
            className={`absolute max-w-6xl p-12 z-20 ${currentScene.pos}`}
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Text with 3D flip reveal animation */}
            <TextRevealEffect
              text={currentScene.text}
              onComplete={() => setTypingDone(true)}
              className={`
                text-3xl md:text-5xl lg:text-7xl font-bold leading-tight 
                ${currentScene.color}
              `}
              style={{
                textShadow: `
                  0 0 20px rgba(255,255,255,0.8), 
                  0 0 40px rgba(255,255,255,0.6), 
                  0 0 60px rgba(255,255,255,0.4),
                  0 4px 12px rgba(0,0,0,0.8),
                  0 8px 24px rgba(0,0,0,0.6)
                `,
                fontFamily: '"Crimson Text", "Georgia", serif',
                letterSpacing: '0.015em',
                lineHeight: '1.1',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.7))'
              }}
            />
          </motion.div>

          {/* Enhanced progress bar */}
          <EnhancedProgressBar 
            currentIndex={index} 
            total={scenes.length}
            accent={currentScene.accent}
          />


        </motion.div>
      </AnimatePresence>


    </div>
  );
}