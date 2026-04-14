import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

const signInLanes = [
  {
    title: "Admin access first",
    body: "Use this screen as the future home for the first admin login without changing the public header route.",
  },
  {
    title: "Multi-admin later",
    body: "Invite-based roles can be added later once the first stable admin workflow is in place.",
  },
  {
    title: "Git-based contribution",
    body: "Public contribution stays GitHub-first while direct feedback continues through email.",
  },
];

export default function LoginPage() {
  return (
    <section className="page-shell py-16 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        <div className="card-surface overflow-hidden p-8 sm:p-10">
          <p className="section-eyebrow">Login</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Admin-ready access screen with room for future roles
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--foreground-soft)] sm:text-lg">
            This patch upgrades the login route from a placeholder into a real entry screen. It still stays dependency-free so the auth provider can be attached later without changing the URL or layout contract.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {signInLanes.map((lane) => (
              <article key={lane.title} className="surface-muted p-5">
                <h2 className="text-lg font-semibold">{lane.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--foreground-soft)]">{lane.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/admin" className="btn-primary">
              Open admin shell
            </Link>
            <a href={siteConfig.githubRepoUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              GitHub repo
            </a>
            <a href={siteConfig.feedbackEmailHref} className="btn-secondary">
              Email feedback
            </a>
          </div>
        </div>

        <div className="card-surface p-8 sm:p-10">
          <p className="section-eyebrow">Auth handoff</p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Reserved for real auth provider wiring
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--foreground-soft)] sm:text-base">
            Use this area later for Supabase Auth, GitHub sign-in, email magic link, or your preferred admin gate. For now it clearly shows where authentication will land without introducing any provider lock-in yet.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-dashed border-[color:var(--card-border)] bg-[var(--card-strong)] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground-soft)]">
              Planned inputs
            </p>
            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm text-[var(--foreground-soft)]">
                Admin email or username
              </div>
              <div className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm text-[var(--foreground-soft)]">
                Password or magic-link action
              </div>
              <div className="rounded-2xl border border-[color:var(--card-border)] bg-[var(--background-elevated)] px-4 py-3 text-sm text-[var(--foreground-soft)]">
                Optional role-based invite controls later
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
