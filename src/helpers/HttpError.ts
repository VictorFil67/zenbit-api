const messageList: Record<400 | 401 | 403 | 404 | 409 | 500, string> = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Server error",
};

const HttpError = (
  status: 400 | 401 | 403 | 404 | 409 | 500,
  message: string = messageList[status]
) => {
  const error = new Error(message);
  (error as any).status = status;
  return error;
};

export default HttpError;
