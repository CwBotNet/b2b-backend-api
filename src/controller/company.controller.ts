import { asyncHandler } from "../utils";
import { db } from "../lib";
// create company
const createCompany = asyncHandler(async (req, res) => {
  try {
    const { name, description, niche } = req.body;
  } catch (error) {}
});

// get company
const getCompany = asyncHandler(async (req, res) => {});

// update company
const updateCompany = asyncHandler(async (req, res) => {});

// delete Company
const deleteCompany = asyncHandler(async (req, res) => {});
