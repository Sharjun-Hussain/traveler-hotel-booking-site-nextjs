// components/Navbar.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Users, PenBoxIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className=" w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Sri Lanka Vista
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/hotels"
              className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Hotels
            </Link>
            <Link
              href="/flights"
              className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Flights
            </Link>
            <Link
              href="/activities"
              className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Activities
            </Link>
            <Link
              href="/packages"
              className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Packages
            </Link>
            <Link
              href="/deals"
              className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Deals
            </Link>
          </div>

          {/* Right side - Auth, Currency, Language, Theme */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Currency Dropdown using shadcn/ui dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  USD <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>USD - US Dollar</DropdownMenuItem>
                <DropdownMenuItem>LKR - Sri Lankan Rupee</DropdownMenuItem>
                <DropdownMenuItem>EUR - Euro</DropdownMenuItem>
                <DropdownMenuItem>GBP - British Pound</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Language Dropdown using shadcn/ui dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  English <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Sinhala</DropdownMenuItem>
                <DropdownMenuItem>Tamil</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Links */}
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <Users size={16} />
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                <PenBoxIcon size={16} />
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/hotels"
              className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Hotels
            </Link>
            <Link
              href="/flights"
              className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Flights
            </Link>
            <Link
              href="/activities"
              className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Activities
            </Link>
            <Link
              href="/packages"
              className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Packages
            </Link>
            <Link
              href="/deals"
              className="block px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Deals
            </Link>

            {/* Mobile dropdowns */}
            <div className="flex flex-col space-y-2 pt-2">
              {/* Currency and Language as simple buttons with popups in mobile */}
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground/70 mb-2">
                  Currency
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    USD
                  </Button>
                  <Button variant="outline" size="sm">
                    LKR
                  </Button>
                  <Button variant="outline" size="sm">
                    EUR
                  </Button>
                  <Button variant="outline" size="sm">
                    GBP
                  </Button>
                </div>
              </div>

              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground/70 mb-2">
                  Language
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    English
                  </Button>
                  <Button variant="outline" size="sm">
                    Sinhala
                  </Button>
                  <Button variant="outline" size="sm">
                    Tamil
                  </Button>
                </div>
              </div>

              {/* Theme toggle for mobile */}
              <div className="px-3 py-2">
                <p className="text-sm font-medium text-foreground/70 mb-2">
                  Theme
                </p>
                <ThemeToggle />
              </div>
            </div>

            <div className="border-t border-border pt-4 pb-3 flex flex-col space-y-2 px-3">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-start">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
