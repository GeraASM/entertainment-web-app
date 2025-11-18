import { authClient } from "@/lib/auth-client" // import the auth client

export async function getSession() {
    const { data: session, error } = await authClient.getSession()
    return {session, error};
}

