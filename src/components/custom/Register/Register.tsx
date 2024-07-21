"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const RegisterForm = () => {
  const router = useRouter();
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        action={async (e: FormData) => {
          const name = e.get("name") as string;
          const email = e.get("email") as string;
          const password = e.get("password") as string;

          if (!name || !email || !password)
            return toast.error("All fields are required", {
              id: "register-error",
            });

          try {
            let res = await axios.post(`/api/register`, {
              name: name,
              email: email,
              password: password,
            });

            let { data } = res;
            if (data?.success) {
              toast.success("Registered successfully", {
                id: "register-success",
              });
              router.push("/login");
            } else {
              toast.error(data?.msg || "Something went wrong");
            }
          } catch (error) {
            console.log(error);
          }
        }}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Full Name
          </label>
          <div className="mt-2">
            <Input id="name" name="name" type="name" placeholder="Name"/>
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <Input id="email" name="email" type="email" placeholder="Email"/>
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
            <Input id="password" name="password" type="password" placeholder="Password"/>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already a member?
        <Link
          href="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
