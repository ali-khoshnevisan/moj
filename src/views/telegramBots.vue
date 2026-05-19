<template>
  <div v-if="tableData.length > 0" v-loading="loading" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Bots List</span>

        <!--        <span class="text-muted mt-1 fw-semibold fs-7"-->
        <!--          >Over 500 new products</span-->
        <!--        >-->
      </h3>
      <div class="card-toolbar">
        <button
          class="btn btn-sm btn-light-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_telegram_bot"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Add Bot
        </button>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted bg-light">
              <th class="ps-4 min-w-225px rounded-start">Channel</th>
              <th class="min-w-125px">header</th>
              <th class="min-w-125px">footer</th>
              <!--              <th class="min-w-100px">Status</th>-->
              <th class="pe-4 min-w-200px text-end rounded-end">action</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in tableData" :key="index">
              <tr>
                <td>
                  <div class="fw-bold text-muted">
                    {{ item.channel }}
                  </div>
                </td>

                <td>
                  <a
                    href="#"
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.text_header }}</a
                  >
                  <!--                  <span class="text-muted fw-semibold text-muted d-block fs-7"-->
                  <!--                    >followers</span-->
                  <!--                  >-->
                </td>

                <td>
                  <a
                    href="#"
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.text_footer }}</a
                  >
                  <!--                  <span class="text-muted fw-semibold text-muted d-block fs-7"-->
                  <!--                    >followings</span-->
                  <!--                  >-->
                </td>

                <!--                <td>-->
                <!--                  <span-->
                <!--                    :class="`-->
                <!--                      badge badge-light-${getStatusClass(item.status)}-->
                <!--                      fs-7-->
                <!--                      fw-bold-->
                <!--                    `"-->
                <!--                    >{{ item.status }}</span-->
                <!--                  >-->
                <!--                </td>-->

                <td class="text-end">
                  <!--                  <a-->
                  <!--                    href="#"-->
                  <!--                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"-->
                  <!--                  >-->
                  <!--                    <KTIcon icon-name="switch" icon-class="fs-3" />-->
                  <!--                  </a>-->

                  <button
                    @click="getTelegramDetail(item.id)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    data-bs-target="#kt_modal_add_telegram_bot"
                    data-bs-toggle="modal"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </button>

                  <button
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    @click="removeProfile(item.id)"
                  >
                    <KTIcon icon-name="trash" icon-class="fs-3" />
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <div v-else v-loading="loading" class="card">
    <div class="card-body p-0">
      <!--begin::Heading-->
      <div class="card-px text-center pt-20">
        <h2 class="fs-2x fw-bold mb-10">welcome to Profile</h2>
        <p class="text-gray-500 fs-5 fw-semibold mb-13">
          <span>you can add your profiles here</span>
        </p>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_customer"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Add Profile
        </button>
        <!--end::Action-->
      </div>
      <!--end::Heading-->

      <div class="text-center px-5 my-20">
        <img
          class="w-250px w-lg-300px theme-light-show"
          :src="getAssetPath('media/illustrations/sketchy-1/16.png')"
          alt=""
        />
      </div>
    </div>
  </div>

  <AddCustomerModal @updateProfiles="getProfiles" />
</template>

<script setup>
import { getAssetPath } from "@/core/helpers/assets";
import { onMounted, ref } from "vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import ApiService from "@/core/services/ApiService";

const selectedIds = ref([]);
const loading = ref(false);

const tableData = ref([]);
const initCustomers = ref([]);

onMounted(() => {
  getProfiles();
  initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
});

const getProfiles = () => {
  loading.value = true;
  ApiService.get("/crawler/telegram-bot")
    .then((response) => {
      loading.value = false;
      tableData.value = response.data.results;
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

const removeProfile = (id) => {
  loading.value = true;
  ApiService.delete("/crawler/telegram-bot/" + id + "/")
    .then((response) => {
      loading.value = false;
      getProfiles();
    })
    .catch((error) => {
      loading.value = false;
    });
};

const getTelegramDetail = (id) => {
  loading.value = true;
  ApiService.delete("/crawler/telegram-bot/" + id + "/")
    .then((response) => {
      loading.value = false;
      getProfiles();
    })
    .catch((error) => {
      loading.value = false;
    });
};

const getStatusClass = (status) => {
  if (status === "requested") {
    return "warning";
  }
  if (status === "success" || status === "added") {
    return "success";
  }
  if (status === "rejected") {
    return "reject";
  }
};

const platformImage = (platform) => {
  if (platform === "instagram") {
    return getAssetPath("media/svg/brand-logos/instagram-2-1.svg");
  }
  if (platform === "twitter") {
    return getAssetPath("media/svg/brand-logos/twitter-2.svg");
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
</script>

<style scoped lang="scss"></style>
