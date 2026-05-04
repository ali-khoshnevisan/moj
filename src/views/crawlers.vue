<template>
  <div
    v-if="tableData.length > 0"
    v-loading="pageLoading"
    class="card web-crawler mb-5"
  >
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <!--        <div class="d-flex align-items-center position-relative my-1">-->
        <!--          <KTIcon-->
        <!--            icon-name="magnifier"-->
        <!--            icon-class="fs-1 position-absolute ms-6"-->
        <!--          />-->
        <!--          <input-->
        <!--            type="text"-->
        <!--            v-model="search"-->
        <!--            @input="searchItems()"-->
        <!--            class="form-control form-control-solid w-250px ps-15"-->
        <!--            placeholder="Search Customers"-->
        <!--          />-->
        <!--        </div>-->
        <!--end::Search-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_crawler"
            @click="emptyFormData"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Web Crawler
          </button>
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
    <div class="card-body pt-0">
      <Datatable
        @on-sort="sort"
        @on-items-select="onItemSelect"
        :data="tableData"
        :header="tableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
      >
        <template v-slot:platform="{ row: customer }">
          <i :class="`bi bi-${getPlatformClass(customer.platform)} fs-2`"></i>
        </template>
        <template v-slot:url="{ row: customer }">
          {{ customer.url }}
        </template>
        <!--        <template v-slot:title_cfg="{ row: customer }">-->
        <!--          {{ customer.title_cfg }}-->
        <!--        </template>-->
        <!--        <template v-slot:description_cfg="{ row: customer }">-->
        <!--          {{ customer.description_cfg }}-->
        <!--        </template>-->
        <!--        <template v-slot:url_cfg="{ row: customer }">-->
        <!--          {{ customer.url_cfg }}-->
        <!--        </template>-->
        <!--        <template v-slot:remove_cfg="{ row: customer }">-->
        <!--          {{ customer.remove_cfg }}-->
        <!--        </template>-->
        <!--        <template v-slot:image_cfg="{ row: customer }">-->
        <!--          {{ customer.image_cfg }}-->
        <!--        </template>-->
        <template v-slot:status="{ row: customer }">
          <div class="status badge" :class="statusClass(customer.status)">
            {{ customer.status }}
          </div>
        </template>
        <template v-slot:actions="{ row: customer }">
          <el-button
            @click="fillFormData(customer)"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_crawler"
          >
            <i class="bi bi-pencil" />
          </el-button>
        </template>
      </Datatable>
    </div>
  </div>
  <div v-loading="pageLoading" v-else class="card">
    <div class="card-body p-0">
      <!--begin::Heading-->
      <div class="card-px text-center pt-20">
        <h2 class="fs-2x fw-bold mb-10">welcome to Crawlers</h2>
        <p class="text-gray-500 fs-5 fw-semibold mb-13">
          <span>you can add your web sources for crawling data</span>
        </p>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_crawler"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Add Web Crawler
        </button>
        <!--end::Action-->
      </div>
      <!--end::Heading-->

      <div class="text-center px-5 my-20">
        <img
          class="w-200px w-lg-300px theme-light-show"
          :src="getAssetPath('media/illustrations/sketchy-1/5.png')"
          alt=""
        />
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="kt_modal_add_crawler"
    ref="addActionModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add crawler</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="addSocialMediaCrawler()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-12">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semibold mb-2">
                    Social Media
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item name="platform">
                    <el-select v-model="formData.platform">
                      <el-option
                        v-for="(item, i) in platforms"
                        :key="`countries-select-option-${i}`"
                        :value="item"
                      >
                        {{ item }}
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2">URL</label>

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.url"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2"
                    >TITLE SELECTOR</label
                  >

                  <el-form-item prop="title_cfg">
                    <el-input
                      v-model="formData.config.title_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2"
                    >DESCRIPTION</label
                  >

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.config.description_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2"
                    >REMOVE SELECTOR</label
                  >

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.config.remove_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2"
                    >URL SELECTOR</label
                  >

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.config.url_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2"
                    >IMAGE SELECTOR</label
                  >

                  <el-form-item prop="image_cfg">
                    <el-input
                      v-model="formData.config.image_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2">Status</label>

                  <el-form-item prop="name">
                    <div class="form-check form-check-solid form-switch fv-row">
                      <input
                        v-model="formData.status"
                        true-value="enable"
                        false-value="disable"
                        class="form-check-input w-45px h-30px"
                        type="checkbox"
                        id="status"
                      />
                      <label class="form-check-label" for="status"></label>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center">
            <button
              type="reset"
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="kt_modal_add_telegram_crawler"
    ref="addTelegramCrawlerRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Add crawler</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form
          @submit.prevent="addSocialMediaCrawler()"
          :model="formData"
          :rules="rules"
          ref="formRef"
        >
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div
              class="scroll-y me-n7 pe-7"
              id="kt_modal_add_customer_scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#kt_modal_add_customer_header"
              data-kt-scroll-wrappers="#kt_modal_add_customer_scroll"
              data-kt-scroll-offset="300px"
            >
              <div class="row">
                <div class="col-12">
                  <!--begin::Label-->
                  <label class="required fs-6 fw-semibold mb-2">
                    Social Media
                  </label>
                  <!--end::Label-->

                  <!--begin::Input-->
                  <el-form-item name="type">
                    <el-select v-model="formData.platform">
                      <el-option
                        v-for="(item, i) in platforms"
                        :key="`countries-select-option-${i}`"
                        :value="item"
                      >
                        {{ item }}
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <!--end::Input-->
                </div>
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2">URL</label>

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.url"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2">Status</label>

                  <el-form-item prop="name">
                    <div class="form-check form-check-solid form-switch fv-row">
                      <input
                        v-model="formData.status"
                        true-value="true"
                        false-value="false"
                        class="form-check-input w-45px h-30px"
                        type="checkbox"
                        id="status"
                      />
                      <label class="form-check-label" for="status"></label>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer flex-center">
            <button
              type="reset"
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
            >
              Discard
            </button>
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" />
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="kt_modal_instagram_posts"
    ref="instagramPostsRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_customer_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">posts</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            id="kt_modal_add_customer_close"
            data-bs-dismiss="modal"
            class="btn btn-icon btn-sm btn-active-icon-primary"
          >
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
        </div>
        <div class="modal-body">
          <div class="row posts" v-if="selectedInstagramPosts.length > 0">
            <div
              class="col-12 text-center my-2"
              v-for="(post, i) in selectedInstagramPosts"
              :key="i"
            >
              <a :href="post" target="_blank">
                {{ post }}
              </a>
            </div>
          </div>
          <div v-else class="text-center">
            <div class="fs-2 fw-bold">there is no posts yet</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
} from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import ApiService from "@/core/services/ApiService";
import { hideModal } from "@/core/helpers/modal";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
  },
  setup() {
    const loading = ref(false);
    const pageLoading = ref(false);
    const mediaPreviewVisible = ref(false);
    const dialogImageUrl = ref(null);
    const type = ref("");
    const platforms = ref(["web", "instagram", "telegram"]);
    const addActionModalRef = ref(null);
    const addTelegramCrawlerRef = ref(null);
    const fileList = ref([]);
    let formData = reactive({
      config: {
        title_cfg: "",
        description_cfg: "",
        remove_cfg: "",
        image_cfg: "",
        url_cfg: "",
      },
      url: "",
      platform: "web",
      status: "enable",
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

    const users = ref([]);
    const tableHeader = ref([
      {
        columnName: "platform",
        columnLabel: "platform",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "url",
        columnLabel: "url",
        sortEnabled: true,
        columnWidth: 150,
      },
      // {
      //   columnName: "title_selector",
      //   columnLabel: "title_cfg",
      //   sortEnabled: true,
      //   columnWidth: 150,
      // },
      // {
      //   columnName: "description_selector",
      //   columnLabel: "description_cfg",
      //   sortEnabled: true,
      //   columnWidth: 150,
      // },
      // {
      //   columnName: "remove_selector",
      //   columnLabel: "remove_cfg",
      //   sortEnabled: true,
      //   columnWidth: 150,
      // },
      // {
      //   columnName: "image_selector",
      //   columnLabel: "image_cfg",
      //   sortEnabled: true,
      //   columnWidth: 150,
      // },
      // {
      //   columnName: "url_selector",
      //   columnLabel: "url_cfg",
      //   sortEnabled: true,
      //   columnWidth: 150,
      // },
      {
        columnName: "status",
        columnLabel: "status",
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
    const selectedInstagramPosts = ref([]);

    const tableData = ref([]);
    const telegramTableData = ref([]);
    const initCustomers = ref([]);

    const isEnable = computed(() => {
      return formData.status === "enable";
    });

    const emptyFormData = () => {
      formData = {
        config: {
          title_cfg: "",
          description_cfg: "",
          remove_cfg: "",
          image_cfg: "",
          url_cfg: "",
        },
        uel: "",
        platform: "web",
        status: true,
      };
    };

    const fillFormData = (crawler) => {
      formData.url = crawler.url;
      formData.platform = "web";
      formData.config.title_cfg = crawler.config?.title_cfg;
      formData.config.description_cfg = crawler.config?.description_cfg;
      formData.config.remove_cfg = crawler.config?.remove_cfg;
      formData.config.image_cfg = crawler.config?.image_cfg;
      formData.config.url_cfg = crawler.config?.url_cfg;
      formData.status = crawler.status;
    };

    const handlePictureCardPreview = (file) => {
      mediaPreviewVisible.value = true;
      dialogImageUrl.value = file.url;
    };
    const handleRemove = () => {
      fileList.value = [];
    };

    const statusClass = (status) => {
      if (status === "enable" || status === "success") {
        return "badge-success";
      }
      if (status === "pending") {
        return "badge-warning";
      }
      return "badge-danger";
    };

    onMounted(() => {
      getCrawlers();
      // initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const fillPosts = (data) => {
      selectedInstagramPosts.value = data.posts;
    };

    const addWebCrawler = () => {
      ApiService.post("web-crawler/all-accounts/", formData)
        .then((response) => {
          hideModal(addActionModalRef.value);
          getCrawlers();
        })
        .catch((error) => {});
    };

    const addSocialMediaCrawler = () => {
      loading.value = true;
      ApiService.post("/crawler/account/", formData)
        .then((response) => {
          loading.value = false;
          getCrawlers();
        })
        .catch((error) => {
          loading.value = false;
          if (error.response && error.response.data) {
            const errors = error.response.data;

            Object.entries(errors).forEach(([field, msgs]) => {
              msgs.forEach((msg) => {
                ElMessage.error(`${field}: ${msg}`);
              });
            });
          } else {
            ElMessage.error("Something went wrong");
          }
        });
    };

    const getCrawlers = () => {
      pageLoading.value = true;
      ApiService.get("/crawler/account")
        .then((response) => {
          pageLoading.value = false;
          nextTick(() => {
            tableData.value = response.data;
          });
        })
        .catch((error) => {
          pageLoading.value = false;
          ElMessage.error("Something went wrong");
        });
    };

    const deleteFewCustomers = () => {
      selectedIds.value.forEach((item) => {
        deleteCustomer(item);
      });
      selectedIds.value.length = 0;
    };

    const getPlatformClass = (platform) => {
      if (platform === "web") {
        return "browser-chrome";
      }
      if (platform === "telegram") {
        return "telegram";
      }
      if (platform === "instagram") {
        return "instagram";
      }
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
      loading,
      pageLoading,
      type,
      addActionModalRef,
      addTelegramCrawlerRef,
      formData,
      rules,
      users,
      platforms,
      telegramTableData,
      tableData,
      fileList,
      selectedInstagramPosts,
      mediaPreviewVisible,
      dialogImageUrl,
      tableHeader,
      isEnable,
      emptyFormData,
      getPlatformClass,
      fillPosts,
      fillFormData,
      statusClass,
      deleteCustomer,
      getCrawlers,
      addWebCrawler,
      addSocialMediaCrawler,
      search,
      searchItems,
      selectedIds,
      deleteFewCustomers,
      handlePictureCardPreview,
      handleRemove,
      sort,
      onItemSelect,
      getAssetPath,
    };
  },
});
</script>
