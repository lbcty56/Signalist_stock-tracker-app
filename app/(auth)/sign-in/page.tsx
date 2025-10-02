"use client"

import {useForm} from "react-hook-form";
import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";

const SignIn = ({email, password}: SignInFormData) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues:{
            email: "",
            password: "",
        }
        , mode: "onBlur"},);

    const onSubmit = async (data: SignInFormData) => {
        try {
            console.log(data);
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1 className="form-title">Welcome Back</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    register={register}
                    error={errors.email}
                    validation={{required: "Email is required", pattern: /^\w+@\w+\.\w+$/, message: "Email is required"}}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="********"
                    register={register}
                    type="password"
                    error={errors.password}
                    validation={{required: "Password is required", minLength: 8}}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting? "Signing In" : "Sign In"}
                </Button>

                <FooterLink text="Don't have an account?" linkText="Sign Up" href="/sign-up"/>
            </form>
        </>
    )
}

export default SignIn