import { Link, StyledLink } from "rakkasjs";
import { MiniSettingsModal } from "./MiniSettings";

interface ToolbarProps {

}

export function Toolbar({}:ToolbarProps){
    const links = [
      { title: "Authentication", href: "/authentication" },
      { title: "Forms", href: "/forms" },
      { title: "Dashboard", href: "/dashboard" },
      { title: "Cards", href: "/cards" },
      { title: "Music", href: "/music" },
      { title: "Playground", href: "/playground" },
      { title: "tasks", href: "/tasks" },
    ];
return (

      <header
        className="w-full flex gap-4 justify-between  text-primary-content bg-primary
      t  px-2 py-1 sticky top-0 z-50"
      >
        <Link href="/" className="text-2xl font-bold">
          Home
        </Link>
        <StyledLink href="/guarded" activeStyle={{ fontWeight: "bold" }}>
          Guarded
        </StyledLink>

        {/* <nav className="flex gap-4 px-3 ">
          {links.map((link) => (
            <StyledLink
              className="py-1 px-2"
              activeClass="text-accent"
              key={link.href}
              href={link.href}
            >
              {link.title}
            </StyledLink>
          ))}
        </nav> */}

        <MiniSettingsModal/>
      </header>
);
}
