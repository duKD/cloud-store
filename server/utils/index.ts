export function toSuccess<T = any>(data: T) {
  return {
    errorCode: "0",
    data,
  };
}

export const toError = (msg: string) => {
  return {
    errorCode: "-1",
    data: null,
    msg: msg,
  };
};
