"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Boot, HandCoins, House, MapPin, NavigationArrow, Phone, Scissors, SealCheck, Storefront } from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { Reveal, Wrap, flipTheme, type Hours } from "@/components/kit";
import { Faq, HoursTable, MapFrame, useDark, useStatus } from "@/components/blocks";
import { T, useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TEL = "tel:+19722397194", PHONE = "(972) 239-7194";
const DIR = "https://www.google.com/maps/dir/?api=1&destination=17390+Preston+Rd+Ste+257+Dallas+TX+75252";
const HOURS: Hours = { 0: null, 1: [9, 18], 2: [9, 18], 3: [9, 18], 4: [9, 18], 5: [9, 18], 6: [9, 16] };
const RING = { en: "FAMILY OWNED · 20+ YEARS · PRESTON RD · ", es: "NEGOCIO FAMILIAR · MÁS DE 20 AÑOS · " };
const BOARDS = [{ k: "b1", Icon: Boot, items: ["s1", "s2", "s3", "s4"] }, { k: "b2", Icon: Scissors, items: ["s5", "s6", "s7", "s8"] }];
const PERKS = [["p1", HandCoins], ["p2", SealCheck], ["p3", House], ["p4", Storefront]] as const;

const btn = "inline-flex items-center justify-center gap-2.5 rounded-lg px-6 py-3.5 text-[15px] font-bold transition-[transform,background-color] duration-300 ease-spring hover:-translate-y-0.5 active:scale-[.97]";
const primary = cn(btn, "bg-btn text-btnfg shadow-[0_14px_30px_-16px_var(--shadow)]");
const ghost = cn(btn, "bg-card text-ink shadow-[inset_0_0_0_1px_var(--line)]");
const eyebrow = "mb-3 block text-xs font-extrabold tracking-[.2em] text-goldtext uppercase";

/** Language: a little neon sign that flickers to the other language. */
function Neon() {
  const { lang, setLang } = useLang();
  const es = lang === "es";
  return (
    <button type="button" onClick={() => setLang(es ? "en" : "es")} aria-label={es ? "Switch to English" : "Cambiar a español"}
      className="h-10 min-w-[66px] flex-none cursor-pointer rounded-lg border-2 border-[#3a2a1c] bg-[#140f0b] px-3 text-[15px] font-extrabold tracking-[.12em] text-[#ff5fa2] [text-shadow:0_0_4px_#ff5fa2,0_0_12px_#ff2d84]">
      <span key={lang} className="flick inline-block">{lang.toUpperCase()}</span>
    </button>
  );
}

/** Theme: a workshop bulb on a pull chain; tug it and the light comes on. */
function Bulb() {
  const { dark, setTheme } = useDark();
  const { lang } = useLang();
  const [tug, setTug] = useState(false);
  return (
    <button type="button" aria-label={lang === "es" ? "Cambiar modo oscuro" : "Toggle dark mode"} aria-pressed={dark}
      onClick={e => { setTug(true); setTimeout(() => setTug(false), 250); flipTheme(e.currentTarget, () => flushSync(() => setTheme(dark ? "light" : "dark"))); }}
      className="-mt-2.5 h-14 w-9 flex-none cursor-pointer">
      <svg viewBox="0 0 36 56" className="size-full overflow-visible" aria-hidden="true">
        <path d="M18 0v8" stroke="var(--soft)" strokeWidth="1.5" />
        <rect x="13" y="7" width="10" height="7" rx="1.5" fill="#8a7a5c" />
        <path d="M18 14c-8 0-11 6-11 11 0 4 3 6 5 9h12c2-3 5-5 5-9 0-5-3-11-11-11z" strokeWidth="1.2" stroke="#8f8a7e"
          className="transition-[fill,filter] duration-300" fill={dark ? "#ffd76a" : "#e9e4d8"} style={{ filter: dark ? "drop-shadow(0 0 8px rgba(255,215,106,.8))" : "none" }} />
        <rect x="13" y="34" width="10" height="4" rx="1" fill="#8a7a5c" />
        <motion.g animate={{ y: tug ? 5 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}>
          <path d="M27 18v24" stroke="#b69a5a" strokeWidth="1.4" strokeDasharray="2 1.5" /><circle cx="27" cy="44" r="2.4" fill="#c9a24a" />
        </motion.g>
      </svg>
    </button>
  );
}

/** The window emblem: the ring of lettering turns slowly, faster while you scroll. */
function Emblem() {
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const spin = gsap.to(".ring", { rotate: 360, svgOrigin: "150 150", duration: 40, ease: "none", repeat: -1 });
      ScrollTrigger.create({ onUpdate: s => spin.timeScale(1 + Math.min(Math.abs(s.getVelocity()) / 250, 8)) });
      gsap.from(".tool", { scale: 0.4, rotate: -30, opacity: 0, svgOrigin: "150 152", duration: 1.2, ease: "back.out(1.8)", delay: 0.4 });
    });
  }, { scope: ref });
  return (
    <div ref={ref} className="w-full max-w-[320px] justify-self-center" aria-hidden="true">
      <svg viewBox="0 0 300 300" className="block h-auto w-full">
        <defs><path id="ring" d="M150 150 m-112 0 a112 112 0 1 1 224 0 a112 112 0 1 1 -224 0" /></defs>
        <circle cx="150" cy="150" r="140" fill="none" stroke="#c9a24a" strokeWidth="2" />
        <circle cx="150" cy="150" r="90" fill="#16291f" stroke="#c9a24a" strokeWidth="2" />
        <g className="ring"><text fontFamily="var(--font-franklin)" fontWeight="800" fontSize="17" letterSpacing="5" fill="#d4ad52"><textPath href="#ring">{RING[lang === "es" ? "es" : "en"]}</textPath></text></g>
        <g className="tool" transform="translate(150 152)">
          <path d="M-42 20c0-26 10-46 22-56l18 4c-4 14-4 28 6 40l40 4c8 1 10 10 2 12-30 6-58 6-88-4z" fill="#d4ad52" />
          <path d="M-30 -48l40 40" stroke="#efeadf" strokeWidth="6" strokeLinecap="round" />
          <rect x="-46" y="-62" width="34" height="14" rx="3" transform="rotate(45 -29 -55)" fill="#efeadf" />
        </g>
      </svg>
    </div>
  );
}

export default function Home() {
  const t = useT();
  const status = useStatus(HOURS);

  return (
    <>
      <header className="pointer-events-none sticky top-3 z-40 px-4">
        <nav className="glass pointer-events-auto mx-auto flex h-[72px] max-w-[1160px] items-center justify-between gap-3 rounded-2xl border border-line ps-3 pe-3 shadow-[inset_0_1px_0_var(--hi),0_20px_50px_-28px_var(--shadow)]">
          <a href="#top" className="flex flex-none items-center gap-2.5" aria-label="Dino's Shoe Repair & Alterations">
            <span className="grid size-11 place-items-center rounded-xl bg-door shadow-[inset_0_0_0_1.5px_#c9a24a]"><span className="leaf font-display text-[26px] leading-none">D</span></span>
            <span><b className="block font-display text-[24px] leading-none font-normal">Dino&apos;s</b><T k="logoSub" className="mt-0.5 block text-xs font-semibold text-soft max-sm:hidden" /></span>
          </a>
          <div className="flex items-center gap-1 text-[15px] font-semibold max-[900px]:hidden">
            {[["services", "navServices"], ["visit", "navVisit"]].map(([id, k]) => <a key={id} href={`#${id}`} className="rounded-lg px-4 py-2 text-soft transition-colors hover:bg-bg2 hover:text-ink" dangerouslySetInnerHTML={{ __html: t(k) }} />)}
          </div>
          <div className="flex items-center gap-3">
            <Neon /><Bulb />
            <a href={TEL} className={cn(primary, "px-5 py-2.5 max-sm:hidden")}><Phone size={17} weight="bold" />{PHONE}</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="pt-10 pb-20">
          <Wrap>
            <Reveal className="rounded-[26px] bg-wood p-2.5 shadow-[0_50px_100px_-50px_var(--shadow)]">
              <div className="window sheen relative grid grid-cols-[1.2fr_.8fr] items-center gap-10 overflow-hidden rounded-[18px] px-14 pt-14 pb-12 text-[#efeadf] max-[900px]:grid-cols-1 max-sm:px-6 max-sm:pt-10">
                <div>
                  <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/25 px-3.5 py-1.5 text-sm font-semibold">
                    <i className={cn("size-2 rounded-full", status.open ? "bg-[#4ad07f] shadow-[0_0_0_4px_rgba(74,208,127,.25)]" : "bg-[#8d958c]")} />{status.text || " "}
                  </span>
                  <h1 className="leaf mb-2 text-[clamp(64px,9vw,132px)] leading-none">Dino&apos;s</h1>
                  <T k="sub" className="mb-6 block font-display text-[clamp(18px,2.2vw,28px)] tracking-[.06em] text-brass" />
                  <T k="heroLead" as="p" className="mb-8 max-w-[48ch] text-lg text-[#c8d0c7]" />
                  <div className="flex flex-wrap gap-3">
                    <a href={TEL} className={cn(btn, "bg-brass text-[#14110a]")}><Phone size={18} weight="bold" /><T k="ctaCall" /></a>
                    <a href={DIR} target="_blank" rel="noopener" className={cn(btn, "text-[#efeadf] shadow-[inset_0_0_0_1px_rgba(239,234,223,.4)]")}><NavigationArrow size={18} weight="bold" /><T k="ctaDir" /></a>
                  </div>
                </div>
                <Emblem />
              </div>
            </Reveal>
          </Wrap>
        </section>

        <section id="services" className="scroll-mt-24 bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-14 max-w-[720px]"><T k="svcEyebrow" className={eyebrow} /><T k="svcTitle" as="h2" className="mb-4 text-[clamp(42px,5.4vw,72px)]" /><T k="svcLead" as="p" className="max-w-[56ch] text-[17px] text-soft" /></Reveal>
            <div className="grid grid-cols-2 gap-5 max-[860px]:grid-cols-1">
              {BOARDS.map(({ k, Icon, items }, bi) => (
                <Reveal key={k} delay={bi * 0.1} className="rounded-[24px] bg-card p-1.5 shadow-[inset_0_0_0_1px_var(--line)]">
                  <MagicCard gradientSize={280} gradientColor="rgba(212,173,82,.12)" gradientFrom="#d4ad52" gradientTo="#1f3a2e" className="h-full rounded-[19px] [&>div:last-child]:h-full">
                    <div className="h-full p-9 max-sm:p-6">
                      <h3 className="mb-4 flex items-center gap-3.5 text-[30px]"><span className="grid size-12 flex-none place-items-center rounded-full bg-door text-brass"><Icon size={24} weight="duotone" /></span><T k={k} /></h3>
                      <ul>
                        {items.map(s => (
                          <li key={s} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-3 border-b border-dotted border-line py-4 last:border-b-0">
                            <T k={s} as="b" className="text-[17px] font-bold transition-colors group-hover:text-goldtext" />
                            <span className="h-px w-8 translate-y-[-4px] self-center border-t border-dashed border-goldtext/50 transition-all duration-500 group-hover:w-14" />
                            <T k={`${s}d`} as="i" className="col-span-2 text-[14.5px] text-soft not-italic" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </MagicCard>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12 max-w-[720px]"><T k="whyEyebrow" className={eyebrow} /><T k="whyTitle" as="h2" className="text-[clamp(42px,5.4vw,72px)]" /></Reveal>
            <Reveal className="relative grid grid-cols-4 overflow-hidden rounded-[24px] bg-door text-[#efeadf] shadow-[inset_0_0_0_2px_#c9a24a] max-[960px]:grid-cols-2 max-sm:grid-cols-1">
              <BorderBeam size={220} duration={12} colorFrom="#f7e3a1" colorTo="#9c7424" borderWidth={2} />
              {PERKS.map(([k, Icon], i) => (
                <div key={k} className={cn("p-8", i > 0 && "border-s border-[#c9a24a]/25 max-sm:border-s-0 max-sm:border-t")}>
                  <Icon size={30} weight="duotone" className="mb-7 text-brass" />
                  <T k={`${k}t`} as="h3" className="mb-2 text-[24px] text-brass" />
                  <T k={`${k}p`} as="p" className="text-[15px] text-[#c8d0c7]" />
                </div>
              ))}
            </Reveal>
          </Wrap>
        </section>

        <section id="visit" className="scroll-mt-24 bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12"><T k="visitEyebrow" className={eyebrow} /><T k="visitTitle" as="h2" className="text-[clamp(42px,5.4vw,72px)]" /></Reveal>
            <div className="grid grid-cols-[.9fr_1.1fr] gap-5 max-[960px]:grid-cols-1">
              <Reveal className="grid content-start gap-5 rounded-[24px] bg-card p-8 shadow-[inset_0_0_0_1px_var(--line)]">
                <T k="hoursTitle" as="h3" className="text-[32px]" />
                <HoursTable hours={HOURS} accent="text-goldtext font-bold" />
                {([[TEL, Phone, PHONE, "callSub"], [DIR, MapPin, "17390 Preston Rd, Ste 257", null]] as const).map(([href, I, strong, sub]) => (
                  <a key={strong} href={href} target={sub ? undefined : "_blank"} rel="noopener" className="group flex items-start gap-3.5">
                    <span className="grid size-11 flex-none place-items-center rounded-xl bg-door text-brass transition-transform duration-300 ease-spring group-hover:scale-110"><I size={20} weight="bold" /></span>
                    <span><strong className="block">{strong}</strong>{sub ? <T k={sub} className="text-sm text-soft" /> : <span className="text-sm text-soft">Dallas, TX 75252</span>}</span>
                  </a>
                ))}
              </Reveal>
              <Reveal delay={0.08} className="min-h-[440px] overflow-hidden rounded-[24px] shadow-[inset_0_0_0_1px_var(--line)]"><MapFrame q="17390+Preston+Rd+Ste+257,+Dallas,+TX+75252" className="min-h-[440px]" /></Reveal>
            </div>
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap className="grid grid-cols-[.8fr_1.2fr] gap-14 max-[960px]:grid-cols-1">
            <Reveal><T k="faqEyebrow" className={eyebrow} /><T k="faqTitle" as="h2" className="text-[clamp(42px,5.4vw,72px)]" /></Reveal>
            <Faq ids={[1, 2, 3]} accent="text-goldtext" item="rounded-xl bg-card shadow-[inset_0_0_0_1px_var(--line)]" />
          </Wrap>
        </section>

        <section className="pb-32 max-sm:pb-20">
          <Wrap>
            <Reveal className="rounded-[26px] bg-wood p-2.5">
              <div className="window sheen relative flex items-center justify-between gap-8 overflow-hidden rounded-[18px] px-14 py-20 max-[960px]:flex-col max-[960px]:items-start max-sm:px-7 max-sm:py-14">
                <div><T k="ctaTitle" as="h2" className="leaf mb-3 text-[clamp(44px,6vw,84px)]" /><T k="ctaLead" as="p" className="text-lg text-[#c8d0c7]" /></div>
                <a href={TEL} className={cn(btn, "flex-none bg-brass px-8 py-4 text-lg text-[#14110a]")}><Phone size={20} weight="bold" />{PHONE}</a>
              </div>
            </Reveal>
          </Wrap>
        </section>
      </main>

      <footer className="pb-28 text-sm text-soft">
        <Wrap><div className="flex flex-wrap justify-between gap-3.5 border-t border-line pt-6"><span>© {new Date().getFullYear()} Dino&apos;s Shoe Repair &amp; Alterations · 17390 Preston Rd, Ste 257, Dallas, TX 75252</span><a href={TEL}>{PHONE}</a></div></Wrap>
      </footer>
      <div className="glass fixed inset-x-3 bottom-3 z-30 hidden gap-2 rounded-2xl p-1.5 shadow-[inset_0_0_0_1px_var(--line)] max-sm:flex">
        <a href={TEL} className={cn(primary, "flex-1 py-3")}><T k="barCall" /></a>
        <a href={DIR} target="_blank" rel="noopener" className={cn(ghost, "flex-1 py-3")}><T k="barDir" /></a>
      </div>
    </>
  );
}
