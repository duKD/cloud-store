import type { qrcodeDto, getTokenDto } from "~/server/type/user";
import request, { type ResponseType } from "~/util/request";

export function getQrCode(mode: string) {
  return request.get<ResponseType<qrcodeDto>>(
    "/api/user/getQrCode?mode=" + mode
  );
}

export function getToken(code: string) {
  return request.get<ResponseType<getTokenDto>>(
    "/api/user/getToken?code=" + code
  );
}

export function getUserInfo(mode: string, accessToken: string) {
  return request.get<ResponseType<getTokenDto>>(
    `/api/user/getUserInfo?mode=${mode}&accessToken=${accessToken}`
  );
}
