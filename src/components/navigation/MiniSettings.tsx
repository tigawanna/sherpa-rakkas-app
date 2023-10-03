import { useQueryClient } from "rakkasjs";
import { Avatar, AvatarImage, AvatarFallback } from "../shadcn/ui/avatar";
import { Button } from "../shadcn/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuItem, DropdownMenuShortcut } from "../shadcn/ui/dropdown-menu";
import { ThemeToggle,  } from "./ThemeToggle";
import { LogOut } from "lucide-react";


interface MiniSettingsModalProps {

}

export function MiniSettingsModal({}:MiniSettingsModalProps){
  const user = useQueryClient().getQueryData("user") as LuciaUser;
return (
  <DropdownMenu modal>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-7 w-7 rounded-full">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="https://tigawanna-portfolio.vercel.app/_next/image?url=%2Fgithub.jpg&w=384&q=75"
            alt="@shadcn"
          />
          <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent className="w-56 " align="end" forceMount>
      {user && (
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
      )}

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
      <span className="w-full flex items-center justify-center">
        <Button
          variant={"ghost"}
          className="w-[80%] btn btn-sm btn-outline btn-error text-xs"
          size={"sm"}
        >
          Log out
          <LogOut className="w-4 h-4 ml-2" />
        </Button>
      </span>
    </DropdownMenuContent>
  </DropdownMenu>
);
}
