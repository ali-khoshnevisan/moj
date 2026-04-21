<template>
  <!--begin::Tables widget 16-->
  <div class="card card-flush" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-gray-800">crawler report</span>
      </h3>
    </div>

    <div class="card-body pt-6">
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
            <!--begin::Table container-->
            <div class="table-responsive">
              <!--begin::Table-->
              <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
                <!--begin::Table head-->
                <thead v-if="i <= 1">
                  <tr class="fs-7 fw-bold text-gray-500 border-bottom-0">
                    <th class="p-0 pb-3 min-w-50px text-start">media</th>
                    <th class="p-0 pb-3 min-w-150px pe-7 text-center">text</th>
                    <th class="p-0 pb-3 min-w-150px text-center">url</th>
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
                          <div class="symbol symbol-50px me-3">
                            <img :src="row.media" class="" alt="" />
                          </div>
                        </div>
                      </td>

                      <!--                      <td class="pe-13">-->
                      <!--                        <span class="text-gray-600 fw-bold fs-6">{{-->
                      <!--                          row.subject-->
                      <!--                        }}</span>-->
                      <!--                      </td>-->

                      <td class="pe-0 text-center">
                        {{ row.text }}
                      </td>

                      <td class="pe-0 text-center">
                        {{ row.url }}
                      </td>

                      <!--                      <td class="text-end">-->
                      <!--                        <a-->
                      <!--                          href="#"-->
                      <!--                          class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"-->
                      <!--                        >-->
                      <!--                          <KTIcon-->
                      <!--                            icon-name="black-right"-->
                      <!--                            icon-class="fs-5 text-gray-700"-->
                      <!--                          />-->
                      <!--                        </a>-->
                      <!--                      </td>-->
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
  <!--end::Tables widget 16-->
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

    const getWebActionsReport = (page = 1) => {
      ApiService.get("/web-crawler/all-posts", `?page=${page}`).then((res) => {
        totalItems.value[1] = res.data.count;
        items.value[1].table = res.data.results;
      });
    };
    const getTelegramActionsReport = (page = 1) => {
      ApiService.get("/telegram-crawler/all-posts", `?page=${page}`).then(
        (res) => {
          totalItems.value[0] = res.data.count;
          items.value[0].table = res.data.results;
        }
      );
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
      items,
      getTelegramActionsReport,
      getReport,
      getWebActionsReport,
      getAssetPath,
    };
  },
});
</script>
