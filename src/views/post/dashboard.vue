<template>
  <div v-loading="loading" class="card">
    <div class="card-header border-0 pt-6">
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
      <!--      <div class="card-title"></div>-->
      <!--end::Card toolbar-->
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
                  <span>there is no publish post yet.</span>
                </p>
                <router-link
                  :to="{ name: 'quickPost' }"
                  class="btn btn-primary"
                >
                  <KTIcon icon-name="plus" icon-class="fs-2" />
                  Create Post
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
                <thead v-if="i === 0">
                  <tr class="fs-7 fw-bold text-gray-500 border-bottom-0">
                    <th class="p-0 pb-3 text-start">username</th>
                    <th class="p-0 pb-3 text-center">text</th>
                    <th class="p-0 pb-3 text-center">status</th>
                    <th class="p-0 pb-3">media</th>
                    <th class="p-0 pb-3 min-w-150px text-center">date</th>
                    <th class="p-0 pb-3 text-end">actions</th>
                  </tr>
                </thead>
                <thead v-else>
                  <tr class="fs-7 fw-bold text-gray-500 border-bottom-0">
                    <th class="p-0 pb-3 text-start">username</th>
                    <th class="p-0 pb-3 pe-7 text-center">text</th>
                    <th class="p-0 pb-3 pe-7">status</th>
                    <th class="p-0 pb-3">media</th>
                    <th class="p-0 pb-3 min-w-150px">date</th>
                    <th class="p-0 pb-3 min-w-150px text-end">actions</th>
                  </tr>
                </thead>
                <!--end::Table head-->

                <!--begin::Table body-->

                <tbody>
                  <template v-for="(row, j) in item.table" :key="j">
                    <tr>
                      <td>
                        <img width="20px" :src="getIcon(row.bot_info)" />
                        <a
                          :href="row.bot_info.url"
                          class="ms-2 text-gray-900 text-hover-primary"
                          target="_blank"
                        >
                          {{ row.bot_info.username }}
                        </a>
                      </td>
                      <td class="pe-0 text-center">
                        <div class="post-text">
                          {{ row.text }}
                        </div>
                      </td>
                      <td class="text-center">
                        <div
                          class="status badge"
                          :class="statusClass(row.status)"
                        >
                          {{ row.status }}
                        </div>
                      </td>
                      <td class="text-center">
                        <div
                          class="medias d-flex gap-1 align-items-center overflow-auto mw-200px"
                          v-if="row.medias.length > 0"
                        >
                          <div v-for="media in row.medias" :key="media.id">
                            <video
                              v-if="isVideo(media)"
                              :src="media.media"
                              class="post-image"
                            />
                            <img v-else class="post-image" :src="media.media" />
                          </div>
                        </div>
                      </td>

                      <!--                      <td class="pe-13">-->
                      <!--                        <span class="text-gray-600 fw-bold fs-6">{{-->
                      <!--                          row.subject-->
                      <!--                        }}</span>-->
                      <!--                      </td>-->

                      <td>
                        <div class="fs-7 fw-bold text-muted text-center">
                          {{ formatDate(row.send_date) }}
                        </div>
                      </td>

                      <td class="text-end">
                        <router-link
                          :to="{
                            name: 'quickPost',
                            query: { post: row.id },
                          }"
                          class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          :class="{ disabled: row.status !== 'requested' }"
                        >
                          <KTIcon icon-name="pencil" icon-class="fs-3" />
                        </router-link>
                        <!--                        <button-->
                        <!--                          @click="removePost(row.id)"-->
                        <!--                          class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"-->
                        <!--                        >-->
                        <!--                          <KTIcon icon-name="trash" icon-class="fs-3" />-->
                        <!--                        </button>-->
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
    <!--    <el-tabs-->
    <!--      type="card"-->
    <!--      v-model="activeName"-->
    <!--      class="demo-tabs"-->
    <!--      @tab-click="changeTab"-->
    <!--    >-->
    <!--      <el-tab-pane label="Instagram & Twitter" name="social">-->
    <!--        <div class="card-body pt-0" v-if="tableData.length > 0">-->
    <!--          <Datatable-->
    <!--            @on-sort="sort"-->
    <!--            @on-items-select="onItemSelect"-->
    <!--            :data="tableData"-->
    <!--            :header="tableHeader"-->
    <!--            :checkbox-enabled="false"-->
    <!--            checkbox-label="id"-->
    <!--            :total="totalPosts"-->
    <!--            :items-per-page="10"-->
    <!--            @page-change="getPosts"-->
    <!--          >-->
    <!--            <template v-slot:username="{ row: customer }">-->
    <!--              <img width="20px" :src="getIcon(customer.bot_info)" />-->
    <!--              <a-->
    <!--                :href="customer.bot_info.url"-->
    <!--                class="ms-2 text-gray-900 text-hover-primary"-->
    <!--                target="_blank"-->
    <!--              >-->
    <!--                {{ customer.bot_info.username }}-->
    <!--              </a>-->
    <!--            </template>-->
    <!--            <template v-slot:text="{ row: customer }">-->
    <!--              <div class="post-text">-->
    <!--                {{ customer.text }}-->
    <!--              </div>-->
    <!--            </template>-->
    <!--            <template v-slot:status="{ row: customer }">-->
    <!--              <div class="status badge" :class="statusClass(customer.status)">-->
    <!--                {{ customer.status }}-->
    <!--              </div>-->
    <!--            </template>-->
    <!--            <template v-slot:media="{ row: customer }">-->
    <!--              <div-->
    <!--                class="medias d-flex gap-1 align-items-center overflow-auto mw-200px"-->
    <!--                v-if="customer.medias.length > 0"-->
    <!--              >-->
    <!--                <div v-for="media in customer.medias" :key="media.id">-->
    <!--                  <video-->
    <!--                    v-if="isVideo(media)"-->
    <!--                    :src="media.media"-->
    <!--                    class="post-image"-->
    <!--                  />-->
    <!--                  <img v-else class="post-image" :src="media.media" />-->
    <!--                </div>-->
    <!--              </div>-->
    <!--              <div v-else>{{}}</div>-->
    <!--            </template>-->
    <!--            <template v-slot:date="{ row: customer }">-->
    <!--              {{ formatDate(customer.send_date) }}-->
    <!--            </template>-->
    <!--            <template v-slot:actions="{ row: customer }">-->
    <!--              <router-link-->
    <!--                :to="{ name: 'quickPost', query: { post: customer.id } }"-->
    <!--                class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"-->
    <!--              >-->
    <!--                <KTIcon icon-name="pencil" icon-class="fs-3" />-->
    <!--              </router-link>-->
    <!--            </template>-->
    <!--          </Datatable>-->
    <!--        </div>-->
    <!--        <div v-else class="card-body p-0">-->
    <!--          &lt;!&ndash;begin::Heading&ndash;&gt;-->
    <!--          <div class="card-px text-center pt-20">-->
    <!--            <h2 class="fs-2x fw-bold mb-10">welcome to quick post</h2>-->
    <!--            <p class="text-gray-500 fs-5 fw-semibold">-->
    <!--              <span>you can create a post and share to your profiles</span>-->
    <!--            </p>-->
    <!--            <router-link :to="{ name: 'quickPost' }" class="btn btn-primary">-->
    <!--              <KTIcon icon-name="plus" icon-class="fs-2" />-->
    <!--              Create Post-->
    <!--            </router-link>-->
    <!--            &lt;!&ndash;end::Action&ndash;&gt;-->
    <!--          </div>-->
    <!--          &lt;!&ndash;end::Heading&ndash;&gt;-->

    <!--          <div class="text-center px-5 mb-20">-->
    <!--            <img-->
    <!--              class="w-250px w-lg-300px theme-light-show"-->
    <!--              :src="getAssetPath('media/illustrations/sketchy-1/4.png')"-->
    <!--              alt=""-->
    <!--            />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </el-tab-pane>-->
    <!--      <el-tab-pane label="Telegram" name="telegram">-->
    <!--        <div class="card-body pt-0" v-if="telegramData.length > 0">-->
    <!--          {{ telegramData.length }}-->
    <!--          <Datatable-->
    <!--            @on-sort="sort"-->
    <!--            @on-items-select="onItemSelect"-->
    <!--            :data="telegramData"-->
    <!--            :header="telegramHeader"-->
    <!--            :enable-items-per-page-dropdown="false"-->
    <!--            :checkbox-enabled="false"-->
    <!--            checkbox-label="id"-->
    <!--            :total="telegramPosts"-->
    <!--            :items-per-page="10"-->
    <!--            @page-change="getTelegramPosts"-->
    <!--          >-->
    <!--            <template v-slot:username="{ row: customer }">-->
    <!--              <img width="20px" :src="getIcon(customer.bot_info)" />-->
    <!--              <a-->
    <!--                :href="customer.bot_info.url"-->
    <!--                class="ms-2 text-gray-900 text-hover-primary"-->
    <!--                target="_blank"-->
    <!--              >-->
    <!--                {{ customer.bot_info.channel }}-->
    <!--              </a>-->
    <!--            </template>-->
    <!--            <template v-slot:text="{ row: customer }">-->
    <!--              <div class="post-text">-->
    <!--                {{ customer.text }}-->
    <!--              </div>-->
    <!--            </template>-->
    <!--            <template v-slot:status="{ row: customer }">-->
    <!--              <div class="status badge" :class="statusClass(customer.status)">-->
    <!--                {{ customer.status }}-->
    <!--              </div>-->
    <!--            </template>-->
    <!--            <template v-slot:error="{ row: customer }">-->
    <!--              {{ customer.error_message }}-->
    <!--            </template>-->
    <!--            <template v-slot:media="{ row: customer }">-->
    <!--              <div class="medias d-flex gap-3 align-items-center overflow-auto">-->
    <!--                <img class="post-image" :src="customer.media" />-->
    <!--              </div>-->
    <!--            </template>-->
    <!--            <template v-slot:date="{ row: customer }">-->
    <!--              {{ formatDate(customer.send_date) }}-->
    <!--            </template>-->
    <!--            <template v-slot:actions="{ row: customer }">-->
    <!--              <router-link-->
    <!--                :to="{ name: 'quickPost', query: { post: customer.id } }"-->
    <!--                class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"-->
    <!--              >-->
    <!--                <KTIcon icon-name="pencil" icon-class="fs-3" />-->
    <!--              </router-link>-->
    <!--            </template>-->
    <!--          </Datatable>-->
    <!--        </div>-->
    <!--        <div v-else class="card-body p-0">-->
    <!--          &lt;!&ndash;begin::Heading&ndash;&gt;-->
    <!--          <div class="card-px text-center pt-20">-->
    <!--            <h2 class="fs-2x fw-bold mb-10">welcome to quick post</h2>-->
    <!--            <p class="text-gray-500 fs-5 fw-semibold">-->
    <!--              <span>you can create a post and share to your profiles</span>-->
    <!--            </p>-->
    <!--            &lt;!&ndash;            <router-link :to="{ name: 'quickPost' }" class="btn btn-primary">&ndash;&gt;-->
    <!--            &lt;!&ndash;              <KTIcon icon-name="plus" icon-class="fs-2" />&ndash;&gt;-->
    <!--            &lt;!&ndash;              Create Post&ndash;&gt;-->
    <!--            &lt;!&ndash;            </router-link>&ndash;&gt;-->
    <!--            &lt;!&ndash;end::Action&ndash;&gt;-->
    <!--          </div>-->
    <!--          &lt;!&ndash;end::Heading&ndash;&gt;-->

    <!--          <div class="text-center px-5 mb-20">-->
    <!--            <img-->
    <!--              class="w-250px w-lg-300px theme-light-show"-->
    <!--              :src="getAssetPath('media/illustrations/sketchy-1/4.png')"-->
    <!--              alt=""-->
    <!--            />-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </el-tab-pane>-->
    <!--    </el-tabs>-->
  </div>
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import ApiService from "@/core/services/ApiService";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import { hideModal } from "@/core/helpers/modal";
import Swal from "sweetalert2";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    Delete,
    Plus,
    ZoomIn,
  },
  setup() {
    const loading = ref(false);
    const totalPosts = ref(0);
    const telegramPosts = ref(0);
    const mediaPreviewVisible = ref(false);
    const dialogImageUrl = ref(null);
    const addActionModalRef = ref(null);
    const selectedAccount = ref(null);
    const activeName = ref("social");

    const rules = ref({
      url: [
        {
          required: true,
          message: "url is required",
          trigger: "change",
        },
      ],
      actions: [
        {
          required: true,
          message: "actions is required",
          trigger: "change",
        },
      ],
    });

    const statusClass = (status) => {
      if (status === "success" || status === "sent") {
        return "badge-success";
      }
      if (
        status === "pending" ||
        status === "requested" ||
        status === "uploading"
      ) {
        return "badge-warning";
      }
      return "badge-danger";
    };

    const users = ref([]);
    const fileList = ref([]);
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
    const tableHeader = ref([
      {
        columnName: "username",
        columnLabel: "username",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "text",
        columnLabel: "text",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "status",
        columnLabel: "status",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "media",
        columnLabel: "media",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "date",
        columnLabel: "date",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);
    const telegramHeader = ref([
      {
        columnName: "username",
        columnLabel: "username",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "text",
        columnLabel: "text",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "status",
        columnLabel: "status",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "error",
        columnLabel: "error",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "date",
        columnLabel: "date",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "media",
        columnLabel: "media",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
      },
    ]);
    const selectedIds = ref([]);
    const totalItems = ref([1, 1]);

    const items = ref([
      {
        title: "Instagram",
        icon: "instagram",
        index: "1",
        table: [],
      },
      {
        title: "Telegram",
        icon: "telegram",
        index: "2",
        table: [],
      },
    ]);

    const tableData = ref([]);
    const telegramData = ref([]);
    const initCustomers = ref([]);
    const preview = ref(null);

    onMounted(() => {
      // getProfiles();
      getPosts();
      getTelegramPosts();
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const removePost = (id) => {
      Swal.fire({
        text: "are you sure you want to delete this post?",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "i'm sure",
        cancelButtonText: "cancel",
        showCancelButton: true,
        heightAuto: false,
        customClass: {
          confirmButton: "btn btn-danger",
          cancelButton: "btn",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          loading.value = true;
          ApiService.delete(`/api/social-media/actions/${id}/`)
            .then(() => {
              loading.value = false;
              getPosts();
            })
            .catch(() => {
              loading.value = false;
            });
        }
      });
    };

    const getReport = (pageNumber, index) => {
      if (index === 0) {
        getPosts(pageNumber);
        return;
      }
      if (index === 1) {
        getTelegramPosts(pageNumber);
      }
    };

    const handlePictureCardPreview = (file) => {
      mediaPreviewVisible.value = true;
      dialogImageUrl.value = file.url;
    };
    const handleRemove = () => {
      fileList.value = [];
    };

    const isVideo = (row) => {
      return row.media?.includes(".mp4");
    };

    const changeTab = (tab) => {
      if (tab.props.name === "social") {
        getPosts();
      } else {
        getTelegramPosts();
      }
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
    const getProfiles = () => {
      ApiService.get("/api/social-media/profile")
        .then((response) => {
          users.value = response.data.results;
        })
        .catch((error) => {});
    };

    const getIcon = (bot) => {
      if (bot.social_media === "instagram") {
        return getAssetPath("media/svg/brand-logos/instagram-2-1.svg");
      }
      if (bot.social_media === "twitter") {
        return getAssetPath("media/svg/brand-logos/twitter.svg");
      }
      return getAssetPath("media/svg/brand-logos/telegram.svg");
    };

    const getPosts = (page = 1) => {
      loading.value = true;
      ApiService.get("/api/social-media/actions", `?action=post&page=${page}`)
        .then((response) => {
          loading.value = false;
          totalItems.value[0] = response.data.count;
          items.value[0].table = response.data.results;
        })
        .catch((error) => {
          loading.value = false;
        });
    };

    const getTelegramPosts = () => {
      loading.value = true;
      ApiService.get("/api/crawler/telegram-send-post")
        .then((response) => {
          loading.value = false;
          totalItems.value[1] = response.data.count;
          items.value[1].table = response.data.results;
        })
        .catch((error) => {
          loading.value = false;
        });
    };

    const deleteFewCustomers = () => {
      selectedIds.value.forEach((item) => {
        deleteCustomer(item);
      });
      selectedIds.value.length = 0;
    };

    const deleteCustomer = (id) => {
      for (let i = 0; i < tableData.value.length; i++) {
        if (tableData.value[i].id === id) {
          tableData.value.splice(i, 1);
        }
      }
    };

    const search = ref("");
    const searchItems = () => {
      tableData.value.splice(0, tableData.value.length, ...initCustomers.value);
      if (search.value !== "") {
        let results = [];
        for (let j = 0; j < tableData.value.length; j++) {
          if (searchingFunc(tableData.value[j], search.value)) {
            results.push(tableData.value[j]);
          }
        }
        tableData.value.splice(0, tableData.value.length, ...results);
      }
      MenuComponent.reinitialization();
    };

    const searchingFunc = (obj, value) => {
      for (let key in obj) {
        if (!Number.isInteger(obj[key]) && !(typeof obj[key] === "object")) {
          if (obj[key].indexOf(value) != -1) {
            return true;
          }
        }
      }
      return false;
    };

    const sort = (sort) => {
      const reverse = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const onItemSelect = (selectedItems) => {
      selectedIds.value = selectedItems;
    };

    return {
      selectedAccount,
      dialogImageUrl,
      mediaPreviewVisible,
      loading,
      preview,
      addActionModalRef,
      fileList,
      rules,
      users,
      totalPosts,
      telegramPosts,
      tableData,
      telegramData,
      tableHeader,
      loadingSvg,
      totalItems,
      telegramHeader,
      getIcon,
      changeTab,
      removePost,
      statusClass,
      handlePictureCardPreview,
      getTelegramPosts,
      handleRemove,
      getPosts,
      getReport,
      isVideo,
      deleteCustomer,
      formatDate,
      getProfiles,
      search,
      searchItems,
      selectedIds,
      activeName,
      items,
      deleteFewCustomers,
      sort,
      onItemSelect,
      getAssetPath,
    };
  },
});
</script>

<style lang="scss" scoped>
.post-image {
  max-height: 85px;
  max-width: 85px;
}
.post-text {
  //direction: rtl;
  text-overflow: ellipsis;
  max-width: 350px;
  overflow: hidden;
  white-space: nowrap;
}
</style>
