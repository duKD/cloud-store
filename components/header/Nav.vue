<template>
  <div
    class="w-full h-60px flex justify-between items-center px-20px bg-gray-100"
  >
    <div class="w-120 font-bold text-xl">网盘服务</div>
    <ClientOnly> <NavRight /> </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import NavRight from "./NavRight.vue";
</script>
