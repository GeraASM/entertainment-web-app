import { Logo } from "@/components/icon/Logo"
import { FormSignUp } from "@/components/forms/FormSignUp"
export default function LoginPage() {

    return (
        <main>
            <section>
                <header className="mb-700 flex justify-center">
                    <Logo />
                </header>
                <FormSignUp />
            </section>
        </main>
    )
}