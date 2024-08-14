import { ApiError, asyncHandler } from "../utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "../lib";

export const authCheck = asyncHandler(async (req: any, _, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const tokenData = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
    console.log(tokenData);
    const user = await db.user.findUnique({
      where: {
        id: tokenData.id,
      },
      select: {
        name: true,
        email: true,
        imageLink: true,
        role: true,
        companies: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
