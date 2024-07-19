export type fileDto = {
  //文件在云端的唯一标识ID
  fileId: string;
  /**
   * 文件名
   */
  filename: string;
  /**
   * 文件大小 单位B
   */
  size: number;
  /**
   * 文件的绝对路径
   */
  path: string;
  /**
   * 文件在服务器创建时间
   */
  ctime: number;
  /**
   * 文件修改时间
   */
  utime: number;
  /**
   * 是否为目录
   */
  isdir: boolean;
  // 文件类型，1 视频、2 音频、3 图片、4 文档、5 应用、6 其他、7 种子
  category: number;
  // 该目录是否存在子目录  0为存在， 1为不存在
  dir_empty: number;
  //包含三个尺寸的缩略图URL
  thumbs: any;
  child?: Array<fileDto>;
};
