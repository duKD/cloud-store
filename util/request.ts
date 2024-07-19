import axios from "axios";
import { ElMessageBox } from "element-plus";
import { useUserStore } from "~/store/user";

import type { AxiosRequestConfig } from "axios";

export enum CodeEnum {
  SUCCESS_CODE = "0", // 请求成功
  BIZ_ERROR = "1", // 业务异常
  DEFINE_ERROR = "2", // 前端自定义异常
  UNKNOWN_ERROR = "-1", // 未知错误
}
const service = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});

//http response 拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    console.log("request---", userStore.accessToken);

    //处理请求配置
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (
      response.data.errorCode &&
      response.data.errorCode !== CodeEnum.SUCCESS_CODE
    ) {
      // ElMessageBox.confirm(response.data.msg, "Warning", {
      //   confirmButtonText: "OK",
      //   cancelButtonText: "Cancel",
      //   type: "warning",
      // });
      return response;
    } else {
      return response;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export type ResponseType<T = any> = {
  errorCode: CodeEnum;
  msg: string;
  msgDec?: string;
  data: T;
  totalCount: number;
  extendObj: any;
};

type customConfig = AxiosRequestConfig & {
  showError?: boolean;
};

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
const request = async <T = any>(config: customConfig): Promise<T> => {
  const showError = config.showError;
  delete config.showError;
  try {
    const realConfig: AxiosRequestConfig = { ...config };
    const res = await service.request<T>(realConfig);
    return res.data as unknown as T;
  } catch (error: any) {
    if (showError) {
      // 不显示接口没有相应的提示 例如网络错误 请求超时等
      ElMessageBox.confirm(error.message, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      });
    }

    return Promise.reject(error);
  }
};

export default {
  post<T>(url: string, params: { [p: string]: any }, config?: customConfig) {
    return request<T>({
      method: "post",
      url,
      data: params,
      ...config,
    });
  },
  get<T>(url: string, config?: customConfig) {
    return request<T>({
      method: "get",
      url,
      ...config,
    });
  },
};
