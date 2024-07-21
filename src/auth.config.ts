import { CredentialsSignin, type NextAuthConfig } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import connectDb from "./db/connectDb";
import { isPassMatch } from "./utils/hashedPassword";
import User from "./models/userModel";
 
export default { 
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialProvider({
          credentials: {
            email: {},
            password: {},
          },
          authorize: async(credentials)=> {
            // connnect to db
            connectDb();
            
            if(!credentials?.email || !credentials?.password) throw new CredentialsSignin("Please provide all fields");
    
            const user = await User.findOne({ email:credentials.email }).select("+password");
    
            if (!user){
              throw new Error("User not found");
            }
    
            let isMatch = await isPassMatch(credentials?.password?.toString(), user?.password)
            let res = {id: user?._id, name: user?.name, email: user?.email};
            if (!isMatch){
              throw new Error("Invalid credentials");
            }
            else return res;
          },
        }),
    ],
    pages:{
        signIn: '/login'
      },
    // callbacks:{
//   signIn: async({user,account,})=>{
//     if(account?.provider === 'google'){
//       try {
//         const {email,name,id,image} = user;
//         connectDb()

//         let isUserPresent = await User.findOne({email})

//         if(!isUserPresent){
//           await User.create({name,email,googleId: id, image})
//         }

//         return true
//       } catch (error) {
//         throw new AuthError("Error while creating user");
//       }
//     }
//     return true;
//   }
// }
} satisfies NextAuthConfig