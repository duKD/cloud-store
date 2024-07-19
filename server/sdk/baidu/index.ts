import axios from "axios";

const { ENV_BAIDU_appKey: appKey, ENV_BAIDU_secretKey: SecretKey } =
  process.env;

export const auth = async () => {
  return await axios.get(
    `https://openapi.baidu.com/oauth/2.0/device/code?response_type=device_code&client_id=${appKey}&scope=basic,netdisk`
  );
};

export const getAccessToken = async (code: string) => {
  return await axios.get(
    `https://openapi.baidu.com/oauth/2.0/token?grant_type=device_token&code=${code}&client_id=${appKey}&client_secret=${SecretKey}`
  );
};

export const userInfo = async (accessToken: string) => {
  return await axios.get(
    `https://pan.baidu.com/rest/2.0/xpan/nas?method=uinfo&access_token=${accessToken}`
  );
};

/**
 *
 * @param accessToken 授权token
 * @param start 开始索引
 * @param limit 返回数量
 * @param web 1 	值为1时，返回dir_empty属性和缩略图数据
 * @param dir 需要list的目录，以/开头的绝对路径, 默认为/  路径包含中文时需要UrlEncode编码
 * @param folder 是否只返回文件夹，0 返回所有，1 只返回文件夹，且属性只返回path字段
 * @param desc 默认为升序，设置为1实现降序 （注：排序的对象是当前目录下所有文件，不是当前分页下的文件）
 * @returns
 */
export const queryFileByDirName = async (
  accessToken: string,
  order = "time",
  start = 0,
  limit = 100,
  web = 1,
  folder = 0,
  dir = "/",
  desc = 1
) => {
  return await axios.get(
    `https://pan.baidu.com/rest/2.0/xpan/file?method=list&dir=${dir}&order=${order}&start=${start}&limit=${limit}&web=${web}&folder=${folder}&access_token=${accessToken}&desc=${desc}`
  );
};
