<template>
  <transition name="fade">
    <div
      v-if="store.active || store.status === 'error'"
      class="global-upload-toast"
    >
      <div class="toast-header">
        <span v-if="store.status === 'creating'">Creating post…</span>
        <span v-else-if="store.status === 'uploading'">
          Uploading media… {{ store.progress }}%
          <br />
        </span>
        <span v-else-if="store.status === 'success'">Post published!</span>
        <span v-else-if="store.status === 'error'">
          {{ store.errorMessage || "Something went wrong." }}
        </span>
        <button
          v-if="store.status === 'success' || store.status === 'error'"
          class="toast-close"
          @click="store.dismiss()"
        >
          ✕
        </button>
      </div>

      <div v-if="store.status === 'uploading'" class="toast-progress-track">
        <div
          class="toast-progress-fill"
          :style="{ width: store.progress + '%' }"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { usePostUploadStore } from "@/stores/uploader";

const store = usePostUploadStore();
</script>

<style scoped>
.global-upload-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  min-width: 280px;
  background: #1e1e2d;
  color: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}

.toast-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.toast-close {
  background: none;
  border: none;
  color: #fff;
  opacity: 0.6;
  cursor: pointer;
  font-size: 14px;
}
.toast-close:hover {
  opacity: 1;
}

.toast-progress-track {
  margin-top: 8px;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  overflow: hidden;
}

.toast-progress-fill {
  height: 100%;
  background: #009ef7;
  transition: width 0.2s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
