import { db, hashPassword, passwordCheck } from "../lib";
import { ApiError, ApiResponce, asyncHandler } from "../utils";
import { uploadOnCloudinary } from "../utils/Cloudinary";
import jwt from "jsonwebtoken";

// user creation logic
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log({ name, email, password });

    // password hashing before save
    const hashedPassword = await hashPassword(password);
    // image path
    // @ts-ignore
    const avatarLocalPath = await req.files?.avatar[0]?.path;

    console.log(avatarLocalPath);

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) throw new ApiError(403, "cloudinary image upload error");

    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        imageLink: avatar?.url || "",
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

// login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new ApiError(404, "user not found");

    const isMatch = await passwordCheck(password, user.password);

    if (!isMatch) throw new ApiError(404, "password not matched");

    // cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };

    const tokenData = {
      id: user.id,
      role: user.role,
    };

    // jwt logic
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY as string);
    console.log({ token: token });
    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json(new ApiResponce(200, "login successful"));
  } catch (error) {
    console.log("error", error);
    throw new ApiError(500, "server error unable to login");
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
        imageLink: true,
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

export { registerUser, getUserById, updateUser, deleteUser, loginUser };
