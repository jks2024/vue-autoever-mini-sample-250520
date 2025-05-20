<template>
  <div
    :style="{ backgroundColor: themeStore.color }"
    class="min-h-screen transition-all"
  >
    <router-view />
  </div>
</template>

<script setup>
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
</script>
