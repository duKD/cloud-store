<template>
  <div class="flex flex-wrap w-full overflow-auto">
    <FileItem
      v-for="(item, index) in fileList"
      :file="item"
      :index="index"
      :key="item.fileId"
      :handleSelect="handleSelect"
      @click="handle(item)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FileItem from "./FileItem.vue";
import type { fileDto } from "~/server/type/file";

const props = defineProps<{
  fileList: Array<
    fileDto & {
      isSelect: boolean;
    }
  >;
  handleSelect: Function;
}>();

const emit = defineEmits<{
  (e: "refreshFile", file: fileDto): void;
}>();

const handle = (file: fileDto) => {
  console.log("handle");
  if (file.isdir) {
    emit("refreshFile", file);
  }
};
</script>
