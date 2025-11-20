


import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import AccommodationSection from "@/components/AccommodationSection"
import ActivitiesSection from "@/components/ActivitiesSection"
import ProductsSection from "@/components/ProductsSection"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/auth/Login"
import Signup from "@/pages/auth/Signup"
import AccommodationPage from "@/pages/Accommodation"
import AccommodationDetail from "@/pages/AccommodationDetail"
import ProductsPage from "@/pages/Products"
import ProductDetail from "@/pages/ProductDetail"
import CartPage from "@/pages/Cart"
import { CartProvider } from "@/context/CartContext"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <Navbar />
          <main className="container mx-auto flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<>
                <Hero />
                <AccommodationSection />
                <ActivitiesSection />
                <ProductsSection />
              </>} />
              <Route path="/accommodation" element={<AccommodationPage />} />
              <Route path="/accommodation/:id" element={<AccommodationDetail />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/activities" element={<div>Activities</div>} />
              <Route path="/about" element={<div>About us</div>} />
              <Route path="/contact" element={<div>Contact</div>} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/signup" element={<Signup />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
