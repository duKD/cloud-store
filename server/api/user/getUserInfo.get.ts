import { getUserInfo } from "../../sdk";
import { getQuery, setResponseStatus } from "h3";
import { toSuccess, toError } from "../../utils";
import { userInfoDto } from "~/server/type/user";

export default defineEventHandler(async (event) => {
  const { mode, accessToken } = getQuery(event);
  setResponseStatus(event, 200);

  try {
    const res = await getUserInfo(accessToken as string, mode as string);
    return toSuccess<userInfoDto>({
      userName: res.data.baidu_name,
      headImg: res.data.avatar_url,
    });
  } catch (error) {
    console.log("getQrCode----", error);
    return toError("还未授权");
  }
});
