import { asyncHandler, ApiError, ApiResponce } from "../utils";
import { db } from "../lib";

// get users controllers
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await db.user.findMany();
  if (!users) return new ApiError(404, "users not found");
  return res.status(200).json(new ApiResponce(200, users, "users found"));
});

const getUserByName = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const user = await db.user.findFirst({
    where: {
      name: name,
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
  if (!user) return new ApiError(404, "user not found");
  return res.status(200).json(new ApiResponce(200, user, "user found"));
});

const getUserById = asyncHandler(async (req, res) => {
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
  if (!user) return new ApiError(404, "user not found");
  return res.status(200).json(new ApiResponce(200, user, "user found"));
});

// get companies controllers
const getAllComanys = asyncHandler(async (req, res) => {
  const companies = await db.company.findMany();
  if (!companies) return new ApiError(404, "companies not found");
  return res
    .status(200)
    .json(new ApiResponce(200, companies, "companies found"));
});

const getComanyByName = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const company = await db.company.findFirst({
    where: {
      name: name,
    },
  });
  if (!company) return new ApiError(404, "company not found");
  return res.status(200).json(new ApiResponce(200, company, "company found"));
});

const getComanyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const company = await db.company.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      Category: true,
      logoLink: true,
      membership: true,
      createdAt: true,
      categoryId: true,
    },
  });
  if (!company) return new ApiError(404, "company not found");
  return res.status(200).json(new ApiResponce(200, company, "company found"));
});

// membership controller
const setMembershipToCompany = asyncHandler(async (req, res) => {
  const { companyId, membership } = req.body;
  const companie = await db.company.update({
    where: {
      id: companyId,
    },
    data: {
      membership: membership,
    },
  });

  if (!companie)
    throw new ApiError(403, "unable to process the membershhip request");

  return res
    .status(200)
    .json(
      new ApiResponce(
        200,
        companie.id,
        `now has the membership of ${membership} user`
      )
    );
});

// get membership controllers
const getAllMembers = asyncHandler(async (req, res) => {
  const memberships = await db.membership.findMany();
  if (!memberships) return new ApiError(404, "memberships not found");
  return res
    .status(200)
    .json(new ApiResponce(200, memberships, "memberships found"));
});
const getAllMemberByMembership = asyncHandler(async (req, res) => {
  const { membership } = req.params;
  const memberships = await db.membership.findMany({
    where: {
      plan: membership as any,
    },
  });
  if (!memberships) return new ApiError(404, "memberships not found");
  return res
    .status(200)
    .json(new ApiResponce(200, memberships, "memberships found"));
});

const getAllMemberById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const memberships = await db.membership.findUnique({
    where: {
      id: id,
    },
  });
  if (!memberships) return new ApiError(404, "memberships not found");
  return res
    .status(200)
    .json(new ApiResponce(200, memberships, "memberships found"));
});

// get products controllers
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await db.product.findMany();
  if (!products) return new ApiError(404, "products not found");
  return res.status(200).json(new ApiResponce(200, products, "products found"));
});
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await db.product.findUnique({
    where: {
      id: id,
    },
  });
  if (!product) return new ApiError(404, "product not found");
  return res.status(200).json(new ApiResponce(200, product, "product found"));
});

const getAllProductByName = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const product = await db.product.findFirst({
    where: {
      name: name,
    },
  });
  if (!product) return new ApiError(404, "product not found");
  return res.status(200).json(new ApiResponce(200, product, "product found"));
});
