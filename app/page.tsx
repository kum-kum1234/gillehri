import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth-utils"
import ImageGallery from "@/components/image-gallery"

export default async function Home() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <ImageGallery />
    </main>
  )
}

