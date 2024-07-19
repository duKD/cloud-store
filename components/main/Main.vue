<template>
  <div class="w-full main flex">
    <!-- 左侧菜单 -->
    <section class="w-80px flex h-full items-center flex-col bg-light-100">
      <div
        v-for="item in menuList"
        :class="`cursor-pointer rounded-10px m-10px w-60px h-60px flex flex-col items-center justify-center ${
          activeId === item.id ? 'bg-light-800' : ''
        }`"
        @click="activeId = item.id"
      >
        <img :src="item.iconImg" class="w-28px h-28px" />
        <div>{{ item.title }}</div>
      </div>
    </section>
    <!-- 内容区 -->
    <section class="flex-1 h-full flex">
      <HomeShow v-show="activeId === 1" />
      <FileContent v-if="activeId === 2" />
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FileContent from "./file/FileContent.vue";
import HomeShow from "./HomeShow.vue";
import { useUserStore } from "~/store/user";

const activeId = ref(1);

const menuList = [
  {
    id: 1,
    title: "主页",
    iconImg: "/images/home.png",
  },
  {
    id: 2,
    title: "文件",
    iconImg: "/images/file.png",
  },
];

const userStore = useUserStore();

watch(
  () => userStore.userInfo,
  () => {
    if (!userStore.userInfo.userName) {
      activeId.value = 1;
    }
  },
  {
    deep: true,
  }
);
</script>
<style scoped>
.main {
  height: calc(100vh - 60px);
}
</style>
