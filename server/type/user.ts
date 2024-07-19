export type qrcodeDto = {
  qrcode_url: string;
  device_code: string;
};

export type getTokenDto = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
};

export type userInfoDto = {
  userName: string;
  headImg: string;
};
