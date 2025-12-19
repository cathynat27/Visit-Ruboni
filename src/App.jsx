

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import AccommodationSection from "@/components/AccommodationSection"
import ActivitiesSection from "@/components/ActivitiesSection"
import ProductsSection from "@/components/ProductsSection"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/auth/Login"
import Signup from "@/pages/auth/Signup"
import ForgotPassword from "@/pages/auth/ForgotPassword"
import ResetPassword from "@/pages/auth/ResetPassword"
import ChangePassword from "@/pages/auth/ChangePassword"
import EmailConfirmation from "@/pages/auth/EmailConfirmation"
import AccommodationPage from "@/pages/Accommodation"
import AccommodationDetail from "@/pages/AccommodationDetail"
import ProductsPage from "@/pages/Products"
import ProductDetail from "@/pages/ProductDetail"
import CartPage from "@/pages/Cart"
import ActivitiesPage from "@/pages/Activities"
import ActivityDetail from "@/pages/ActivityDetail"
import BookingPage from "@/pages/Booking"
import MyBookings from "@/pages/MyBookings"
import ContactPage from "@/pages/Contact"
import { CartProvider } from "@/context/CartContext"
import { AuthProvider } from "@/context/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Toaster } from "react-hot-toast"
import AboutUs from "@/pages/Aboutus"

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Navbar />
            <main className="container mx-auto flex-1 px-4 py-6  sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<>
                  <Hero />
                  <AccommodationSection />
                  <ActivitiesSection />
                  <ProductsSection />
                </>} />
                <Route path="/accommodation" element={<ProtectedRoute element={<AccommodationPage />} />} />
                <Route path="/accommodation/:id" element={<ProtectedRoute element={<AccommodationDetail />} />} />
                <Route path="/products" element={<ProtectedRoute element={<ProductsPage />} />} />
                <Route path="/products/:id" element={<ProtectedRoute element={<ProductDetail />} />} />
                <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} />
                <Route path="/activities" element={<ProtectedRoute element={<ActivitiesPage />} />} />
                <Route path="/activities/:id" element={<ProtectedRoute element={<ActivityDetail />} />} />
                <Route path="/booking" element={<ProtectedRoute element={<BookingPage />} />} />
                <Route path="/my-bookings" element={<ProtectedRoute element={<MyBookings />} />} />
                <Route path="/contact-us" element={<ProtectedRoute element={<ContactPage />} />} />
                <Route path="/about" element={<ProtectedRoute element={<AboutUs/>} />} />
                
                {/* Auth Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                <Route path="/auth/reset-password/:code" element={<ResetPassword />} />
                <Route path="/auth/change-password" element={<ProtectedRoute element={<ChangePassword />} />} />
                <Route path="/auth/email-confirmation" element={<EmailConfirmation />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
