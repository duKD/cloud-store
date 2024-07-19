<template>
  <div class="file-tree">
    <div v-for="(item, index) in files" :key="index">
      <div class="h-40px" v-if="!item.child">
        <img class="icon" width="30" height="30" :src="coverImg(item)" />
        <span class="file">{{ item.filename }}</span>
      </div>

      <div v-else class="w-full">
        <img class="icon" width="30" height="30" :src="coverImg(item)" />
        <span class="folder">{{ item.filename }}</span>
        <div class="h-10px"></div>
        <file-tree :files="item.child"></file-tree>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { fileDto } from "~/server/type/file";

const props = defineProps<{
  files: Array<fileDto>;
}>();

const coverImg = (file: fileDto) => {
  return (
    {
      "1": "/images/video.png",
      "2": "/images/audio.png",
      "6": "/images/folder.png",
    }[file.category] || "/images/other.png"
  );
};
</script>
<style scoped>
.file-tree {
  list-style-type: none;
  padding-left: 20px;
}

.file {
  font-family: monospace;
  line-height: 30px;
  color: #333;
}

.folder {
  font-weight: bold;
  padding-bottom: 10px;
}

.file-tree {
  padding-left: 20px;
}
.title {
  padding-bottom: 10px;
  border-bottom: 1px solid #999;
}

.icon {
  display: inline-block;
  margin-right: 20px;
  height: 30px;
  object-fit: contain;
}
</style>
