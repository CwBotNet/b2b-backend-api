import { db } from "../lib";
import { ApiError, ApiResponce, asyncHandler } from "../utils";
import { uploadOnCloudinary } from "../utils/Cloudinary";

const createCatogery = asyncHandler(async (req: any, res) => {
  const { name } = req.body;

  const categoryImage = req.files?.category[0]?.path;
  const categoryImageLink = await uploadOnCloudinary(categoryImage);

  const catogery = await db.category.create({
    data: {
      name,
      imageLink: categoryImageLink?.url || "",
    },
  });

  if (!catogery)
    throw new ApiError(403, "server error while creating the catogery");

  return res
    .status(200)
    .json(new ApiResponce(200, catogery, "category created"));
});

export { createCatogery };
