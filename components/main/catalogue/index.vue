<template>
  <el-dialog v-model="dialogVisible" title="目录树" width="800" @open="open">
    <div class="container">
      <div ref="captureRef" class="content">
        <FileTree :files="files" />
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <div v-show="url" class="flex items-center">
          <div>预览图片：</div>
          <el-image
            style="width: 100px; height: 100px"
            :src="url"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :initial-index="4"
            :preview-src-list="[url]"
            fit="cover"
          />
        </div>
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="createImage"
          >{{ url ? "下载" : "生成图片" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FileTree from "./FileTree.vue";
import html2canvas from "html2canvas";
import type { fileDto } from "~/server/type/file";
import { createImageAndDownloadLink } from "~/util";

const props = defineProps<{
  files: Array<fileDto>;
}>();

const dialogVisible = defineModel<boolean>();
const captureRef = ref();

const url = ref("");

const createImage = async () => {
  if (url.value) {
    createImageAndDownloadLink(url.value);
    return;
  }
  try {
    console.log("captureRef---", captureRef.value);
    const canvas = await html2canvas(captureRef.value);
    // 处理canvas，例如将其转换为图片显示或下载
    url.value = canvas.toDataURL("image/png");
  } catch (error) {
    console.error("截图失败:", error);
  }
};

const open = () => {
  url.value = "";
};
</script>
<style scoped>
.container {
  overflow: auto;
  height: 400px;
}
.content {
  padding: 10px;
}
</style>
