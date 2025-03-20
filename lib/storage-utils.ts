"use server"

import { storage, BUCKET_ID, ID } from "./appwrite"
import type { ImageFile } from "./types"

export async function uploadImage(file: File) {
  try {
    // Create a file in Appwrite Storage
    const result = await storage.createFile(BUCKET_ID, ID.unique(), file)

    // Return the file details
    return {
      id: result.$id,
      name: result.name,
      url: getFilePreview(result.$id),
      createdAt: result.$createdAt,
    }
  } catch (error) {
    console.error("Upload error:", error)
    throw error
  }
}

export async function getImages(): Promise<ImageFile[]> {
  try {
    // List all files in the bucket
    const result = await storage.listFiles(BUCKET_ID)

    // Map the files to our ImageFile type
    return result.files.map((file) => ({
      id: file.$id,
      name: file.name,
      url: getFilePreview(file.$id),
      createdAt: file.$createdAt,
    }))
  } catch (error) {
    console.error("Get images error:", error)
    throw error
  }
}

export function getFilePreview(fileId: string): string {
  return storage.getFilePreview(BUCKET_ID, fileId, 800, 800).toString()
}

export async function deleteImage(fileId: string) {
  try {
    await storage.deleteFile(BUCKET_ID, fileId)
    return true
  } catch (error) {
    console.error("Delete image error:", error)
    throw error
  }
}

