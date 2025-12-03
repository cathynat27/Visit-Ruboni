import { Link } from "react-router-dom"
import { FaFacebook,FaInstagram} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border ">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-4 sm:px-6 md:grid-cols-3 lg:px-8 ">
        {/* Socials */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Follow us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><FaFacebook size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><FaInstagram size={20} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><FaXTwitter size={20} /></a>
          </div>
        </div>

        {/*  Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Links</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">About us</Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-foreground">Contact</Link>
            </li>
          </ul>
        </div>

        {/*  Subscribe */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Subscribe</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget
              const data = new FormData(form)
              const email = String(data.get("email") || "").trim()
              if (email) {
                alert(`Subscribed: ${email}`)
                form.reset()
              }
            }}
            className="flex max-w-md items-center gap-2"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-offset-2 focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          © {year} Ruboni. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
