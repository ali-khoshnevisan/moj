<template>
  <div class="card card-flush">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-gray-800">crawler history</span>
      </h3>
    </div>

    <div
      class="card-body pt-6"
      v-loading="loading"
      :element-loading-spinner="loadingSvg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
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
                  <span>there are no data crawled yet.</span>
                </p>
                <router-link :to="{ name: 'crawlers' }" class="btn btn-primary">
                  <KTIcon icon-name="plus" icon-class="fs-2" />
                  Add Crawler
                </router-link>
                <!--end::Action-->
              </div>
              <!--end::Heading-->

              <!--begin::Illustration-->
              <div class="text-center px-5">
                <img
                  class="w-250px w-lg-300px theme-light-show"
                  :src="getAssetPath('media/illustrations/sketchy-1/17.png')"
                  alt=""
                />
              </div>
            </div>
            <!--begin::Table container-->
            <div class="table-responsive" v-else>
              <!--begin::Table-->
              <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                <!--begin::Table head-->
                <thead v-if="i <= 1">
                  <tr class="fs-7 fw-bold text-gray-500 border-bottom-0">
                    <th class="p-0 pb-3 min-w-150px text-start">media</th>
                    <th class="p-0 pb-3 min-w-150px pe-7 text-center">text</th>
                    <th class="p-0 pb-3 min-w-150px text-center">url</th>
                    <th class="p-0 pb-3 min-w-150px text-end">share</th>
                  </tr>
                </thead>
                <thead v-else>
                  <tr class="fs-7 fw-bold text-gray-500 border-bottom-0">
                    <th class="p-0 pb-3 min-w-50px text-start">url</th>
                    <th class="p-0 pb-3 min-w-150px pe-7 text-center">
                      status
                    </th>
                    <th class="p-0 pb-3 min-w-150px text-center">posts</th>
                  </tr>
                </thead>
                <!--end::Table head-->

                <!--begin::Table body-->

                <tbody>
                  <template v-for="(row, j) in item.table" :key="j">
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="me-3">
                            <video
                              v-if="isVideo(row)"
                              :src="row.media"
                              class="post-media"
                            />
                            <img
                              v-else
                              :src="row.media"
                              class="post-media"
                              alt=""
                            />
                          </div>
                        </div>
                      </td>

                      <!--                      <td class="pe-13">-->
                      <!--                        <span class="text-gray-600 fw-bold fs-6">{{-->
                      <!--                          row.subject-->
                      <!--                        }}</span>-->
                      <!--                      </td>-->

                      <td class="pe-0 text-center">
                        <div class="post-text">
                          {{ row.text }}
                        </div>
                      </td>

                      <td class="pe-0 text-center">
                        {{ row.url }}
                      </td>

                      <td class="text-end">
                        <router-link
                          :to="{
                            name: 'quickPost',
                            query: { crawlId: row.id },
                          }"
                          class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                        >
                          <KTIcon
                            icon-name="share"
                            icon-class="fs-5 text-gray-700"
                          />
                        </router-link>
                      </td>
                    </tr>
                  </template>
                </tbody>

                <!--end::Table body-->
              </table>
              <div class="pagination text-center">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="totalItems[i]"
                  @change="getReport($event, i)"
                />
              </div>
              <!--end::Table-->
            </div>
            <!--end::Table container-->
          </div>
          <!--end::Tap pane-->
        </template>
      </div>
      <!--end::Tab Content-->
    </div>
    <!--end: Card Body-->
  </div>
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "default-dashboard-widget-7",
  components: {
    Dropdown2,
  },
  props: {
    className: { type: String, required: false },
  },
  setup() {
    const totalItems = ref([1, 1]);
    const loading = ref(false);
    const loadingSvg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
    const items = ref([
      {
        title: "telegram",
        icon: "telegram",
        index: "1",
        table: [],
      },
      {
        title: "web",
        icon: "browser-chrome",
        index: "2",
        table: [],
      },
      // {
      //   title: "instagram",
      //   icon: "instagram",
      //   index: "3",
      //   table: [],
      // },
      // {
      //   title: "twitter",
      //   icon: "twitter-x",
      //   index: "4",
      //   table: [],
      // },
    ]);
    onMounted(() => {
      getWebActionsReport();
      getTelegramActionsReport();
      // getInstagramPosts();
      // getTwitterPosts();
    });

    const getReport = (pageNumber, index) => {
      if (index === 0) {
        getTelegramActionsReport(pageNumber);
        return;
      }
      if (index === 1) {
        getWebActionsReport(pageNumber);
      }
    };

    const isVideo = (row) => {
      return row.media?.includes(".mp4");
    };

    const getWebActionsReport = (page = 1) => {
      ApiService.get("/crawler/post", `?page=${page}&platform=web`).then(
        (res) => {
          totalItems.value[1] = res.data.count;
          items.value[1].table = res.data.results;
        }
      );
    };
    const getTelegramActionsReport = (page = 1) => {
      loading.value = true;
      ApiService.get("/crawler/post", `?page=${page}&platform=telegram`)
        .then((res) => {
          loading.value = false;
          totalItems.value[0] = res.data.count;
          items.value[0].table = res.data.results;
        })
        .catch((err) => {
          loading.value = false;
        });
    };
    // const getInstagramPosts = (page = 1) => {
    //   ApiService.get("/instagram/posts", `?page=${page}`).then((res) => {
    //     totalItems.value[2] = res.data.count;
    //     items.value[2].table = res.data.results;
    //   });
    // };
    // const getTwitterPosts = (page = 1) => {
    //   ApiService.get("/tweeter/posts", `?page=${page}`).then((res) => {
    //     totalItems.value[3] = res.data.count;
    //     items.value[3].table = res.data.results;
    //   });
    // };

    return {
      totalItems,
      loading,
      loadingSvg,
      items,
      getTelegramActionsReport,
      isVideo,
      getReport,
      getWebActionsReport,
      getAssetPath,
    };
  },
});
</script>

<style scoped lang="scss">
.post-text {
  direction: rtl;
  text-overflow: ellipsis;
  max-width: 900px;
  overflow: hidden;
  white-space: nowrap;
}
.post-media {
  max-width: 100px;
  max-height: 100px;
}
</style>
