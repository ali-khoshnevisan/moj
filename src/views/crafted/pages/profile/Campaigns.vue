<template>
  <!--begin::Campaigns toolbar-->
  <div class="d-flex flex-wrap flex-stack my-5">
    <!--begin::Title-->
    <h2 class="fw-semibold my-2">Campaigns</h2>
    <!--end::Title-->

    <!--begin::Controls-->
    <div class="d-flex align-items-center my-2">
      <router-link
        :to="{ name: 'createCampaign' }"
        class="btn btn-primary btn-sm"
        data-bs-toggle="tooltip"
      >
        Create Campaign
      </router-link>
    </div>
    <!--end::Controls-->
  </div>
  <!--end::Campaigns toolbar-->
  <div class="row g-6 g-xl-9">
    <div
      class="col-sm-6 col-xl-4"
      v-for="campaign in campaigns"
      :key="campaign.id"
    >
      <div class="card h-100">
        <Card2
          card-classes="h-100"
          :title="campaign.campaign_description"
          :icon="getIcon(campaign.social_media)"
          :actions="campaign.actions"
          :targets="campaign.urls"
          content="$500.00"
          color="success"
          :bots="campaign.bots_objects"
          :status="campaign.status"
          arrow="arrow-up-right"
          footer-data="+40.5%"
          footer-text="more impressions"
          indicator-value="0.5%"
          indicator-label="MRR"
          @removeCampaign="removeCampaign(campaign.id)"
        ></Card2>
      </div>
    </div>
  </div>

  <!--begin::Pagination-->
  <div v-if="false" class="d-flex flex-stack flex-wrap pt-10">
    <div class="fs-6 fw-semibold text-gray-700">
      Showing 1 to 10 of 50 entries
    </div>

    <!--begin::Pages-->
    <ul class="pagination">
      <li class="page-item previous">
        <a href="#" class="page-link"><i class="previous"></i></a>
      </li>

      <li class="page-item active">
        <a href="#" class="page-link">1</a>
      </li>

      <li class="page-item">
        <a href="#" class="page-link">2</a>
      </li>

      <li class="page-item">
        <a href="#" class="page-link">3</a>
      </li>

      <li class="page-item">
        <a href="#" class="page-link">4</a>
      </li>

      <li class="page-item">
        <a href="#" class="page-link">5</a>
      </li>

      <li class="page-item">
        <a href="#" class="page-link">6</a>
      </li>

      <li class="page-item next">
        <a href="#" class="page-link"><i class="next"></i></a>
      </li>
    </ul>
    <!--end::Pages-->
  </div>
  <!--end::Pagination-->
</template>

<script setup>
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onMounted, ref } from "vue";
import Card2 from "@/components/cards/Card2.vue";
import ApiService from "@/core/services/ApiService";

const campaigns = ref([]);

onMounted(() => {
  getCampaigns();
});
const removeCampaign = (id) => {
  ApiService.delete(`social-media/campaign/${id}/`)
    .then(() => {
      getCampaigns();
    })
    .catch(() => {});
};
const getCampaigns = () => {
  ApiService.get("social-media/campaign")
    .then((res) => {
      campaigns.value = res.data.results;
    })
    .catch((err) => {});
};

const getIcon = (social_media) => {
  if (social_media === "instagram") {
    return getAssetPath("media/svg/brand-logos/instagram-2-1.svg");
  }
  if (social_media === "twitter") {
    return getAssetPath("media/svg/brand-logos/twitter.svg");
  }
};
</script>
