import { auth, signIn } from '@/auth';
import LoginForm from '@/components/custom/Login/Login'
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const LoginPage = async() => {
  return (
    <div className="flex w-full mx-auto min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <LoginForm />
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={async()=>{
          'use server'
          await signIn('google')
        }}>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign with Google
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            href="/register"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage
