<template>
  <!--begin::List Widget 7-->
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header align-items-center border-0 mt-4">
      <h3 class="card-title align-items-start flex-column">
        <span class="fw-bold text-gray-900">Latest Actions</span>

        <!--        <span class="text-muted mt-1 fw-semibold fs-7"-->
        <!--          >Articles and publications</span-->
        <!--        >-->
      </h3>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-6" element-loading-svg-view-box="-10, -10, 50, 50">
      <ul class="nav nav-pills nav-pills-custom mb-3">
        <template v-for="(item, i) in items" :key="i">
          <!--begin::Item-->
          <li class="nav-item mb-3 me-3 me-lg-6">
            <!--begin::Link-->
            <a
              class="nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-column overflow-hidden w-80px h-85px pt-5 pb-2"
              :class="[i === 0 && 'active']"
              :id="`kt_stats_widget_16_tab_link_${i}`"
              data-bs-toggle="pill"
              :href="`#kt_stats_widget_16_tab_${i}`"
            >
              <!--begin::Icon-->
              <div class="nav-icon mb-3">
                <i :class="`bi bi-${item.icon} fs-1 p-0`" />
              </div>
              <!--end::Icon-->

              <!--begin::Title-->
              <span class="nav-text text-gray-800 fw-bold fs-6 lh-1">
                {{ item.title }}
              </span>
              <!--end::Title-->

              <!--begin::Bullet-->
              <span
                class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary"
              ></span>
              <!--end::Bullet-->
            </a>
            <!--end::Link-->
          </li>
          <!--end::Item-->
        </template>
      </ul>

      <div class="tab-content">
        <template v-for="(item, i) in items" :key="i">
          <!--begin::Tap pane-->
          <div
            class="tab-pane fade"
            :class="[i === 0 && 'active show']"
            :id="`kt_stats_widget_16_tab_${i}`"
          >
            <div v-if="item.table.length === 0" class="row">
              <div class="card-px text-center py-10">
                <p class="text-gray-500 fs-3 fw-semibold mb-13">
                  <span>there are no action {{ item.title }} yet.</span>
                </p>
                <router-link :to="{ name: 'actions' }" class="btn btn-primary">
                  <KTIcon icon-name="plus" icon-class="fs-2" />
                  Create Action
                </router-link>
                <!--end::Action-->
              </div>
              <!--end::Heading-->

              <!--begin::Illustration-->
              <!--              <div class="text-center px-5">-->
              <!--                <img-->
              <!--                  class="w-250px w-lg-300px theme-light-show"-->
              <!--                  :src="getAssetPath('media/illustrations/sketchy-1/17.png')"-->
              <!--                  alt=""-->
              <!--                />-->
              <!--              </div>-->
            </div>
            <!--begin::Table container-->
            <div class="table-responsive" v-else>
              <!--begin::Table-->
              <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                <!--begin::Table head-->
                <!--                <thead v-if="i <= 1">-->
                <!--                  <tr class="fs-7 fw-bold text-gray-500 border-bottom-0">-->
                <!--                    <th class="p-0 pb-3 min-w-150px text-start">Account</th>-->
                <!--                    <th class="p-0 pb-3 min-w-150px text-start">url</th>-->
                <!--                    <th class="p-0 pb-3 min-w-150px pe-7 text-start">status</th>-->
                <!--                  </tr>-->
                <!--                </thead>-->
                <!--                <thead v-else>-->
                <!--                  <tr class="fs-7 fw-bold text-gray-500 border-bottom-0">-->
                <!--                    <th class="p-0 pb-3 min-w-50px text-start">url</th>-->
                <!--                    <th class="p-0 pb-3 min-w-150px pe-7 text-center">-->
                <!--                      status-->
                <!--                    </th>-->
                <!--                    <th class="p-0 pb-3 min-w-150px text-center">posts</th>-->
                <!--                  </tr>-->
                <!--                </thead>-->
                <!--end::Table head-->

                <!--begin::Table body-->

                <tbody>
                  <template v-for="(row, index) in item.table" :key="index">
                    <!--begin::Item-->
                    <div
                      :class="{ 'mb-7': item.table.length - 1 !== index }"
                      class="d-flex align-items-sm-center"
                    >
                      {{ row.bot_info.profile_image }}
                      <!--begin::Symbol-->
                      <div class="symbol symbol-60px me-4">
                        <div
                          class="symbol-label"
                          :style="{
                            backgroundImage: `url(${
                              row.bot_info.profile_image
                                ? row.bot_info.profile_image
                                : '/media/avatars/blank.png'
                            })`,
                          }"
                        ></div>
                      </div>
                      <!--end::Symbol-->

                      <!--begin::Title-->
                      <div
                        class="d-flex row flex-row-fluid flex-wrap align-items-center"
                      >
                        <div class="col-6">
                          <a
                            href="#"
                            class="text-gray-800 fw-bold text-hover-primary fs-6"
                            >{{
                              row.bot_info.username
                                ? row.bot_info.username
                                : row.bot_info.url
                            }}</a
                          >

                          <span class="text-muted fw-semibold d-block pt-1"
                            >Date: {{ formatDate(row.last_update) }}</span
                          >
                        </div>
                        <div class="col-6 d-flex justify-content-between">
                          <a :href="row.url" class="fs-8 fw-bold my-2">
                            {{ row.url }}
                          </a>

                          <div
                            :class="`badge-light-${getStatusColor(row.status)}`"
                            class="badge fs-8 fw-bold my-2"
                          >
                            {{ row.status }}
                          </div>
                        </div>
                      </div>
                      <!--end::Title-->
                    </div>
                    <!--end::Item-->
                  </template>
                </tbody>

                <!--end::Table body-->
              </table>
              <!--end::Table-->
            </div>
            <!--end::Table container-->
          </div>
          <!--end::Tap pane-->
        </template>
      </div>
      <!--end::Tab Content-->
    </div>
    <!--    <div class="card-body pt-3">-->
    <!--      <template v-for="(item, index) in list" :key="index">-->
    <!--        &lt;!&ndash;begin::Item&ndash;&gt;-->
    <!--        <div-->
    <!--          :class="{ 'mb-7': list.length - 1 !== index }"-->
    <!--          class="d-flex align-items-sm-center"-->
    <!--        >-->
    <!--          &lt;!&ndash;begin::Symbol&ndash;&gt;-->
    <!--          <div class="symbol symbol-60px me-4">-->
    <!--            <div-->
    <!--              class="symbol-label"-->
    <!--              :style="{-->
    <!--                backgroundImage: `url(${item.image})`,-->
    <!--              }"-->
    <!--            ></div>-->
    <!--          </div>-->
    <!--          &lt;!&ndash;end::Symbol&ndash;&gt;-->

    <!--          &lt;!&ndash;begin::Title&ndash;&gt;-->
    <!--          <div class="d-flex flex-row-fluid flex-wrap align-items-center">-->
    <!--            <div class="flex-grow-1 me-2">-->
    <!--              <a-->
    <!--                href="#"-->
    <!--                class="text-gray-800 fw-bold text-hover-primary fs-6"-->
    <!--                >{{ item.title }}</a-->
    <!--              >-->

    <!--              <span class="text-muted fw-semibold d-block pt-1"-->
    <!--                >Size: {{ item.size }}</span-->
    <!--              >-->
    <!--            </div>-->

    <!--            <span-->
    <!--              :class="`badge-light-${item.color}`"-->
    <!--              class="badge fs-8 fw-bold my-2"-->
    <!--              >{{ item.status }}</span-->
    <!--            >-->
    <!--          </div>-->
    <!--          &lt;!&ndash;end::Title&ndash;&gt;-->
    <!--        </div>-->
    <!--        &lt;!&ndash;end::Item&ndash;&gt;-->
    <!--      </template>-->
    <!--    </div>-->
    <!--end::Body-->
  </div>
  <!--end::List Widget 7-->
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Dropdown1 from "@/components/dropdown/Dropdown1.vue";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "kt-widget-6",
  components: {
    Dropdown1,
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    onMounted(() => {
      getLatestLikes();
      getLatestFollws();
      getLatestComments();
      getLatestDirects();
    });

    const items = ref([
      {
        title: "Like",
        icon: "hand-thumbs-up",
        index: "1",
        table: [],
      },
      {
        title: "Follow",
        icon: "people-fill",
        index: "2",
        table: [],
      },
      {
        title: "Comment",
        icon: "chat",
        index: "3",
        table: [],
      },
      {
        title: "Direct",
        icon: "chat-left-text",
        index: "4",
        table: [],
      },
    ]);

    const formatDate = (iso) => {
      const date = new Date(iso);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const getLatestLikes = () => {
      ApiService.query("/social-media/actions/?action=like").then((res) => {
        items.value[0].table = res.data.results;
      });
    };
    const getLatestFollws = () => {
      ApiService.query("/social-media/actions/?action=follow").then((res) => {
        items.value[1].table = res.data.results;
      });
    };
    const getLatestComments = () => {
      ApiService.query("/social-media/actions/?action=comment").then((res) => {
        items.value[2].table = res.data.results;
      });
    };
    const getLatestDirects = () => {
      ApiService.query("/social-media/actions/?action=direct").then((res) => {
        items.value[3].table = res.data.results;
      });
    };

    const getStatusColor = (status) => {
      if (status === "pending") {
        return "warning";
      }
      if (status === "success") {
        return "success";
      }
      if (status === "failed") {
        return "danger";
      }
    };

    return {
      items,
      getAssetPath,
      formatDate,
      getStatusColor,
    };
  },
});
</script>

<style scoped lang="scss">
.symbol-label {
  border-radius: 100%;
}
</style>
