"use server"

import { cookies } from "next/headers"
import { account } from "./appwrite"
import type { User } from "./types"
import { AppwriteException } from "appwrite"

// Predefined credentials for authorized users
const AUTHORIZED_USERS = [
  { email: "admin@example.com", password: "securePassword123" },
  { email: "user@example.com", password: "userPassword456" },
]

export async function login(email: string, password: string) {
  // Check if the credentials match any of the authorized users
  const isAuthorized = AUTHORIZED_USERS.some((user) => user.email === email && user.password === password)

  if (!isAuthorized) {
    throw new Error("Invalid credentials")
  }

  try {
    // Create a session with Appwrite
    const session = await account.createEmailSession(email, password)

    // Store the session ID in a cookie
    cookies().set("appwrite-session", session.$id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return session
  } catch (error) {
    console.error("Login error:", error)
    throw error
  }
}

export async function logout() {
  try {
    // Get the current session ID from cookies
    const sessionId = cookies().get("appwrite-session")?.value

    if (sessionId) {
      // Delete the session in Appwrite
      await account.deleteSession(sessionId)
    }

    // Remove the session cookie
    cookies().delete("appwrite-session")
  } catch (error) {
    console.error("Logout error:", error)
  }
}

export async function getUser(): Promise<User | null> {
  try {
    // Get the current session ID from cookies
    const sessionId = cookies().get("appwrite-session")?.value

    if (!sessionId) {
      return null
    }

    // Get the user account
    const user = await account.get()

    return {
      id: user.$id,
      name: user.name,
      email: user.email,
    }
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 401) {
      // Session expired or invalid
      cookies().delete("appwrite-session")
    }
    return null
  }
}

