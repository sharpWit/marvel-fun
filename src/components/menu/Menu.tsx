"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./NavigationMenu";
import { Separator } from "../ui/Separator";

const Menu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Marvel Journey</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col gap-2 min-w-max p-2">
            <Link href="/characters" legacyBehavior passHref>
              <NavigationMenuLink className="p-2 rounded-sm hover:bg-yellow-500 hover:text-primary-foreground">
                Characters
              </NavigationMenuLink>
            </Link>
            <Link href="/comics" legacyBehavior passHref>
              <NavigationMenuLink className="p-2 rounded-sm hover:bg-yellow-500 hover:text-primary-foreground">
                Comics
              </NavigationMenuLink>
            </Link>
            <Link href="/creators" legacyBehavior passHref>
              <NavigationMenuLink className="p-2 rounded-sm hover:bg-yellow-500 hover:text-primary-foreground">
                Creators
              </NavigationMenuLink>
            </Link>
            <Link href="/events" legacyBehavior passHref>
              <NavigationMenuLink className="p-2 rounded-sm hover:bg-yellow-500 hover:text-primary-foreground">
                Events
              </NavigationMenuLink>
            </Link>
            <Link href="/series" legacyBehavior passHref>
              <NavigationMenuLink className="p-2 rounded-sm hover:bg-yellow-500 hover:text-primary-foreground">
                Series
              </NavigationMenuLink>
            </Link>
            <Separator />
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className="p-2 rounded-sm hover:bg-yellow-500 hover:text-primary-foreground">
                About me
              </NavigationMenuLink>
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Menu;
