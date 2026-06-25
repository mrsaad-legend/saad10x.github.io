import Link from "next/link";
import { ShieldX, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="grid h-20 w-20 place-items-center rounded-3xl bg-cyber-danger/10 shadow-neon-danger">
        <ShieldX className="h-10 w-10 text-cyber-danger" />
      </span>
      <h1 className="mt-6 text-5xl font-extrabold gradient-text">404</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        This page could not be found. It may have been moved, deleted, or never
        existed.
      </p>
      <Link href="/" className="mt-8">
        <Button>
          <Home /> Back to home
        </Button>
      </Link>
    </div>
  );
}
