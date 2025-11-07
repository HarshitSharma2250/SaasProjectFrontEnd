
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"

export default function BreadCrumbs() {
    const pathName = usePathname()
    const segments = pathName?.split("/").filter(Boolean) ?? [];
    if (segments.length === 0) return null;

    return (
        <>
            <nav className="m-2">
                <ol className="flex gap-1">
                    {segments.map((segment, index) => {
                        const href = "/" + segments.slice(0, index + 1).join("/");
                        const label = decodeURIComponent(segment)
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase());

                        return (
                            <li key={href} className="flex items-center space-x-2">
                                {index > 0 && <span>/</span>}
                                <Link href={href} className="hover:underline text-blue-600">
                                    {label}
                                </Link>
                            </li>
                        );
                    })}

                </ol>
            </nav>

        </>
    )
}