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
          <!--          <button-->
          <!--            type="button"-->
          <!--            class="btn btn-light-primary me-3"-->
          <!--            data-bs-toggle="modal"-->
          <!--            data-bs-target="#kt_customers_export_modal"-->
          <!--          >-->
          <!--            <KTIcon icon-name="exit-up" icon-class="fs-2" />-->
          <!--            Export-->
          <!--          </button>-->
          <!--begin::Add customer-->
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_customer"
          >
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Add Profile
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
        <!--        <template v-slot:url="{ row: customer }">-->
        <!--          <a href="#" class="text-gray-600 text-hover-primary mb-1">-->
        <!--            {{ customer.url }}-->
        <!--          </a>-->
        <!--        </template>-->
        <template v-slot:profile_image="{ row: customer }">
          <img
            width="70px"
            :src="'http://46.224.111.189:6688' + customer.profile_image"
          />
        </template>
        <template v-slot:username="{ row: customer }">
          {{ customer.username }}
        </template>
        <!--        <template v-slot:paymentMethod="{ row: customer }">-->
        <!--          <img :src="customer.payment.icon" class="w-35px me-3" alt="" />{{-->
        <!--            customer.payment.ccnumber-->
        <!--          }}-->
        <!--        </template>-->
        <template v-slot:description="{ row: customer }">
          {{ customer.description }}
        </template>
        <template v-slot:followers="{ row: customer }">
          {{ customer.followers }}
        </template>
        <template v-slot:followings="{ row: customer }">
          {{ customer.followings }}
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

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    AddCustomerModal,
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "social_media",
        columnLabel: "social_media",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "profile_image",
        columnLabel: "profile_image",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "username",
        columnLabel: "username",
        sortEnabled: true,
        columnWidth: 230,
      },
      {
        columnName: "description",
        columnLabel: "description",
        sortEnabled: true,
        columnWidth: 300,
      },
      {
        columnName: "followers",
        columnLabel: "followers",
        sortEnabled: true,
        columnWidth: 150,
      },
      {
        columnName: "followings",
        columnLabel: "followings",
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

    onMounted(() => {
      getProfiles();
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const getProfiles = () => {
      ApiService.get("/instagram-va-tweeter/profiles")
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
      tableData,
      tableHeader,
      deleteCustomer,
      search,
      searchItems,
      selectedIds,
      deleteFewCustomers,
      sort,
      onItemSelect,
      getAssetPath,
    };
  },
});
</script>
