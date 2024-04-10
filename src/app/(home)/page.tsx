import Link from 'next/link'
import Image from "next/image";
import { Start } from "@/app/components/button";

export default function Page () {
  return (
    <main>
      <Image
        className="mx-auto mt-[20%] relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
      <Link href="/answer">
        <Start />
      </Link>
    </main>
  )
}