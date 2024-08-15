import { db } from "../lib";
import { ApiError, ApiResponce, asyncHandler } from "../utils";
import { uploadOnCloudinary } from "../utils/Cloudinary";

const createCategory = asyncHandler(async (req: any, res) => {
  const { name } = req.body;

  const categoryImage = req.files?.category[0]?.path;
  const categoryImageLink = await uploadOnCloudinary(categoryImage);

  if (!categoryImageLink)
    throw new ApiError(403, "unable to upload image to cloud");

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

const getCategory = asyncHandler(async (req, res) => {
  try {
    const category = await db.category.findMany();
    if (!category) throw new ApiError(404, "category not found");
    return res
      .status(200)
      .json(new ApiResponce(200, category, "category fetched successfully"));
  } catch (error: any) {
    console.log("error", error.message);
    throw new ApiError(500, error.message);
  }
});

const updateCategory = asyncHandler(async (req: any, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const categoryImage = req.files?.category[0]?.path;
    const categoryImageLink = await uploadOnCloudinary(categoryImage);

    if (!categoryImageLink)
      throw new ApiError(403, "unable to upload image to the cloud");

    const updateCategory = await db.category.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        imageLink: categoryImageLink?.url || "",
      },
    });

    if (!updateCategory)
      return new ApiError(404, "unable to update the category");

    return res
      .status(200)
      .json(new ApiResponce(200, updateCategory.id, "category is updated"));
  } catch (error: any) {
    console.log("error", error.message);
    throw new ApiError(500, error.message);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await db.category.delete({
      where: {
        id: id,
      },
    });
    if (!category) throw new ApiError(404, "category not found");
    return res
      .status(200)
      .json(new ApiResponce(200, category.id, "category deleted successfully"));
  } catch (error) {
    console.log("error", error);
    throw new ApiError(500, "server error: unable to delete the category");
  }
});

export { createCategory, getCategory, updateCategory, deleteCategory };
