"use client";

import { ModeToggle } from "@/components/ui/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import Menu from "../menu/Menu";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

const Header = () => {
  return (
    <>
      <header className="hidden lg:block lg:fixed top-0 left-0 right-0 p-2 bg-neutral-content border-double border-4 border-yellow-500 shadow-md z-50">
        <div className="container flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <ModeToggle />
            <Menu />
          </div>

          <Link href="/" className="w-20">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                priority
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="rounded-md object-contain"
              />
            </AspectRatio>
          </Link>
        </div>
      </header>
      <header className="flex flex-col lg:hidden px-2 gap-1">
        <div className="flex items-center justify-between">
          <ModeToggle />

          <Link href="/" className="w-20">
            <AspectRatio ratio={1 / 1}>
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                priority
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
                className="rounded-md object-contain drop-shadow-md"
              />
            </AspectRatio>
          </Link>
        </div>
        <Menu />
      </header>
    </>
  );
};
export default Header;
