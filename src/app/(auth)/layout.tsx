import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const session = await auth();
    if (session && session?.user) redirect("/")
    return <div className="flex flex-col min-h-screen">
      <div className="flex grow">
        {children}
      </div>
      </div>
  }