<template>
  <div id="kt_app_content" class="app-content flex-column-fluid">
    <!--begin::Content container-->
    <div
      id="kt_app_content_container"
      class="app-container"
      :class="{
        'container-fluid': contentWidthFluid,
        'container-xxl': !contentWidthFluid,
      }"
    >
      <RouterView :key="route.name"></RouterView>
    </div>
    <!--end::Content container-->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { contentWidthFluid } from "@/layouts/default-layout/config/helper";
import { RouterView } from "vue-router";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "default-layout-content",
  components: {
    RouterView,
  },
  setup() {
    const route = useRoute();
    return {
      route,
      contentWidthFluid,
    };
  },
});
</script>
