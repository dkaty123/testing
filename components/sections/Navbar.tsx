"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu, Lock, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "../ui/badge"

async function fetchUserAndSubscription() {
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (!session) return { user: null, subscription: null }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", session.user.id)
    .single()

  return { user: session.user, subscription }
}

async function fetchGitHubStars() {
  const response = await fetch(
    "https://github.com/dkaty123/EcoPlastic"
  )
  const data = await response.json()
  return data.stargazers_count
}

const GitHubStarsButton = ({
  githubData,
  isLoading
}: {
  githubData: number | undefined
  isLoading: boolean
}) => {
  if (isLoading) {
    return <Skeleton className="h-6 w-[80px] mr-4" />
  }

  return (
    <Link
      href="https://github.com/dkaty123/EcoPlastic"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full flex items-center gap-2 text-[#989898] hover:text-white transition-colors px-3 py-1.5 hover:bg-white/10"
    >
      <Image
        src="/github.svg"
        alt="GitHub"
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <span className="text-sm">{githubData || 5}</span>
    </Link>
  )
}

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const queryClient = useQueryClient()

  const { data, isLoading: loading } = useQuery({
    queryKey: ["user-nav"],
    queryFn: fetchUserAndSubscription,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchInterval: 1000 * 60 * 5 // Refetch every 5 minutes
  })

  const { data: githubData, isLoading: githubLoading } = useQuery({
    queryKey: ["github-stars"],
    queryFn: fetchGitHubStars,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchInterval: 1000 * 60 * 5 // Refetch every 5 minutes
  })

  const user = data?.user
  const subscription = data?.subscription
  const isSubscribed = subscription?.status === "active"

  // Add window width tracking
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Calculate progress as percentage (0 to 1) up to 10% of screen height
      const progress = Math.min(1, window.scrollY / (window.innerHeight * 0.1))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Invalidate and remove all queries from the cache
      await queryClient.invalidateQueries()
      queryClient.removeQueries()

      // Then navigate
      router.push("/")
    } catch (error) {
      console.error("LogIn Invalid!", error)
      setIsSigningOut(false)
    }
  }

  const renderAuthSection = () => {
    if (loading) {
      return (
        <>
          <div className="hidden md:flex items-center gap-4">
            <Skeleton className="h-9 w-[100px]" />
            <Skeleton className="h-9 w-[100px]" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </>
      )
    }

    if (user) {
      return (
        <>
          <GitHubStarsButton
            githubData={githubData}
            isLoading={githubLoading}
          />
          {!isSubscribed && (
            <Button onClick={() => router.push("/")} className="relative">
              <Lock className="w-4 h-4 mr-2 text-black" />
            {  /* Subscribe */}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <ChevronDown className="w-4 h-4 text-[#989898]" />
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-primary text-xs">
                      {user.email?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isSubscribed && (
                    <div className="absolute -top-1 -right-3 bg-primary text-black text-[10px] font-semibold px-1.5 rounded-full">
                 {/* PRO */}
                    </div>
                  )}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-[#1A1A1A] backdrop-blur-lg border-white/10 rounded-xl py-2 space-y-1"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="cursor-pointer text-[#ABABAB] hover:text-white px-3 py-2.5"
                >
                  {/*Settings*/}
                </Link>
              </DropdownMenuItem>
              <div className="h-px bg-white/10 mx-3 my-1" />
              <DropdownMenuItem
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="cursor-pointer text-[#FF4545] hover:text-red-400 px-3 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSigningOut ? "Signing out..." : "Log out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    }

    return (
      <>
        <GitHubStarsButton githubData={githubData} isLoading={githubLoading} />
        <Link
          href="/signin"
          className="text-[#989898] hover:text-white transition-colors text-sm"
        >
          {/*Sign in*/}
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-black transition-all px-4 py-1.5 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Image
                  src="/apple.svg"
                  alt="Apple"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                Download
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[280px] bg-[#1A1A1A] backdrop-blur-lg border-white/10 rounded-xl py-2 space-y-1 md:w-auto"
            align="end"
            sideOffset={8}
          >
            
            <DropdownMenuItem asChild>
              <Link
                href="https://github.com/dkaty123/EcoPlastic/tree/main"
                className="w-full flex items-center gap-2 px-3 py-2.5 text-[#ABABAB] hover:text-white"
              >
                <Image
                  src="/apple.svg"
                  alt="Apple"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                View on Github
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  }

  return (
    <>
      <div className="fixed left-0 top-0 w-full z-50 flex justify-center pt-2 md:pt-0">
        <div
          className="w-full px-4 flex justify-center"
          style={{
            paddingTop:
              windowWidth >= 768 ? `${8 + scrollProgress * 8}px` : "8px",
            paddingLeft:
              windowWidth >= 768 ? `${scrollProgress * 16}px` : "16px",
            paddingRight:
              windowWidth >= 768 ? `${scrollProgress * 16}px` : "16px"
          }}
        >
          <nav
            className="relative w-full rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 md:transition-all md:duration-300"
            style={
              windowWidth >= 768
                ? {
                    width:
                      scrollProgress === 0
                        ? "100%"
                        : `${100 - scrollProgress * 25}%`,
                    backgroundColor: `rgba(0, 0, 0, ${scrollProgress * 0.4})`,
                    backdropFilter: `blur(${scrollProgress * 16}px)`,
                    borderColor: `rgba(255, 255, 255, ${scrollProgress * 0.1})`
                  }
                : {}
            }
          >
            <div className="h-16 flex items-center justify-between px-6">
              <Link
                href="/"
                className="text-white hover:text-white/80 transition-colors flex items-center gap-2 shrink-0"
              >
                <Image
                  src="/logo.svg"
                  alt="Interview Coder"
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full"
                />
                <span
                  className="text-sm font-semibold transition-opacity duration-300 md:block hidden"
                  style={{
                    opacity: Math.max(0, 1 - scrollProgress * 2)
                  }}
                >
                  EcoPlastic 
                </span>
              </Link>

              <div className="flex-1 flex items-center justify-center">
                <div
                  className="hidden md:flex items-center gap-8 transition-all duration-300"
                  style={{
                    width: "100%",
                    justifyContent: "center"
                  }}
                >
                  <Link
                    href="/#how-to-use"
                    className="text-[#989898] hover:text-white transition-colors text-sm"
                  >
                    How to Use
                  </Link>
                  <div>
                    <Link
                      href="/#subscription"
                      className="text-[#989898] hover:text-white transition-colors text-sm"
                    >
                      <span className="">
                        Instagram
                        <Badge variant="highlight" className="ml-2">
                          NEW
                        </Badge>
                      </span>
                    </Link>
                  </div>
                  <Link
                    href="/#faq"
                    className="text-[#989898] hover:text-white transition-colors text-sm"
                  >
                    FAQ
                  </Link>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-4 shrink-0">
                {renderAuthSection()}
              </div>

              <button
                ref={menuButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors",
                  mobileMenuOpen && "bg-white/5"
                )}
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div
                ref={mobileMenuRef}
                className="absolute left-0 right-0 top-14 z-50 md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl rounded-b-2xl shadow-lg"
              >
                <div className="px-6 py-4 space-y-4">
                  <Link
                    href="/"
                    className="block text-[#989898] hover:text-white transition-colors text-sm"
                  >
                    How to Use
                  </Link>
                  <Link
                    href="/"
                    className="block text-[#989898] hover:text-white transition-colors text-sm"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/"
                    className="block text-[#989898] hover:text-white transition-colors text-sm"
                  >
                    FAQ
                  </Link>

                  {!loading && (
                    <div className="pt-2 border-t border-white/10 w-fit">
                      <GitHubStarsButton
                        githubData={githubData}
                        isLoading={githubLoading}
                      />
                      {user ? (
                        <>
                          {!isSubscribed && (
                            <Button
                              onClick={() => router.push("/")}
                              className="relative"
                            >
                              <Lock className="w-4 h-4 mr-2 text-black" />
                              Subscribe
                            </Button>
                          )}
                          <div className="flex items-center gap-3 py-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={user.user_metadata?.avatar_url}
                              />
                              <AvatarFallback className="bg-primary text-xs">
                                {user.email?.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm text-white">
                                {user.email}
                              </span>
                            </div>
                          </div>
                          <Link
                            href="/settings"
                            className="block text-[#989898] hover:text-white transition-colors text-sm py-2"
                          >
                            DOnt need this (settings)
                          </Link>
                          <button
                            onClick={handleSignOut}
                            className="w-full text-left text-[#FF4545] hover:text-red-400 text-sm py-2"
                          >
                            LG
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href="/signin"
                            className="block text-[#989898] hover:text-white transition-colors text-sm"
                          >
                            Get rid of this feature
                          </Link>
                          <div className="space-y-2 mt-2">
                            <Link
                              href="https://github.com/dkaty123/EcoPlastic/tree/main"
                              className="flex items-center gap-2 justify-center w-full bg-primary hover:bg-primary/90 text-black transition-all px-4 py-1.5 text-sm font-medium rounded-md"
                            >
                              <Image
                                src="/apple.svg"
                                alt="Apple"
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              />
                              Download for Mac (Apple Silicon)
                            </Link>
                            <Link
                              href="https://github.com/dkaty123/EcoPlastic/tree/main"
                              className="flex items-center gap-2 justify-center w-full bg-primary hover:bg-primary/90 text-black transition-all px-4 py-1.5 text-sm font-medium rounded-md"
                            >
                              <Image
                                src="/apple.svg"
                                alt="Apple"
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              />
                              Download for Mac (Intel) (also dont need download or mac)
                            </Link>
                            <Link
                              href="/waitlist"
                              className="flex items-center gap-2 justify-center w-full bg-secondary hover:bg-secondary/90 text-white transition-all px-4 py-1.5 text-sm font-medium rounded-md"
                            >
                              <Image
                                src="/windows.svg"
                                alt="Windows"
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              />
                              Windows Waitlist
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}
