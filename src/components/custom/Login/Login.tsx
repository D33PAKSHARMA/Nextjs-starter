"use client";
import { handleLogin } from "@/actions/serverActions";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const router = useRouter();
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        action={async (e: FormData) => {
          let email = e.get("email") as string;
          let password = e.get("password") as string;

          // if (!email)
          //   return toast.error("Email is required", { id: "email-error" });
          // else if (!password)
          //   return toast.error("Password is required", {
          //     id: "password-error",
          //   });

          let toastID = toast.loading("Logging in...");
          let error = await handleLogin(email, password);
          if (error?.msg === "success") {
            toast.success("Login successful", {
              id: toastID,
            });
            router.refresh();
          } else {
            toast.error(error?.msg, {
              id: toastID,
            });
          }
        }}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <Input id="email" name="email" type="email" placeholder="Email" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
