import { HoverEffect } from "../ui/card-hover-effect"

const CommandDescription = ({
  mode,
  description
}: {
  mode: string
  description: string
}) => (
  <div className="flex flex-col">
    <span className="font-medium text-neutral-200 mb-1">{mode}:</span>
    <span className="text-neutral-400">{description}</span>
  </div>
)

const commands = [
  {
    key: "welcome-screen",
    title: "Welcome Screen",
    description: "Displays the Recyclr logo and options to sign in using Google or email."
  },
  {
    key: "home-screen",
    title: "Home Screen",
    description:
      "Shows a list of items (e.g., plastic bottles, furniture, paper) that can be recycled, along with options to scan items and view reward balances."
  },
  {
    key: "scan-screen",
    title: "Scan Screen",
    description: "Allows users to scan items using the camera. Identifies recyclable items and rewards points for successful scans."
  },
  {
    key: "rewards-screen",
    title: "Rewards Screen",
    description:
      "Displays the user's rewards balance and allows them to redeem points for eco-friendly items or services such as waste collection tools or tree planting."
  },
  {
    key: "collection-points",
    title: "Collection Points Screen",
    description:
      "Shows a map with nearby recycling collection points. Provides details about the types of items accepted and pickup schedules."
  },
  {
    key: "profile-screen",
    title: "Profile Screen",
    description:
      "Displays user information such as profile picture, name, points earned, and address. Allows users to convert points into coins for eco-friendly tools."
  }
];

export function CommandsSection() {
  return (
    <section className="py-24 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            <span className="white-gradient font-inter">Features we love</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            This is a quick summary of all the cool stuff EcoPlastic AI can do!.
          </p>
        </div>
        <HoverEffect items={commands} />
      </div>
    </section>
  )
}
