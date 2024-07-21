'use server'

import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

// handle register user action


export const handleLogin = async(email: string,password: string)=>{
    try {
        await signIn('credentials',{
            email,
            password,
            redirectTo: '/'
        })
    } catch (error: any) {
        switch (error.type) {
            case "CredentialsSignin":
                return { msg: "Invalid credentials" , status: "error"};
            case "CallbackRouteError":
                return { msg: "Invalid credentials" , status: "error"};
            default:
                return { msg: "success", status: "success" };
        }
    }
}