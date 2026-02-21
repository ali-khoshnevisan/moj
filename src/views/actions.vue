<template>
  <div class="card">
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
          <!--begin::Add customer-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_action"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Action
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
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
        checkbox-label="id"
      >
        <template v-slot:social_media="{ row: customer }">
          {{ customer.social_media }}
        </template>
        <template v-slot:url="{ row: customer }">
          {{ customer.url }}
        </template>
        <template v-slot:status="{ row: customer }">
          <div class="status badge" :class="statusClass(customer.status)">
            {{ customer.status }}
          </div>
        </template>
        <template v-slot:actions="{ row: customer }">
          <div class="actions">
            <div
              class="action badge badge-light-primary mx-1"
              v-for="(action, idx) in customer.actions"
              :key="idx"
            >
              {{ action }}
            </div>
          </div>
        </template>
        <!--        <template v-slot:actions="{ row: customer }">-->
        <!--          <a-->
        <!--            href="#"-->
        <!--            class="btn btn-sm btn-light btn-active-light-primary"-->
        <!--            data-kt-menu-trigger="click"-->
        <!--            data-kt-menu-placement="bottom-end"-->
        <!--            data-kt-menu-flip="top-end"-->
        <!--            >Actions-->
        <!--            <KTIcon icon-name="down" icon-class="fs-5 m-0" />-->
        <!--          </a>-->
        <!--          &lt;!&ndash;begin::Menu&ndash;&gt;-->
        <!--          <div-->
        <!--            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4"-->
        <!--            data-kt-menu="true"-->
        <!--          >-->
        <!--            &lt;!&ndash;begin::Menu item&ndash;&gt;-->
        <!--            <div class="menu-item px-3">-->
        <!--              <router-link-->
        <!--                to="/apps/customers/customer-details"-->
        <!--                class="menu-link px-3"-->
        <!--                >View</router-link-->
        <!--              >-->
        <!--            </div>-->
        <!--            &lt;!&ndash;end::Menu item&ndash;&gt;-->
        <!--            &lt;!&ndash;begin::Menu item&ndash;&gt;-->
        <!--            <div class="menu-item px-3">-->
        <!--              <a @click="deleteCustomer(customer.id)" class="menu-link px-3"-->
        <!--                >Delete</a-->
        <!--              >-->
        <!--            </div>-->
        <!--            &lt;!&ndash;end::Menu item&ndash;&gt;-->
        <!--          </div>-->
        <!--          &lt;!&ndash;end::Menu&ndash;&gt;-->
        <!--        </template>-->
      </Datatable>
    </div>
  </div>
  <div
    class="modal fade"
    id="kt_modal_add_action"
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
          <h2 class="fw-bold">Add an Action</h2>
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
              <div class="fv-row mb-7">
                <!--begin::Label-->
                <label class="required fs-6 fw-semibold mb-2">URL</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="name">
                  <el-input v-model="formData.url" type="text" placeholder="" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <div class="d-flex flex-column mb-7 fv-row">
                <!--begin::Label-->
                <label class="fs-6 fw-semibold mb-2">
                  <span class="required">Account Type</span>

                  <i
                    class="fas fa-exclamation-circle ms-1 fs-7"
                    data-bs-toggle="tooltip"
                    title="Account Type"
                  ></i>
                </label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-select v-model="formData.actions" multiple>
                  <el-option value="">Select an Action...</el-option>
                  <el-option
                    v-for="(item, i) in actions"
                    :key="`countries-select-option-${i}`"
                    :value="item"
                  >
                    {{ item }}
                  </el-option>
                </el-select>
                <!--end::Input-->
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
import { hideModal } from "@/core/helpers/modal";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    AddCustomerModal,
  },
  setup() {
    const loading = ref(false);
    const addActionModalRef = ref(null);
    const formData = ref({
      url: "",
      actions: [],
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

    const actions = ref(["follow", "like", "comment"]);

    const tableHeader = ref([
      {
        columnName: "social_media",
        columnLabel: "social_media",
        sortEnabled: true,
        columnWidth: 150,
      },
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
        columnName: "actions",
        columnLabel: "actions",
        sortEnabled: true,
        columnWidth: 150,
      },
      // {
      //   columnName: "Actions",
      //   columnLabel: "actions",
      //   sortEnabled: false,
      //   columnWidth: 135,
      // },
    ]);
    const selectedIds = ref([]);

    const tableData = ref([]);
    const initCustomers = ref([]);

    const statusClass = (status) => {
      if (status === "success") {
        return "badge-success";
      }
      if (status === "pending") {
        return "badge-warning";
      }
      return "badge-danger";
    };

    onMounted(() => {
      getActions();
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const submit = () => {
      ApiService.post("/instagram/actions/", formData.value)
        .then((response) => {
          hideModal(addActionModalRef.value);
          getActions();
        })
        .catch((error) => {});
    };

    const getActions = () => {
      ApiService.get("/instagram/actions")
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
      formData,
      loading,
      rules,
      addActionModalRef,
      actions,
      tableData,
      tableHeader,
      deleteCustomer,
      statusClass,
      search,
      searchItems,
      selectedIds,
      deleteFewCustomers,
      sort,
      onItemSelect,
      getAssetPath,
      submit,
    };
  },
});
</script>
