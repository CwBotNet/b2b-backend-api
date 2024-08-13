import { Request, Response, NextFunction } from "express";

const asyncHandler = (
  requestHandlerFn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandlerFn(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

export { asyncHandler };
