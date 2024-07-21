import connectDb from "@/db/connectDb";
import User from "@/models/userModel";
import { HashPass } from "@/utils/hashedPassword";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response): Promise<any> {
    connectDb()
    const { name, email, password } = await req.json();

    try {
        let user = await User.findOne({ email});
        if(user){
            return NextResponse.json({success: false,msg: "User already exists"})
        }
        
        let hashedPassword = await HashPass(password);
        let newUser = await User.create({name,email,password: hashedPassword});    
        return NextResponse.json({success: true, msg: "User created successfully", newUser});
    } catch (error) {
        return error
        console.log("error", error)
    }
}


export async function GET(req: Request, res: Response): Promise<any> {
    return NextResponse.json({success: true, msg:"success"})
}