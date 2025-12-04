import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { productItems } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Plus, Minus } from "lucide-react"
import { useCart } from "@/context/useCart"
import toast from "react-hot-toast"

function StarRating({ value }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const empty = 5 - full - (half ? 1 : 0)
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-500" />
      ))}
      {half && <Star className="h-4 w-4 fill-yellow-500/70" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4" />
      ))}
    </div>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = productItems.find((item) => item.id === parseInt(id))

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast.success(`${product.title} (x${quantity}) added to cart!`, {
      duration: 3,
      icon: '🛒',
    })
    setTimeout(() => {
      navigate("/cart")
    }, 500)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
       
        <Button
          variant="ghost"
          onClick={() => navigate("/products")}
          className="mb-6"
        >
           Back to Products
        </Button>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <StarRating value={product.rating} />
                <span className="text-sm text-muted-foreground">({product.rating})</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">${product.price}</span>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h3 className="font-semibold mb-4">About this product</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.about}
              </p>
            </div>
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-2">Category</p>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-4 border border-border rounded-lg p-2 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-muted rounded"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="text-xl font-semibold min-w-[50px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-muted rounded"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart  */}
            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground py-6 text-lg font-semibold"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add {quantity} to Cart
            </Button>

            <Button
              variant="outline"
              className="w-full mt-3"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
