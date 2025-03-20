"use client"

import { useEffect, useState } from "react"
import { getImages } from "@/lib/storage-utils"
import type { ImageFile } from "@/lib/types"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ImageGallery() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getImages()
        setImages(fetchedImages)
      } catch (error) {
        console.error("Error fetching images:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {Array.from({ length: 16 }).map((_, index) => (
          <Card key={index} className="overflow-hidden border-2 rounded-lg">
            <CardContent className="p-0">
              <Skeleton className="h-40 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      {images.length > 0 ? (
        images.map((image) => (
          <Card key={image.id} className="overflow-hidden border-2 rounded-lg">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={image.url || "/placeholder.svg"}
                  alt={image.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-4 text-center py-10">
          <p className="text-muted-foreground">No images found. Upload some images to get started!</p>
        </div>
      )}
    </div>
  )
}

