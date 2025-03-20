import Link from "next/link"
import { getUser } from "@/lib/auth-utils"
import { Button } from "@/components/ui/button"
import UserMenu from "./user-menu"

export default async function Header() {
  const user = await getUser()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          yadein
        </Link>
        <div>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

