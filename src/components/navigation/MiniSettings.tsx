import {
  useMutation,
  useQueryClient,
  navigate,
  MutationFunction,
  usePageContext,
} from "rakkasjs";
import { Avatar, AvatarImage, AvatarFallback } from "../shadcn/ui/avatar";
import { Button } from "../shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "../shadcn/ui/dropdown-menu";
import { ThemeToggle } from "./ThemeToggle";
import { CurrentUserSection } from "./CurrentUserSection";
import { useEffect, useState } from "react";

interface MiniSettingsModalProps {}

export function MiniSettingsModal({}: MiniSettingsModalProps) {
  const qc = useQueryClient();
  const user = qc.getQueryData("user") as LuciaUser | undefined;
  const [open, setOpen] = useState(false);
  
// close modal after a short delay
// useEffect(() => {
//   if(open){
//   const timeout = setTimeout(() => {
//     setOpen(false);
//   }, 10000);
//   return () => {
//     clearTimeout(timeout);
//   }
// }
// }, [open]);

  return (
    <DropdownMenu modal open={open} onOpenChange={setOpen} >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-7 w-7 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://tigawanna-portfolio.vercel.app/_next/image?url=%2Fgithub.jpg&w=384&q=75"
              alt="@shadcn"
            />
            <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 " align="end" forceMount>


        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        {/* theme toggle */}
        <ThemeToggle />
        <DropdownMenuSeparator />
        {/* logout button */}
        <CurrentUserSection setOpen={setOpen}/>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
