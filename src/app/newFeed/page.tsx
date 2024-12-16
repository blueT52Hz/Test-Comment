'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Calendar, Tag, Menu, X, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for posts
const posts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: [
    "The Art of Modern Web Development",
    "10 Must-Visit Destinations in 2024",
    "Understanding Artificial Intelligence",
    "The Future of Remote Work",
    "Sustainable Living Tips",
    "Digital Photography Basics",
    "Healthy Cooking Guide",
    "Financial Planning 101",
    "Mindfulness and Meditation",
    "Home Office Setup Ideas"
  ][i % 10],
  excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  category: ["Tech", "Travel", "Lifestyle", "Business", "Health"][i % 5],
  date: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString(),
  image: `https://picsum.photos/seed/${i + 1}/800/400`,
  thumbnail: `https://picsum.photos/seed/${i + 1}/400/300`,
  tags: ["Featured", "Popular", "New", "Trending"][i % 4].split(" "),
  readTime: Math.floor(Math.random() * 10) + 5
}))

const categories = ["All", "Tech", "Travel", "Lifestyle", "Business", "Health"]
const tags = ["Featured", "Popular", "New", "Trending"]

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTag, setSelectedTag] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const featuredPosts = posts.slice(0, 5)

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesSearch && matchesCategory && matchesTag
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPosts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mr-4 flex"
          >
            <a href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Blog Spot.</span>
            </a>
          </motion.div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[150px] sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_300px]">
          <main className="space-y-6">
            {/* Hero Carousel */}
            <section className="relative h-[400px] overflow-hidden rounded-xl">
              <AnimatePresence mode='wait'>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-full"
                >
                  <img
                    src={featuredPosts[currentSlide].image}
                    alt={featuredPosts[currentSlide].title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 p-6 text-white">
                      <Badge className="mb-2">{featuredPosts[currentSlide].category}</Badge>
                      <h2 className="mb-2 text-3xl font-bold">{featuredPosts[currentSlide].title}</h2>
                      <p className="mb-4">{featuredPosts[currentSlide].excerpt}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/40"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length)}
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/40"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % featuredPosts.length)}
              >
                <ChevronRight />
              </Button>
            </section>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all hover:scale-105"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Posts Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader className="p-0">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="h-48 w-full object-cover transition-transform hover:scale-105"
                      />
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground">{post.readTime} min read</span>
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between p-4">
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                      <Button variant="ghost" className="gap-2">
                        Read more <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className={`space-y-6 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}
          >
            {/* Calendar Widget */}
            <Card>
              <CardHeader>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Calendar className="h-4 w-4" /> Calendar
                </h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <div key={day} className="font-medium">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => (
                    <div
                      key={i}
                      className="rounded-full p-1 hover:bg-muted"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Tag className="h-4 w-4" /> Tags
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTag === tag ? "default" : "secondary"}
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Popular Posts</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post.id} className="flex gap-4">
                      <img
                        src={`https://picsum.photos/seed/${post.id}/100/100`}
                        alt={post.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-medium line-clamp-2">{post.title}</h4>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t bg-muted/50">
        <div className="container px-4 py-8 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h4 className="mb-4 font-semibold">About</h4>
              <p className="text-sm text-muted-foreground">
                Your go-to destination for the latest news, insights, and stories across various topics.
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Categories</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {categories.slice(1).map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Follow Us</h4>
              <div className="flex gap-4">
                {["Twitter", "Facebook", "Instagram"].map((social) => (
                  <Button key={social} variant="ghost" size="sm">
                    {social}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Newsletter</h4>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" type="email" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2024 Blog Spot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}