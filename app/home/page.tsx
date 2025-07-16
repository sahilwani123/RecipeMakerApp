"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, List, Heart, Clock, Users, Star, ChefHat, Filter } from "lucide-react"
import Image from "next/image"

const indianRecipes = [
  {
    id: 1,
    name: "Butter Chicken",
    image: "/placeholder.svg?height=200&width=300",
    time: "45 min",
    servings: 4,
    rating: 4.8,
    difficulty: "Medium",
    ingredients: ["Chicken", "Tomatoes", "Cream", "Spices"],
    category: "Main Course",
  },
  {
    id: 2,
    name: "Biryani",
    image: "/placeholder.svg?height=200&width=300",
    time: "60 min",
    servings: 6,
    rating: 4.9,
    difficulty: "Hard",
    ingredients: ["Basmati Rice", "Mutton", "Saffron", "Onions"],
    category: "Main Course",
  },
  {
    id: 3,
    name: "Masala Dosa",
    image: "/placeholder.svg?height=200&width=300",
    time: "30 min",
    servings: 2,
    rating: 4.7,
    difficulty: "Medium",
    ingredients: ["Rice", "Urad Dal", "Potatoes", "Spices"],
    category: "Breakfast",
  },
  {
    id: 4,
    name: "Chole Bhature",
    image: "/placeholder.svg?height=200&width=300",
    time: "40 min",
    servings: 4,
    rating: 4.6,
    difficulty: "Medium",
    ingredients: ["Chickpeas", "Flour", "Yogurt", "Spices"],
    category: "Main Course",
  },
  {
    id: 5,
    name: "Gulab Jamun",
    image: "/placeholder.svg?height=200&width=300",
    time: "25 min",
    servings: 8,
    rating: 4.8,
    difficulty: "Easy",
    ingredients: ["Milk Powder", "Sugar", "Cardamom", "Rose Water"],
    category: "Dessert",
  },
  {
    id: 6,
    name: "Palak Paneer",
    image: "/placeholder.svg?height=200&width=300",
    time: "35 min",
    servings: 4,
    rating: 4.5,
    difficulty: "Easy",
    ingredients: ["Spinach", "Paneer", "Onions", "Spices"],
    category: "Main Course",
  },
]

const categories = [
  { name: "All", icon: "🍽️", active: true },
  { name: "Breakfast", icon: "🌅", active: false },
  { name: "Main Course", icon: "🍛", active: false },
  { name: "Dessert", icon: "🍰", active: false },
  { name: "Snacks", icon: "🥨", active: false },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (recipeId: number) => {
    setFavorites((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Recipe Maker</h1>
              <p className="text-orange-100 text-sm">Discover Indian Flavors</p>
            </div>
            <div className="bg-white/20 rounded-full p-2">
              <ChefHat className="w-6 h-6" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-12 bg-white/90 border-0 text-gray-800 placeholder-gray-500"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-around bg-white/10 backdrop-blur-sm">
          <Button
            variant="ghost"
            className={`flex-1 py-4 text-white hover:bg-white/20 ${activeTab === "add" ? "bg-white/20" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Recipe
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 py-4 text-white hover:bg-white/20 ${activeTab === "list" ? "bg-white/20" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            <List className="w-5 h-5 mr-2" />
            List
          </Button>
          <Button
            variant="ghost"
            className={`flex-1 py-4 text-white hover:bg-white/20 ${activeTab === "favorites" ? "bg-white/20" : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            <Heart className="w-5 h-5 mr-2" />
            Favorites
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={category.active ? "default" : "outline"}
              size="sm"
              className={`flex-shrink-0 ${
                category.active ? "bg-orange-500 hover:bg-orange-600 text-white" : "border-gray-200 hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Featured Recipes</h2>
          <div className="grid gap-4">
            {indianRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Recipe Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Recipe Details */}
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800 text-sm">{recipe.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(recipe.id)}
                          className="p-1 h-auto"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.includes(recipe.id) ? "fill-red-500 text-red-500" : "text-gray-400"
                            }`}
                          />
                        </Button>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {recipe.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {recipe.servings} servings
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {recipe.rating}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                          <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                            {ingredient}
                          </Badge>
                        ))}
                        {recipe.ingredients.length > 3 && (
                          <Badge variant="secondary" className="text-xs px-2 py-0">
                            +{recipe.ingredients.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          recipe.difficulty === "Easy"
                            ? "border-green-500 text-green-600"
                            : recipe.difficulty === "Medium"
                              ? "border-yellow-500 text-yellow-600"
                              : "border-red-500 text-red-600"
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
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-orange-100 to-orange-200 border-orange-200">
            <CardContent className="p-4 text-center">
              <Plus className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold text-orange-800 text-sm">Create Recipe</h3>
              <p className="text-orange-600 text-xs">Add your own recipe</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-100 to-red-200 border-red-200">
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold text-red-800 text-sm">My Favorites</h3>
              <p className="text-red-600 text-xs">{favorites.length} saved recipes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
