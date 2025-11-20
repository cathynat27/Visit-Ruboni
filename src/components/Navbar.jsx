import { Link, NavLink, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/useCart"

const navItems = [
  { to: "/", label: "Home" },
  { to: "/accommodation", label: "Accommodation" },
  { to: "/activities", label: "Activities" },
  { to: "/products", label: "Products" },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { getTotalItems } = useCart()
  const cartCount = getTotalItems()
  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-lg">
      <div className="w-full grid h-16 grid-cols-3 items-center px-4 sm:px-6 lg:px-8">
        {/* Left: Logo and brand */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img
            src="/logo.svg"
            alt="Visit Ruboni Logo"
            className="h-8 w-8"
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />
          <span className="text-lg font-bold tracking-tight text-primary-foreground">Visit Ruboni</span>
        </Link>

        {/* Center: Nav links */}
        <nav className="hidden md:flex items-center justify-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "text-sm font-semibold transition-all duration-200 pb-1",
                  isActive
                    ? "text-primary-foreground border-b-2 border-primary-foreground"
                    : "text-primary-foreground/75 hover:text-primary-foreground",
                ].join(" ")
              }
              end
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Cart + Account */}
        <div className="flex items-center gap-3 justify-self-end">
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-white/20 relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-primary-foreground font-semibold px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20">
                <span className="hidden md:inline text-sm">Account</span>
                <Avatar className="h-8 w-8 border-2 border-primary-foreground">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback className="bg-white/30 text-primary-foreground font-bold">AC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-2 shadow-lg">
              <DropdownMenuItem asChild>
                <Link to="/auth/login" className="text-foreground font-medium cursor-pointer">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/auth/signup" className="text-foreground font-medium cursor-pointer">Signup</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
