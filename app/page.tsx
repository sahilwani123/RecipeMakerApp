"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Clock,
  Users,
  Star,
  Search,
  Plus,
  List,
  ChefHat,
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Share2,
  Play,
  Camera,
  Timer,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"

interface Recipe {
  id: number
  name: string
  image: string
  time: string
  servings: number
  rating: number
  difficulty: "Easy" | "Medium" | "Hard"
  ingredients: string[]
  category: string
  instructions: string
  reviews?: Review[]
}

interface Review {
  id: number
  user: string
  rating: number
  comment: string
  date: string
}

const indianRecipes: Recipe[] = [
  {
    id: 1,
    name: "Butter Chicken",
    image: "/placeholder.svg?height=200&width=300",
    time: "45 min",
    servings: 4,
    rating: 4.8,
    difficulty: "Medium",
    ingredients: [
      "Chicken breast 500g",
      "Tomatoes 3 large",
      "Heavy cream 200ml",
      "Garam masala 2 tsp",
      "Ginger-garlic paste 2 tbsp",
      "Butter 50g",
    ],
    category: "Main Course",
    instructions:
      "Marinate chicken in yogurt and spices for 30 minutes. Heat butter in a pan, add marinated chicken and cook until tender. In another pan, prepare tomato gravy with onions, ginger-garlic paste, and spices. Add cooked chicken to the gravy, simmer for 10 minutes. Finish with cream and fresh coriander.",
    reviews: [
      {
        id: 1,
        user: "Priya S.",
        rating: 5,
        comment: "Amazing recipe! Tastes just like restaurant quality.",
        date: "2024-01-15",
      },
      { id: 2, user: "Raj M.", rating: 4, comment: "Great flavor, will make again.", date: "2024-01-10" },
    ],
  },
  {
    id: 2,
    name: "Biryani",
    image: "/placeholder.svg?height=200&width=300",
    time: "90 min",
    servings: 6,
    rating: 4.9,
    difficulty: "Hard",
    ingredients: [
      "Basmati Rice 500g",
      "Mutton 750g",
      "Saffron 1g",
      "Onions 4 large",
      "Yogurt 200ml",
      "Mint leaves 1 cup",
    ],
    category: "Main Course",
    instructions:
      "Soak basmati rice for 30 minutes. Marinate mutton with yogurt and spices for 2 hours. Deep fry onions until golden. Layer rice and mutton alternately in a heavy-bottomed pot. Sprinkle saffron soaked in warm milk. Cook on high heat for 3 minutes, then on low heat for 45 minutes.",
    reviews: [
      { id: 3, user: "Fatima K.", rating: 5, comment: "Perfect biryani recipe! Family loved it.", date: "2024-01-12" },
    ],
  },
  {
    id: 3,
    name: "Masala Dosa",
    image: "/placeholder.svg?height=200&width=300",
    time: "30 min",
    servings: 4,
    rating: 4.7,
    difficulty: "Medium",
    ingredients: [
      "Dosa batter 2 cups",
      "Potatoes 4 medium",
      "Onions 2 medium",
      "Mustard seeds 1 tsp",
      "Curry leaves 10-12",
      "Turmeric 1/2 tsp",
    ],
    category: "Breakfast",
    instructions:
      "Prepare potato filling by boiling and mashing potatoes with spices. Heat a non-stick pan, pour dosa batter and spread thin. Cook until golden brown. Add potato filling, fold the dosa. Serve hot with coconut chutney and sambar.",
    reviews: [],
  },
  {
    id: 4,
    name: "Chole Bhature",
    image: "/placeholder.svg?height=200&width=300",
    time: "60 min",
    servings: 4,
    rating: 4.6,
    difficulty: "Medium",
    ingredients: [
      "Chickpeas 2 cups",
      "All-purpose flour 2 cups",
      "Yogurt 1/4 cup",
      "Onions 2 medium",
      "Tomatoes 3 medium",
      "Ginger-garlic paste 2 tbsp",
    ],
    category: "Main Course",
    instructions:
      "Soak chickpeas overnight and pressure cook until soft. Prepare spicy chickpea curry with onions, tomatoes, and aromatic spices. For bhature, knead flour with yogurt and oil, rest for 2 hours. Roll and deep fry until puffed and golden. Serve hot chole with bhature.",
    reviews: [],
  },
  {
    id: 5,
    name: "Gulab Jamun",
    image: "/placeholder.svg?height=200&width=300",
    time: "45 min",
    servings: 8,
    rating: 4.8,
    difficulty: "Easy",
    ingredients: [
      "Milk powder 1 cup",
      "All-purpose flour 2 tbsp",
      "Ghee 2 tbsp",
      "Sugar 2 cups",
      "Cardamom powder 1/2 tsp",
      "Rose water 1 tsp",
    ],
    category: "Dessert",
    instructions:
      "Mix milk powder, flour, and ghee to form a soft dough. Shape into small balls. Deep fry on low heat until golden brown. Prepare sugar syrup with cardamom and rose water. Soak the fried balls in warm syrup for 2 hours before serving.",
    reviews: [],
  },
  {
    id: 6,
    name: "Palak Paneer",
    image: "/placeholder.svg?height=200&width=300",
    time: "35 min",
    servings: 4,
    rating: 4.5,
    difficulty: "Easy",
    ingredients: [
      "Fresh spinach 500g",
      "Paneer 250g",
      "Onions 2 medium",
      "Tomatoes 2 medium",
      "Ginger-garlic paste 1 tbsp",
      "Cream 2 tbsp",
    ],
    category: "Main Course",
    instructions:
      "Blanch spinach leaves and blend to smooth puree. Cut paneer into cubes and lightly fry. Prepare base gravy with onions, tomatoes, and spices. Add spinach puree and simmer. Add paneer cubes and cream. Cook for 5 minutes and serve hot.",
    reviews: [],
  },
]

const categories = [
  { name: "All", icon: "🍽️" },
  { name: "Breakfast", icon: "🌅" },
  { name: "Main Course", icon: "🍛" },
  { name: "Dessert", icon: "🍰" },
  { name: "Snacks", icon: "🥨" },
]

export default function RecipeMakerApp() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "home" | "detail" | "add" | "favorites" | "timer">(
    "login",
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [recipes, setRecipes] = useState<Recipe[]>(indianRecipes)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // Timer state
  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  // Add recipe form state
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    time: "",
    servings: "",
    difficulty: "Easy" as "Easy" | "Medium" | "Hard",
    category: "Main Course",
    ingredients: "",
    instructions: "",
  })

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false)
      alert("Timer finished! Your cooking time is up! 🍳")
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeLeft])

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields")
      return
    }
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoggedIn(true)
    setCurrentScreen("home")
    setLoading(false)
  }

  const toggleFavorite = (recipeId: number) => {
    setFavorites((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]))
  }

  const handleAddRecipe = () => {
    if (
      !newRecipe.name ||
      !newRecipe.time ||
      !newRecipe.servings ||
      !newRecipe.ingredients ||
      !newRecipe.instructions
    ) {
      alert("Please fill in all required fields")
      return
    }

    const recipe: Recipe = {
      id: Date.now(),
      name: newRecipe.name,
      image: "/placeholder.svg?height=200&width=300",
      time: newRecipe.time,
      servings: Number.parseInt(newRecipe.servings),
      rating: 4.0,
      difficulty: newRecipe.difficulty,
      ingredients: newRecipe.ingredients.split(",").map((item) => item.trim()),
      category: newRecipe.category,
      instructions: newRecipe.instructions,
      reviews: [],
    }

    setRecipes((prev) => [...prev, recipe])
    setNewRecipe({
      name: "",
      time: "",
      servings: "",
      difficulty: "Easy",
      category: "Main Course",
      ingredients: "",
      instructions: "",
    })
    alert("Recipe added successfully!")
    setCurrentScreen("home")
  }

  const startTimer = () => {
    const totalSeconds = timerMinutes * 60 + timerSeconds
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds)
      setIsTimerRunning(true)
    }
  }

  const stopTimer = () => {
    setIsTimerRunning(false)
  }

  const resetTimer = () => {
    setIsTimerRunning(false)
    setTimeLeft(0)
    setTimerMinutes(0)
    setTimerSeconds(0)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const shareRecipe = (recipe: Recipe) => {
    if (navigator.share) {
      navigator.share({
        title: recipe.name,
        text: `Check out this amazing ${recipe.name} recipe!`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(`${recipe.name} - ${recipe.instructions}`)
      alert("Recipe copied to clipboard!")
    }
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || recipe.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id))

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-white rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
              <ChefHat className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Recipe Maker</h1>
            <p className="text-white/80">Discover & Create Amazing Indian Recipes</p>
          </div>

          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-gray-600">Sign in to continue cooking</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Enter your email"
                    className="pl-12 h-12 text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-12 pr-12 h-12 text-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="text-right">
                  <button className="text-orange-600 font-medium hover:text-orange-700">Forgot Password?</button>
                </div>

                <Button
                  className="w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                <div className="text-center text-gray-500">Or continue with</div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 bg-transparent">
                    Google
                  </Button>
                  <Button variant="outline" className="h-12 bg-transparent">
                    Facebook
                  </Button>
                </div>

                <div className="text-center">
                  <span className="text-gray-600">Don't have an account? </span>
                  <button className="text-orange-600 font-semibold hover:text-orange-700">Sign Up</button>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-white/60 text-sm mt-6">
            By signing in, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    )
  }

  // Timer Screen
  if (currentScreen === "timer") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Cooking Timer</h1>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-6">
          <Card className="mb-6">
            <CardContent className="p-6 text-center">
              <div className="text-6xl font-mono font-bold text-gray-800 mb-6">
                {isTimerRunning
                  ? formatTime(timeLeft)
                  : `${timerMinutes.toString().padStart(2, "0")}:${timerSeconds.toString().padStart(2, "0")}`}
              </div>

              {!isTimerRunning && timeLeft === 0 && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Minutes</label>
                    <Input
                      type="number"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(Number.parseInt(e.target.value) || 0)}
                      min="0"
                      max="99"
                      className="text-center text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Seconds</label>
                    <Input
                      type="number"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(Number.parseInt(e.target.value) || 0)}
                      min="0"
                      max="59"
                      className="text-center text-lg"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                {!isTimerRunning ? (
                  <Button onClick={startTimer} className="bg-green-500 hover:bg-green-600">
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </Button>
                ) : (
                  <Button onClick={stopTimer} className="bg-red-500 hover:bg-red-600">
                    Stop
                  </Button>
                )}
                <Button onClick={resetTimer} variant="outline">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Quick Timer Presets</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "5 min", minutes: 5, seconds: 0 },
                  { label: "10 min", minutes: 10, seconds: 0 },
                  { label: "15 min", minutes: 15, seconds: 0 },
                  { label: "30 min", minutes: 30, seconds: 0 },
                ].map((preset, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTimerMinutes(preset.minutes)
                      setTimerSeconds(preset.seconds)
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Add Recipe Screen
  if (currentScreen === "add") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">Add New Recipe</h1>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg mb-4">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Camera className="w-4 h-4 mr-2" />
                  Add Photo
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Recipe Name *</label>
                <Input
                  placeholder="Enter recipe name"
                  value={newRecipe.name}
                  onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Cooking Time *</label>
                  <Input
                    placeholder="e.g., 30 min"
                    value={newRecipe.time}
                    onChange={(e) => setNewRecipe({ ...newRecipe, time: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Servings *</label>
                  <Input
                    type="number"
                    placeholder="4"
                    value={newRecipe.servings}
                    onChange={(e) => setNewRecipe({ ...newRecipe, servings: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                <div className="flex gap-2">
                  {(["Easy", "Medium", "Hard"] as const).map((level) => (
                    <Badge
                      key={level}
                      variant={newRecipe.difficulty === level ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2"
                      onClick={() => setNewRecipe({ ...newRecipe, difficulty: level })}
                    >
                      {level}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <div className="flex gap-2 flex-wrap">
                  {["Breakfast", "Main Course", "Dessert", "Snacks"].map((cat) => (
                    <Badge
                      key={cat}
                      variant={newRecipe.category === cat ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2"
                      onClick={() => setNewRecipe({ ...newRecipe, category: cat })}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ingredients *</label>
                <p className="text-sm text-gray-600 mb-2">Separate ingredients with commas</p>
                <Textarea
                  placeholder="e.g., Chicken 500g, Tomatoes 3 large, Spices"
                  rows={4}
                  value={newRecipe.ingredients}
                  onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Instructions *</label>
                <Textarea
                  placeholder="Enter step-by-step cooking instructions..."
                  rows={6}
                  value={newRecipe.instructions}
                  onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
                />
              </div>

              <Button
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                onClick={handleAddRecipe}
              >
                Save Recipe
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Recipe Detail Screen
  if (currentScreen === "detail" && selectedRecipe) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-64 bg-gradient-to-b from-orange-400 to-orange-600">
          <Image
            src={selectedRecipe.image || "/placeholder.svg"}
            alt={selectedRecipe.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute top-4 left-4 right-4 flex justify-between">
            <Button
              size="sm"
              variant="ghost"
              className="bg-black/50 text-white hover:bg-black/70"
              onClick={() => setCurrentScreen("home")}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="bg-black/50 text-white hover:bg-black/70"
                onClick={() => toggleFavorite(selectedRecipe.id)}
              >
                <Heart
                  className={`w-4 h-4 ${favorites.includes(selectedRecipe.id) ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="bg-black/50 text-white hover:bg-black/70"
                onClick={() => shareRecipe(selectedRecipe)}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-3xl font-bold mb-2">{selectedRecipe.name}</h1>
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-lg font-semibold">{selectedRecipe.rating}</span>
              <span className="ml-2 text-white/80">({selectedRecipe.reviews?.length || 0} reviews)</span>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { icon: Clock, label: "Cook Time", value: selectedRecipe.time },
              { icon: Users, label: "Servings", value: selectedRecipe.servings.toString() },
              { icon: Star, label: "Difficulty", value: selectedRecipe.difficulty },
            ].map((info, i) => (
              <Card key={i}>
                <CardContent className="p-4 text-center">
                  <info.icon className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-600 mb-1">{info.label}</p>
                  <p className="font-semibold">{info.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
              <div className="space-y-3">
                {selectedRecipe.ingredients.map((ingredient, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 flex-shrink-0" />
                    <span>{ingredient}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Instructions</h2>
              <p className="text-gray-700 leading-relaxed">{selectedRecipe.instructions}</p>
            </CardContent>
          </Card>

          {selectedRecipe.reviews && selectedRecipe.reviews.length > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {selectedRecipe.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                      <p className="text-xs text-gray-400">{review.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <Button
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              onClick={() => setCurrentScreen("timer")}
            >
              <Timer className="w-5 h-5 mr-2" />
              Start Cooking Timer
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 bg-transparent"
              onClick={() => shareRecipe(selectedRecipe)}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Recipe
            </Button>
            <Button variant="outline" className="w-full h-12 bg-transparent">
              <MessageCircle className="w-5 h-5 mr-2" />
              Add Review
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Favorites Screen
  if (currentScreen === "favorites") {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
          <div className="flex items-center justify-between max-w-md mx-auto">
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">My Favorites</h1>
            <div className="w-10"></div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4">
          {favoriteRecipes.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Favorites Yet</h2>
              <p className="text-gray-500 mb-6">Start adding recipes to your favorites to see them here</p>
              <Button
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                onClick={() => setCurrentScreen("home")}
              >
                Browse Recipes
              </Button>
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold mb-4">
                {favoriteRecipes.length} Favorite Recipe{favoriteRecipes.length !== 1 ? "s" : ""}
              </p>
              <div className="space-y-4">
                {favoriteRecipes.map((recipe) => (
                  <Card key={recipe.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex">
                        <Image
                          src={recipe.image || "/placeholder.svg"}
                          alt={recipe.name}
                          width={80}
                          height={80}
                          className="rounded-lg object-cover mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{recipe.name}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(recipe.id)
                              }}
                            >
                              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                            </Button>
                          </div>

                          <div className="flex gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {recipe.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {recipe.servings} servings
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {recipe.rating}
                            </span>
                          </div>

                          <div className="flex gap-2 mb-3">
                            {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {ingredient.split(" ")[0]}
                              </Badge>
                            ))}
                            {recipe.ingredients.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{recipe.ingredients.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <Badge variant="outline" className="text-xs">
                            {recipe.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  // Home Screen
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">Recipe Maker</h1>
              <p className="text-orange-100">Discover Indian Flavors</p>
            </div>
            <div className="bg-white/20 rounded-full p-3">
              <ChefHat className="w-6 h-6" />
            </div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search recipes..."
              className="pl-12 bg-white/90 border-0 text-gray-800 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex justify-around bg-white/10 rounded-lg p-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white flex items-center gap-2 flex-1"
              onClick={() => setCurrentScreen("add")}
            >
              <Plus className="w-5 h-5" />
              Add Recipe
            </Button>
            <Button variant="ghost" size="sm" className="text-white flex items-center gap-2 flex-1">
              <List className="w-5 h-5" />
              List
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white flex items-center gap-2 flex-1"
              onClick={() => setCurrentScreen("favorites")}
            >
              <Heart className="w-5 h-5" />
              Favorites
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              className="cursor-pointer whitespace-nowrap px-4 py-2"
              onClick={() => setActiveCategory(category.name)}
            >
              {category.icon} {category.name}
            </Badge>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Featured Recipes</h2>
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("timer")} className="text-orange-600">
            <Timer className="w-4 h-4 mr-1" />
            Timer
          </Button>
        </div>

        <div className="space-y-4">
          {filteredRecipes.map((recipe) => (
            <Card
              key={recipe.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => {
                setSelectedRecipe(recipe)
                setCurrentScreen("detail")
              }}
            >
              <CardContent className="p-4">
                <div className="flex">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.name}
                    width={96}
                    height={96}
                    className="rounded-lg object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{recipe.name}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(recipe.id)
                        }}
                      >
                        <Heart
                          className={`w-5 h-5 ${favorites.includes(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                        />
                      </Button>
                    </div>

                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {recipe.servings} servings
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {recipe.rating}
                      </span>
                    </div>

                    <div className="flex gap-2 mb-3 flex-wrap">
                      {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {ingredient.split(" ")[0]}
                        </Badge>
                      ))}
                      {recipe.ingredients.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{recipe.ingredients.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        recipe.difficulty === "Easy"
                          ? "border-green-500 text-green-700"
                          : recipe.difficulty === "Medium"
                            ? "border-yellow-500 text-yellow-700"
                            : "border-red-500 text-red-700"
                      }`}
                    >
                      {recipe.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <Card
            className="bg-orange-50 border-orange-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setCurrentScreen("add")}
          >
            <CardContent className="p-4 text-center">
              <Plus className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800">Create Recipe</h3>
              <p className="text-sm text-orange-600">Add your own recipe</p>
            </CardContent>
          </Card>

          <Card
            className="bg-red-50 border-red-200 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setCurrentScreen("favorites")}
          >
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold text-red-800">My Favorites</h3>
              <p className="text-sm text-red-600">{favorites.length} saved recipes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
