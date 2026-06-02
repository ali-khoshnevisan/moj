<template>
  <!--begin::Footer-->
  <div
    class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6"
    id="kt_app_sidebar_footer"
  >
    <router-link
      :to="{ name: 'Settings' }"
      class="btn btn-flex flex-center btn-custom btn-bordered overflow-hidden text-nowrap px-0 h-40px w-100"
    >
      <i class="bi bi-gear fs-2 me-1"></i>
      <!--      <KTIcon icon-name="setting-2" icon-class="fs-2 me-1" />-->
      <span class="btn-label">Settings</span>
    </router-link>
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "sidebar-footer",
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>

<style lang="scss" scoped>
.btn-custom {
  border: 1px solid rgb(13, 14, 18) !important;
}
</style>
