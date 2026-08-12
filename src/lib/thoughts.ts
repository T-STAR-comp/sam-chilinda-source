import thoughtsData from "@/data/thoughts.json";

export type ThoughtPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string[];
};

export function getThoughts(): ThoughtPost[] {
  return [...thoughtsData.posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getThoughtBySlug(slug: string): ThoughtPost | undefined {
  return thoughtsData.posts.find((post) => post.slug === slug);
}

export function formatThoughtDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
