import { ref, onMounted, onBeforeUnmount, type Ref } from "vue";

// useHover hook
export default function useHover(dom: Ref<HTMLElement | undefined>) {
  const isHovered = ref(false); // 创建一个响应式的移入状态

  // 鼠标移入事件处理函数
  const onHoverIn = () => {
    isHovered.value = true;
  };

  // 鼠标移出事件处理函数
  const onHoverOut = () => {
    isHovered.value = false;
  };

  onMounted(() => {
    if (dom.value) {
      dom.value.addEventListener("mouseenter", onHoverIn);
      dom.value.addEventListener("mouseleave", onHoverOut);
    }
  });

  onBeforeUnmount(() => {
    if (dom.value) {
      dom.value.removeEventListener("mouseenter", onHoverIn);
      dom.value.removeEventListener("mouseleave", onHoverOut);
    }
  });

  // 返回一个对象，包含 isHovered 状态和事件处理函数
  return {
    isHovered,
  };
}
