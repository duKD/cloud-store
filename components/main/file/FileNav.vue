<template>
  <div class="w-full h-40px flex flex-shrink-0 items-center">
    <div
      v-for="(item, index) in fileNames"
      :key="item.path"
      :class="` px-10px ${
        index === fileNames.length - 1 ? '' : 'text-light-800'
      }`"
      @click="handle(index)"
    >
      <span
        :class="`title ${index !== fileNames.length - 1 ? 'active' : ''}`"
        >{{ item.name }}</span
      >
      <span v-show="index !== fileNames.length - 1"> › </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { fileDto } from "~/server/type/file";

const props = defineProps<{
  refreshFile: Function;
}>();

const fileNames = ref([{ name: "全部文件", path: "/" }]);

const handle = (index: number) => {
  if (index === fileNames.value.length - 1) return;
  const path = fileNames.value[index].path;
  fileNames.value = fileNames.value.slice(0, index + 1);
  props.refreshFile(path);
};

const refreshNav = (file: fileDto) => {
  if (file.isdir) {
    fileNames.value.push({
      name: file.filename,
      path: file.path,
    });
  }
};

defineExpose({
  refreshNav,
});
</script>
<style scoped>
.title {
  cursor: pointer;
}
.active:hover {
  color: #6e86e7;
}
</style>
