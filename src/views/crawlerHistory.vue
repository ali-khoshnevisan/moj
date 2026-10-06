<template>
  <div class="card card-flush">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Filters-->
      <div
        v-if="showFilters()"
        class="d-flex align-items-end flex-wrap gap-5 mb-3"
      >
        <div class="filter-platform">
          <div class="form-label fw-semibold">Platform</div>
          <el-select
            v-model="filters.platform"
            @change="onPlatformChange()"
            class="w-200px"
          >
            <el-option :value="null">All platforms</el-option>
            <el-option
              v-for="platform in platformOptions"
              :key="platform.value"
              :value="platform.value"
            >
              {{ platform.label }}
            </el-option>
          </el-select>
        </div>
        <div class="filter-account">
          <div class="form-label fw-semibold">Crawler</div>
          <el-select
            v-model="filters.account"
            filterable
            class="w-250px"
            :loading="accountsLoading"
            @change="onFilterChange()"
          >
            <el-option :value="null">All Crawlers</el-option>
            <el-option
              v-for="account in accountOptions"
              :key="account.id"
              :value="account.id"
              :label="account.url"
            >
              {{ account.url }}
            </el-option>
          </el-select>
        </div>
      </div>
      <!--end::Filters-->
    </div>
    <!--end::Header-->

    <div
      class="card-body pt-6"
      v-loading="loading"
      :element-loading-spinner="loadingSvg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <div
        v-if="posts.length === 0 && hasFilters()"
        class="text-center text-gray-500 fs-4 fw-semibold py-10"
      >
        no data matches the selected filters.
      </div>
      <div v-else-if="posts.length === 0 && !loading" class="row">
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
      <div class="table-responsive" v-else-if="posts.length > 0">
        <!--begin::Table-->
        <table class="table table-row-dashed align-middle gs-0 gy-3 my-0">
          <!--begin::Table head-->
          <thead>
            <tr class="fs-7 fw-bold text-gray-500 border-bottom-0">
              <th class="p-0 pb-3 text-start">platform</th>
              <th class="p-0 pb-3 text-start">media</th>
              <th class="p-0 pb-3 pe-7 text-center">post text</th>
              <!--                    <th class="p-0 pb-3 pe-7 text-center">AI text</th>-->
              <th class="p-0 pb-3 pe-7 text-center">Crawl date</th>
              <th class="p-0 pb-3 min-w-150px pe-7 text-center">url</th>
              <th class="p-0 pb-3 text-end">share</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->

          <tbody>
            <template v-for="(row, j) in posts" :key="j">
              <tr>
                <td>
                  <i
                    :class="`bi bi-${platformIcon(platformOf(row))} fs-2`"
                    :title="platformOf(row)"
                  />
                </td>
                <td @click="showMedia(row)">
                  <span v-if="row.status === 'requested'"> waiting.... </span>
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

                <td class="pe-0 text-center">
                  <span v-if="row.status === 'requested'"> waiting.... </span>
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
                    <KTIcon icon-name="share" icon-class="fs-5 text-gray-700" />
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>

          <!--end::Table body-->
        </table>
        <div class="pagination text-center">
          <el-pagination
            :key="filterKey"
            background
            layout="prev, pager, next"
            :total="totalItems"
            @change="getPosts($event)"
          />
        </div>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
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
import { computed, defineComponent, nextTick, onMounted, ref } from "vue";
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
    const posts = ref([]);
    const totalItems = ref(1);
    const loading = ref(false);
    const mediaDialog = ref(false);
    const dialogMedia = ref("");
    const filters = ref({ platform: null, account: null });
    const platformOptions = [
      { value: "telegram", label: "Telegram" },
      { value: "web", label: "Web" },
    ];
    // bumping the key remounts the pagination so it goes back to page 1
    const filterKey = ref(0);
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

    // crawlers for the filter dropdown. The API returns 10 per page, so every page
    // is loaded once (no backend change needed) and filtered by platform locally.
    const accounts = ref([]);
    const accountsLoading = ref(false);

    const accountOptions = computed(() =>
      filters.value.platform
        ? accounts.value.filter((a) => a.platform === filters.value.platform)
        : accounts.value
    );

    // post rows only carry the crawler id, so the platform comes from the crawler list
    const platformOf = (row) =>
      accounts.value.find((a) => a.id === row.account)?.platform;

    const getCrawlers = async () => {
      accountsLoading.value = true;
      try {
        const all = [];
        for (let page = 1; page <= 100; page++) {
          const res = await ApiService.query("/api/crawler/account/", {
            params: { page },
          });
          all.push(...(res.data.results ?? []));
          if (!res.data.next) break;
        }
        accounts.value = all;
      } catch (e) {
        // keep whatever was loaded
      } finally {
        accountsLoading.value = false;
      }
    };

    onMounted(() => {
      getPosts();
      getCrawlers();
    });

    const hasFilters = () =>
      filters.value.platform !== null || filters.value.account !== null;

    const showFilters = () => posts.value.length > 0 || hasFilters();

    const platformIcon = (platform) => {
      if (platform === "telegram") {
        return "telegram";
      }
      return "browser-chrome";
    };

    const onFilterChange = () => {
      filterKey.value++;
      getPosts(1);
    };

    // a crawler belongs to one platform, so changing the platform clears the crawler
    const onPlatformChange = () => {
      filters.value.account = null;
      onFilterChange();
    };

    const showMedia = (media) => {
      mediaDialog.value = true;
      dialogMedia.value = media;
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

    const getPosts = (page = 1) => {
      loading.value = true;
      ApiService.query("/api/crawler/post/", {
        params: {
          page,
          platform: filters.value.platform || undefined,
          account: filters.value.account || undefined,
        },
      })
        .then((res) => {
          loading.value = false;
          totalItems.value = res.data.count;
          posts.value = res.data.results;
        })
        .catch((err) => {
          loading.value = false;
        });
    };

    return {
      posts,
      totalItems,
      loading,
      filters,
      filterKey,
      platformOptions,
      accountOptions,
      accountsLoading,
      platformOf,
      loadingSvg,
      mediaDialog,
      showMedia,
      showFilters,
      hasFilters,
      platformIcon,
      onFilterChange,
      onPlatformChange,
      dialogMedia,
      getPosts,
      isVideo,
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
