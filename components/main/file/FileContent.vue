<template>
  <div class="w-full pt-20px pl-20px flex flex-col">
    <FileNav ref="navRef" :refreshFile="refreshFile" />
    <FileSelect :fileList="fileList" :selectAll="selectAll" />
    <FileList
      :fileList="fileList"
      :handleSelect="handleSelect"
      @refreshFile="refreshFile"
    />
    <FileControl v-show="hasSelect" :createTree="createTree" />
    <catalogue v-model="showTree" :files="fileTree" />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import FileNav from "./FileNav.vue";
import FileList from "./FileList.vue";
import FileControl from "./FileControl.vue";
import FileSelect from "./FileSelect.vue";
import catalogue from "../catalogue/index.vue";
import { useUserStore } from "~/store/user";
import type { fileDto } from "~/server/type/file";
import { CodeEnum } from "~/util/request";
import { getAllFileByPath, isString, getAllFileByPaths } from "~/util";
import { ElMessage, ElLoading } from "element-plus";

const userStore = useUserStore();
const navRef = ref();

const isLogin = computed(() => !!userStore.accessToken);

const fileList = ref<Array<fileDto & { isSelect: boolean }>>([]);
function refreshFile(obj: string): void;
function refreshFile(obj: fileDto): void;
function refreshFile(obj: any) {
  let dirName = "";
  if (isString(obj)) {
    dirName = obj;
  } else {
    dirName = obj.path;
    navRef.value.refreshNav(obj);
  }
  getAllFileByPath({
    path: dirName,
    accessToken: userStore.accessToken,
  }).then((res) => {
    console.log("getFileByDirName----", res);
    fileList.value = res.map((item) => ({
      ...item,
      isSelect: false,
    }));
  });
}

// type 1 选中 2 取消
const handleSelect = (index: number, isSelect: boolean) => {
  fileList.value[index].isSelect = isSelect;
};

const selectAll = (isSelect: boolean) => {
  fileList.value.forEach((item) => {
    item.isSelect = isSelect;
  });
};

const hasSelect = computed(() => {
  return fileList.value.some((item) => item.isSelect);
});

const showTree = ref(false);

const fileTree = ref<any>([]);

// 生成目录树
const createTree = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: "生成中",
    background: "rgba(0, 0, 0, 0.7)",
  });
  const temp = fileList.value.filter((item) => item.isSelect);
  fileTree.value = await getAllFileByPaths(temp, userStore.accessToken);
  console.log(1111, fileTree.value);

  loading.close();
  showTree.value = true;
};

onMounted(() => {
  if (!isLogin.value) {
    return ElMessage.error("请先登录");
  }
  refreshFile("/");
});
</script>
<style scoped></style>
