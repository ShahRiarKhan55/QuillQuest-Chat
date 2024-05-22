// For Single user registration
// import bcrypt from "bcrypt";

// import prisma from "@/app/libs/prismadb";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { email, name, password } = body;

//   const hashedPassword = await bcrypt.hash(password, 12);

//   const user = await prisma.user.create({
//     data: {
//       email,
//       name,
//       hashedPassword,
//     },
//   });

//   return NextResponse.json(user);
// }

//for multiple users registration
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const users = await request.json();

  const registeredUsers = [];
  for (const user of users) {
    const { email, name, password } = user;
    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
        },
      });
      registeredUsers.push(newUser);
    } catch (error) {
      // Handle registration errors
      console.error(`Error registering user ${name}:`, error);
    }
  }

  return NextResponse.json(registeredUsers);
}
