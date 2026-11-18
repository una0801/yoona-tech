import Link from "next/link";
import { GithubIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container flex h-16 items-center justify-between text-sm text-muted-foreground max-sm:px-4">
        <p>© {new Date().getFullYear()} YOONA · Unademy</p>
        <FooterButtons />
      </div>
    </footer>
  );
}

export function FooterButtons() {
  return (
    <Link
      href="https://github.com/una0801"
      className="inline-flex min-h-10 items-center gap-1.5 rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <GithubIcon className="h-4 w-4" aria-hidden />
      GitHub
    </Link>
  );
}
