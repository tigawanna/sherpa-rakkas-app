import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/shadcn/ui/tooltip";
import { isLinkCurrentPathname } from "@/utils/async";
import { Presentation } from "lucide-react";
import { usePageContext, StyledLink } from "rakkasjs";

interface DashBoardLinksProps {

}

export function DashBoardLinks({}:DashBoardLinksProps){
    const page_ctx = usePageContext();
    const url = page_ctx.url;
    const links = [
      { name: "projects", href: "/dashboard/project",icon:Presentation },
      { name: "auth", href: "/auth" },
    ];
return (
  <div className="h-full    ">
    <nav className="h-full p-1 flex flex-col items-center gap-2">
      {links.map((link) => {
        return (
          <StyledLink
            about={link.name}
            hidden={isLinkCurrentPathname(link.href, url)}
            href={link.href}
            className="p-1 hover:text-accent"
            activeClass="text-accent border border-b-accent"
          >
         <TooltipProvider delayDuration={200} >
              <Tooltip >
                <TooltipTrigger >
                  {" "}
                  {link?.icon ? <link.icon /> : link.name}
                </TooltipTrigger>
                <TooltipContent >
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </StyledLink>
        );
      })}
    </nav>
  </div>
);
}
