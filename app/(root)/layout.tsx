import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "../../components/logout-button";

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
            width={50}
            height={42}
            className="mr-1"
          />
          <h2 className="text-primary-100">COACH-ME-AI</h2>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
