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
          v-if="socialMedia === 'instagram'"
          class="btn btn-sm btn-light-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_Ws"
          @click="infoDialog = true"
        >
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Add Profile
        </button>
        <a
          class="btn btn-sm btn-light-primary"
          v-else-if="socialMedia === 'twitter'"
          href="http://46.225.112.201/downloads/profile-maker.zip"
          download
        >
          <KTIcon icon-name="file-down" icon-class="fs-2" />
          Download file
        </a>
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
              <th class="min-w-100px">Status</th>
              <th class="mw-200px">Description</th>
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
                      <img
                        :src="
                          item.image
                            ? item.image
                            : platformImage(item.social_media)
                        "
                        class=""
                        alt=""
                      />
                    </div>

                    <div class="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        class="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                        >{{ item.username }}</a
                      >
                      <!--                      <span-->
                      <!--                        class="text-muted fw-semibold text-muted d-block fs-7"-->
                      <!--                        >{{ item.description }}</span-->
                      <!--                      >-->
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
                  <span
                    :class="`
                      badge badge-light-${getStatusClass(item.status)}
                      fs-7
                      fw-bold
                    `"
                    >{{ item.status }}</span
                  >
                </td>

                <td>
                  <!--                  <a-->
                  <!--                    href="#"-->
                  <!--                    class="text-gray-900 fw-bold text-hover-primary d-block mb-1 fs-6"-->
                  <!--                    >{{ item.description }}</a-->
                  <!--                  >-->
                  <p class="text-muted fw-semibold fs-7">
                    {{ item.description }}
                  </p>
                </td>

                <td class="text-end">
                  <button
                    @click="refreshBot(item.id)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <!--                    <KTIcon icon-name="arrows-circle" icon-class="fs-3" />-->
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </button>

                  <!--                  <button-->
                  <!--                    @click="getProfileConfig(item.id)"-->
                  <!--                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"-->
                  <!--                  >-->
                  <!--                    <KTIcon icon-name="gear" icon-class="fs-3" />-->
                  <!--                  </button>-->
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
            :total="totalItems"
            @change="getProfiles($event, i)"
          />
        </div>
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
        <button class="btn btn-primary" @click="infoDialog = true">
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

  <el-dialog
    :show-close="false"
    v-model="WSVisible"
    :width="width"
    :height="height"
    :modal="false"
    modal-penetrable
    @close="closeWS"
  >
    <template #header>
      <div class="my-header">
        <el-alert
          type="warning"
          title="Attention"
          show-icon
          :closable="false"
          class="my-1"
        >
          <template #default>
            after successfully logged in to your account, please close this
            modal to complete the process.
            <br />
            If the screen doesn't show anything after a long time or if your
            username and password is correct and still can not login, press the
            refresh button and change your country.
          </template>
        </el-alert>
        <!--        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>-->
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="refreshWS">
          <el-icon class="el-icon--right"><Refresh /></el-icon>
          Refresh
        </el-button>
        <el-button type="danger" @click="WSVisible = false">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
          Close
        </el-button>
      </div>
    </template>
    <img
      ref="screen"
      @click="handleClick"
      :src="img"
      :width="width"
      :height="height"
    />
  </el-dialog>
  <el-dialog
    title="enter username, password and TOTP of the account"
    v-model="infoDialog"
    class="info-dialog"
  >
    <el-form>
      <div class="row align-items-center my-5">
        <!--begin::Label-->
        <div class="col-6 fs-6 fw-semibold mb-2">
          <span class="required">Account username</span>

          <!--          <i-->
          <!--            class="fas fa-exclamation-circle ms-1 fs-7"-->
          <!--            data-bs-toggle="tooltip"-->
          <!--            title="enter username, password and TOTP of the account"-->
          <!--          ></i>-->
        </div>

        <div class="col-6 justify-right">
          <el-form-item>
            <el-input
              v-model="username"
              :parser="(value) => value.replace(/^@/, '')"
              placeholder="myAccount"
            />
          </el-form-item>
        </div>
        <div class="col-6 fs-6 fw-semibold mb-2">
          <span class="required">Password</span>

          <!--          <i-->
          <!--            class="fas fa-exclamation-circle ms-1 fs-7"-->
          <!--            data-bs-toggle="tooltip"-->
          <!--            title="enter password and TOTP of the account"-->
          <!--          ></i>-->
        </div>
        <div class="col-6 justify-right">
          <el-form-item>
            <el-input v-model="password" placeholder="myAccount" />
          </el-form-item>
        </div>
        <div class="col-6 fs-6 fw-semibold mb-2">
          <span class="">TOTP</span>

          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="enter the 32 words totp code for generating 2fa code"
          ></i>
        </div>
        <div class="col-6 justify-right">
          <el-form-item>
            <el-input v-model="TOTP" placeholder="Q6QW76GW6YI5V...." />
          </el-form-item>
        </div>
        <div class="col-6 fs-6 fw-semibold mb-2">
          <span class="required">sleep time from</span>

          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="enter time "
          ></i>
        </div>
        <div class="col-6 justify-right">
          <el-form-item>
            <el-input-number
              v-model="sleep_from"
              placeholder="max: 24"
              :max="24"
              :min="0"
            />
          </el-form-item>
        </div>
        <div class="col-6 fs-6 fw-semibold mb-2">
          <span class="required">sleep time to</span>

          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="enter the 32 words totp code for generating 2fa code"
          ></i>
        </div>
        <div class="col-6 justify-right">
          <el-form-item>
            <el-input-number
              v-model="sleep_to"
              placeholder="max: 24"
              :max="24"
              :min="sleep_from"
            >
            </el-input-number>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="infoDialog = false">Cancel</el-button>
        <el-button type="primary" @click="setProxyPort"> Login </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    title="enter the limits of your account"
    v-model="otpCodeDialog"
    class="info-dialog"
  >
    <el-form>
      <div class="row align-items-center mb-5">
        <!--begin::Label-->
        <div class="col-6 fs-6 fw-semibold mb-2">
          <span class="required">code</span>

          <i
            class="fas fa-exclamation-circle ms-1 fs-7"
            data-bs-toggle="tooltip"
            title="enter the code"
          ></i>
        </div>

        <div class="col-6 justify-right">
          <el-form-item>
            <el-input v-model="code"></el-input>
          </el-form-item>
        </div>
      </div>
      <!--      <div class="row align-items-center mb-5">-->
      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->
      <!--        <div class="col-6 fs-6 fw-semibold mb-2">-->
      <!--          <span class="required">Likes count</span>-->

      <!--          <i-->
      <!--            class="fas fa-exclamation-circle ms-1 fs-7"-->
      <!--            data-bs-toggle="tooltip"-->
      <!--            title="enter the maximum of Likes you want we do with your account"-->
      <!--          ></i>-->
      <!--        </div>-->

      <!--        <div class="col-6 justify-right">-->
      <!--          <el-form-item>-->
      <!--            <el-input-number-->
      <!--              v-model="likeCount"-->
      <!--              placeholder="max: 10"-->
      <!--              :max="24"-->
      <!--              :min="0"-->
      <!--            >-->
      <!--              <template #suffix>-->
      <!--                <span>/day</span>-->
      <!--              </template>-->
      <!--            </el-input-number>-->
      <!--          </el-form-item>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="row align-items-center mb-5">-->
      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->
      <!--        <div class="col-6 fs-6 fw-semibold mb-2">-->
      <!--          <span class="required">Comment count</span>-->

      <!--          <i-->
      <!--            class="fas fa-exclamation-circle ms-1 fs-7"-->
      <!--            data-bs-toggle="tooltip"-->
      <!--            title="enter the maximum of Comment you want we do with your account"-->
      <!--          ></i>-->
      <!--        </div>-->

      <!--        <div class="col-6 justify-right">-->
      <!--          <el-form-item>-->
      <!--            <el-input-number-->
      <!--              v-model="commentCount"-->
      <!--              placeholder="max: 10"-->
      <!--              :max="24"-->
      <!--              :min="0"-->
      <!--            >-->
      <!--              <template #suffix>-->
      <!--                <span>/day</span>-->
      <!--              </template>-->
      <!--            </el-input-number>-->
      <!--          </el-form-item>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="row align-items-center mb-5">-->
      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->
      <!--        <div class="col-6 fs-6 fw-semibold mb-2">-->
      <!--          <span class="required">Follow count</span>-->

      <!--          <i-->
      <!--            class="fas fa-exclamation-circle ms-1 fs-7"-->
      <!--            data-bs-toggle="tooltip"-->
      <!--            title="enter the maximum of Follow you want we do with your account"-->
      <!--          ></i>-->
      <!--        </div>-->

      <!--        <div class="col-6 justify-right">-->
      <!--          <el-form-item>-->
      <!--            <el-input-number-->
      <!--              v-model="followCount"-->
      <!--              placeholder="max: 10"-->
      <!--              :max="24"-->
      <!--              :min="0"-->
      <!--            >-->
      <!--              <template #suffix>-->
      <!--                <span>/day</span>-->
      <!--              </template>-->
      <!--            </el-input-number>-->
      <!--          </el-form-item>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="row align-items-center mb-5">-->
      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->
      <!--        <div class="col-6 fs-6 fw-semibold mb-2">-->
      <!--          <span class="required">Direct Message count</span>-->

      <!--          <i-->
      <!--            class="fas fa-exclamation-circle ms-1 fs-7"-->
      <!--            data-bs-toggle="tooltip"-->
      <!--            title="enter the maximum of Direct Message you want we do with your account"-->
      <!--          ></i>-->
      <!--        </div>-->

      <!--        <div class="col-6 justify-right">-->
      <!--          <el-form-item>-->
      <!--            <el-input-number-->
      <!--              v-model="directCount"-->
      <!--              placeholder="max: 10"-->
      <!--              :max="24"-->
      <!--              :min="0"-->
      <!--            >-->
      <!--              <template #suffix>-->
      <!--                <span>/day</span>-->
      <!--              </template>-->
      <!--            </el-input-number>-->
      <!--          </el-form-item>-->
      <!--        </div>-->
      <!--      </div>-->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="otpCodeDialog = false">Cancel</el-button>
        <el-button type="primary" @click="sendCode"> Login </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    title="select a country for proxy"
    v-model="countryDialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <el-form>
      <el-form-item>
        <p class="fs-5">Country</p>
        <el-select filterable v-model="country">
          <el-option
            v-for="(country, idx) in countries"
            :key="idx"
            :value="country.code"
            :label="country.name"
          >
            <span style="float: left">{{ country.name }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;
              "
            >
              {{ getFlag(country.code) }}
            </span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="countryDialog = false">Cancel</el-button>
        <el-button type="primary" @click="selectCountry"> Next </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import { MenuComponent } from "@/assets/ts/components";
import ApiService from "@/core/services/ApiService";
import { useRoute } from "vue-router";
import { CircleCloseFilled, Refresh } from "@element-plus/icons-vue";
import Swal from "sweetalert2";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    CircleCloseFilled,
    Refresh,
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
    const WSVisible = ref(false);
    const countryDialog = ref(false);
    const settingDialog = ref(false);
    const route = useRoute();
    const selectedIds = ref([]);
    const countries = ref([
      {
        name: "United States",
        code: "us",
      },
      {
        name: "Bahrain",
        code: "bh",
      },
      {
        name: "Germany",
        code: "de",
      },
      {
        name: "France",
        code: "fr",
      },
      {
        name: "Netherlands",
        code: "nl",
      },
      {
        name: "United Kingdom",
        code: "gb",
      },
      {
        name: "Canada",
        code: "ca",
      },
    ]);
    const country = ref("");
    const loading = ref(false);
    const screen = ref(null);
    const selectedProfileId = ref(null);
    const socialMedia = ref("");
    const platforms = ref(["instagram", "twitter"]);
    const infoDialog = ref(false);
    const otpCodeDialog = ref(false);
    const code = ref("");
    const username = ref("");
    const password = ref("");
    const TOTP = ref("");
    const sleep_from = ref(0);
    const sleep_to = ref(0);
    const img = ref("");
    const proxyPort = ref("");
    const width = ref(0);
    const height = ref(0);
    const totalItems = ref(0);
    const followCount = ref(1);
    const commentCount = ref(1);
    const directCount = ref(1);
    const likeCount = ref(1);
    const editMode = ref(false);
    const retryMode = ref(false);
    const tableData = ref([]);
    const initCustomers = ref([]);

    onMounted(() => {
      if (route.name === "instagramProfile") {
        socialMedia.value = "instagram";
      } else if (route.name === "twitterProfile") {
        socialMedia.value = "twitter";
      }
      getProfiles();
      initCustomers.value.splice(0, tableData.value.length, ...tableData.value);
    });

    function getFlag(countryCode) {
      return countryCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(127397 + char.charCodeAt())
        );
    }

    const setProxyPort = () => {
      if (editMode.value) {
        editProfile();
        return;
      }
      if (retryMode.value) {
        retryProfile();
        return;
      }
      // return new Promise((resolve, reject) => {
      ApiService.get("/api/social-media/profile/allocate-port")
        .then((res) => {
          proxyPort.value = res.data.allocated_port;
          addProfile();
          // resolve();
        })
        .catch((err) => {
          // reject(err);
        });
      // });
    };

    const sendCode = () => {
      ApiService.post(`/api/profile/${selectedProfileId.value}/submit-code`, {
        username: username.value,
        code: code.value,
      })
        .then((res) => {
          otpCodeDialog.value = false;
          getProfiles();
        })
        .catch((err) => {
          otpCodeDialog.value = false;
        });
    };

    const sendAccountToCore = () => {
      loading.value = true;
      infoDialog.value = false;
      const data = {
        username: username.value,
        password: password.value,
        proxy: `vahid2026:vihanbaba2026@127.0.0.1:${proxyPort.value}`,
        sleep_from: sleep_from.value,
        sleep_to: sleep_to.value,
      };
      ApiService.post("/core/login", data)
        .then((res) => {
          if (res.data.needs_2fa_code || res.data.needs_email_code) {
            otpCodeDialog.value = true;
            return;
          }
          loading.value = false;
          addProfile();
        })
        .catch((err) => {
          loading.value = false;
        });
    };

    const addProfile = () => {
      loading.value = true;
      const data = {
        username: username.value,
        password: password.value,
        social_media: "instagram",
        sleep_from: sleep_from.value,
        sleep_to: sleep_to.value,
        totp: TOTP.value,
        proxy: {
          username: `b8f3fab422699782c1f0__cr.${country.value};sessttl.120`,
          port: proxyPort.value,
        },
        url: `https://instagram.com/${username.value}/`,
      };
      ApiService.post("/api/social-media/profile/", data)
        .then((res) => {
          loading.value = false;
          infoDialog.value = false;
          getProfiles();
        })
        .catch((err) => {
          infoDialog.value = false;
          loading.value = false;
        });
    };

    const checkProfile = () => {
      if (TOTP.value) {
        addProfile();
        return;
      }
      sendAccountToCore();
    };

    const editProfile = () => {
      loading.value = true;
      const data = {
        username: username.value,
        password: password.value,
        social_media: "instagram",
        sleep_from: sleep_from.value,
        sleep_to: sleep_to.value,
        totp: TOTP.value,
        proxy: {
          username: `b8f3fab422699782c1f0__cr.${country.value};sessttl.120`,
          port: proxyPort.value,
        },
        url: `https://instagram.com/${username.value}/`,
      };
      ApiService.patch(
        "/api/social-media/profile/" + selectedProfileId.value + "/",
        data
      )
        .then((res) => {
          editMode.value = false;
          infoDialog.value = false;
          loading.value = false;
          getProfiles();
        })
        .catch((err) => {
          editMode.value = false;
          infoDialog.value = false;
          loading.value = false;
        });
    };

    const retryProfile = () => {
      loading.value = true;
      ApiService.post(
        "/api/social-media/profile/" + selectedProfileId.value + "/retry/"
      )
        .then((res) => {
          retryMode.value = false;
          infoDialog.value = false;
          loading.value = false;
          getProfiles();
        })
        .catch((err) => {
          retryMode.value = false;
          infoDialog.value = false;
          loading.value = false;
        });
    };

    const refreshBot = (id) => {
      loading.value = true;
      ApiService.get("/api/social-media/profile/" + id)
        .then((res) => {
          loading.value = false;
          selectedProfileId.value = id;
          username.value = res.data.username;
          password.value = res.data.password;
          TOTP.value = res.data.totp;
          sleep_to.value = res.data.sleep_to;
          sleep_from.value = res.data.sleep_from;
          proxyPort.value = res.data.proxy.port;
          if (res.data.status === "2fa") {
            otpCodeDialog.value = true;
          } else if (res.data.status === "profile-is-not-login") {
            retryMode.value = true;
            infoDialog.value = true;
          } else if (res.data.status === "added") {
            // editMode.value = true;
            // infoDialog.value = true;
          }
        })
        .catch((err) => {
          loading.value = false;
        });
    };

    const getProfileConfig = (id) => {
      ApiService.get("/api/social-media/profile/" + id)
        .then((res) => {
          editMode.value = true;
          selectedProfileId.value = id;
          commentCount.value = res.data.max_actions_per_hour.comment;
          followCount.value = res.data.max_actions_per_hour.follow;
          directCount.value = res.data.max_actions_per_hour.direct;
          likeCount.value = res.data.max_actions_per_hour.like;
          settingDialog.value = true;
        })
        .catch((err) => {});
    };

    const selectCountry = () => {
      countryDialog.value = false;
      infoDialog.value = true;
    };

    const getProfiles = (page = 1) => {
      loading.value = true;
      ApiService.query("/api/social-media/profile/", {
        params: { social_media: socialMedia.value, page },
      })
        .then((response) => {
          loading.value = false;
          tableData.value = response.data.results;
          totalItems.value = response.data.count;
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
      ApiService.delete("/api/social-media/profile/" + id + "/")
        .then((response) => {
          loading.value = false;
          getProfiles();
        })
        .catch((error) => {
          loading.value = false;
        });
    };

    const getStatusClass = (status) => {
      if (status === "success" || status === "added") {
        return "success";
      }
      if (status === "rejected") {
        return "reject";
      }
      return "warning";
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

    return {
      tableData,
      tableHeader,
      loading,
      followCount,
      likeCount,
      commentCount,
      countries,
      country,
      directCount,
      img,
      screen,
      infoDialog,
      otpCodeDialog,
      editMode,
      retryMode,
      code,
      settingDialog,
      username,
      password,
      TOTP,
      sleep_from,
      sleep_to,
      socialMedia,
      platforms,
      totalItems,
      WSVisible,
      countryDialog,
      width,
      height,
      deleteCustomer,
      platformImage,
      getFlag,
      getStatusClass,
      search,
      removeProfile,
      setProxyPort,
      getProfiles,
      selectCountry,
      sendCode,
      searchItems,
      checkProfile,
      addProfile,
      editProfile,
      getProfileConfig,
      refreshBot,
      selectedIds,
      deleteFewCustomers,
      sort,
      onItemSelect,
      getAssetPath,
    };
  },
});
</script>

<style lang="scss">
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}
.el-dialog {
  width: max-content !important;
}
.info-dialog {
  max-width: 600px !important;

  .justify-right {
    justify-items: right;
  }
}
</style>
