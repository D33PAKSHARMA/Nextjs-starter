'use client'

import { useSession } from "next-auth/react";

export default function Home() {

  let session = useSession()
  console.log("session: ", session)
  return (
    <div className="container mx-auto">
      {
        session && session?.data? (
          <div>Welcome {session.data?.user?.name}</div>
        ) : (
          <div>Please sign in to view this page</div>
        )
      }
      Home Page
    </div>
  );
}
