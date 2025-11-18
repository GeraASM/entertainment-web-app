"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
export function ButtonSignOut () {
    const router = useRouter();
    return (
        <button onClick={async () => await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                router.push("/signin"); // redirect to login page
                },
            },
        })} className="text-red-500 font-bold p-2 rounded-2xl bg-red-500/20 border border-red-500">
            <Image src="/assets/icon-signout.svg" width={24} height={24} alt="signout" />
        </button>
    )
}