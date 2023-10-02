import { GithubIcon } from "lucide-react";
import { Link } from "rakkasjs";

interface OAuthprovidersProps {

}

export function OAuthproviders({}:OAuthprovidersProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
    <Link href="/api/auth/oauth/github" className="btn btn-outline" prefetch="never">
        <GithubIcon className="w-6 h-6"/>
    </Link>
 </div>
);
}
