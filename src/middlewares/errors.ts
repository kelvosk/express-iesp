import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';

export const middleware = express.Router();

middleware.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(err.toString(), req.body);
    next(err);
  }
);

middleware.use((err: ErrorRequestHandler, req: Request, res: Response, _: NextFunction) => {
  res.status(400).json({ message: 'error' });
});

interface IAppError {
  customMessage: string;
  status: number;
}

export class AppError extends Error {
  customMessage: string;
  status: number;
  constructor(props: IAppError) {
    super(props.customMessage);
    this.customMessage = props.customMessage;
    this.status = props.status;
  }
}

export const errorLogHandle = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.toString(), req.body);
  next(err);
};

export const errorResponseHandle = (
  err: AppError,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  res.status(err.status).json({ message: err.customMessage });
};
