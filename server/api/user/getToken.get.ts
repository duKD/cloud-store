import { getToken } from "../../sdk";
import { getQuery, setResponseStatus } from "h3";
import { toSuccess, toError } from "../../utils";
import { getTokenDto } from "~/server/type/user";

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event);
  setResponseStatus(event, 200);
  try {
    const res = await getToken(code as string);
    return toSuccess<getTokenDto>(res.data);
  } catch (error) {
    console.log("getQrCode----", error);
    return toError("还未授权");
  }
});
