import { ApiError, ApiResponce, asyncHandler } from "../utils";
import { db } from "../lib";
import { uploadOnCloudinary } from "../utils/Cloudinary";

// create company
const registerCompany = asyncHandler(async (req: any, res) => {
  try {
    const { name, description, category } = req.body;
    const id = await req.user.id;

    console.log(await req.user);

    // logo and banner
    const logo = req.files?.logo[0]?.path;
    const banner = req.files?.banner[0]?.path;
    const logoLink = await uploadOnCloudinary(logo);
    const bannerLink = await uploadOnCloudinary(banner);

    if (!logoLink) throw new ApiError(403, "cloudinary image upload error");

    if (!bannerLink) throw new ApiError(403, "cloudinary image upload error");

    const company = await db.company.create({
      data: {
        name: name,
        description: description,
        logoLink: logoLink.url,
        bannerLink: bannerLink.url,
        userId: id,
        categoryId: category,
      },
    });

    if (!company)
      throw new ApiError(403, "server Error while creating the company");

    return res
      .status(200)
      .json(new ApiResponce(200, company, "company created successfully"));
  } catch (error) {
    console.log("error", error);
    throw new ApiError(500, "server error unable to create the company");
  }
});

// get company
const getCompany = asyncHandler(async (req: any, res) => {
  try {
    const company = await db.company.findMany({
      where: {
        userId: await req.user.id,
      },
    });

    if (!company) throw new ApiError(404, "company not found");

    return res
      .status(200)
      .json(new ApiResponce(200, company, "company fetched"));
  } catch (error: any) {
    console.log("error", error?.message);
    throw new ApiError(500, "server error unable to fetch the company");
  }
});

// update company
const updateCompany = asyncHandler(async (req: any, res) => {
  const { id } = req.params;
  const { name, description, category } = req.body;
  try {
    // logo and banner
    const logo = req.files?.logo[0]?.path;
    const banner = req.files?.banner[0]?.path;
    const logoLink = await uploadOnCloudinary(logo);
    const bannerLink = await uploadOnCloudinary(banner);

    if (!logoLink) throw new ApiError(403, "cloudinary image upload error");

    if (!bannerLink) throw new ApiError(403, "cloudinary image upload error");

    const updateCompany = await db.company.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        description: description,
        categoryId: category,
        bannerLink: logoLink.url,
        logoLink: bannerLink.url,
      },
    });

    if (!updateCompany) throw new ApiError(404, "server err while updating");

    return res.status(200).json(new ApiResponce(200, updateCompany, "updated"));
  } catch (e: any) {
    console.log("error", e.message);
    throw new ApiError(500, "server error unable to update the company");
  }
});

// delete Company
const deleteCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const company = await db.company.delete({
      where: {
        id: id,
      },
    });
    if (!company) throw new ApiError(404, "company not found");
    return res
      .status(200)
      .json(new ApiResponce(200, company.id, "company deleted successfully"));
  } catch (error) {
    console.log("error", error);
    throw new ApiError(500, "server error: unable to delete the company");
  }
});

export { registerCompany, getCompany, updateCompany, deleteCompany };
