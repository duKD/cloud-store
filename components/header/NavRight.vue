<template>
  <div class="w-240px flex justify-between items-center">
    <div class="cursor-pointer" @click="toLogin">{{ nameText }}</div>
    <el-dropdown>
      <el-avatar class="cursor-pointer" :size="50" :src="circleUrl" />
      <template #dropdown>
        <el-dropdown-menu v-show="isLogin" @click="handle">
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-dialog v-model="dialogVisible" title="扫码登录" width="500">
    <div class="w-full flex justify-center items-center">
      <img class="w-200px h-200px" :src="qrCode" />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { getQrCode, getToken, getUserInfo } from "~/api/user";
import { useUserStore } from "~/store/user";
import { CodeEnum } from "~/util/request";
import { ElMessage } from "element-plus";

const userStore = useUserStore();

const isLogin = computed(() => !!userStore.accessToken);

const nameText = computed(() => {
  return isLogin.value ? userStore.userInfo.userName : "请登录网盘";
});

const circleUrl = computed(() => {
  return isLogin.value
    ? userStore.userInfo.headImg
    : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
});
const qrCode = ref("");

const codeStr = ref("");

const dialogVisible = ref(false);

const toLogin = () => {
  getQrCode("1").then((res) => {
    const { qrcode_url, device_code } = res.data;
    qrCode.value = qrcode_url;
    codeStr.value = device_code;
    dialogVisible.value = true;
    intervalQueryToken();
  });
};

let timer: NodeJS.Timeout | null;

const intervalQueryToken = () => {
  timer = setInterval(() => {
    if (!codeStr.value) return;
    getToken(codeStr.value).then((res) => {
      if (res.errorCode !== CodeEnum.SUCCESS_CODE) return;
      userStore.setToken(res.data.access_token);
      ElMessage({
        message: "登录成功",
        type: "success",
      });
      dialogVisible.value = false;
      clearInterval(timer!);
      timer = null;
    });
  }, 5000);
};

const handle = () => {
  userStore.loginOut();
};

watch(
  () => isLogin.value,
  () => {
    if (isLogin.value) {
      console.log("user--");
      getUserInfo("1", userStore.accessToken).then((res) => {
        if (res.errorCode !== CodeEnum.SUCCESS_CODE) return;
        console.log("getUserInfo---", res);
        userStore.setUserInfo(res.data);
      });
    }
  },
  {
    immediate: true,
  }
);
</script>
<style scoped lang="less"></style>
