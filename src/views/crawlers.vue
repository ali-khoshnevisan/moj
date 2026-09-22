<template>
  <div v-if="tableData.length > 0" v-loading="pageLoading" class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Crawlers List</span>
      </h3>

      <div class="d-flex gap-5">
        <div
          class="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to add a user"
        >
          <button
            class="btn btn-sm btn-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_add_crawler"
          >
            <KTIcon icon-name="plus" icon-class="fs-3" />
            Add Crawler
          </button>
        </div>
        <div
          class="card-toolbar"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          data-bs-trigger="hover"
          title="Click to create a sample web crawler for test"
        >
          <button
            class="btn btn-sm btn-light-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_test_crawler"
          >
            <KTIcon icon-name="gear" icon-class="fs-3" />
            test web crawler
          </button>
        </div>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table
          class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted">
              <th class="min-w-150px">platform</th>
              <th class="min-w-140px">url</th>
              <th class="min-w-140px">last crawl</th>
              <th class="min-w-120px">status</th>
              <th class="min-w-100px text-end">Actions</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in tableData" :key="index">
              <tr>
                <td>
                  <i
                    :class="`bi bi-${getPlatformClass(item.platform)} fs-2`"
                  ></i>
                </td>

                <td>
                  <a :href="item.url">
                    {{ item.url }}
                  </a>
                </td>

                <td>
                  <div class="fs-7 fw-bold text-muted">
                    {{ formatDate(item.last_update) }}
                  </div>
                </td>

                <td class="">
                  <div class="status badge" :class="statusClass(item.status)">
                    {{ item.status }}
                  </div>
                </td>

                <td class="text-end">
                  <button
                    @click="getCrawler(item.id)"
                    data-bs-toggle="modal"
                    data-bs-target="#kt_modal_edit_crawler"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                  >
                    <KTIcon icon-name="pencil" icon-class="fs-3" />
                  </button>

                  <button
                    @click="removeCrawler(item.id)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
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
          Add Crawler
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
          <div class="d-flex gap-5 align-items-center">
            <h2 class="fw-bold">Add crawler</h2>
            <el-button type="primary">
              help
              <el-icon class="ms-1"><InfoFilled /></el-icon>
            </el-button>
          </div>
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
                  <label class="fs-6 fw-semibold mb-2">TITLE SELECTOR</label>

                  <el-form-item prop="title_cfg">
                    <el-input
                      v-model="formData.config.title_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="fs-6 fw-semibold mb-2">DESCRIPTION</label>

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.config.description_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="fs-6 fw-semibold mb-2">REMOVE SELECTOR</label>

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.config.remove_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="fs-6 fw-semibold mb-2">IMAGE SELECTOR</label>

                  <el-form-item prop="image_cfg">
                    <el-input
                      v-model="formData.config.image_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <!--                <div class="col-md-12">-->
                <!--                  <label class="fs-6 fw-semibold mb-2">AI Prompt</label>-->

                <!--                  <el-form-item prop="title_cfg">-->
                <!--                    <el-input-->
                <!--                      v-model="formData.ai_prompt"-->
                <!--                      type="textarea"-->
                <!--                      placeholder=""-->
                <!--                    />-->
                <!--                  </el-form-item>-->
                <!--                </div>-->
                <!--                <div class="col-md-12">-->
                <!--                  <label class="fs-6 fw-semibold mb-2">Status</label>-->

                <!--                  <el-form-item prop="name">-->
                <!--                    <div class="form-check form-check-solid form-switch fv-row">-->
                <!--                      <input-->
                <!--                        v-model="formData.status"-->
                <!--                        true-value="enable"-->
                <!--                        false-value="disable"-->
                <!--                        class="form-check-input w-45px h-30px"-->
                <!--                        type="checkbox"-->
                <!--                        id="status"-->
                <!--                      />-->
                <!--                      <label class="form-check-label" for="status"></label>-->
                <!--                    </div>-->
                <!--                  </el-form-item>-->
                <!--                </div>-->
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
    id="kt_modal_edit_crawler"
    ref="editActionModalRef"
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
          <h2 class="fw-bold">Edit crawler</h2>
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
          @submit.prevent="editCrawler()"
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
                  <label class="fs-6 fw-semibold mb-2">TITLE SELECTOR</label>

                  <el-form-item prop="title_cfg">
                    <el-input
                      v-model="formData.config.title_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="fs-6 fw-semibold mb-2">DESCRIPTION</label>

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.config.description_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="fs-6 fw-semibold mb-2">REMOVE SELECTOR</label>

                  <el-form-item prop="name">
                    <el-input
                      v-model="formData.config.remove_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div v-if="formData.platform === 'web'" class="col-md-12">
                  <label class="fs-6 fw-semibold mb-2">IMAGE SELECTOR</label>

                  <el-form-item prop="image_cfg">
                    <el-input
                      v-model="formData.config.image_cfg"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <!--                <div class="col-md-12">-->
                <!--                  <label class="fs-6 fw-semibold mb-2">AI Prompt</label>-->

                <!--                  <el-form-item prop="title_cfg">-->
                <!--                    <el-input-->
                <!--                      v-model="formData.ai_prompt"-->
                <!--                      type="textarea"-->
                <!--                      placeholder=""-->
                <!--                    />-->
                <!--                  </el-form-item>-->
                <!--                </div>-->
                <!--                <div class="col-md-12">-->
                <!--                  <label class="fs-6 fw-semibold mb-2">Status</label>-->

                <!--                  <el-form-item prop="name">-->
                <!--                    <div class="form-check form-check-solid form-switch fv-row">-->
                <!--                      <input-->
                <!--                        v-model="formData.status"-->
                <!--                        true-value="enable"-->
                <!--                        false-value="disable"-->
                <!--                        class="form-check-input w-45px h-30px"-->
                <!--                        type="checkbox"-->
                <!--                        id="status"-->
                <!--                      />-->
                <!--                      <label class="form-check-label" for="status"></label>-->
                <!--                    </div>-->
                <!--                  </el-form-item>-->
                <!--                </div>-->
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
    id="kt_modal_test_crawler"
    ref="testModalRef"
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
          <h2 class="fw-bold">sample web crawler</h2>
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
        <div class="result" v-if="showSampleResult">
          <div class="modal-body Rename…">
            <div class="title fs-1 fw-bold mb-7">
              {{ webCrawlerResult.title }}
            </div>
            <div class="img mb-7" v-if="webCrawlerResult.media">
              <img class="mw-600px" :src="webCrawlerResult.media" />
            </div>
            <div class="text mb-7">
              {{ webCrawlerResult.text }}
            </div>
          </div>
          <div class="modal-footer flex-center">
            <button
              id="kt_modal_add_customer_cancel"
              class="btn btn-light me-3"
              @click="showSampleResult = false"
            >
              Back
            </button>
            <button
              :data-kt-indicator="loading ? 'on' : null"
              class="btn btn-lg btn-primary"
              @click="submitSampleWebCrawler"
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
        </div>
        <el-form
          v-else
          @submit.prevent="createSampleWebCrawler()"
          :model="sampleCrawlerData"
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
                      v-model="sampleCrawlerData.url"
                      type="text"
                      placeholder=""
                    />
                  </el-form-item>
                </div>
                <div class="col-md-12">
                  <label class="required fs-6 fw-semibold mb-2"
                    >TITLE SELECTOR</label
                  >

                  <el-form-item prop="title_cfg">
                    <el-input
                      v-model="sampleCrawlerData.config.title_cfg"
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
                      v-model="sampleCrawlerData.config.description_cfg"
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
                      v-model="sampleCrawlerData.config.remove_cfg"
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
                      v-model="sampleCrawlerData.config.image_cfg"
                      type="text"
                      placeholder=""
                    />
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
                Result
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
import {
  defineComponent,
  nextTick,
  onBeforeUnmount,
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
import { InfoFilled } from "@element-plus/icons-vue";

export default defineComponent({
  name: "customers-listing",
  components: {
    Datatable,
    InfoFilled,
  },
  setup() {
    const loading = ref(false);
    const pageLoading = ref(false);
    const mediaPreviewVisible = ref(false);
    const showSampleResult = ref(false);
    const dialogImageUrl = ref(null);
    const type = ref("");
    const platforms = ref(["web", "telegram"]);
    const addActionModalRef = ref(null);
    const editActionModalRef = ref(null);
    const addTelegramCrawlerRef = ref(null);
    const fileList = ref([]);
    let formData = reactive({
      config: {
        title_cfg: "",
        description_cfg: "",
        remove_cfg: "",
        image_cfg: "",
      },
      // ai_prompt: "",
      url: "",
      platform: "web",
    });
    const sampleCrawlerData = ref({
      config: {
        title_cfg: "",
        description_cfg: "",
        remove_cfg: "",
        image_cfg: "",
      },
      url: "",
      // ai_prompt: "",
      platform: "web",
    });
    const crawlerId = ref(null);

    const webCrawlerResult = ref(null);

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
    const selectedIds = ref([]);
    const selectedInstagramPosts = ref([]);

    const tableData = ref([]);
    const telegramTableData = ref([]);
    const initCustomers = ref([]);

    // const isEnable = computed(() => {
    //   return formData.status === "enable";
    // });

    const createSampleWebCrawler = () => {
      loading.value = true;
      ApiService.post("/crawler/web-single-post/", sampleCrawlerData.value)
        .then((res) => {
          getResult(res.data.id);
        })
        .catch((err) => {
          loading.value = false;
        });
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

    const getResult = (id) => {
      ApiService.get("/crawler/web-single-post/" + id)
        .then((res) => {
          if (
            res.data.status === "requested" ||
            res.data.status === "pending"
          ) {
            setTimeout(() => {
              getResult(id);
            }, 10000);
          }
          if (res.data.status === "success") {
            loading.value = false;
            webCrawlerResult.value = res.data;
            showSampleResult.value = true;
            return;
          }
          if (res.data.status === "failed") {
            loading.value = false;
          }
        })
        .catch((e) => {
          loading.value = false;
        });
    };

    const emptyFormData = () => {
      formData = {
        config: {
          title_cfg: "",
          description_cfg: "",
          remove_cfg: "",
          image_cfg: "",
        },
        url: "",
        platform: "web",
        // status: true,
      };
    };

    const fillFormData = (crawler) => {
      formData.url = crawler.url;
      formData.platform = crawler.platform;
      formData.config.title_cfg = crawler.config?.title_cfg;
      formData.config.description_cfg = crawler.config?.description_cfg;
      formData.config.remove_cfg = crawler.config?.remove_cfg;
      formData.config.image_cfg = crawler.config?.image_cfg;
      // formData.status = crawler.status;
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
      if (status === "pending" || status === "requested") {
        return "badge-warning";
      }
      return "badge-danger";
    };

    onMounted(() => {
      getCrawlers();
      // addActionModalRef.value.addEventListener("hidden.bs.modal", onModalHide);
    });

    onBeforeUnmount(() => {
      // addActionModalRef.value?.removeEventListener(
      //   "hidden.bs.modal",
      //   onModalHide
      // );
    });

    const onModalHide = () => {
      emptyFormData();
    };
    const fillPosts = (data) => {
      selectedInstagramPosts.value = data.posts;
    };

    const submitSampleWebCrawler = () => {
      loading.value = true;
      ApiService.post("/crawler/account/", sampleCrawlerData.value)
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

    const addSocialMediaCrawler = () => {
      loading.value = true;
      ApiService.post("/crawler/account/", formData)
        .then((response) => {
          loading.value = false;
          getCrawlers();
          hideModal(addActionModalRef.value);
        })
        .catch((error) => {
          hideModal(addActionModalRef.value);
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

    const editCrawler = () => {
      loading.value = true;
      ApiService.put(`/crawler/account/${crawlerId.value}/`, formData)
        .then((response) => {
          loading.value = false;
          getCrawlers();
          hideModal(addActionModalRef.value);
        })
        .catch((error) => {
          hideModal(addActionModalRef.value);
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
            tableData.value = response.data.results;
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

    const removeCrawler = (id) => {
      ApiService.delete("crawler/account/" + id + "/")
        .then((response) => {
          getCrawlers();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const getCrawler = (id) => {
      loading.value = true;
      ApiService.get("crawler/account/" + id)
        .then((response) => {
          loading.value = false;
          crawlerId.value = response.data.id;
          fillFormData(response.data);
        })
        .catch((error) => {
          loading.value = false;
          console.log(error);
        });
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
      showSampleResult,
      telegramTableData,
      tableData,
      webCrawlerResult,
      fileList,
      selectedInstagramPosts,
      mediaPreviewVisible,
      dialogImageUrl,
      sampleCrawlerData,
      formatDate,
      emptyFormData,
      getPlatformClass,
      fillPosts,
      fillFormData,
      statusClass,
      removeCrawler,
      deleteCustomer,
      getCrawler,
      editCrawler,
      getCrawlers,
      addSocialMediaCrawler,
      submitSampleWebCrawler,
      search,
      searchItems,
      selectedIds,
      deleteFewCustomers,
      handlePictureCardPreview,
      createSampleWebCrawler,
      handleRemove,
      sort,
      onItemSelect,
      getAssetPath,
    };
  },
});
</script>

<style scoped lang="scss"></style>
