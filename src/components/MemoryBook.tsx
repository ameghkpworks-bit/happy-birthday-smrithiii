import { forwardRef, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Petals, Sparkles } from "./Atmosphere";
const imagePath = (name: string) =>
  `${import.meta.env.BASE_URL}images/${name}`;

const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; tone?: string }>(
  ({ children, tone }, ref) => (
    <div ref={ref} className="flipbook-page paper paper-edge" data-density="hard">
      <div className="relative h-full w-full p-10" style={{ background: tone }}>
        {children}
      </div>
    </div>
  ),
);
Page.displayName = "Page";

const Cover = forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
  <div ref={ref} data-density="hard">
    <div
      className="relative h-full w-full"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.45 0.08 25), oklch(0.30 0.06 25))",
        boxShadow: "inset 0 0 80px oklch(0 0 0 / 0.5)",
      }}
    >
      <div
        className="absolute inset-4 rounded-sm"
        style={{
          border: "1px solid oklch(0.78 0.13 85 / 0.6)",
          boxShadow: "inset 0 0 0 4px oklch(0.30 0.06 25), inset 0 0 0 5px oklch(0.78 0.13 85 / 0.5)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center px-10 text-center">
        {children}
      </div>
    </div>
  </div>
));
Cover.displayName = "Cover";

function PolaroidFrame({
  rotate = -3,
  caption,
  image,
  className = "",
}: {
  rotate?: number;
  caption: string;
  image: string;
  className?: string;
  gradient?: string;
}) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        background: "oklch(0.98 0.01 80)",
        padding: "10px 10px 36px",
        boxShadow:
          "0 14px 30px oklch(0 0 0 / 0.25), 0 4px 8px oklch(0 0 0 / 0.18)",
      }}
    >
      <img
        src={image}
        alt={caption}
        style={{
          width: 150,
          height: 150,
          objectFit: "cover",
          borderRadius: 2,
        }}
      />

      <div
        className="handwritten mt-1 text-center text-sm"
        style={{ color: "oklch(0.45 0.06 35)" }}
      >
        {caption}
      </div>
    </div>
  );
}

function WashiTape({ className = "", rotate = 0, color = "oklch(0.85 0.06 145 / 0.85)" }) {
  return (
    <div
      className={`absolute ${className}`}
      style={{
        width: 90,
        height: 22,
        background: `repeating-linear-gradient(45deg, ${color} 0 6px, oklch(0.92 0.04 145 / 0.7) 6px 12px)`,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 2px 4px oklch(0 0 0 / 0.15)",
      }}
    />
  );
}

function CornerOrnament({ corner }: { corner: "tl" | "tr" | "bl" | "br" }) {
  const flips: Record<string, string> = {
    tl: "rotate(0)",
    tr: "scaleX(-1)",
    bl: "scaleY(-1)",
    br: "scale(-1,-1)",
  };
  const pos: Record<string, React.CSSProperties> = {
    tl: { top: 12, left: 12 },
    tr: { top: 12, right: 12 },
    bl: { bottom: 12, left: 12 },
    br: { bottom: 12, right: 12 },
  };
  return (
    <svg width="70" height="70" viewBox="0 0 70 70" style={{ position: "absolute", ...pos[corner], transform: flips[corner], opacity: 0.7 }}>
      <g fill="none" stroke="oklch(0.78 0.13 85)" strokeWidth="1.1">
        <path d="M2 10 Q 18 4, 30 12 T 60 14" />
        <circle cx="14" cy="14" r="2.5" />
        <path d="M8 20 q 8 -6 16 -2 t 14 6" />
        <path d="M4 28 q 10 0 16 6" />
      </g>
      <g fill="oklch(0.83 0.06 18 / 0.85)">
        <circle cx="24" cy="6" r="3" />
        <circle cx="40" cy="12" r="2.5" />
        <circle cx="10" cy="22" r="2" />
      </g>
    </svg>
  );
}

function Butterflies() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { left: "15%", top: "20%", delay: "0s", dur: "9s", scale: 1 },
        { left: "70%", top: "60%", delay: "2s", dur: "11s", scale: 0.7 },
        { left: "45%", top: "40%", delay: "4s", dur: "10s", scale: 0.9 },
      ].map((b, i) => (
        <svg
          key={i}
          className="butterfly"
          width="32"
          height="28"
          viewBox="0 0 32 28"
          style={{
            left: b.left,
            top: b.top,
            animationDelay: b.delay,
            animationDuration: b.dur,
            transform: `scale(${b.scale})`,
          }}
        >
          <path d="M16 14 C 8 4, 0 6, 4 14 C 0 22, 10 24, 16 14 Z" fill="oklch(0.80 0.08 305 / 0.85)" />
          <path d="M16 14 C 24 4, 32 6, 28 14 C 32 22, 22 24, 16 14 Z" fill="oklch(0.85 0.07 18 / 0.85)" />
          <line x1="16" y1="6" x2="16" y2="22" stroke="oklch(0.35 0.04 30)" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}

export function MemoryBook() {
  const bookRef = useRef<any>(null);
  const [page, setPage] = useState(0);

  return (
    <div className="relative">
      {/* Overlays react to page */}
      <div className="pointer-events-none absolute inset-0 z-30">
        {page >= 2 && page <= 4 && <Petals count={10} />}
        <Sparkles count={10} />
      </div>

      <HTMLFlipBook
        ref={bookRef}
        width={480}
        height={680}
        size="stretch"
        minWidth={280}
        maxWidth={600}
        minHeight={400}
        maxHeight={780}
        maxShadowOpacity={0.8}
        showCover={true}
        mobileScrollSupport={true}
        drawShadow={true}
        flippingTime={1400}
        usePortrait={false}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        swipeDistance={20}
        showPageCorners={true}
        disableFlipByClick={false}
        startPage={0}
        style={{}}
        className=""
        onFlip={(e: any) => setPage(e.data)}
      >
        {/* Front cover */}
        <Cover>
          <p
            className="serif-display text-xs tracking-[0.5em] uppercase"
            style={{ color: "oklch(0.78 0.13 85)" }}
          >
            A Collection of
          </p>
          <h1
            className="serif-display mt-4 text-5xl italic leading-tight"
            style={{ color: "oklch(0.92 0.04 80)" }}
          >
            Our Little
            <br />
            Forevers
          </h1>
          <div className="mt-8 h-px w-24" style={{ background: "oklch(0.78 0.13 85 / 0.6)" }} />
          <p
            className="handwritten mt-6 text-xl"
            style={{ color: "oklch(0.85 0.05 80)" }}
          >
            for you, my love
          </p>
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-[0.4em] uppercase"
            style={{ color: "oklch(0.70 0.05 80)" }}
          >
            ✦  M E M O R Y   B O O K  ✦
          </div>
        </Cover>

        {/* Inside flyleaf */}
        <Page>
          <CornerOrnament corner="tl" />
          <CornerOrnament corner="br" />
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="serif-display text-sm tracking-[0.4em] uppercase" style={{ color: "oklch(0.55 0.08 35)" }}>
              The one I love
            </p>
            <p className="handwritten mt-6 text-5xl" style={{ color: "oklch(0.45 0.12 25)" }}>
              My 11:11 wish
            </p>
            <div className="mt-10 h-px w-32" style={{ background: "oklch(0.78 0.13 85 / 0.7)" }} />
            <p className="serif-display mt-6 italic" style={{ color: "oklch(0.50 0.05 35)" }}>
              "the best part of my story, Happy Birthday to the one who owns my heart"
            </p>
          </div>
        </Page>

        {/* Dedication / opening note */}
        <Page>
          <CornerOrnament corner="tr" />
          <div className="flex h-full flex-col justify-center px-6">
            <h2 className="serif-display text-3xl italic" style={{ color: "oklch(0.45 0.10 25)" }}>
              Chapter I
            </h2>
            <p className="serif-display mt-1 text-xs tracking-[0.4em] uppercase" style={{ color: "oklch(0.55 0.05 35)" }}>
              Always You
            </p>
            <div className="mt-6 h-px w-20" style={{ background: "oklch(0.78 0.13 85)" }} />
            <p className="handwritten mt-8 text-2xl leading-relaxed">
              I found forever the day I found you. Life waited, time tested and every path led me back to you, and I'd choose you in every lifetime. Infinity isn't enough to hold all the love I have for you, Smrithiii. ❤️
            </p>
            {/* <p className="serif-display mt-6 text-base italic leading-relaxed" style={{ color: "oklch(0.45 0.05 35)" }}>
              You wore that soft yellow sweater. The cafe smelled of cinnamon
              and old books, and I knew before I knew.
            </p> */}
          </div>
        </Page>

        {/* Polaroids + washi page */}
        <Page tone="linear-gradient(180deg, oklch(0.97 0.015 80), oklch(0.94 0.025 60))">
          <CornerOrnament corner="tl" />
          <CornerOrnament corner="br" />
          <WashiTape className="left-10 top-6" rotate={-8} />
          <WashiTape className="right-12 top-12" rotate={12} color="oklch(0.85 0.07 18 / 0.85)" />

          <h2 className="handwritten text-3xl" style={{ color: "oklch(0.45 0.10 25)" }}>
            sunday afternoons
          </h2>
          <p className="serif-display mt-1 text-xs tracking-[0.4em] uppercase" style={{ color: "oklch(0.55 0.05 35)" }}>
            golden hour, every week
          </p>

          <PolaroidFrame
            className="left-6 top-32"
            rotate={-6}
            caption="your favourite"
            gradient="linear-gradient(135deg, oklch(0.85 0.08 80), oklch(0.78 0.10 60))"
            image={imagePath("pic1.jpg")}
          />
          <PolaroidFrame
            className="right-4 top-48"
            rotate={5}
            caption="my favourite"
            gradient="linear-gradient(135deg, oklch(0.83 0.07 18), oklch(0.72 0.10 18))"
            image={imagePath("pic2.jpg")}
          />
          <PolaroidFrame
            className="left-16 bottom-8"
            rotate={2}
            caption="our quiet morning"
            gradient="linear-gradient(135deg, oklch(0.82 0.05 145), oklch(0.68 0.06 145))"
            image={imagePath("pic3.jpg")}
          />

          {/* tiny doodle arrow */}
          <svg className="absolute right-14 bottom-32" width="80" height="50" viewBox="0 0 80 50">
            <path d="M2 40 Q 30 5, 70 30" stroke="oklch(0.45 0.08 25)" strokeWidth="1.5" fill="none" />
            <path d="M62 24 L70 30 L60 34" stroke="oklch(0.45 0.08 25)" strokeWidth="1.5" fill="none" />
            <text x="6" y="48" className="handwritten" style={{ fontSize: 14, fill: "oklch(0.45 0.08 25)", fontFamily: "var(--font-script)" }}>
              still my favorite
            </text>
          </svg>
        </Page>

        {/* Pressed flowers + letter */}
        <Page>
          <CornerOrnament corner="tl" />
          <CornerOrnament corner="tr" />
          <CornerOrnament corner="bl" />
          <CornerOrnament corner="br" />
          <div className="flex h-full flex-col justify-between">
            <div>
              <h2 className="serif-display text-3xl italic" style={{ color: "oklch(0.45 0.10 25)" }}>
                Chapter II
              </h2>
              <p className="serif-display mt-1 text-xs tracking-[0.4em] uppercase" style={{ color: "oklch(0.55 0.05 35)" }}>
                pressed between the pages
              </p>
            </div>

            <div className="relative my-4 flex flex-1 items-center justify-center">
              {/* pressed flower */}
              <svg width="220" height="220" viewBox="0 0 100 100">
                <g transform="translate(50 50)">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ellipse
                      key={i}
                      rx="10"
                      ry="22"
                      fill="oklch(0.82 0.08 18 / 0.85)"
                      transform={`rotate(${i * 45}) translate(0 -16)`}
                    />
                  ))}
                  <circle r="9" fill="oklch(0.85 0.14 85)" />
                </g>
                <g stroke="oklch(0.55 0.08 145)" strokeWidth="1.2" fill="none">
                  <path d="M50 78 Q 55 90, 48 99" />
                  <path d="M52 85 Q 60 84, 64 90" />
                  <path d="M48 88 Q 40 88, 36 94" />
                </g>
              </svg>
            </div>

            <p className="handwritten text-center text-2xl leading-relaxed" style={{ color: "oklch(0.45 0.10 25)" }}>
              The world is full of flowers, but only one became my forever—Smrithiii.
            </p>
            <p className="serif-display mt-3 text-center text-xs tracking-[0.4em] uppercase" style={{ color: "oklch(0.55 0.05 35)" }}>
              Every petal whispers your name, Smrithiii.
            </p>
          </div>
        </Page>


        {/* Extra Polaroids + Washi Page */}
<Page tone="linear-gradient(180deg, oklch(0.97 0.015 80), oklch(0.94 0.025 60))">
  <CornerOrnament corner="tl" />
  <CornerOrnament corner="br" />

  <WashiTape className="left-10 top-6" rotate={-8} />
  <WashiTape
    className="right-12 top-12"
    rotate={12}
    color="oklch(0.85 0.07 18 / 0.85)"
  />

  <h2
    className="handwritten text-3xl"
    style={{ color: "oklch(0.45 0.10 25)" }}
  >
    our little moments
  </h2>

  <p
    className="serif-display mt-1 text-xs tracking-[0.4em] uppercase"
    style={{ color: "oklch(0.55 0.05 35)" }}
  >
    memories i'll keep forever
  </p>

  <PolaroidFrame
    className="left-6 top-32"
    rotate={-4}
    caption="your beautiful smile"
    image={imagePath("pic4.jpg")}
  />

  <PolaroidFrame
    className="right-4 top-48"
    rotate={6}
    caption="my favorite person"
    image={imagePath("pic5.jpg")}
  />

  <PolaroidFrame
    className="left-16 bottom-8"
    rotate={2}
    caption="always us"
    image={imagePath("pic6.jpg")}
  />

  <svg
    className="absolute right-14 bottom-32"
    width="80"
    height="50"
    viewBox="0 0 80 50"
  >
    <path
      d="M2 40 Q 30 5, 70 30"
      stroke="oklch(0.45 0.08 25)"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M62 24 L70 30 L60 34"
      stroke="oklch(0.45 0.08 25)"
      strokeWidth="1.5"
      fill="none"
    />
    <text
      x="6"
      y="48"
      className="handwritten"
      style={{
        fontSize: 14,
        fill: "oklch(0.45 0.08 25)",
        fontFamily: "var(--font-script)",
      }}
    >
      forever my favorite
    </text>
  </svg>
</Page>



        {/* Butterflies / stars */}
        <Page tone="linear-gradient(180deg, oklch(0.95 0.02 305), oklch(0.93 0.02 80))">
          <Butterflies />
          <CornerOrnament corner="tl" />
          <CornerOrnament corner="br" />
          <div className="relative flex h-full flex-col items-center justify-center text-center">
            <p className="serif-display text-xs tracking-[0.5em] uppercase" style={{ color: "oklch(0.55 0.05 305)" }}>
              a wish
            </p>
            <h2 className="handwritten mt-4 text-5xl leading-tight" style={{ color: "oklch(0.45 0.12 305)" }}>
              may every ordinary day
              <br />
              feel like this one.
            </h2>
            <div className="mt-8 flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "oklch(0.78 0.13 85)" }}>✦</span>
              ))}
            </div>
          </div>
        </Page>

        {/* Closing page */}
        <Page>
          <CornerOrnament corner="tl" />
          <CornerOrnament corner="tr" />
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="serif-display text-xs tracking-[0.5em] uppercase" style={{ color: "oklch(0.55 0.05 35)" }}>
              to be continued
            </p>
            <h2 className="serif-display mt-6 text-4xl italic" style={{ color: "oklch(0.45 0.10 25)" }}>
              the rest of the story
              <br />
              is still ours to write.
            </h2>
            <div className="mt-8 h-px w-28" style={{ background: "oklch(0.78 0.13 85 / 0.7)" }} />
            <p className="handwritten mt-8 text-3xl" style={{ color: "oklch(0.55 0.12 25)" }}>
              with all my love and care,again Happy Birthday, Smrithiii. ❤️
            </p>
            <p className="handwritten mt-2 text-2xl" style={{ color: "oklch(0.55 0.12 25)" }}>
              — me
            </p>
          </div>
        </Page>

        {/* Back cover */}
        <Cover>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ color: "oklch(0.78 0.13 85)" }}
          >
            <p className="serif-display text-base tracking-[0.5em] uppercase">11:11 ∞</p>
          </div>
        </Cover>
      </HTMLFlipBook>

      <div className="mt-6 flex items-center justify-center gap-4 text-xs tracking-[0.3em] uppercase" style={{ color: "oklch(0.78 0.05 70)" }}>
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
          className="serif-display rounded-full border px-4 py-1.5 transition hover:scale-105"
          style={{ borderColor: "oklch(0.78 0.13 85 / 0.5)" }}
        >
          ← prev
        </button>
        <span className="handwritten text-base" style={{ color: "oklch(0.85 0.05 70)" }}>
          turn slowly
        </span>
        <button
          onClick={() => bookRef.current?.pageFlip()?.flipNext()}
          className="serif-display rounded-full border px-4 py-1.5 transition hover:scale-105"
          style={{ borderColor: "oklch(0.78 0.13 85 / 0.5)" }}
        >
          next →
        </button>
      </div>
    </div>
  );
}
