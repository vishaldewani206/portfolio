"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth-client"
import { useLoading } from "@/lib/loading"
import {  ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const AdminNav = ({image, handleLogout}: {image: string | null, handleLogout: ()=>Promise<void>})=>{
  return (
      <DropdownMenu>
      <DropdownMenuTrigger className="overflow-hidden rounded-full cursor-pointer" asChild>
        <Image src={image ?? ""} width={45} height={45} alt="Profile Photo" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/"}>Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard"}>Home</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/write">
              Write
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout} variant="destructive">
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export function UserProfile({image="", isAdmin}: {image?: string | null, isAdmin: boolean}) {
  const { show, hide } = useLoading()

  const handleLogout = async()=>{
    show("Logging Out....")
    await signOut()
    hide()
  }

  if(isAdmin) return <AdminNav image={image} handleLogout={handleLogout} />


  return (
    <div>
      <DropdownMenu>
      <DropdownMenuTrigger className="overflow-hidden rounded-full cursor-pointer" asChild>
        <Image src={image ?? ""} width={45} height={45} alt="Profile Photo" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/"}>Home</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Resume
            <DropdownMenuShortcut>
              <ArrowUpRight />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <a target="_blank" href={"https://github.com/vishaldewani206"}>
              GitHub
              <DropdownMenuShortcut>
                <ArrowUpRight />
              </DropdownMenuShortcut>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
              <a target="_blank" href={"https://www.linkedin.com/in/vishal-dewani/"}>
                LinkedIn
                <DropdownMenuShortcut>
                  <ArrowUpRight />
                </DropdownMenuShortcut>
              </a>
            </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout} variant="destructive">
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  )
}
