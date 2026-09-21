<template>
  <KTUpgradePlanModal />
  <KTCreateAppModal />
  <KTNewTargetModal />
  <KTViewUsersModal />
  <KTInviteFriendsModal />
  <GlobalUploadToast />
  <userProfile />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTUpgradePlanModal from "@/components/modals/general/UpgradePlanModal.vue";
import GlobalUploadToast from "@/components/modals/general/GlobalUploadToast.vue";
import KTCreateAppModal from "@/components/modals/wizards/CreateAppModal.vue";
import KTNewTargetModal from "@/components/modals/forms/NewTargetModal.vue";
import KTViewUsersModal from "@/components/modals/general/ViewUsersModal.vue";
import KTInviteFriendsModal from "@/components/modals/general/InviteFriendsModal.vue";
import userProfile from "@/views/userProfile.vue";

export default defineComponent({
  name: "global-modals",
  components: {
    GlobalUploadToast,
    KTUpgradePlanModal,
    KTCreateAppModal,
    KTNewTargetModal,
    KTViewUsersModal,
    userProfile,
    KTInviteFriendsModal,
  },
});
</script>
