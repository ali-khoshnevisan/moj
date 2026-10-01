<template>
  <div class="card card-flush">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <!--      <h3 class="card-title align-items-start flex-column">-->
      <!--        <span class="card-label fw-bold text-gray-800">crawler history</span>-->
      <!--      </h3>-->
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
      <div
        class="filters w-50"
        v-if="showFilters()"
        v-loading="accountsLoading"
      >
        <p>filter by crawler</p>
        <el-select v-model="filterAccount" @change="filterHistory">
          <el-option :value="null">All Crawlers</el-option>
          <el-option
            v-for="account in accounts"
            :key="account.id"
            :value="account.id"
            :label="account.url"
          >
            {{ account.url }}
          </el-option>
        </el-select>
      </div>
    </div>

    <div
      class="card-body pt-6"
      v-loading="loading"
      :element-loading-spinner="loadingSvg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
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
                  go to Crawlers
                  <KTIcon icon-name="arrow-right" icon-class="fs-2" />
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
                    <th class="p-0 pb-3 text-start">media</th>
                    <th class="p-0 pb-3 pe-7 text-center">post text</th>
                    <!--                    <th class="p-0 pb-3 pe-7 text-center">AI text</th>-->
                    <th class="p-0 pb-3 pe-7 text-center">Crawl date</th>
                    <th class="p-0 pb-3 min-w-150px pe-7 text-center">url</th>
                    <th class="p-0 pb-3 text-end">share</th>
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
                      <td @click="showMedia(row)">
                        <span v-if="row.status === 'requested'">
                          waiting....
                        </span>
                        <video
                          v-else-if="isVideo(row)"
                          :src="row.media_file ? row.media_file : row.media"
                          class="post-media"
                        />
                        <img
                          v-else
                          :src="row.media_file ? row.media_file : row.media"
                          class="post-media"
                          alt=""
                        />
                      </td>

                      <!--                      <td class="pe-13">-->
                      <!--                        <span class="text-gray-600 fw-bold fs-6">{{-->
                      <!--                          row.subject-->
                      <!--                        }}</span>-->
                      <!--                      </td>-->

                      <td class="pe-0 text-center">
                        <span v-if="row.status === 'requested'">
                          waiting....
                        </span>
                        <el-tooltip
                          v-else
                          class="box-item"
                          effect="dark"
                          placement="top"
                        >
                          <template #content>
                            <div
                              :style="{
                                whiteSpace: 'pre-wrap',
                                overflowWrap: 'break-word',
                                wordBreak: 'break-word',
                              }"
                              dir="auto"
                            >
                              {{ row.text }}
                            </div>
                          </template>
                          <div class="post-text" dir="auto">
                            {{ row.text }}
                          </div>
                        </el-tooltip>
                      </td>
                      <!--                      <td class="pe-0 text-center">-->
                      <!--                        <el-tooltip-->
                      <!--                          class="box-item"-->
                      <!--                          effect="dark"-->
                      <!--                          :content="row.ai_response"-->
                      <!--                          placement="top"-->
                      <!--                        >-->
                      <!--                          <template #content>-->
                      <!--                            <div-->
                      <!--                              :style="{-->
                      <!--                                whiteSpace: 'pre-wrap',-->
                      <!--                                overflowWrap: 'break-word',-->
                      <!--                                wordBreak: 'break-word',-->
                      <!--                              }"-->
                      <!--                              dir="auto"-->
                      <!--                            >-->
                      <!--                              {{ row.ai_response }}-->
                      <!--                            </div>-->
                      <!--                          </template>-->
                      <!--                          <div class="post-text" dir="auto">-->
                      <!--                            {{ row.ai_response }}-->
                      <!--                          </div>-->
                      <!--                        </el-tooltip>-->
                      <!--                      </td>-->

                      <td>
                        <div class="fs-7 fw-bold text-muted">
                          {{ formatDate(row.created_at) }}
                        </div>
                      </td>

                      <td class="pe-0 text-center">
                        <el-tooltip
                          class="box-item"
                          effect="dark"
                          :content="row.url"
                          placement="top"
                        >
                          <a :href="row.url">view link</a>
                        </el-tooltip>
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
  <el-dialog
    :show-close="false"
    class="p-0"
    header-class="d-none"
    footer-class="d-none"
    v-model="mediaDialog"
  >
    <video
      v-if="isVideo(dialogMedia)"
      :src="dialogMedia.media_file ? dialogMedia.media_file : dialogMedia.media"
      class="w-100"
    />
    <img
      v-else
      :src="dialogMedia.media_file ? dialogMedia.media_file : dialogMedia.media"
      class="w-100"
      alt=""
    />
  </el-dialog>
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import ApiService from "@/core/services/ApiService";
import { ElMessage } from "element-plus";

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
    const accountsLoading = ref(false);
    const mediaDialog = ref(false);
    const dialogMedia = ref("");
    const filterAccount = ref(null);
    const filterDate = ref(null);
    const accounts = ref([]);
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
        title: "Telegram",
        icon: "telegram",
        index: "1",
        table: [],
      },
      {
        title: "Web",
        icon: "browser-chrome",
        index: "2",
        table: [],
      },
    ]);
    onMounted(() => {
      getWebActionsReport();
      getTelegramActionsReport();
      getCrawlers();
    });

    const showFilters = () => {
      return items.value[0].table.length > 0 || items.value[1].table.length > 0;
    };

    const showMedia = (media) => {
      mediaDialog.value = true;
      dialogMedia.value = media;
    };

    const getReport = (pageNumber, index) => {
      if (index === 0) {
        getTelegramActionsReport(pageNumber);
        return;
      }
      if (index === 1) {
        getWebActionsReport(pageNumber);
      }
    };

    const getCrawlers = () => {
      accountsLoading.value = true;
      ApiService.get("/api/crawler/account")
        .then((response) => {
          accountsLoading.value = false;
          accounts.value = response.data.results;
        })
        .catch((error) => {
          accountsLoading.value = false;
          ElMessage.error("Something went wrong");
        });
    };

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
    const isVideo = (row) => {
      return row.media_file?.includes(".mp4");
    };

    const filterHistory = () => {
      getWebActionsReport();
      getTelegramActionsReport();
    };

    const getWebActionsReport = (page = 1) => {
      ApiService.query("/api/crawler/post/", {
        params: {
          page,
          platform: "web",
          account: filterAccount.value,
          created_at: filterDate.value,
          status: "ai-generated",
        },
      }).then((res) => {
        totalItems.value[1] = res.data.count;
        items.value[1].table = res.data.results;
      });
    };
    const getTelegramActionsReport = (page = 1) => {
      loading.value = true;
      ApiService.query("/api/crawler/post/", {
        params: {
          page,
          platform: "telegram",
          account: filterAccount.value,
          created_at: filterDate.value,
        },
      })
        .then((res) => {
          loading.value = false;
          totalItems.value[0] = res.data.count;
          items.value[0].table = res.data.results;
        })
        .catch((err) => {
          loading.value = false;
        });
    };

    return {
      totalItems,
      loading,
      filterAccount,
      filterDate,
      accountsLoading,
      loadingSvg,
      accounts,
      items,
      mediaDialog,
      showMedia,
      showFilters,
      dialogMedia,
      getTelegramActionsReport,
      isVideo,
      filterHistory,
      getReport,
      getWebActionsReport,
      getAssetPath,
      formatDate,
    };
  },
});
</script>

<style scoped lang="scss">
.post-text {
  text-overflow: ellipsis;
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;
  &.rtl {
    direction: rtl;
  }
}
.post-media {
  cursor: pointer;
  max-width: 50px;
  max-height: 50px;
}
:deep(.el-tooltip) {
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-word;
}
</style>
