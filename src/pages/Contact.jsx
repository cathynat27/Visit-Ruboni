import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission 
    console.log("Contact form submitted:", formData)
    
    alert("Message sent successfully! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
     
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <div className="grid gap-12 lg:grid-cols-2">
          
          <div>
            <h1 className="text-3xl font-bold mb-2">Get In Touch</h1>
            <p className="text-muted-foreground mb-8">
              Have questions about our services? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="space-y-6">              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">info@visitruboni.com</p>
                  <p className="text-muted-foreground">support@visitruboni.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground">+256 (0) 123 456 789</p>
                  <p className="text-muted-foreground">+256 (0) 123 456 790</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-muted-foreground">Ruboni Town, Uganda</p>
                  <p className="text-muted-foreground">East Africa</p>
                </div>
              </div>
            </div>
            <div className="mt-12 rounded-lg border border-border bg-card p-6">
              <h3 className="font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">10:00 AM - 3:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="rounded-lg border border-border bg-card p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="support">Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <Button type="submit" className="w-full h-11">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
