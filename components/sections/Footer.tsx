"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center justify-left gap-6">
              <Image
                src="/logo.svg"
                alt="Interview Coder"
                width={24}
                height={24}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-neutral-400 font-bold text-xl">
                EcoPlastic AI
              </span>
            </div>

            <div className="text-neutral-500 text-sm">
              EcoPlastic is an AI app that rewards for you recylcings.
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 flex items-center gap-2 w-fit">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
              </div>
              <span className="text-neutral-400 text-sm">
                All systems online
              </span>
            </div>
          </div>

          {/* Middle Column - Support */}
          

          {/* Right Column - Download */}
          
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} EcoPlastic. All rights reserved.
          </p>
          <Link href="https://twitter.com/interviewcoder" target="_blank">
            <Image
              src="/twitter.svg"
              alt="Twitter"
              width={20}
              height={20}
              className="opacity-50 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </footer>
  )
}
