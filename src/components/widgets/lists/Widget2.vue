<template>
  <!--begin::List Widget 2-->
  <div class="card h-100" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bold text-gray-900">Profiles</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->
        <router-link
          :to="{ name: 'instagramProfile' }"
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
        >
          <KTIcon icon-name="right-square" icon-class="fs-2" />
        </router-link>
        <!--end::Menu-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2" v-if="profiles.length > 0">
      <template v-for="(item, index) in profiles" :key="index">
        <!--begin::Item-->
        <div
          :class="{ 'mb-7': profiles.length - 1 !== index }"
          class="d-flex align-items-center"
        >
          <!--begin::Avatar-->
          <div class="symbol symbol-50px me-5">
            <img :src="item.profile_image" class="" alt="" />
          </div>
          <!--end::Avatar-->

          <!--begin::Text-->
          <div class="flex-grow-1">
            <a href="#" class="text-gray-900 fw-bold text-hover-primary fs-6">{{
              item.username
            }}</a>

            <span class="text-muted d-block fw-semibold">{{
              item.description
            }}</span>
          </div>
          <!--end::Text-->
        </div>
        <!--end::Item-->
      </template>
    </div>
    <div class="card-body p-0 align-content-center align-self-center" v-else>
      <div class="card-px text-center">
        <p class="text-gray-500 fs-3 fw-semibold">
          <span>there is no profile yet</span>
        </p>
        <!--end::Action-->
      </div>
      <img
        class="w-250px w-lg-300px"
        :src="getAssetPath('media/illustrations/sigma-1/5.png')"
      />
    </div>
    <!--end::Body-->
  </div>
  <!--end::List Widget 2-->
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "kt-widget-2",
  components: {
    Dropdown2,
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    const profiles = ref([]);
    const loading = ref(false);

    onMounted(() => {
      getProfiles();
    });

    const getProfiles = () => {
      loading.value = true;
      ApiService.get("/api/social-media/profile")
        .then((response) => {
          loading.value = false;
          profiles.value = response.data.results;
        })
        .catch((error) => {
          loading.value = false;
        });
    };

    return {
      profiles,
      loading,
      getProfiles,
      getAssetPath,
    };
  },
});
</script>

<style scoped lang="scss">
.card-body {
  max-height: 500px;
  overflow: auto;
}
</style>
