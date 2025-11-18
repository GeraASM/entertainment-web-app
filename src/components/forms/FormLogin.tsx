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
    password: z.string({message: "Can't be empty"}).min(8, {message: "Password must be at least 8 characters"})
})

type FormType = z.infer<typeof Form>;



export function FormLogin() {
    const router = useRouter();
    const {register, formState: {errors}, handleSubmit, reset} = useForm<FormType>({
        resolver: zodResolver(Form),
        defaultValues: {email: "", password: ""}
    })
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: FormType) => {
        setError(null);
        setLoading(true);
        console.log(data);

        const {error} = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: "/dashboard"
        }) 
        if (error) {
            setError(error.message || "Something wrong");
        } else {
            setError(null);
            router.push("/dashboard");
        }
        reset();
        setLoading(false);
    }

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="relative max-w-[320px] min-w-[320px] md:max-w-f md:min-w-f rounded-[10px] min-h-[425px] bg-blue-900 px-6 py-10 flex flex-col gap-500">
            {error && <p className="text-red-500 absolute left-1/2 -translate-1/2 p-2 rounded-2xl min-w-[220px] text-center bg-red-500/20 border top-0 border-red-500 z-10">{error}</p>}
            <Title text="Login" />
            <div>
                <label className={` relative border-b block ${errors.email ? "border-red-500" :"border-blue-500"} hover:border-white w-full`} htmlFor="email">
                    <input {...register("email")} className="caret-red-500 w-full p-4 block text-present-4 text-white focus:outline-0 focus:outline-transparent" type="email" id="email" name="email" placeholder="Email address" />
                    {
                        errors.email &&
                        <small className="text-red-500 absolute right-0 top-1/2 -translate-y-1/2">{errors.email?.message}</small>
                    }
                </label>
                <label  htmlFor="password" className={`relative block w-full border-b ${errors.password ? "border-red-500" : "border-blue-500"} hover:border-white`}>
                    <input {...register("password")} className="caret-red-500 w-full p-4 text-present-4 text-white focus:outline-0 focus:outline-transparent" type="password" id="password" name="password" placeholder="Password" />
                    {
                        errors.password &&
                        <small className="text-red-500 absolute right-0 top-1/2 -translate-y-1/2">{errors.password?.message}</small>

                    }
                </label>
            </div>
            <ButtonSubmit loading={loading} text="Login to your account" />
            <SignUpSignIn text="Don't have an account?" url="/signup" option="Sign Up" />
        </form>
    )
}