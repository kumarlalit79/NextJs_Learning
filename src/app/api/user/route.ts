import authOptions from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user.email) {
      return NextResponse.json(
        { message: "User does not have session" },
        { status: 400 },
      );
    }

    const user = await User.findById(session.user.id).select("-password");
    if (!user) {
      return NextResponse.json(
        { message: "User does not found" },
        { status: 400 },
      );
    }

    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Finding user error", error },
      { status: 500 },
    );
  }
}