import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export async function checkLoginToken(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return false;
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await prisma.userInfo.findUnique({
      where: { id: decoded.id },
      select: { id: true },
    });

    return !!user;
  } catch (error) {
    return false;
  }
}
