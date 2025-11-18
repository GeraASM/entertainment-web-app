"use client";
import { ButtonSubmit } from "../ui/ButtonSubmit";
import { Title } from "../ui/Title";
import { SignUpSignIn } from "../ui/SignUpSignIn";
import { useForm } from "react-hook-form";
import {z} from "zod";
import{ zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Form = z.object({
    email: z.email({message: "Email invalid"}),
    password: z.string({message: "Can't be empty"}).min(8, {message: "Password must be at least 8 characters"}),
    passwordRepeat: z.string({message: "Can't be empty"}).min(8, {message: "Password must be at least 8 characters"})
}).refine((values) => values.password == values.passwordRepeat, {message: "Passwords aren't equals", path: ["passwordRepeat"]});

type FormType = z.infer<typeof Form>;



export function FormSignUp() {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormType>({
        resolver: zodResolver(Form),
        defaultValues: {email: "", password: "", passwordRepeat: ""}
    })

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(data: FormType) {
        try {
            setLoading(true);
            setError(null);

            const nameEmail = data.email.split("@")[0];

            const { error } = await authClient.signUp.email({
            name: nameEmail,
            email: data.email,
            password: data.password,
            callbackURL: "/dashboard",
            });

            if (error) {
                console.log(error.message);
            setError(error.message ?? "Something went wrong.");
            return;
            }

            router.push("/dashboard");
        } finally {
            reset();
            setLoading(false);
        }
        }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="relative max-w-[320px] min-w-[320px] md:max-w-f md:min-w-f rounded-[10px] min-h-[425px] bg-blue-900 px-6 py-10 flex flex-col gap-500">
                    {error && <p className="text-red-500 absolute left-1/2 -translate-1/2 p-2 rounded-2xl min-w-[220px] text-center bg-red-500/20 border top-0 border-red-500 z-10">{error}</p>}
                    <Title text="Sign Up" />
                    <div>
                        <label className={`relative border-b block border-blue-500 w-full hover:border-white ${errors.email ? "border-red-500" : "border-blue-500"}`} htmlFor="email">
                            <input {...register("email")} className="caret-red-500 w-full p-4 text-present-4 text-white focus:outline-0 focus:outline-transparent" type="email" id="email" name="email" placeholder="Email address" />
                            {
                                errors.email &&
                                <small className="text-red-500 absolute right-0 top-1/2 -translate-y-1/2">{errors.email?.message}</small>
                            }
                        </label>
                        <label  htmlFor="password" className={`relative block w-full border-b border-blue-500 hover:border-white ${errors.password ? "border-red-500" : "border-blue-500"}`}>
                            <input {...register("password")} className="caret-red-500 w-full p-4 text-present-4 text-white focus:outline-0 focus:outline-transparent" type="password" id="password" name="password" placeholder="Password" />
                            {
                                errors.password &&
                                <small className="text-red-500 absolute right-0 top-1/2 -translate-y-1/2">{errors.password?.message}</small>
                            }
                        </label>
                        <label  htmlFor="passwordRepeat" className={`relative block w-full border-b border-blue-500 ${errors.passwordRepeat ? "border-red-500" : "border-blue-500"}`}>
                            <input {...register("passwordRepeat")} className="caret-red-500 w-full p-4 text-present-4 text-white focus:outline-0 focus:outline-transparent" type="password" id="passwordRepeat" name="passwordRepeat" placeholder="Repeat Password" />
                            {
                                errors.passwordRepeat &&
                                <small className="text-red-500 absolute right-0 top-1/2 -translate-y-1/2">{errors.passwordRepeat?.message}</small>
                            }
                        </label>
                    </div>
                    <ButtonSubmit loading={loading} text="Create an account" />
                    <SignUpSignIn text="Already have an account?" url="/signin" option="Login" />
                </form>
    )
}