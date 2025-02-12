import { AnimatedKeyboard } from "@/components/ui/AnimatedKeyboard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

const words = ["kill Leetcode", "fix Technical", "change Coding"]
const faqs = [
  {
    question: "Is EcoPlastic AI free?",
    answer:
      "Yes it is free to use! Launching on the Google Play Store Soon"
  },
  {
    question: "How does the app work?",
    answer: `
      <div>
        Ecoplastic uses machine learning to identify recyclable items through your phone's camera. 
        Here's how it works:
        <ul class="list-none space-y-2 mt-2">
          <li>• Scan plastic bottles, furniture, and paper using the camera.</li>
          <li>• The app identifies whether the item is recyclable and rewards points for eligible items.</li>
          <li>• Redeem points for eco-friendly items or services, like waste collection tools or tree planting.</li>
        </ul>
      </div>
    `
  },
  {
    question: "Is it suitable for all age groups?",
    answer: "Yes. The app is designed to be simple and user-friendly, making it suitable for all age groups."
  },
  {
    question: "How do I earn rewards?",
    answer: `
      <div>
        You earn rewards by scanning recyclable items. Each successful scan adds points to your balance, 
        which you can redeem for eco-friendly tools, discounts, or services like tree planting.
      </div>
    `
  },
  {
    question: "What should I do if I experience a bug?",
    answer: `
      <div>
        Most issues can be resolved by reinstalling the app. If the problem persists, 
        please email us at <a href='mailto:devkatyal01@gmail.com'>devkatyal01@gmail.com</a>, and we’ll respond within 24 hours.
      </div>
    `
  },
  {
    question: "Is my data secure?",
    answer: `
      <div>
        Yes. We prioritize user privacy and data security. 
        All data is stored securely and used only to enhance your experience with the app.
      </div>
    `
  }
]

function FaqItem({
  question,
  answer,
  isOpen,
  onClick
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      initial={false}
      className={cn(
        "border-b border-neutral-700/40 last:border-none",
        isOpen ? "bg-neutral-900/50" : ""
      )}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-4 px-5 text-left"
      >
        <span className="text-lg font-medium text-neutral-200">{question}</span>
        <span
          className={cn(
            "ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-700/50",
            isOpen ? "bg-neutral-700" : "bg-transparent"
          )}
        >
          <svg
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="pb-4 px-5 text-neutral-400"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            <span className="white-gradient font-inter">Common Questions</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Everything you need to know about EcoPlastic AI
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-2xl border border-neutral-700/40 divide-y divide-neutral-700/40 bg-neutral-900/20 backdrop-blur-sm">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="max-w-xs mx-auto my-24">
          <div className="h-px bg-neutral-800" />
        </div>

        {/* Call to Action */}
        <div className="text-center ">
          <div className="relative w-full h-[600px] lg:h-[800px]">
            <AnimatedKeyboard />
          </div>
          <div className="">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                Save the Planet.
              </h2>
              <p className="text-neutral-400">
                Download and use EcoPlastic AI today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="text-black gap-2 text-sm font-medium h-10 w-[280px] md:w-[320px] bg-primary hover:bg-primary/90">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/apple.svg"
                        alt="Apple"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      Download for Mac
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link
                      href="https://github.com/dkaty123/EcoPlastic"
                      className="w-full"
                    >
                     View on Github
                    </Link>
                  </DropdownMenuItem>
                  
                </DropdownMenuContent>
              </DropdownMenu>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
