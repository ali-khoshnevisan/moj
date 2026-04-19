<template>
  <div class="card web-crawler mb-5">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Customers"
          />
        </div>
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
        <template v-slot:url="{ row: customer }">
          {{ customer.url }}
        </template>
        <template v-slot:title_cfg="{ row: customer }">
          {{ customer.title_cfg }}
        </template>
        <template v-slot:description_cfg="{ row: customer }">
          {{ customer.description_cfg }}
        </template>
        <template v-slot:url_cfg="{ row: customer }">
          {{ customer.url_cfg }}
        </template>
        <template v-slot:remove_cfg="{ row: customer }">
          {{ customer.remove_cfg }}
        </template>
        <template v-slot:image_cfg="{ row: customer }">
          {{ customer.image_cfg }}
        </template>
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
  <div class="card telegram-crawler mt-5">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            v-model="search"
            @input="searchItems()"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search Customers"
          />
        </div>
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
            data-bs-target="#kt_modal_add_telegram_crawler"
            @click="emptyFormData"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Telegram Crawler
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
        :data="telegramTableData"
        :header="telegramTableHeader"
        :enable-items-per-page-dropdown="true"
        :checkbox-enabled="false"
        checkbox-label="id"
      >
        <template v-slot:url="{ row: customer }">
          {{ customer.url }}
        </template>
        <template v-slot:status="{ row: customer }">
          <div class="status badge" :class="statusClass(customer.status)">
            {{ customer.status }}
          </div>
        </template>
        <template v-slot:actions="{ row: customer }">
          <el-button
            @click="fillFormData(customer)"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_telegram_crawler"
          >
            <i class="bi bi-pencil" />
          </el-button>
        </template>
      </Datatable>
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
          <h2 class="fw-bold">Add Web crawler</h2>
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
          @submit.prevent="submit()"
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
                  <label class="required fs-6 fw-semibold mb-2"
                    >TITLE SELECTOR</label
                  >

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.title_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2"
                    >DESCRIPTION</label
                  >

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.description_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2"
                    >REMOVE SELECTOR</label
                  >

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.remove_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2"
                    >URL SELECTOR</label
                  >

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.url_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2"
                    >IMAGE SELECTOR</label
                  >

                  <el-form-item prop="image_cfg">
                    <el-input
                      v-model="formData.image_cfg"
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
          <h2 class="fw-bold">Add Telegram crawler</h2>
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
          @submit.prevent="submit()"
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
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import ApiService from "@/core/services/ApiService";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
  },
  setup() {
    const loading = ref(false);
    const mediaPreviewVisible = ref(false);
    const dialogImageUrl = ref(null);
    const addActionModalRef = ref(null);
    const fileList = ref([]);
    const formData = ref({
      title_cfg: "",
      description_cfg: "",
      remove_cfg: "",
      image_cfg: "",
      url_cfg: "",
      url: "",
      status: true,
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
        columnName: "url",
        columnLabel: "url",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "title_selector",
        columnLabel: "title_cfg",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "description_selector",
        columnLabel: "description_cfg",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "remove_selector",
        columnLabel: "remove_cfg",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "image_selector",
        columnLabel: "image_cfg",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "url_selector",
        columnLabel: "url_cfg",
        sortEnabled: true,
        columnWidth: 150,
      },
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
    const telegramTableHeader = ref([
      {
        columnName: "url",
        columnLabel: "url",
        sortEnabled: true,
        columnWidth: 150,
      },
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

    const tableData = ref([]);
    const telegramTableData = ref([]);
    const initCustomers = ref([]);

    const type = ref("web");
    const crawlerTypes = ref(["web", "telegram"]);

    const isEnable = computed(() => {
      return formData.value.status === "enable";
    });

    const emptyFormData = () => {
      formData.value = {
        title_cfg: "",
        description_cfg: "",
        remove_cfg: "",
        image_cfg: "",
        url_cfg: "",
        status: true,
      };
    };

    const fillFormData = (crawler) => {
      formData.value.url = crawler.url;
      formData.value.title_cfg = crawler.title_cfg;
      formData.value.description_cfg = crawler.description_cfg;
      formData.value.remove_cfg = crawler.remove_cfg;
      formData.value.image_cfg = crawler.image_cfg;
      formData.value.url_cfg = crawler.url_cfg;
      formData.value.status = crawler.status;
    };

    const handlePictureCardPreview = (file) => {
      mediaPreviewVisible.value = true;
      dialogImageUrl.value = file.url;
    };
    const handleRemove = () => {
      fileList.value = [];
    };

    const statusClass = (status) => {
      if (status === "enable") {
        return "badge-success";
      }
      if (status === "pending") {
        return "badge-warning";
      }
      return "badge-danger";
    };

    onMounted(() => {
      getCrawlers();
      getTelegramCrawlers();
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const submit = () => {
      if (type.value === "web") {
        ApiService.post("web-crawler/all-accounts/", formData.value)
          .then((response) => {
            getCrawlers();
          })
          .catch((error) => {});
      } else {
        const data = {
          url: formData.value.url,
          status: formData.value.status,
        };
        ApiService.post("/telegram-crawler/all-accounts/", data)
          .then((response) => {
            getCrawlers();
          })
          .catch((error) => {});
      }
    };

    const getTelegramCrawlers = () => {
      ApiService.get("/telegram-crawler/all-accounts").then((response) => {
        telegramTableData.value = response.data.results;
      });
    };

    const getCrawlers = () => {
      ApiService.get("/web-crawler/all-accounts")
        .then((response) => {
          tableData.value = response.data.results;
        })
        .catch((error) => {});
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
      loading,
      crawlerTypes,
      type,
      addActionModalRef,
      formData,
      rules,
      users,
      telegramTableData,
      tableData,
      fileList,
      mediaPreviewVisible,
      dialogImageUrl,
      tableHeader,
      telegramTableHeader,
      isEnable,
      emptyFormData,
      fillFormData,
      statusClass,
      deleteCustomer,
      getCrawlers,
      submit,
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
