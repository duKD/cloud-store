<template>
  <div class="select">
    <div
      :class="`mx-10px select-icon select-icon-${selectInfo.type}`"
      @click="handle"
    />
    <div class="select-text">{{ selectInfo.text }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { fileDto } from "~/server/type/file";

const props = defineProps<{
  fileList: Array<
    fileDto & {
      isSelect: boolean;
    }
  >;
  selectAll: Function;
}>();

const selectFiles = computed(() => {
  return props.fileList.filter((item) => item.isSelect);
});

const selectInfo = computed(() => {
  if (selectFiles.value.length === 0) {
    return {
      type: 1,
      text: `共${props.fileList.length}项`,
    };
  } else {
    return {
      type: selectFiles.value.length !== props.fileList.length ? 2 : 3,
      text: `已选${selectFiles.value.length}项`,
    };
  }
});

const handle = () => {
  if (selectInfo.value.type === 3) {
    //  取消
    props.selectAll(false);
  } else {
    //全选
    props.selectAll(true);
  }
};
</script>
<style scoped>
.select {
  display: flex;
  margin-right: 20px;
  height: 40px;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(132, 133, 141, 0.08);
}

.select-text {
  font-size: 12px;
  color: rgba(37, 38, 43, 0.72);
}
.select-icon {
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.select-icon-1 {
  border: 2px solid rgba(132, 133, 141, 0.2);
  border-radius: 50%;
}
.select-icon-1:hover {
  border: 2px solid #6e86e7;
}
.select-icon-2 {
  background-image: url(/public/images/cancel.png);
  background-size: 100%;
}
.select-icon-3 {
  background-image: url(/public/images/select.png);
  background-size: 100%;
}
</style>
