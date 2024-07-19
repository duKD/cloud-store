import { auth, getAccessToken, userInfo, queryFileByDirName } from "./baidu";

export async function init(mode: string) {
  return await auth();
}

export const getToken = async (code: string) => {
  return await getAccessToken(code);
};

export const getUserInfo = async (accessToken: string, mode: string) => {
  return await userInfo(accessToken);
};

export const getFileByDirName = async ({
  mode,
  accessToken,
  order = "time",
  start = 0,
  limit = 100,
  web = 1,
  folder = 0,
  dir = "/",
  desc = 1,
}) => {
  return await queryFileByDirName(
    accessToken,
    order,
    start,
    limit,
    web,
    folder,
    dir,
    desc
  );
};
