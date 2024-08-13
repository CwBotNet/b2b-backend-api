import { PrismaClient } from "@prisma/client";
import { db } from "../lib";
import { ApiError, ApiResponce, asyncHandler } from "../utils";

// user creation logic
const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log({ name, email, password });

    // jwt logic

    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        password: password,
        role: "normal",
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) throw new ApiError(404, "error while creating the user");

    return res
      .status(200)
      .json(new ApiResponce(200, user, "user registeration successful"));
  } catch (e: any) {
    console.log("error", e?.message);
    throw new ApiError(
      500,
      "somthing went wrong while creating the user",
      e.message
    );
  }
});

// user fetcing byId logic

const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        companies: true,
        createdAt: true,
      },
    });

    if (!user) throw new ApiError(404, "user not found");

    return res.status(200).json(new ApiResponce(200, user, "user fetched"));
  } catch (e: any) {
    console.log("error", e.message);
    throw new ApiError(500, "Server error unable to fetch the user");
  }
});

// user update logic
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updateUser = await db.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!updateUser)
      throw new ApiError(403, "unable to update the user details");
    return res
      .status(200)
      .json(new ApiResponce(200, updateUser, "user updated"));
  } catch (error) {
    console.log("error", error);
    throw new ApiError(500, "servere error: unable to update the user details");
  }
});

// user delete logic
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.user.delete({
      where: {
        id: id,
      },
    });
    if (!user) throw new ApiError(404, "user not found");
    return res
      .status(200)
      .json(new ApiResponce(200, user.id, "user deleted successfully"));
  } catch (error) {
    console.log("error", error);
    throw new ApiError(500, "server error: unable to delete the user");
  }
});

export { createUser, getUserById, updateUser, deleteUser };
