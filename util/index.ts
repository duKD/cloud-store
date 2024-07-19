import { getFileByDirName } from "~/api/file";
import type { fileDto } from "~/server/type/file";
import { CodeEnum } from "./request";
import { ElMessageBox } from "element-plus";

export const formatTime = (timestamp: number) => {
  // 将毫秒时间戳转换为Date对象
  const date = new Date(timestamp);

  // 获取年、月、日
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // 返回格式化的日期和时间字符串
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

export const isString = (val: unknown): val is string =>
  typeof val === "string";

/**
 * 封装查询某个文件夹下的文件
 * @param opt ：参数 path 文件路径 accessToken 访问令牌 queryNum 查询次数 -1 查完为止 size 每次查询数量
 */
export const getAllFileByPath = async (opt: {
  path: string;
  accessToken: string;
  queryNum?: number;
  size?: number;
}) => {
  const { path = "/", accessToken = "", queryNum = -1, size = 100 } = opt;

  let fileList: fileDto[] = [];
  let index = queryNum;
  let start = 0;
  try {
    const handle = async () => {
      if (index-- === 0) return;
      const res = await getFileByDirName({
        dir: encodeURIComponent(path),
        accessToken: accessToken,
        start,
        limit: size,
      });

      if (res.errorCode !== CodeEnum.SUCCESS_CODE) return;
      fileList = [...fileList, ...res.data];
      start = fileList.length;
      if (res.data.length < size) {
        return;
      }
      await handle();
    };
    await handle();
  } catch (e) {
    ElMessageBox.confirm(
      "循环查询文件夹内容过程有错误，请刷新重试！",
      "Warning",
      {
        confirmButtonText: "确认",
        type: "warning",
      }
    );
  }
  return fileList;
};

export const getAllFileByPaths = async (
  fileList: fileDto[],
  accessToken: string
) => {
  for (let i = 0; i < fileList.length; i++) {
    const path = fileList[i].path;
    const res = await getAllFileByPath({ path, accessToken });
    fileList[i].child = res;
  }
  return fileList;
};

export function createImageAndDownloadLink(
  base64String: string,
  fileName = "file.png"
) {
  // 确保 Base64 字符串是有效的图片数据 URI
  const isBase64 = base64String.match(/^data:image\/(\w+);base64,/);
  if (!isBase64) {
    console.error("Invalid base64 string");
    return;
  }

  const img = document.createElement("img");
  const url = `data:image/${isBase64[1]};base64,` + base64String.split(",")[1];

  img.src = url;
  document.body.appendChild(img); // 将图片添加到文档中，如果需要

  // 创建下载链接
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  // 模拟点击链接以触发下载
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // 清理 DOM
}
