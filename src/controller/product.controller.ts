import { ApiError, ApiResponce, asyncHandler } from "../utils";
import { db } from "../lib";
import { uploadOnCloudinary } from "../utils/Cloudinary";

const createProduct = asyncHandler(async (req: any, res) => {
  const { name, priceSingle, priceLot, category, description, companyId } =
    req.body;
  const files = req.files as Express.Multer.File[]; // Assuming `files` is an array of image files

  if (
    !name ||
    !description ||
    !category ||
    !priceSingle ||
    !priceLot ||
    !companyId ||
    !files ||
    files.length === 0
  ) {
    throw new ApiError(
      400,
      "some fileds are missing and at least one image are required"
    );
  }

  // Upload each image to Cloudinary and collect the URLs
  const imageUrls: string[] = await Promise.all(
    files.map(async (file) => {
      const result = await uploadOnCloudinary(file.path);
      if (result) {
        return result.secure_url;
      } else {
        throw new ApiError(500, "Image upload failed");
      }
    })
  );

  // Create the product in the database
  const product = await db.product.create({
    data: {
      name,
      category,
      description,
      priceSingle: parseFloat(priceSingle),
      priceLot: parseFloat(priceLot),
      companyId,
      imageLink: imageUrls, // Storing the array of image URLs
    },
  });

  if (!product) return new ApiError(404, "unable to create the product");
  return res
    .status(200)
    .json(new ApiResponce(200, product, "product created successfully"));
});

const getProduct = asyncHandler(async (req: any, res) => {
  const { id } = req.params;
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  });
  if (!product) return new ApiError(404, "product not found");
  return res.status(200).json(new ApiResponce(200, product, "product found"));
});

const getProducts = asyncHandler(async (req: any, res) => {
  const products = await db.product.findMany({});
  if (!products) return new ApiError(404, "products not found");
  return res.status(200).json(new ApiResponce(200, products, "products found"));
});

const updateProduct = asyncHandler(async (req: any, res) => {
  const { id } = req.params;
  const { name, priceSingle, priceLot, category, description } = req.body;
  const files = req.files as Express.Multer.File[]; // Assuming `files` is an array of image files

  // Upload each image to Cloudinary and collect the URLs
  const imageUrls: string[] = await Promise.all(
    files.map(async (file) => {
      const result = await uploadOnCloudinary(file.path);
      if (result) {
        return result.secure_url;
      } else {
        throw new ApiError(500, "Image upload failed");
      }
    })
  );
  if (!name || !description || !category || !priceSingle || !priceLot) {
    throw new ApiError(400, "some fileds are missing");
  }
  const product = await db.product.update({
    where: {
      id: id,
    },
    data: {
      name,
      category,
      description,
      imageLink: imageUrls,
      priceSingle: parseFloat(priceSingle),
      priceLot: parseFloat(priceLot),
    },
  });
  if (!product) return new ApiError(404, "product not found");
  return res
    .status(200)
    .json(new ApiResponce(200, product, "product updated successfully"));
});

const deleteProduct = asyncHandler(async (req: any, res) => {
  const { id } = req.params;
  const product = await db.product.delete({
    where: {
      id: id,
    },
  });
  if (!product) return new ApiError(404, "product not found");
  return res
    .status(200)
    .json(new ApiResponce(200, product, "product deleted successfully"));
});

export { createProduct, getProduct, getProducts, updateProduct, deleteProduct };
