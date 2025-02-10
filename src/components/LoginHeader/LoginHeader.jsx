"use client";
import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LoginHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 px-6 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <Link href="/">
          <span className="text-xl font-bold text-purple-600">
            Jeddah Traders
          </span>
          <br />
          <span className="text-zinc-800 text-sm">General Order Supplier</span>
        </Link>

        {/* Desktop Navigation
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/features"
            className="text-sm font-medium text-muted-foreground hover:text-purple-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-purple-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-purple-600 transition-colors"
          >
            About
          </Link>
          <Link
            href="/customers"
            className="text-sm font-medium text-muted-foreground hover:text-purple-600 transition-colors"
          >
            Customers
          </Link>
        </nav> */}

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            asChild
            className="bg-purple-600 flex text-white hover:bg-purple-700"
          >
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button
            asChild
            className="bg-purple-600 flex text-white hover:bg-purple-700"
          >
            <Link href={"/register"}>Register Customer</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-purple-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <nav className="bg-zinc-100 z-50 py-4 space-y-4">
              <div className="border-t pt-4 px-4 space-y-4">
                <Button
                  asChild
                  className="bg-purple-600 flex text-white hover:bg-purple-700"
                >
                  <Link href={"/login"}>Login</Link>
                </Button>
                <Button
                  asChild
                  className="bg-purple-600 flex text-white hover:bg-purple-700"
                >
                  <Link href={"/register"}>Register Customer</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
