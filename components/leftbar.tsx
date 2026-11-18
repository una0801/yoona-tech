import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo, NavMenu } from "./navbar";
import { Button } from "./ui/button";
import { AlignLeftIcon } from "lucide-react";
import { FooterButtons } from "./footer";
import { DialogTitle } from "./ui/dialog";
import { getNavTree } from "@/lib/nav-server";
import { DocsSidebar, SectionNav } from "./section-nav";

export function Leftbar() {
  return <DocsSidebar tree={getNavTree()} />;
}

export function SheetLeftbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden flex">
          <AlignLeftIcon aria-hidden />
          <span className="sr-only">문서 메뉴</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 px-0" side="left">
        <DialogTitle className="sr-only">문서 메뉴</DialogTitle>
        <SheetHeader>
          <SheetClose className="px-5" asChild>
            <Logo />
          </SheetClose>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col gap-2.5 mt-3 mx-2 px-5">
            <NavMenu isSheet />
          </div>
          <div className="mx-2 px-5">
            <SectionNav tree={getNavTree()} isSheet />
          </div>
          <div className="p-6 pb-4 flex gap-2.5">
            <FooterButtons />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
