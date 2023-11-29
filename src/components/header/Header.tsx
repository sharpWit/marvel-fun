"use client";

import { ModeToggle } from "@/components/ui/ModeToggle";
import Image from "next/image";
import Link from "next/link";
import Menu from "../menu/Menu";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Logo from "./Logo";
import SearchBar from "../search/SearchBar";

const Header = () => {
  return (
    <>
      <header className="hidden lg:block lg:fixed top-0 left-0 right-0 p-2 bg-neutral-content border-double border-4 border-yellow-500 shadow-md z-50">
        <div className="container flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <ModeToggle />
              <SearchBar />
            </div>
            <Menu />
          </div>

          <Logo />
        </div>
      </header>
      <header className="flex items-center justify-between lg:hidden p-4">
        <div className="flex flex-col items-center justify-between gap-2">
          <div className="self-start flex items-center justify-center gap-1">
            <ModeToggle />
            <SearchBar />
          </div>
          <Menu />
        </div>
        <Link href="/" className="w-20">
          <AspectRatio ratio={1 / 1}>
            <Image
              src="/logo.svg"
              alt="Logo"
              fill
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="rounded-md object-contain drop-shadow-md bg-black"
            />
          </AspectRatio>
        </Link>
      </header>
    </>
  );
};
export default Header;
