import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingCart, Plus, Minus } from "lucide-react"
import { useCart } from "@/context/useCart"
import toast from "react-hot-toast"

export default function CartPage() {
  const navigate = useNavigate()
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  const handleRemoveItem = (itemTitle) => {
    removeFromCart(itemTitle)
    toast.error('Item removed from cart', { duration: 2 })
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared!', { duration: 2 })
  }

  const handleCheckout = () => {
    toast.success('Proceeding to checkout...', { duration: 2 })
    setTimeout(() => {
      // Navigate to checkout page
      // navigate("/checkout")
    }, 500)
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some products to get started!</p>
        <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border border-border rounded-lg p-4 bg-card"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-semibold">${item.price}</span>
                    </div>
                  </div>

                  {/* Quantity Control */}
                  <div className="flex flex-col items-center justify-between">
                    <div className="flex items-center gap-2 border border-border rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-semibold min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-muted rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping Button */}
            <Button
              variant="outline"
              className="mt-8 w-full"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </div>

          {/* Order Summary */}
          <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            {/* Items Summary */}
            <div className="mb-6 space-y-2 pb-6 border-b border-border">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.title} x {item.quantity}
                  </span>
                  <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>
            </div>

           
            <Button className="w-full bg-primary text-primary-foreground py-6 text-lg font-semibold mb-3" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>

            
            <Button
              variant="outline"
              className="w-full"
              onClick={handleClearCart}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
