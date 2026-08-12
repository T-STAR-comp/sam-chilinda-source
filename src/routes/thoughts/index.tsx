import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ThoughtPill } from "@/components/thought-pill";
import { formatThoughtDate, getThoughts } from "@/lib/thoughts";

export const Route = createFileRoute("/thoughts/")({
  head: () => ({
    meta: [
      { title: "Thoughts — Samuel Chilinda" },
      {
        name: "description",
        content: "Ideas, notes, and half-formed thoughts from Samuel Chilinda.",
      },
      { property: "og:title", content: "Thoughts — Samuel Chilinda" },
      {
        property: "og:description",
        content: "Writing on business, design, building, and whatever else is on my mind.",
      },
    ],
  }),
  loader: () => getThoughts(),
  component: ThoughtsIndex,
});

function ThoughtsIndex() {
  const posts = Route.useLoaderData();

  return (
    <main className="noise min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="px-4 pb-24 pt-28 md:px-12 md:pb-32 md:pt-36">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">
              [ Thoughts ]
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[0.98] sm:text-5xl md:mt-6 md:text-7xl">
              Ideas worth <em>keeping</em>.
            </h1>
            <p className="mt-6 max-w-2xl text-sm text-muted-foreground md:text-base">
              Notes, drafts, and small essays — whatever is on my mind right now.
            </p>
          </motion.div>

          <div className="mt-14 space-y-4 md:mt-20">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to="/thoughts/$slug"
                  params={{ slug: post.slug }}
                  className="group block rounded-[1.75rem] border border-border bg-card/30 p-6 transition-all duration-300 hover:border-foreground/20 hover:bg-card/70 md:p-8"
                  data-hover
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <ThoughtPill>{formatThoughtDate(post.date)}</ThoughtPill>
                    {post.tags.map((tag) => (
                      <ThoughtPill key={tag}>{tag}</ThoughtPill>
                    ))}
                  </div>

                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <h2 className="font-display text-2xl leading-tight transition-transform duration-300 group-hover:translate-x-1 md:text-4xl">
                        {post.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                        {post.excerpt}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 opacity-40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
