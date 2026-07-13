'use client'
import Link from "next/link";
import { buttonVariants, Card, Chip } from "@heroui/react";
import { ClipboardList, Trophy, Share2, LineChart, ShieldCheck, NotebookPen } from "lucide-react";

const steps = [
  {
    icon: NotebookPen,
    title: "1 · Predict",
    text: "Before kickoff, write your pick, your confidence, and most importantly your reasoning.",
  },
  {
    icon: ClipboardList,
    title: "2 · Record",
    text: "After the final whistle, log whether your call was right and what actually happened.",
  },
  {
    icon: LineChart,
    title: "3 · Reflect",
    text: "Reread your reasoning. Spot the bias, keep what worked, and sharpen your next analysis.",
  },
  {
    icon: Trophy,
    title: "4 · Earn points",
    text: "Correct picks earn points toward the leaderboard. Bragging rights, no bankroll required.",
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "No betting. Just football logic.",
    text: "Built to replace the bet slip with an analysis journal. The thrill of being right, without losing money.",
  },
  {
    icon: NotebookPen,
    title: "Works before you sign up",
    text: "Notes save to your device instantly. Create an account later and everything syncs to your profile.",
  },
  {
    icon: Share2,
    title: "Share clean match cards",
    text: "Copy formatted notes for Telegram or Substack, or export a polished image card in one tap.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-pitch-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, #4c9f74 0%, transparent 60%)" }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <Chip className="mb-6 bg-pitch-800 text-pitch-200">⚽ Football analysis journal</Chip>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Stop betting.
            <br />
            <span className="text-pitch-300">Start proving you can read the game.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-pitch-100/80 sm:text-lg">
            Write your prediction and reasoning before kickoff, record the result after, and earn
            leaderboard points when you call it right. All the conviction, none of the losses.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/notes"
              className={buttonVariants({ size: "lg", className: "bg-white text-pitch-900 hover:bg-pitch-50" })}
            >
              Start your first note
            </Link>
            <Link
              href="/app"
              className={buttonVariants({ variant: "ghost", size: "lg", className: "text-pitch-100 hover:bg-pitch-800 hover:text-white" })}
            >
              Open the app
            </Link>
          </div>
          <p className="mt-4 text-xs text-pitch-100/50">Free · No account needed to start</p>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">How it works</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted">
          A simple loop that turns gut feeling into a track record.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.title} className="p-6">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pitch-50 text-pitch-600">
                <step.icon size={20} />
              </div>
              <Card.Title className="text-sm font-bold">{step.title}</Card.Title>
              <Card.Description className="mt-1.5 text-sm leading-relaxed">{step.text}</Card.Description>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title}>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pitch-50 text-pitch-600">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-base font-bold text-ink">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Your next match starts a streak</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted">
          One note per match is all it takes. Your future self and the leaderboard will thank you.
        </p>
        <Link href="/notes" className={buttonVariants({ size: "lg", className: "mt-7" })}>
          Create a match note
        </Link>
      </section>
    </div>
  );
}
