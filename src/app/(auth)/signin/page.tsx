import { Logo } from "@/components/icon/Logo"
import { FormLogin } from "@/components/forms/FormLogin"
export default function LoginPage() {

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