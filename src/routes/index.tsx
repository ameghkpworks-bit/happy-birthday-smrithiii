import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Candle, Dust, FairyLights } from "@/components/Atmosphere";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";

const MemoryBook = lazy(() =>
  import("@/components/MemoryBook").then((m) => ({ default: m.MemoryBook })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Memory Book — Pages of Love" },
      {
        name: "description",
        content:
          "Open an envelope sealed with wax, untie a satin ribbon, and turn the pages of a cinematic, handcrafted memory book.",
      },
      { property: "og:title", content: "A Memory Book — Pages of Love" },
      {
        property: "og:description",
        content:
          "A romantic, candlelit memory book with realistic page-turn animations.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="atmosphere relative min-h-screen w-full overflow-hidden">
      <FairyLights />
      <Dust count={45} />

      {/* Candles */}
      <Candle style={{ left: "8%", bottom: "18%" }} />
      <Candle style={{ right: "10%", bottom: "22%" }} />
      <Candle style={{ left: "22%", bottom: "10%" }} />

      {/* Wood table */}
      <div className="wood-table absolute inset-x-0 bottom-0 h-[34%]" />

      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-12">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="intro"
              className="w-full max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8 } }}
              transition={{ duration: 1 }}
              style={{ height: "70vh" }}
            >
              <EnvelopeIntro onComplete={() => setOpened(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="book"
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-3xl"
            >
              <Suspense fallback={<div className="handwritten text-center text-2xl text-amber-100">opening…</div>}>
                <MemoryBook />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
