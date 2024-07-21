import NextAuth from "next-auth";
import authConfig from "./auth.config"
 
const { auth } = NextAuth(authConfig)

let publicRoutes = [
    "/login",
    "/register",
]

export default auth((req) => {
  let isAuthenticated = !!req.auth;
  let ispublicRoute = publicRoutes.includes(req.nextUrl.pathname);
  // if(isAuthenticated && ispublicRoute) {
  //   return NextResponse.redirect(new URL('/',req.nextUrl))
  // }
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}