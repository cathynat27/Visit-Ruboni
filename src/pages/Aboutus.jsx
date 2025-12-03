import { MapPin, Users, Heart, Award, Mountain, Globe } from "lucide-react"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-primary bg-[url('/images/zebra.png')] bg-cover bg-center flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Welcome to Ruboni
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Where Nature Meets Community
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Ruboni is a vibrant community nestled at the foothills of the majestic Rwenzori Mountains in Western Uganda. Our village is more than just a destination—it's a living testament to the harmony between people and nature.
              </p>
              <p>
                For generations, the people of Ruboni have lived sustainably, cultivating the land and preserving the rich biodiversity that surrounds us. Today, we open our doors to travelers seeking authentic experiences, cultural immersion, and unforgettable adventures.
              </p>
              <p>
                Through community-based tourism, we share our heritage, traditions, and natural wonders while creating sustainable livelihoods for local families. Every visit to Ruboni directly supports education, healthcare, and conservation initiatives in our community.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden">
            <img 
              src="/images/mountain.png" 
              alt="Ruboni Village"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
                e.currentTarget.parentElement.classList.add("bg-gradient-to-br", "from-primary/20", "to-primary/5")
              }}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Community First</h3>
              <p className="text-muted-foreground">
                Tourism benefits are shared across the community, ensuring sustainable development and improved quality of life for all residents.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Cultural Preservation</h3>
              <p className="text-muted-foreground">
                We celebrate and protect our Bakonzo heritage, traditional practices, and indigenous knowledge for future generations.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Mountain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Environmental Care</h3>
              <p className="text-muted-foreground">
                We are stewards of the Rwenzori ecosystem, committed to conservation and sustainable practices in everything we do.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Authentic Experiences</h3>
              <p className="text-muted-foreground">
                We offer genuine connections with our culture, people, and landscape—no staged performances, just real life.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Global Connection</h3>
              <p className="text-muted-foreground">
                We bridge cultures and create meaningful exchanges between visitors and local community members.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Local Empowerment</h3>
              <p className="text-muted-foreground">
                We train and employ local guides, artisans, and hospitality workers, keeping tourism benefits within Ruboni.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mountain className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Mountain Adventures</h3>
            <p className="text-muted-foreground">
              Guided hikes to waterfalls, nature walks through pristine forests, and treks to the legendary Rwenzori peaks.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Cultural Experiences</h3>
            <p className="text-muted-foreground">
              Traditional dance, craft workshops, village tours, and home-cooked meals prepared by local families.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Community Stays</h3>
            <p className="text-muted-foreground">
              Comfortable accommodations ranging from homestays to guesthouses, all managed by community members.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section 
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Visit Makes a Difference
          </h2>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 leading-relaxed">
            Every booking, purchase, and activity directly supports community projects including school improvements, healthcare access, clean water initiatives, and environmental conservation. Tourism has helped build classrooms, support local businesses, and create employment opportunities for dozens of families.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Community Members Benefiting</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-primary-foreground/80">Years of Community Tourism</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-primary-foreground/80">Community Owned & Operated</div>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Location Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] bg-muted rounded-lg overflow-hidden order-2 md:order-1">
            <img 
              src="/images/mountain.png" 
              alt="Ruboni Location"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
                e.currentTarget.parentElement.classList.add("bg-gradient-to-br", "from-primary/20", "to-primary/5")
              }}
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Visit Ruboni
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Located in Kasese District at the base of the Rwenzori Mountains, Ruboni is easily accessible from Fort Portal (85km) and Kasese town (12km).
              </p>
              <p>
                The village sits at approximately 1,450 meters above sea level, offering cool mountain air and spectacular views. We're just a short distance from Rwenzori Mountains National Park, a UNESCO World Heritage Site.
              </p>
              <div className="pt-4">
                <p className="font-semibold text-foreground mb-2">Getting Here:</p>
                <ul className="space-y-2 ml-4">
                  <li>• 5 hours drive from Kampala via Fort Portal</li>
                  <li>• 20 minutes from Kasese town</li>
                  <li>• Accessible by private vehicle or public transport</li>
                  <li>• We can arrange airport pickup and transfers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Experience Ruboni?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join us for an unforgettable journey where you'll create memories,connections, and contribute to a thriving community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/booking"
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Book Now
            </a>
            <a 
              href="/activities"
              className="inline-block bg-background text-foreground border-2 border-primary px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              Explore Activities
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}