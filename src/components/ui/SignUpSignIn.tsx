"use client";
import Link from "next/link";

export function SignUpSignIn({text, url, option}: {text: string; url: string; option: string;}) {
    

 return (
    <div className="text-center flex gap-2 items-center justify-center">
        <p className="text-present-4-light text-white">{text}</p>
        <Link className="text-red-500" href={url}>{option}</Link>
    </div>
 )
}