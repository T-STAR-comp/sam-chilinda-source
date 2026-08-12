export function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-8 md:px-12 md:py-10">
      <div className="flex flex-col justify-between gap-3 font-mono text-[9px] uppercase tracking-widest text-muted-foreground md:flex-row md:text-[10px]">
        <span>Samuel Chilinda · Oasis Tech Capital LLC</span>
        <span>© {new Date().getFullYear()} — All rights reserved.</span>
      </div>
    </footer>
  );
}
