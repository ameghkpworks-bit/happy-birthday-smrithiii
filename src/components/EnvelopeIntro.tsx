import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Stage = "sealed" | "untying" | "opening" | "letter" | "done";

export function EnvelopeIntro({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<Stage>("sealed");

  const handleClick = () => {
    if (stage === "sealed") {
      setStage("untying");
      setTimeout(() => setStage("opening"), 1400);
      setTimeout(() => setStage("letter"), 2800);
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Envelope */}
      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            key="env"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{
              opacity: stage === "letter" ? 0.35 : 1,
              y: 0,
              scale: stage === "letter" ? 0.9 : 1,
            }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.8 } }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ width: 420, height: 280, perspective: 1200 }}
            onClick={handleClick}
          >
            {/* Envelope back */}
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                background: "linear-gradient(135deg, oklch(0.92 0.02 80), oklch(0.86 0.03 70))",
                boxShadow: "0 30px 60px oklch(0 0 0 / 0.5), inset 0 0 30px oklch(0.55 0.05 40 / 0.15)",
              }}
            />
            {/* Letter peeking */}
            <motion.div
              className="absolute left-4 right-4 paper rounded-sm"
              initial={{ y: 0 }}
              animate={{ y: stage === "opening" || stage === "letter" ? -40 : 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ top: 28, bottom: 28, boxShadow: "0 8px 20px oklch(0 0 0 / 0.25)" }}
            />
            {/* Flap */}
            <motion.div
              className="absolute left-0 right-0 top-0 origin-top"
              initial={{ rotateX: 0 }}
              animate={{ rotateX: stage === "opening" || stage === "letter" ? -170 : 0 }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
              style={{
                height: 150,
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, oklch(0.94 0.02 80), oklch(0.86 0.03 70))",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                boxShadow: "inset 0 -10px 20px oklch(0.55 0.05 40 / 0.2)",
              }}
            >
              {/* Wax seal + ribbon on flap */}
              <div className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2">
                {/* Ribbon */}
                <motion.div
                  initial={{ scaleX: 1, opacity: 1 }}
                  animate={{
                    scaleX: stage === "untying" || stage === "opening" || stage === "letter" ? 0 : 1,
                    opacity: stage === "untying" || stage === "opening" || stage === "letter" ? 0 : 1,
                  }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    width: 340,
                    height: 14,
                    background:
                      "linear-gradient(180deg, oklch(0.88 0.07 18), oklch(0.72 0.10 18))",
                    boxShadow: "0 2px 4px oklch(0 0 0 / 0.3)",
                    borderRadius: 2,
                  }}
                />
                {/* Wax seal */}
                <motion.div
                  className="wax-seal relative flex items-center justify-center text-amber-50"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{
                    scale: stage === "untying" ? [1, 1.08, 0.95] : stage === "sealed" ? 1 : 0,
                    opacity: stage === "sealed" || stage === "untying" ? 1 : 0,
                  }}
                  transition={{ duration: 0.9 }}
                  style={{ width: 64, height: 64, borderRadius: "9999px", fontFamily: "var(--font-script)" }}
                >
                  <span style={{ color: "oklch(0.95 0.12 85)", fontSize: 22 }}>♥</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Hint */}
            {stage === "sealed" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm"
                style={{ color: "oklch(0.85 0.04 70)" }}
              >
                <span className="handwritten text-lg">click to open</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Letter */}
      <AnimatePresence>
        {stage === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -1.5 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="paper paper-edge absolute rounded-sm"
            style={{
              width: 480,
              minHeight: 540,
              padding: "56px 56px 64px",
              boxShadow:
                "0 40px 80px oklch(0 0 0 / 0.55), 0 10px 30px oklch(0 0 0 / 0.4)",
            }}
          >
            <div className="gold-border absolute inset-3 rounded-sm pointer-events-none" />
            <div className="relative">
              <p className="handwritten text-2xl leading-relaxed">
                My dearest Smrithiii,
              </p>
              <p className="handwritten mt-6 text-xl leading-relaxed">
                I don’t know if words can fully explain how much you mean to me.

                But if there’s one thing I want you to always remember, it’s this:

                You became my comfort.
                You are important to me.
                Your happiness matters to me.

              </p>
              <p className="handwritten mt-6 text-xl leading-relaxed">
                I feel lucky to have you.
              And having you in my life means more than words can say.

              You are deeply loved.
              Happy Birthday, kuttaaa. ❤️
              </p>
              <p className="handwritten mt-8 text-right text-2xl" style={{ color: "oklch(0.55 0.12 25)" }}>
                — always yours
              </p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                onClick={() => {
                  setStage("done");
                  setTimeout(onComplete, 700);
                }}
                className="serif-display mx-auto mt-10 block rounded-full px-7 py-2 text-sm tracking-[0.3em] uppercase transition hover:scale-105"
                style={{
                  border: "1px solid oklch(0.78 0.13 85 / 0.7)",
                  color: "oklch(0.45 0.10 35)",
                  background: "oklch(0.96 0.02 80 / 0.7)",
                }}
              >
                Open the book
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
