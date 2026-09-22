<template>
  <!--begin::Card-->
  <div class="card h-100" :class="cardClasses">
    <!--begin::Card header-->
    <div class="card-header flex-nowrap border-0 pt-9">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <!--begin::Icon-->
        <div class="symbol symbol-45px w-45px bg-light me-5">
          <img :src="icon" alt="image" class="p-3" />
        </div>
        <!--end::Icon-->

        <!--begin::Title-->
        <a
          href="#"
          class="fs-3 fw-semibold text-hover-primary text-gray-600 m-0"
        >
          {{ title }}
        </a>
        <!--        <span-->
        <!--          :class="`badge badge-light-${getStatusClass(-->
        <!--            status-->
        <!--          )} fs-7 fw-bold ms-4`"-->
        <!--          >{{ status }}</span-->
        <!--        >-->
        <!--end::Title-->
      </div>
      <!--end::Card title-->

      <!--begin::Card toolbar-->
      <div class="card-toolbar m-0">
        <button
          type="button"
          class="btn btn-clean btn-sm btn-icon btn-icon-primary btn-active-light-primary me-n3"
          @click="goToActions"
        >
          <KTIcon icon-name="right-square" icon-class="fs-1 text-primary" />
        </button>
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body d-flex flex-column px-9 pt-6 pb-8">
      <!--begin::Heading-->
      <!--      <div class="fs-2tx fw-bold mb-3">-->
      <!--        {{ content }}-->
      <!--      </div>-->
      <div class="actions d-flex align-items-center mb-5">
        <span class="fs-5">actions:</span>
        <div v-for="(action, index) in actions" :key="index" class="ms-4">
          <i
            :class="`bi fs-1 text-${actionColor(action)} bi-${getIcon(action)}`"
          />
        </div>
      </div>

      <div class="targets d-flex align-items-center mb-5">
        <span class="fs-5">targets:</span>
        <div
          v-for="(target, index) in targets"
          :key="index"
          class="ms-4 bg-light-primary p-2 rounded overflow-auto"
        >
          {{ targetName(target) }}
        </div>
      </div>
      <!--end::Heading-->

      <!--begin::Stats-->
      <!--      <div class="d-flex align-items-center flex-wrap mb-5 mt-auto fs-6">-->
      <!--        <KTIcon :icon-name="arrow" :icon-class="`fs-3 me-1 text-${color}`" />-->

      <!--        &lt;!&ndash;begin::Number&ndash;&gt;-->
      <!--        <div :class="`text-${color}`" class="fw-bold me-2">-->
      <!--          {{ footerData }}-->
      <!--        </div>-->
      <!--        &lt;!&ndash;end::Number&ndash;&gt;-->

      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->
      <!--        <div class="fw-semibold text-gray-500">-->
      <!--          {{ footerText }}-->
      <!--        </div>-->
      <!--        &lt;!&ndash;end::Label&ndash;&gt;-->
      <!--      </div>-->
      <!--end::Stats-->

      <!--begin::Indicator-->
      <!--      <div class="d-flex align-items-center fw-semibold">-->
      <!--        <span class="badge bg-light text-gray-700 px-3 py-2 me-2">-->
      <!--          {{ indicatorValue }}-->
      <!--        </span>-->

      <!--        <span class="text-gray-500 fs-7">{{ indicatorLabel }}</span>-->
      <!--      </div>-->

      <div class="symbol-group symbol-hover flex-nowrap">
        <template v-for="(bot, i) in bots" :key="i">
          <div
            class="symbol symbol-35px symbol-circle"
            data-bs-toggle="tooltip"
            :title="bot.username"
          >
            <img v-if="bot.profile_image" alt="Pic" :src="bot.profile_image" />
            <span
              v-else
              class="symbol-label fw-bold"
              :class="`bg-primary text-inverse-primary`"
              >{{ bot.username[0] }}</span
            >
          </div>
        </template>
        <!--        <a-->
        <!--          href="#"-->
        <!--          class="symbol symbol-35px symbol-circle"-->
        <!--          data-bs-toggle="modal"-->
        <!--          data-bs-target="#kt_modal_view_users"-->
        <!--        >-->
        <!--          <span class="symbol-label bg-dark text-gray-300 fs-8 fw-bold"-->
        <!--            >+42</span-->
        <!--          >-->
        <!--        </a>-->
      </div>
      <!--end::Indicator-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "card-2",
  components: {
    KTIcon,
    Dropdown3,
  },
  props: {
    cardClasses: String,

    icon: String,

    status: String,

    bots: Array,

    actions: Array,

    targets: Array,

    title: String,

    content: String,

    color: String,

    arrow: String,

    footerData: String,

    footerText: String,

    indicatorValue: String,

    indicatorLabel: String,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const getIcon = (action) => {
      if (action === "like") {
        return "heart-fill";
      }
      if (action === "comment") {
        return "chat-dots-fill";
      }
      if (action === "follow") {
        return "person-plus-fill";
      }
    };

    const goToActions = () => {
      router.push({ name: "actions", query: { campaign: props.title } });
    };

    const removeCampaign = () => {
      emit("removeCampaign");
    };

    const targetName = (target) => {
      if (target.includes("/")) {
        return new URL(target).pathname.split("/").filter(Boolean)[0];
      }
      return target;
    };

    const getStatusClass = (status) => {
      if (status === "requested" || status === "pending") {
        return "warning";
      }
      if (status === "success" || status === "added") {
        return "success";
      }
      if (status === "rejected") {
        return "reject";
      }
    };

    const actionColor = (action) => {
      if (action === "like") {
        return "danger";
      }
      if (action === "comment") {
        return "gray";
      }
      if (action === "follow") {
        return "gray";
      }
    };

    return {
      goToActions,
      removeCampaign,
      getStatusClass,
      targetName,
      actionColor,
      getIcon,
      getAssetPath,
    };
  },
});
</script>
