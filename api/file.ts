import type { fileDto } from "~/server/type/file";
import request, { type ResponseType } from "~/util/request";

export function getFileByDirName(params: {
  mode?: string;
  accessToken: string;
  order?: string;
  start?: number;
  limit?: number;
  web?: number;
  folder?: number;
  dir?: string;
  desc?: number;
}) {
  const {
    mode = "1",
    accessToken,
    order = "time",
    start = 0,
    limit = 100,
    web = 1,
    folder = 0,
    dir = "/",
    desc = 1,
  } = params;
  return request.get<ResponseType<Array<fileDto>>>(
    `/api/file/getFileByDirName?mode=${mode}&accessToken=${accessToken}&order=${order}&start=${start}&limit=${limit}&web=${web}&folder=${folder}&dir=${dir}&desc=${desc}`
  );
}
