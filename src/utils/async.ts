export async function artificialDelay(delay: number) {
    await new Promise((resolve) => setTimeout(resolve,delay));
}

export function isLinkCurrentPathname(path: string,url:URL|string) {
    if (typeof url === "string") {
        url = new URL(url)
    }
    if (path === url.pathname) {
        return true
    }
    return false
}
