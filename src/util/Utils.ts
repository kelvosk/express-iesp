import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express-serve-static-core';

export function fullNameConcat(fistName: string, lastName: string) {
  return `${fistName} ${lastName}`;
}

export const asyncHandler = (fn: RequestHandler) =>
  function asyncUtilWrap(req: Request, res: Response, nextFn: NextFunction) {
    const fnReturn = fn(req, res, nextFn);
    return Promise.resolve(fnReturn).catch(nextFn);
  };
