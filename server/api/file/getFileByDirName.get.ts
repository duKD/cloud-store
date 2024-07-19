import { getFileByDirName } from "../../sdk";
import { getQuery, setResponseStatus } from "h3";
import { toSuccess, toError } from "../../utils";
import { fileDto } from "~/server/type/file";

export default defineEventHandler(async (event) => {
  const { mode, accessToken, order, start, limit, web, folder, dir, desc } =
    getQuery(event);
  setResponseStatus(event, 200);
  try {
    const res = await getFileByDirName({
      mode,
      accessToken,
      order: String(order),
      start: Number(start),
      limit: Number(limit),
      web: Number(web),
      folder: Number(folder),
      dir: String(dir),
      desc: Number(desc),
    });

    if (res.data.errno === 0) {
      const list = res.data.list.map((item: any) => {
        return {
          fileId: item.fs_id,
          filename: item.server_filename,
          size: item.size,
          path: item.path,
          ctime: item.server_ctime,
          utime: item.server_mtime,
          isdir: item.isdir === 1,
          category: item.category,
          dir_empty: item.dir_empty,
          thumbs: item.thumbs,
        };
      });
      return toSuccess<fileDto[]>(list);
    }
    return toError(
      res.data.errno === -7 ? "文件或目录无权访问" : "文件或目录不存在"
    );
  } catch (error) {
    console.log("getQrCode----", error);
    return toError("还未授权");
  }
});
