import { isLinkCurrentPathname } from "@/utils/async";
import { Bookmark, ClipboardCheck, GraduationCap, HelpingHand, Presentation, Trophy, UserCircle } from "lucide-react";
import { usePageContext, StyledLink } from "rakkasjs";

interface DashBoardLinksProps {

}

export function DashBoardLinks({}:DashBoardLinksProps){
    const page_ctx = usePageContext();
    const url = page_ctx.url;
    const links = [
      { name: "projects", href: "/dashboard/project", icon: Presentation },
      { name: "hacakthons", href: "/dashboard/hackathon", icon:Trophy },
      { name: "experience", href: "/dashboard/experience", icon:ClipboardCheck },
      { name: "internship", href: "/dashboard/internship", icon:HelpingHand },
      { name: "content", href: "/dashboard/content", icon:Bookmark },
      { name: "education", href: "/dashboard/education", icon:GraduationCap },
    ];
return (
  <div className="h-full    ">
    <nav className="h-full p-1 flex flex-col items-center gap-2">
      {links.map((link) => {
        return (
          <StyledLink
            key={link.name}
            about={link.name}
            hidden={isLinkCurrentPathname(link.href, url)}
            href={link.href}
            className="p-1 hover:text-accent w-full bg-base-100 rounded group "
            activeClass="text-accent border border-b-accent"
          >
            <div className="flex gap-1 w-full justify-between x">
              <button
                className="md:tooltip hover:md:tooltip-open md:tooltip-right"
                data-tip={link.name}
              >
                <link.icon />
              </button>
              <div className=" md:hidden flex justify-end p-2 animate-in ">
                {link.name}
              </div>
            </div>
          </StyledLink>
        );
      })}
    </nav>
  </div>
);
}
