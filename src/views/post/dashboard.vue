<template>
  <div v-loading="loading" class="card">
    <div class="card-header border-0 pt-6">
      <div class="card-title"></div>
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <router-link :to="{ name: 'quickPost' }" class="btn btn-primary">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Create Post
          </router-link>
        </div>
        <div
          v-else
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span class="me-2">{{ selectedIds.length }}</span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteFewCustomers()"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div
          class="d-flex justify-content-end align-items-center d-none"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span
              class="me-2"
              data-kt-customer-table-select="selected_count"
            ></span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-customer-table-select="delete_selected"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <el-tabs
      type="card"
      v-model="activeName"
      class="demo-tabs"
      @tab-click="changeTab"
    >
      <el-tab-pane label="Instagram & Twitter" name="social">
        <div class="card-body pt-0" v-if="tableData.length > 0">
          <Datatable
            @on-sort="sort"
            @on-items-select="onItemSelect"
            :data="tableData"
            :header="tableHeader"
            :checkbox-enabled="false"
            checkbox-label="id"
            :total="totalPosts"
            :items-per-page="10"
            @page-change="getPosts"
          >
            <template v-slot:username="{ row: customer }">
              <img width="20px" :src="getIcon(customer.bot_info)" />
              <a
                :href="customer.bot_info.url"
                class="ms-2 text-gray-900 text-hover-primary"
                target="_blank"
              >
                {{ customer.bot_info.username }}
              </a>
            </template>
            <template v-slot:text="{ row: customer }">
              <div class="post-text">
                {{ customer.text }}
              </div>
            </template>
            <template v-slot:status="{ row: customer }">
              <div class="status badge" :class="statusClass(customer.status)">
                {{ customer.status }}
              </div>
            </template>
            <template v-slot:media="{ row: customer }">
              <div
                class="medias d-flex gap-3 align-items-center overflow-auto"
                v-if="customer.medias.length > 0"
              >
                <div v-for="media in customer.medias" :key="media.id">
                  <img class="post-image" :src="media.media" />
                </div>
              </div>
              <div v-else>{{}}</div>
            </template>
            <template v-slot:actions="{ row: customer }">
              <router-link
                :to="{ name: 'quickPost', query: { post: customer.id } }"
                class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
              >
                <KTIcon icon-name="pencil" icon-class="fs-3" />
              </router-link>
            </template>
          </Datatable>
        </div>
        <div v-else class="card-body p-0">
          <!--begin::Heading-->
          <div class="card-px text-center pt-20">
            <h2 class="fs-2x fw-bold mb-10">welcome to quick post</h2>
            <p class="text-gray-500 fs-5 fw-semibold mb-13">
              <span>you can create a post and share to your profiles</span>
            </p>
            <router-link :to="{ name: 'quickPost' }" class="btn btn-primary">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Create Post
            </router-link>
            <!--end::Action-->
          </div>
          <!--end::Heading-->

          <div class="text-center px-5 mb-20">
            <img
              class="w-250px w-lg-300px theme-light-show"
              :src="getAssetPath('media/illustrations/sketchy-1/4.png')"
              alt=""
            />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Telegram" name="telegram">
        <div class="card-body pt-0" v-if="tableData.length > 0">
          <Datatable
            @on-sort="sort"
            @on-items-select="onItemSelect"
            :data="telegramData"
            :header="telegramHeader"
            :enable-items-per-page-dropdown="false"
            :checkbox-enabled="false"
            checkbox-label="id"
            :total="telegramPosts"
            :items-per-page="10"
            @page-change="getTelegramPosts"
          >
            <template v-slot:username="{ row: customer }">
              <img width="20px" :src="getIcon(customer.bot_info)" />
              <a
                :href="customer.bot_info.url"
                class="ms-2 text-gray-900 text-hover-primary"
                target="_blank"
              >
                {{ customer.bot_info.channel }}
              </a>
            </template>
            <template v-slot:text="{ row: customer }">
              <div class="post-text">
                {{ customer.text }}
              </div>
            </template>
            <template v-slot:status="{ row: customer }">
              <div class="status badge" :class="statusClass(customer.status)">
                {{ customer.status }}
              </div>
            </template>
            <template v-slot:error="{ row: customer }">
              {{ customer.error_message }}
            </template>
            <template v-slot:media="{ row: customer }">
              <div class="medias d-flex gap-3 align-items-center overflow-auto">
                <img class="post-image" :src="customer.media" />
              </div>
            </template>
            <template v-slot:actions="{ row: customer }">
              <router-link
                :to="{ name: 'quickPost', query: { post: customer.id } }"
                class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
              >
                <KTIcon icon-name="pencil" icon-class="fs-3" />
              </router-link>
            </template>
          </Datatable>
        </div>
        <div v-else class="card-body p-0">
          <!--begin::Heading-->
          <div class="card-px text-center pt-20">
            <h2 class="fs-2x fw-bold mb-10">welcome to quick post</h2>
            <p class="text-gray-500 fs-5 fw-semibold mb-13">
              <span>you can create a post and share to your profiles</span>
            </p>
            <router-link :to="{ name: 'quickPost' }" class="btn btn-primary">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Create Post
            </router-link>
            <!--end::Action-->
          </div>
          <!--end::Heading-->

          <div class="text-center px-5 mb-20">
            <img
              class="w-250px w-lg-300px theme-light-show"
              :src="getAssetPath('media/illustrations/sketchy-1/4.png')"
              alt=""
            />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

  <AddCustomerModal></AddCustomerModal>
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import ApiService from "@/core/services/ApiService";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import { hideModal } from "@/core/helpers/modal";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    Delete,
    Plus,
    ZoomIn,
    AddCustomerModal,
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
    const formData = ref({
      text: "",
      media: null,
    });

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
      if (status === "pending" || status === "requested") {
        return "badge-warning";
      }
      return "badge-danger";
    };

    const users = ref([]);
    const fileList = ref([]);
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

    const items = ref([
      {
        title: "telegram",
        icon: "telegram",
        index: "1",
        table: [],
      },
      {
        title: "instagram",
        icon: "browser-chrome",
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
      // getTelegramPosts();
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const handlePictureCardPreview = (file) => {
      mediaPreviewVisible.value = true;
      dialogImageUrl.value = file.url;
    };
    const handleRemove = () => {
      fileList.value = [];
    };

    const changeTab = (tab) => {
      if (tab.props.name === "social") {
        getPosts();
      } else {
        getTelegramPosts();
      }
    };

    const getProfiles = () => {
      ApiService.get("/social-media/profile")
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
      ApiService.get("/social-media/actions", `?action=post&page=${page}`)
        .then((response) => {
          loading.value = false;
          totalPosts.value = response.data.count;
          tableData.value = response.data.results;
        })
        .catch((error) => {
          loading.value = false;
        });
    };

    const getTelegramPosts = () => {
      loading.value = true;
      ApiService.get("/crawler/telegram-send-post")
        .then((response) => {
          loading.value = false;
          telegramData.value = response.data.results;
          telegramPosts.value = response.data.count;
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
      formData,
      fileList,
      rules,
      users,
      totalPosts,
      telegramPosts,
      tableData,
      telegramData,
      tableHeader,
      telegramHeader,
      getIcon,
      changeTab,
      statusClass,
      handlePictureCardPreview,
      getTelegramPosts,
      handleRemove,
      getPosts,
      deleteCustomer,
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
  max-height: 100px;
  max-width: 100px;
}
.post-text {
  //direction: rtl;
  text-overflow: ellipsis;
  max-width: 900px;
  overflow: hidden;
  white-space: nowrap;
}
</style>
