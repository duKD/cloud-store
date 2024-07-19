<template>
  <div class="file-control">
    <div class="cursor-pointer" @click="handle">生成目录树</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps<{
  createTree: Function;
}>();

const handle = () => {
  props.createTree();
};
</script>
<style scoped>
.file-control {
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
  margin: auto;
  width: 250px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid rgba(132, 133, 141, 0.36);
  background: rgb(49, 49, 54);
  overflow: visible;
  user-select: none;
  box-shadow: 0 0 1px 1px rgba(28, 28, 32, 0.05),
    0 8px 24px rgba(28, 28, 32, 0.12);
  color: #fff;
  justify-content: center;
  align-items: center;
}
</style>
