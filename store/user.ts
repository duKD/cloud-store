import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";

const KEY = "TOKEN_KEY";

export const useUserStore = defineStore("user", () => {
  const token = ref("");

  const userInfo = reactive({
    userName: "",
    headImg: "",
  });

  const accessToken = computed(() => {
    if (token.value) {
      return token.value;
    }
    const res = localStorage.getItem(KEY);
    if (res) {
      token.value = res;
      return token.value;
    } else {
      // 调用接口获取
    }
    return token.value;
  });

  const setToken = async (str: string) => {
    localStorage.setItem(KEY, str);
    token.value = str;
  };

  const setUserInfo = (data: any) => {
    userInfo.userName = data.userName;
    userInfo.headImg = data.headImg;
  };

  const loginOut = () => {
    setToken("");
    setUserInfo({
      userName: "",
      headImg: "",
    });
  };

  return {
    accessToken,
    setToken,
    userInfo,
    setUserInfo,
    loginOut,
  };
});
