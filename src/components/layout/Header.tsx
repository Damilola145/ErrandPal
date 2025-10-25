import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";

export function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="py-1 border-b sticky top-0 bg-white z-50">
      <div className="relative flex items-center w-full px-4 sm:px-8 h-16">

        {/* LEFT: Logo + Brand */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="LOGO2.png"
            alt="Logo"
            className="h-10 w-auto rounded-full"
          />
          <p className="font-sans font-bold tracking-widest text-xl
                        bg-gradient-to-r from-black via-gray-900 to-gray
                        text-transparent bg-clip-text">
            ERRAND<span className="text-accent underline decoration-wavy decoration-accent/40 " data-id="jbsjdljj4" data-path="src/pages/HomePage.tsx">PAL</span>
          </p>
        </div>

        {/* CENTER: Desktop Nav */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
          <Button variant="link" onClick={() => navigate("/")}>Home</Button>
          <Button variant="link" onClick={() => navigate("/how-it-works")}>How It Works</Button>
        </nav>

        {/* RIGHT: User Section / Auth Buttons */}
        <div className="flex items-center ml-auto gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://ui.shadcn.com/avatars/02.png" />
                  <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "JD"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile")}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/messages")}>Messages</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/login")}>Log in</Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </div>
          )}

          {/* MOBILE HAMBURGER */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* BACKDROP OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* SLIDE-IN SIDE NAV */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold text-lg text-[rgb(19,84,116)]">Menu</span>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="flex flex-col space-y-4 p-4">
          <Button
            variant="link"
            onClick={() => {
              navigate("/");
              setIsMenuOpen(false);
            }}
          >
            Home
          </Button>
          <Button
            variant="link"
            onClick={() => {
              navigate("/login");
              setIsMenuOpen(false);
            }}
          >
            Log in
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
            onClick={() => {
              navigate("/signup");
              setIsMenuOpen(false);
            }}
          >
            Sign up
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
