<template>
  <!--begin::List Widget 1-->
  <div class="card h-450px">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <div class="title d-flex align-items-center">
        <i class="fs-1 me-5 bi bi-chat" />
        <h3 class="card-title align-items-start flex-column">
          <span class="card-label fw-bold text-gray-900">Latest Comments</span>
          <span class="text-muted mt-1 fw-semibold fs-7">Pending 10 tasks</span>
        </h3>
      </div>

      <div class="card-toolbar">
        <!--begin::Menu-->
        <router-link
          :to="{ name: 'actions' }"
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
        >
          <KTIcon icon-name="right-square" icon-class="fs-1" />
        </router-link>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-5 overflow-auto" v-if="items.length > 0">
      <template v-for="(item, index) in items" :key="index">
        <!--begin::Item-->
        <div
          :class="{ 'mb-7': items.length - 1 !== index }"
          class="d-flex align-items-center"
        >
          <!--begin::Symbol-->
          <div class="symbol symbol-50px me-5">
            <span
              :class="`bg-light-${getItemColor(item.social_media)}`"
              class="symbol-label"
            >
              <i :class="`bi bi-${getItemIcon(item.social_media)} fs-2x p-0`" />
            </span>
          </div>
          <!--end::Symbol-->

          <!--begin::Text-->
          <div class="d-flex flex-column flex-grow-1">
            <a href="#" class="text-gray-900 text-hover-primary fs-6 fw-bold">{{
              item.bot_info?.username ? item.bot_info.username : "username"
            }}</a>

            <span class="text-muted fw-semibold">{{
              formatDate(item.last_update)
            }}</span>
          </div>

          <span
            class="badge fs-8 fw-bold"
            :class="`badge-light-${statusClass(item.status)}`"
            >{{ item.status }}</span
          >
          <!--end::Text-->
        </div>
        <!--end::Item-->
      </template>
    </div>
    <div class="card-body align-content-center align-self-center" v-else>
      <div class="card-px text-center">
        <p class="text-gray-500 fs-3 fw-semibold mb-5">
          <span>there is no Comment yet</span>
        </p>
        <!--end::Action-->
      </div>
      <img
        class="w-200px w-lg-250px"
        :src="getAssetPath('media/illustrations/sigma-1/16.png')"
      />
    </div>
    <!--end::Body-->
  </div>
  <!--end::List Widget 1-->
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "kt-widget-1",
  components: {
    Dropdown1,
  },
  setup() {
    onMounted(() => {
      getLatestLikes();
    });
    const items = ref([]);

    const getLatestLikes = () => {
      ApiService.get("/social-media/actions", "?action=comment").then((res) => {
        items.value = res.data.results;
      });
    };
    const getItemColor = (social_media) => {
      if (social_media === "instagram") {
        return "danger";
      }
    };
    const getItemIcon = (social_media) => {
      if (social_media === "instagram") {
        return "instagram";
      }
    };

    const statusClass = (status) => {
      if (status === "success") {
        return "success";
      }
      if (status === "pending" || status === "requested") {
        return "warning";
      }
      return "danger";
    };
    const formatDate = (iso) => {
      const date = new Date(iso);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };
    return {
      items,
      formatDate,
      statusClass,
      getAssetPath,
      getItemIcon,
      getItemColor,
    };
  },
});
</script>
