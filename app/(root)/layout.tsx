import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

import { isAuthenticated } from "@/lib/actions/auth.action";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="COACH-ME-AI Logo"
            width={48}
            height={40}
          />
          <h2 className="text-primary-100">COACH-ME-AI</h2>
        </Link>

        <div className="flex items-center gap-3">
          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="rounded-full bg-dark-300 hover:bg-primary-200/20 cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-5 w-5 text-primary-200" />
            </Button>
          </form>
          <ThemeToggle />
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
