import { init } from "../../sdk";
import { getQuery, setResponseStatus } from "h3";
import { toSuccess, toError } from "../../utils";
import { qrcodeDto } from "~/server/type/user";

export default defineEventHandler(async (event) => {
  const { mode } = getQuery(event);
  setResponseStatus(event, 200);
  try {
    const res = await init(mode as string);
    return toSuccess<qrcodeDto>(res.data);
  } catch (error) {
    return toError("error---getQrCode");
  }
});
