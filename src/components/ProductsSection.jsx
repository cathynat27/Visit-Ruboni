import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Star, ArrowRight, ShoppingCart } from "lucide-react"
import { productItems } from "@/data/products"
import { useCart } from "@/context/useCart"
import toast from "react-hot-toast"
import Swiper from "@/components/Slider.jsx"
import { useEffect, useState } from "react"
import { fetchProducts } from "@/api/products"


function Stars({ value }) {
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

function Card({ id, image, title, description, rating, price }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const handleViewDetails = () => {
    navigate(`/products/${id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    const product = productItems.find((p) => p.id === id)
    addToCart(product)
    toast.success(`${product.title} added to cart!`, {
      duration: 3,
      icon: '🛒',
    })
  }

  return (
    <div
      className="group flex w-72 shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img 
        src = "/images/local.png"
        //src={image} 
        alt={title} 
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold">{title}</h3>
          {/* <span className="text-sm font-semibold text-primary">${price}</span> */}
        </div>
        <Stars value={rating} />
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-auto flex flex-col w-full gap-2 ">
         
          <Button
            variant="outline"
            className="bg-primary hover:opacity-90 hover:bg-sky-600 text-white"
            onClick={(e) => {
              e.stopPropagation()
              handleViewDetails()
            }}
          >
            View details
          </Button>
         
          
          <Button
            variant="outline"
            className="bg-primary hover:opacity-90 hover:bg-sky-600 text-white" 
            onClick={handleAddToCart}
          >
            Add Cart
          </Button>
          
        </div>
      </div>
    </div>
  )
}

function SeeAllCard() {
  return (
    <Link to="/products">
      <div className="flex w-72 shrink-0 flex-col overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm h-full cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex flex-1 flex-col gap-4 p-6 items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">View All Products</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Explore our complete collection of local products
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary font-semibold">
            See All
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function ProductsSection() {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts().then((data) => {
      setProduct(data)
      setLoading(false)
    }).catch((error) => {
      console.error("Error fetching products:", error)
      setLoading(false)
    })
}, [])
if (loading) return <p className="text-center">Loading...</p>
  return (
    <section id="products" className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl text-center font-semibold">Local Products</h2>
        <p className="mb-8 text-center text-muted-foreground max-w-2xl mx-auto">
          Discover authentic local products handcrafted by artisans from Ruboni
        </p>
        
        <Swiper>
          {/* {productItems.slice(0, 4).map((product) => (
            <Card key={product.id} {...product} />
          ))} */}
          {product.map((items) =>{
            const products = items.attributes;
            return(
              <Card
              key={items.id}
              id={items.id}
              image={
                    products?.image?.data?.attributes?.url
                      ? products.image.data.attributes.url
                      : "https://placehold.co/600x400?text=No+Image"
                  }
                  title = {products.name}
                  description={products.description?.replace(/<[^>]+>/g, "")}
                  price ={products.price}
                  />
            )
          })}
          <SeeAllCard />
        </Swiper>
        
      </div>
    </section>
  )
}