<template>
  <div v-if="tableData.length > 0" v-loading="loading" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Profiles</span>

        <!--        <span class="text-muted mt-1 fw-semibold fs-7"-->
        <!--          >Over 500 new products</span-->
        <!--        >-->
      </h3>
      <div class="card-toolbar">
        <button
          href="#"
          class="btn btn-sm btn-light-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_customer"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Add Profile
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
              <th class="ps-4 min-w-225px rounded-start">Profile</th>
              <th class="min-w-125px">Followers</th>
              <th class="min-w-125px">Followings</th>
              <th class="mw-200px">Url</th>
              <th class="min-w-100px">Status</th>
              <th class="min-w-200px text-end rounded-end"></th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in tableData" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-50px me-5">
                      <img :src="item.profile_image" class="" alt="" />
                    </div>

                    <div class="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                        >{{ item.username }}</a
                      >
                      <span
                        class="text-muted fw-semibold text-muted d-block fs-7"
                        >{{ item.description }}</span
                      >
                    </div>
                  </div>
                </td>

                <td>
                  <a
                    href="#"
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.followers }}</a
                  >
                  <!--                  <span class="text-muted fw-semibold text-muted d-block fs-7"-->
                  <!--                    >followers</span-->
                  <!--                  >-->
                </td>

                <td>
                  <a
                    href="#"
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.followings }}</a
                  >
                  <!--                  <span class="text-muted fw-semibold text-muted d-block fs-7"-->
                  <!--                    >followings</span-->
                  <!--                  >-->
                </td>

                <td>
                  <a
                    href="#"
                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.url }}</a
                  >
                  <p class="text-muted fw-semibold fs-7">
                    {{ item.firefox_profile_path }}
                  </p>
                </td>

                <td>
                  <span
                    :class="`
                      badge badge-light-${getStatusClass(item.status)}
                      fs-7
                      fw-bold
                    `"
                    >{{ item.status }}</span
                  >
                </td>

                <td class="text-end">
                  <!--                  <a-->
                  <!--                    href="#"-->
                  <!--                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"-->
                  <!--                  >-->
                  <!--                    <KTIcon icon-name="switch" icon-class="fs-3" />-->
                  <!--                  </a>-->

                  <button
                    @click="editProfile(item.id)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
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

  <div class="browser text-center my-10">
    <img
      ref="screen"
      @click="handleClick"
      :src="img"
      :width="width"
      :height="height"
    />
  </div>
  <AddCustomerModal
    @connect="connectWS"
    @updateProfiles="getProfiles"
  ></AddCustomerModal>
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddCustomerModal from "@/components/modals/forms/AddCustomerModal.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import ApiService from "@/core/services/ApiService";
import { useWebSocket } from "@/core/plugins/useWebSocket.js";

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
    const loading = ref(false);
    const screen = ref(null);
    const socialMedia = ref("");
    const img = ref("");
    const width = ref(0);
    const height = ref(0);

    const { connect, send, messages, isConnected, socket } = useWebSocket(
      "ws://46.224.111.189:9000"
    );
    const tableData = ref([]);
    const initCustomers = ref([]);

    onMounted(() => {
      getProfiles();
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    const connectWS = (social_media) => {
      socialMedia.value = social_media;
      connect();
      sendMessage({
        type: "get-countries",
      });
    };

    const handleClick = (e) => {
      const rect = screen.value.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      send({
        type: "click",
        x: Math.floor(x),
        y: Math.floor(y),
      });
      socket.value.onmessage = (event) => {
        img.value = "data:image/png;base64," + event.data;
      };
    };

    const selectCountry = (countries) => {
      send({
        type: "init",
        country: countries[1],
      });
      socket.value.onmessage = (event) => {
        width.value = event.data.w;
        height.value = event.data.h;
        openBrowser();
      };
    };

    function handleKeydown(event) {
      send({ type: "type", text: event.key });
    }

    const openBrowser = () => {
      send({
        type: "goto",
        platform: socialMedia.value,
      });
      socket.value.onmessage = (event) => {
        window.addEventListener("keydown", handleKeydown);
        img.value = "data:image/png;base64," + event.data;
      };
    };

    const sendMessage = (data) => {
      if (isConnected.value) {
        send(data);
        socket.value.onmessage = (event) => {
          selectCountry(event.data);
        };
      } else {
        setTimeout(() => {
          sendMessage(data);
        }, 1000);
      }
    };

    const getProfiles = () => {
      loading.value = true;
      ApiService.get("/social-media/profile")
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
      ApiService.delete("/social-media/profile/" + id + "/")
        .then((response) => {
          loading.value = false;
          getProfiles();
        })
        .catch((error) => {
          loading.value = false;
        });
    };

    const getStatusClass = (status) => {
      if (status === "requested" || status === "added") {
        return "warning";
      }
      if (status === "success") {
        return "green";
      }
      if (status === "rejected") {
        return "red";
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
      tableData,
      tableHeader,
      loading,
      img,
      screen,
      width,
      height,
      deleteCustomer,
      getStatusClass,
      search,
      removeProfile,
      handleClick,
      getProfiles,
      searchItems,
      connectWS,
      selectedIds,
      deleteFewCustomers,
      sort,
      onItemSelect,
      getAssetPath,
    };
  },
});
</script>
