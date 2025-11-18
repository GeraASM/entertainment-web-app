import { Logo } from "@/components/icon/Logo"
import { FormLogin } from "@/components/forms/FormLogin"
import { getSession } from "@/lib/actions"
import { redirect } from "next/navigation";
export default async function LoginPage() {
    const session = await getSession();
    if (session?.user) {
        redirect("/dashboard");
    }

    return (
        <main>
            <section>
                <header className="mb-700 flex justify-center">
                    <Logo />
                </header>
                <FormLogin />
            </section>
        </main>
    )
}