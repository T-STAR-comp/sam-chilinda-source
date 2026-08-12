import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ThoughtPill } from "@/components/thought-pill";
import { formatThoughtDate, getThoughtBySlug } from "@/lib/thoughts";

export const Route = createFileRoute("/thoughts/$slug")({
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} — Samuel Chilinda` },
      { name: "description", content: loaderData.excerpt },
      { property: "og:title", content: `${loaderData.title} — Samuel Chilinda` },
      { property: "og:description", content: loaderData.excerpt },
    ],
  }),
  loader: ({ params }) => {
    const post = getThoughtBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: ThoughtDetail,
});

function ThoughtDetail() {
  const post = Route.useLoaderData();

  return (
    <main className="noise min-h-screen bg-background text-foreground">
      <SiteNav />
      <article className="px-4 pb-24 pt-28 md:px-12 md:pb-32 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/thoughts"
              className="group inline-flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              All thoughts
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-2">
              <ThoughtPill>{formatThoughtDate(post.date)}</ThoughtPill>
              {post.tags.map((tag) => (
                <ThoughtPill key={tag}>{tag}</ThoughtPill>
              ))}
            </div>

            <h1 className="mt-8 font-display text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 space-y-6 rounded-[2rem] border border-border bg-card/20 p-6 md:mt-16 md:p-10"
          >
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-relaxed text-foreground/90 md:text-lg">
                {paragraph}
              </p>
            ))}
          </motion.div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
