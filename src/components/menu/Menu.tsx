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

const Menu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Marvel Journey</NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col gap-2 min-w-max p-2">
            <Link href="/characters" legacyBehavior passHref>
              <NavigationMenuLink className="p-2 rounded-sm hover:bg-yellow-500 hover:text-primary-foreground">
                All Characters
              </NavigationMenuLink>
            </Link>
            <Link href="/comics" legacyBehavior passHref>
              <NavigationMenuLink className="p-2 rounded-sm hover:bg-yellow-500 hover:text-primary-foreground">
                All Comics
              </NavigationMenuLink>
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default Menu;
