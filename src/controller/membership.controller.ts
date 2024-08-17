import { ApiError, ApiResponce, asyncHandler } from "../utils";
import { db } from "../lib";

const giveMembership = asyncHandler(async (req: any, res) => {});

const getMembershipUsers = asyncHandler(async (req: any, res) => {});

const getMemberships = asyncHandler(async (req: any, res) => {});

const updateMembership = asyncHandler(async (req: any, res) => {});

const deleteMembership = asyncHandler(async (req: any, res) => {});

export {
  giveMembership,
  getMembershipUsers,
  getMemberships,
  updateMembership,
  deleteMembership,
};
