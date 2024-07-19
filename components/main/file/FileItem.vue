<template>
  <div
    ref="container"
    :class="`file-item w-180px h-200px m-10px ${hoverReal ? 'hover' : ''}`"
  >
    <img :src="coverImg" class="w-140px h-120px object-contain" />
    <div class="file-item-name">{{ file.filename }}</div>
    <div class="file-item-time">
      {{ formatTime(file.utime * 1000) }}
    </div>
    <div
      v-show="hoverReal"
      :class="`file-icon ${hasSelect ? 'select' : 'no-select'}`"
      @click="handle"
    >
      <div class="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { fileDto } from "~/server/type/file";
import { formatTime } from "~/util";
import useHover from "~/hook/useHover";
import { ref, watch } from "vue";
const props = defineProps<{
  file: fileDto & {
    isSelect: boolean;
  };
  handleSelect: Function;
  index: number;
}>();

const coverImg = computed(() => {
  return (
    {
      "1": "/images/video.png",
      "2": "/images/audio.png",
      "3": props.file.thumbs ? props.file.thumbs.url1 : "",
      "6": "/images/folder.png",
    }[props.file.category] || "/images/other.png"
  );
});

const container = ref<HTMLElement>();

const { isHovered } = useHover(container);

const hoverReal = computed(() => isHovered.value || hasSelect.value);

const hasSelect = ref(false);

watch(props.file, () => {
  hasSelect.value = props.file.isSelect;
});

const handle = (event: Event) => {
  event.stopPropagation();
  hasSelect.value = !hasSelect.value;
  props.handleSelect(props.index, hasSelect.value);
};
</script>
<style scoped>
.file-item {
  position: relative;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.hover {
  background-color: rgba(132, 133, 141, 0.08);
}
.file-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
}
.file-icon .item {
  width: 16px;
  height: 16px;
}
.no-select .item:hover {
  border: 2px solid #6e86e7;
}

.no-select .item {
  border: 2px solid rgba(132, 133, 141, 0.2);
  border-radius: 50%;
}

.select .item {
  background-image: url(/public/images/select.png);
  background-size: 100%;
}
.file-item-name {
  width: 100%;
  text-align: center;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.5;
  color: rgb(25, 25, 26);
}

.file-item-time {
  font-size: 12px;
  color: rgba(37, 38, 43, 0.36);
}
</style>
