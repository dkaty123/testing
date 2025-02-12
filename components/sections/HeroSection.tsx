import { motion } from "framer-motion"
import { LinkedinBadge } from "@/components/ui/linked-in-badge"
import { Button } from "@/components/ui/button"
import { HeroVideo } from "@/components/ui/hero-video"
import { WingsBackground } from "@/components/ui/WingsBackground"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export const HeroSection = () => {
  return (
    <main className="relative min-h-[90vh] overflow-hidden flex flex-col items-center justify-center lg:pt-36">
      {/* <WingsBackground /> */}
      <LinkedinBadge />
      <div className="container relative z-10 px-4 text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.3]"
        >
          <span className="white-gradient pb-6">Rewards for Recycling.</span>
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 text-center text-md lg:text-[16px] lg:px-24 font-medium text-[#B3B3B3] font-['Inter']"
          style={{
            fontFamily: '"Inter", "Inter Placeholder", sans-serif',
            fontWeight: 500
          }}
        >
          EcoPlastic is an{" "}
          <span className="highlighter-gradient">AI mobile app</span> that 
          rewards you for recycling by scanning plastic items in just 30 days.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-primary w-full sm:w-auto px-6 py-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/apple.svg"
                    alt="Apple"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  Source Code
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  href="https://github.com/dkaty123/EcoPlastic"
                  className="w-full"
                >
                  Play Store
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="https://github.com/dkaty123/EcoPlastic"
                  className="w-full"
                >
                  Download for Mac (Intel)
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8"
        >
          <HeroVideo />
        </motion.div>
      </div>
    </main>
  )
}
