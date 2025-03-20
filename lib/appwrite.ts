import { Client, Account, Storage, Databases, ID, Query } from "appwrite"

// Initialize Appwrite client
const client = new Client()

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "")

// Export Appwrite services
export const account = new Account(client)
export const storage = new Storage(client)
export const databases = new Databases(client)

// Constants
export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || ""
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || ""
export const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || ""

export { ID, Query }
export default client

