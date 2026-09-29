<template>
  <el-row :gutter="20" v-loading="publishLoading">
    <!-- LEFT SIDE -->
    <el-col :sm="24" :md="14">
      <!-- Platform & Account -->
      <el-card class="mb-5">
        <div class="row align-items-center">
          <div class="social-tabs col-md-4 col-sm-12">
            <div
              v-for="item in platformOptions"
              :key="item.value"
              class="social-tab"
              :class="[item.value, { active: platform === item.value }]"
              @click="changePlatform(item.value)"
            >
              <i class="fs-1" :class="item.icon"></i>
            </div>
          </div>

          <div class="account col-md-4 col-sm-6">
            <p class="fs-5">select Account</p>
            <el-select class="" v-model="selectedAccount">
              <el-option v-if="users.length > 0" value=""
                >Select an Account...</el-option
              >
              <el-option v-else value="">
                <router-link
                  :to="{
                    name:
                      platform === 'instagram'
                        ? 'instagramProfile'
                        : 'telegramProfile',
                  }"
                >
                  add {{ platform }} account
                </router-link>
              </el-option>
              <el-option
                v-for="item in users"
                :key="item.id"
                :value="item.id"
                :label="item.username ? item.username : item.channel"
              >
              </el-option>
            </el-select>
          </div>

          <div class="account col-md-4 col-sm-6">
            <div class="d-flex align-items-center gap-3 mb-2">
              <div
                class="form-check form-check-md form-check-custom form-check-solid"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="schedulePost"
                />
              </div>
              <span class="fs-5">publish date:</span>
            </div>
            <el-date-picker
              :disabled="!schedulePost"
              v-model="date"
              type="datetime"
              placeholder="Select date and time"
            />
          </div>
        </div>
      </el-card>

      <!-- Content -->
      <el-card
        class="mb-5"
        v-loading="loading"
        element-loading-text="please wait for response from Ai
     it may take 1 minute"
        :element-loading-spinner="svg"
        element-loading-svg-view-box="-10, -10, 50, 50"
      >
        <div class="d-flex between mb-10">
          <h3>Write Your Content</h3>
          <el-button @click="requestAi" type="primary">{{
            aiMode ? "Generate with AI" : "Use AI for content"
          }}</el-button>
        </div>
        <span class="label">Content</span>
        <el-input
          dir="auto"
          class="mb-5"
          v-model="content"
          type="textarea"
          :rows="5"
          maxlength="2000"
          show-word-limit
          placeholder="Write something..."
        />

        <span v-if="aiMode" class="label">Ai Prompt</span>
        <el-input
          v-if="aiMode"
          dir="auto"
          class="mb-5"
          v-model="aiPrompt"
          type="textarea"
          :rows="5"
          maxlength="2000"
          show-word-limit
          placeholder="Write something..."
        />

        <div
          v-if="aiContent"
          class="d-flex justify-content-between align-items-center mt-5"
        >
          <span class="label">AI Response</span>
          <el-button type="primary" text @click="content = aiContent">
            use ai response
          </el-button>
        </div>
        <el-input
          v-if="aiContent"
          dir="auto"
          v-model="aiContent"
          type="textarea"
          :rows="5"
          readonly
        />
      </el-card>

      <!-- Configuration -->
      <el-card class="mb-5" v-if="false">
        <h3 class="mb-10">Configuration</h3>

        <div class="d-flex gap-5">
          <el-input placeholder="Add links" v-model="link">
            <template #append>
              <el-button @click="addLink" type="primary">+</el-button>
            </template>
          </el-input>

          <el-input placeholder="Add Footer" v-model="footer">
            <template #append>
              <el-button @click="addFooter" type="primary">+</el-button>
            </template>
          </el-input>

          <el-input placeholder="Add Hashtag" v-model="hashtag">
            <template #append>
              <el-button @click="addHashtag" type="primary">+</el-button>
            </template>
          </el-input>
        </div>

        <div class="row mt-5">
          <div class="col-4">
            <div
              class="links box d-flex justify-content-between"
              v-for="(link, idx) in links"
              :key="idx"
            >
              <a :href="link" target="_blank">{{ link }}</a>
              <i
                @click="removeLink(idx)"
                class="bi bi-x-circle cursor-pointer"
              ></i>
            </div>
          </div>
          <div class="col-4">
            <div
              class="footers box d-flex justify-content-between"
              v-for="(footer, idx) in footers"
              :key="idx"
            >
              <div>{{ footer }}</div>
              <i
                @click="removeFooter(idx)"
                class="bi bi-x-circle cursor-pointer"
              ></i>
            </div>
          </div>
          <div class="col-4">
            <div
              class="hashtags box d-flex justify-content-between"
              v-for="(hashtag, idx) in hashtags"
              :key="idx"
            >
              <div>{{ hashtag }}</div>
              <i
                @click="removeHashtag(idx)"
                class="bi bi-x-circle cursor-pointer"
              ></i>
            </div>
          </div>
        </div>
      </el-card>

      <!-- Media -->
      <el-card>
        <div class="d-flex justify-content-between">
          <h3 class="mb-10">Media</h3>
          <div class="media-size" v-if="platform === 'instagram'">
            <span class="fs-5">crop size</span>
            <el-select v-model="crop">
              <el-option
                v-for="(cropSize, idx) in cropSizes"
                :key="idx"
                :value="cropSize"
              >
                {{ cropSize }}
              </el-option>
            </el-select>
          </div>
        </div>

        <el-tabs v-model="postType" v-show="platform === 'instagram'">
          <!-- SLIDE POST -->

          <div>
            <el-tab-pane label="Slide post" name="slide">
              <el-upload
                v-model:file-list="fileList"
                :limit="['instagram', 'telegram'].includes(platform) ? 10 : 1"
                :auto-upload="false"
                :on-change="manualUpload"
                :on-remove="handleRemove"
                class="upload-box"
                list-type="picture-card"
                :accept="platform === 'instagram' ? 'image/*,video/*' : '*'"
              >
                <template #file="{ file }">
                  <div class="upload-item">
                    <img
                      v-if="file.raw?.type.startsWith('image/')"
                      :src="file.url"
                      class="el-upload-list__item-thumbnail"
                    />

                    <video
                      v-else-if="file.raw?.type.startsWith('video/')"
                      :src="file.url"
                      class="el-upload-list__item-thumbnail"
                    />

                    <div v-else>
                      {{ file.name }}
                    </div>

                    <span class="el-upload-list__item-actions">
                      <!-- Delete -->
                      <span
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <el-icon><Delete /></el-icon>
                      </span>
                    </span>
                  </div>
                </template>
                <el-icon><Plus /></el-icon>
              </el-upload>
            </el-tab-pane>

            <el-tab-pane label="Video post" name="video">
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <span class="label">Cover image</span>
                  <el-upload
                    v-model:file-list="coverList"
                    :limit="1"
                    :auto-upload="false"
                    :on-change="coverUpload"
                    :on-remove="removeCover"
                    class="upload-box"
                    list-type="picture-card"
                    accept="image/*"
                  >
                    <template #file="{ file }">
                      <div class="upload-item">
                        <img
                          :src="file.url"
                          class="el-upload-list__item-thumbnail"
                        />
                        <span class="el-upload-list__item-actions">
                          <span
                            class="el-upload-list__item-delete"
                            @click="removeCover(file)"
                          >
                            <el-icon><Delete /></el-icon>
                          </span>
                        </span>
                      </div>
                    </template>
                    <el-icon><Plus /></el-icon>
                  </el-upload>
                </div>

                <div class="col-md-6 col-sm-12">
                  <span class="label">Video</span>
                  <el-upload
                    v-model:file-list="videoList"
                    :limit="1"
                    :auto-upload="false"
                    :on-change="videoUpload"
                    :on-remove="removeVideo"
                    class="upload-box"
                    list-type="picture-card"
                    accept="video/*"
                  >
                    <template #file="{ file }">
                      <div class="upload-item">
                        <video
                          :src="file.url"
                          class="el-upload-list__item-thumbnail"
                        />
                        <span class="el-upload-list__item-actions">
                          <span
                            class="el-upload-list__item-delete"
                            @click="removeVideo(file)"
                          >
                            <el-icon><Delete /></el-icon>
                          </span>
                        </span>
                      </div>
                    </template>
                    <el-icon><Plus /></el-icon>
                  </el-upload>
                </div>
              </div>
            </el-tab-pane>
          </div>
        </el-tabs>
        <div v-show="platform === 'telegram'">
          <el-upload
            v-model:file-list="fileList"
            :limit="['instagram', 'telegram'].includes(platform) ? 10 : 1"
            :auto-upload="false"
            :on-change="manualUpload"
            :on-remove="handleRemove"
            class="upload-box"
            list-type="picture-card"
          >
            <template #file="{ file }">
              <div class="upload-item">
                <img
                  v-if="file.raw?.type.startsWith('image/')"
                  :src="file.url"
                  class="el-upload-list__item-thumbnail"
                />

                <video
                  v-else-if="file.raw?.type.startsWith('video/')"
                  :src="file.url"
                  class="el-upload-list__item-thumbnail"
                />

                <div v-else>
                  {{ file.name }}
                </div>

                <span class="el-upload-list__item-actions">
                  <!-- Delete -->
                  <span
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </span>
              </div>
            </template>
            <el-icon><Plus /></el-icon>
          </el-upload>
        </div>
      </el-card>
    </el-col>

    <!-- RIGHT SIDE (Preview) -->
    <el-col :sm="24" :md="10">
      <el-card class="instagram-card" v-show="platform === 'instagram'">
        <!-- Header -->
        <div class="ig-header">
          <div class="ig-user">
            <div class="avatar"></div>
            <span class="username">{{
              selectedAccount ? selectedAccountUsername : "username"
            }}</span>
          </div>
          <span class="dots">•••</span>
        </div>

        <!-- Image -->
        <div
          v-if="mediaItems.length > 0"
          class="ig-media-slider"
          v-loading="mediaLoading"
        >
          <!-- MEDIA -->
          <div class="ig-media-container">
            <div class="image">
              <img
                v-if="
                  mediaItems[currentMediaIndex].raw.type.startsWith('image')
                "
                :src="mediaItems[currentMediaIndex].url"
              />
              <video v-else :src="mediaItems[currentMediaIndex].url" controls />
            </div>
          </div>

          <!-- LEFT -->
          <button
            v-if="currentMediaIndex > 0"
            class="ig-nav left"
            @click="currentMediaIndex--"
          >
            ‹
          </button>

          <!-- RIGHT -->
          <button
            v-if="currentMediaIndex < mediaItems.length - 1"
            class="ig-nav right"
            @click="currentMediaIndex++"
          >
            ›
          </button>

          <!-- DOTS -->
          <div class="ig-dots">
            <span
              v-for="(item, index) in mediaItems"
              :key="index"
              class="dot"
              :class="{ active: index === currentMediaIndex }"
            />
          </div>
        </div>

        <!-- EMPTY PLACEHOLDER -->
        <div v-loading="mediaLoading" v-else class="ig-placeholder">📷</div>

        <!-- Actions -->
        <div class="ig-actions">
          <div class="left">
            <i class="bi bi-heart ms-3 fs-4"></i>
            <span class="text-muted fs-5 ms-2">90</span>
            <i class="bi bi-chat ms-3 fs-4"></i>
            <span class="text-muted fs-5 ms-2">90</span>
            <i class="bi bi-send ms-3 fs-4"></i>
            <span class="text-muted fs-5 ms-2">90</span>
          </div>
          <i class="bi bi-bookmark fs-4"></i>
        </div>

        <!-- Likes -->
        <div class="likes">Liked by <b>user1</b> and <b>others</b></div>

        <!-- Caption -->
        <div class="caption">
          <b>{{ selectedAccount ? selectedAccountUsername : "username" }}</b>
          <div dir="auto">
            {{ content || "Your content preview will appear here..." }}
          </div>
        </div>

        <!-- Time -->
        <div class="time">2 HOURS AGO</div>
      </el-card>

      <el-card v-show="platform === 'twitter'" class="twitter-card">
        <!-- HEADER -->
        <div class="tw-header">
          <div class="tw-user">
            <div class="tw-avatar"></div>

            <div class="tw-user-info">
              <div class="tw-name-row">
                <span class="tw-name">Username</span>
                <span class="tw-badge">✔</span>
              </div>

              <div class="tw-username">@username</div>
            </div>
          </div>

          <div class="tw-menu">•••</div>
        </div>

        <!-- CONTENT -->
        <div class="tw-content">
          {{ content || "What is happening?!" }}
        </div>

        <!-- MEDIA -->
        <div v-if="mediaUrl" class="tw-media">
          <!-- IMAGE -->
          <img v-if="mediaType === 'photo'" :src="mediaUrl" />

          <!-- VIDEO -->
          <video v-else-if="mediaType === 'video'" :src="mediaUrl" controls />
        </div>

        <!-- ACTIONS -->
        <div class="tw-actions">
          <div>💬 12</div>
          <div>🔁 4</div>
          <div>❤️ 38</div>
          <div>📊</div>
          <div>🔖</div>
        </div>
      </el-card>

      <el-card class="telegram-card" v-show="platform === 'telegram'">
        <div class="tg-chat">
          <div class="tg-message">
            <!-- username -->
            <div class="tg-username">
              {{ selectedAccount ? selectedAccountUsername : "username" }}
            </div>

            <!-- MEDIA -->
            <div v-if="fileList.length > 0" class="tg-media">
              <div
                v-for="(file, index) in fileList"
                :key="index"
                style="margin-bottom: 5px"
              >
                <img
                  v-if="file.raw?.type.startsWith('image')"
                  :src="file.url"
                />
                <video
                  v-else-if="file.raw?.type.startsWith('video')"
                  :src="file.url"
                  controls
                />
              </div>
            </div>

            <!-- TEXT -->
            <div class="tg-text">
              <span v-if="accountValue('text_header')">
                {{ accountValue("text_header") }}
              </span>
              <br />
              {{ content || "Your content preview will appear here..." }}
              <br />
              <span v-if="accountValue('text_footer')">
                {{ accountValue("text_footer") }}
              </span>
            </div>

            <!-- TIME -->
            <div class="tg-time">12:00</div>
          </div>
        </div>
      </el-card>

      <div class="actions">
        <el-button type="primary" class="w-full" @click="publishPost"
          >Publish</el-button
        >
        <!--        <el-button class="w-full mt-10">Schedule Time</el-button>-->
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { Plus, Delete } from "@element-plus/icons-vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2";
import { ElMessage } from "element-plus";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { usePostUploadStore } from "@/stores/uploader";

const postUploadStore = usePostUploadStore();
const content = ref("");
const aiPrompt = ref("");
const aiContent = ref("");
const currentMediaIndex = ref(0);
const loading = ref(false);
const mediaLoading = ref(false);
const publishLoading = ref(false);
const aiMode = ref(false);
const schedulePost = ref(false);
const date = ref("");
const platform = ref("instagram");
const mediaUrl = ref("");
const mediaType = ref("");
const users = ref([]);
const selectedAccount = ref(null);
const fileList = ref([]);
const crop = ref("original");
const cropSizes = ref(["original", "1:1", "4:5", "16:9"]);
const previewRatio = ref("3 / 4");
const postType = ref("slide");
const coverList = ref([]);
const videoList = ref([]);
const originalMediaCount = ref(0);
const link = ref(null);
const footer = ref(null);
const hashtag = ref(null);
const links = ref([]);
const footers = ref([]);
const hashtags = ref([]);
const route = useRoute();
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`;
const platformOptions = [
  {
    value: "telegram",
    label: "Telegram",
    icon: "bi bi-telegram",
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: "bi bi-instagram",
  },
  // {
  //   value: "twitter",
  //   label: "Twitter",
  //   icon: "bi bi-twitter-x",
  // },
];
watch(
  () => crop.value,
  (val) => {
    if (val === "original") {
      previewRatio.value = "3 / 4";
    } else if (val === "1:1") {
      previewRatio.value = "1";
    } else if (val === "4:5") {
      previewRatio.value = "4 / 5";
    } else if (val === "16:9") {
      previewRatio.value = "16 / 9";
    }
  }
);
onBeforeRouteLeave(async (to, from) => {
  if (content.value || aiContent.value || aiPrompt.value) {
    const result = await Swal.fire({
      title: "Leave this page?",
      text: "Are you sure you want to leave this page? Any unsaved changes will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, leave",
      cancelButtonText: "Stay",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-primary",
      },
    });

    if (!result.isConfirmed) {
      return false;
    }
  }
});

onMounted(() => {
  if (route.query.crawlId) {
    getCrawlPost(route.query.crawlId);
  }
  if (route.query.post) {
    getPost(route.query.post);
  }
  getProfiles();
});

const changePlatform = (item) => {
  selectedAccount.value = null;
  platform.value = item;
  getProfiles();
};

const accountValue = (item) => {
  const user = users.value.find((item) => item.id === selectedAccount.value);
  return user ? user[item] : null;
};

const getCrawlPost = (id) => {
  ApiService.get(`/api/crawler/post/${id}`)
    .then(async (res) => {
      content.value = res.data.text;
      if (res.data.media_file) {
        const response = await fetch(res.data.media_file);
        const blob = await response.blob();

        const file = new File([blob], "media." + res.data.media_file, {
          type: blob.type,
        });
        handleUpload({
          name: file.name,
          url: res.data.media_file,
          raw: file,
        });
      }
    })
    .catch((err) => {});
};

const getPost = (id) => {
  publishLoading.value = true;
  ApiService.get(`/api/social-media/actions/${id}`)
    .then(async (res) => {
      publishLoading.value = false;
      content.value = res.data.text;
      platform.value = res.data.social_media;
      schedulePost.value = !!res.data.send_date;
      date.value = schedulePost.value ? res.data.send_date : "";
      selectedAccount.value = res.data.bot;
      if (res.data.media) {
        mediaLoading.value = true;
        const response = await fetch(res.data.media);
        const blob = await response.blob();

        const file = new File(
          [blob],
          "media." + res.data.media.split("/").pop().split(".").pop(),
          {
            type: blob.type,
          }
        );
        mediaLoading.value = false;
        handleUpload({
          name: file.name,
          url: res.data.media,
          raw: file,
          isExisting: true,
        });
      } else if (res.data.medias.length > 0) {
        mediaLoading.value = true;
        for (const media of res.data.medias) {
          const index = res.data.medias.indexOf(media);
          const response = await fetch(media.media);
          const blob = await response.blob();

          const file = new File(
            [blob],
            "media." + media.media.split("/").pop().split(".").pop(),
            {
              type: blob.type,
            }
          );
          mediaLoading.value = index !== res.data.medias.length - 1;
          handleUpload({
            name: file.name,
            url: media.media,
            raw: file,
            isExisting: true,
          });
        }
      }
      originalMediaCount.value = mediaItems.value.length;
    })
    .catch((err) => {
      publishLoading.value = false;
    });
};

// media actually used by preview + publish, depending on the active tab
const mediaItems = computed(() =>
  postType.value === "video"
    ? [...coverList.value, ...videoList.value]
    : fileList.value
);

watch([postType, mediaItems], () => {
  currentMediaIndex.value = 0;
});

const selectedAccountUsername = computed(() => {
  const user = users.value.find((item) => item.id === selectedAccount.value);
  return user.username ? user.username : user.channel;
});

const isMediaChanged = () => {
  const current = mediaItems.value;

  const hasNewItem = current.some((item) => !item.isExisting);
  if (hasNewItem) return true;

  if (current.length !== originalMediaCount.value) return true;

  return false;
};

const makeInstagramCompatible = (file, maxRatio = 1.91, minRatio = 0.8) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      const ratio = width / height;

      // already valid
      if (ratio >= minRatio && ratio <= maxRatio) {
        resolve(file);
        return;
      }

      let cropWidth = width;
      let cropHeight = height;

      // too wide
      if (ratio > maxRatio) {
        cropWidth = height * maxRatio;
      }

      // too tall
      if (ratio < minRatio) {
        cropHeight = width / minRatio;
      }

      const canvas = document.createElement("canvas");

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      const ctx = canvas.getContext("2d");

      // center crop
      const sx = (width - cropWidth) / 2;
      const sy = (height - cropHeight) / 2;

      ctx.drawImage(
        img,
        sx,
        sy,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject("Crop failed");
            return;
          }

          const newFile = new File([blob], file.name, {
            type: file.type,
          });

          resolve(newFile);
        },
        file.type,
        0.95
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

const manualUpload = async (file) => {
  fileList.value[fileList.value.length - 1] = file;
};

const handleUpload = async (file) => {
  fileList.value.push(file);
};

const coverUpload = async (file) => {
  coverList.value[coverList.value.length - 1] = file;
};

const videoUpload = (file) => {
  file.url = URL.createObjectURL(file.raw);
};

const removeCover = (file) => {
  coverList.value = coverList.value.filter((item) => item.uid !== file.uid);
  if (file.url?.startsWith("blob:")) {
    URL.revokeObjectURL(file.url);
  }
};

const removeVideo = (file) => {
  videoList.value = videoList.value.filter((item) => item.uid !== file.uid);
  if (file.url?.startsWith("blob:")) {
    URL.revokeObjectURL(file.url);
  }
};

const handleRemove = (file) => {
  fileList.value = fileList.value.filter((item) => item.uid !== file.uid);
};

const addLink = () => {
  links.value.push(link.value);
  link.value = "";
};
const addFooter = () => {
  footers.value.push(footer.value);
  footer.value = "";
};
const addHashtag = () => {
  hashtags.value.push(hashtag.value);
  hashtag.value = "";
};
const removeLink = (index) => {
  links.value.splice(index, 1);
};
const removeFooter = (index) => {
  footers.value.splice(index, 1);
};
const removeHashtag = (index) => {
  hashtags.value.splice(index, 1);
};
const getProfiles = () => {
  if (platform.value === "instagram" || platform.value === "twitter") {
    ApiService.query("/api/social-media/profile/", {
      params: { social_media: platform.value, status: "added" },
    })
      .then((response) => {
        users.value = response.data.results;
      })
      .catch((error) => {});
  }
  if (platform.value === "telegram") {
    ApiService.get("/api/crawler/telegram-bot")
      .then((response) => {
        users.value = response.data.results;
      })
      .catch((error) => {});
  }
};

const requestAi = () => {
  if (aiMode.value) {
    loading.value = true;
    const data = {
      ai_type: "chatgpt",
      request: aiPrompt.value,
    };
    ApiService.post("/api/ai/", data)
      .then((response) => {
        getAiResponse(response.data.id);
      })
      .catch((error) => {
        loading.value = false;
      });
  } else {
    aiMode.value = true;
  }
};

const getAiResponse = (id) => {
  ApiService.get(`/api/ai/${id}`)
    .then((response) => {
      if (
        response.data.status === "requested" ||
        response.data.status === "pending"
      ) {
        setTimeout(() => {
          getAiResponse(id);
        }, 2000);
      }
      if (response.data.status === "success") {
        loading.value = false;
        // content.value = response.data.response;
        aiContent.value = response.data.response;
      }
    })
    .catch((error) => {
      loading.value = false;
    });
};

async function publishInstagram() {
  if (postType.value === "video") {
    if (coverList.value.length === 0 || videoList.value.length === 0) {
      Swal.fire({
        text: "a cover image and a video are required for a video post",
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn fw-semibold btn-light-primary",
        },
      });
      return;
    }
  }
  if (mediaItems.value.length === 0) {
    Swal.fire({
      text: "you have to add media for publish on instagram",
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Ok, got it!",
      heightAuto: false,
      customClass: {
        confirmButton: "btn fw-semibold btn-light-primary",
      },
    });
    return;
  }
  publishLoading.value = true;
  const preparedMedia = mediaItems.value.map((media) => ({
    raw: media.raw,
    mediaType: resolveMediaType(media.raw),
  }));
  try {
    if (route.query.post) {
      await postUploadStore.editPost({
        bot: selectedAccount.value,
        social_media: platform.value,
        text: content.value,
        crop: crop.value,
        postId: route.query.post,
        send_date: schedulePost.value
          ? new Date(date.value).toISOString()
          : null,
      });
    } else {
      await postUploadStore.createPost({
        bot: selectedAccount.value,
        social_media: platform.value,
        text: content.value,
        crop: crop.value,
        send_date: schedulePost.value
          ? new Date(date.value).toISOString()
          : null,
      });
    }
  } catch (error) {
    publishLoading.value = false;
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
    return;
  }
  publishLoading.value = false;

  if (route.query.post) {
    const mediaChenged = isMediaChanged();
    if (mediaChenged) {
      postUploadStore.uploadPostMedia(route.query.post, preparedMedia);
    }
  } else {
    postUploadStore.uploadPostMedia(postUploadStore.postId, preparedMedia);
  }

  clearData();

  Swal.fire({
    text: "Your post is being created -- track upload progress from anywhere in the app.",
    icon: "success",
    buttonsStyling: false,
    confirmButtonText: "Ok, got it!",
    heightAuto: false,
    customClass: { confirmButton: "btn fw-semibold btn-light-primary" },
  });
}

function resolveMediaType(rawFile) {
  if (postType.value === "video") {
    if (rawFile.type.startsWith("image")) return "cover";
    if (rawFile.type.startsWith("video")) return "video";
  } else {
    if (rawFile.type.startsWith("image")) return "photo";
    if (rawFile.type.startsWith("video")) return "video";
  }
  return null;
}

const clearData = () => {
  content.value = "";
  aiPrompt.value = "";
  aiContent.value = "";
  fileList.value = [];
  schedulePost.value = false;
  date.value = "";
};

const publishTwitter = () => {
  publishLoading.value = true;
  const data = new FormData();
  data.append("bot", selectedAccount.value);
  data.append("working", true);
  data.append("text", content.value);
  data.append("media", mediaItems.value[0]?.raw);
  if (schedulePost.value) {
    const utcDate = new Date(date.value).toISOString();
    data.append("send_date", utcDate);
  }
  data.append("social_media", platform.value);
  ApiService.post("/api/social-media/post/", data)
    .then((response) => {
      publishLoading.value = false;
      Swal.fire({
        text: "your post is successfully created! /n you can see posts in post dashboard",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        heightAuto: false,
        customClass: {
          confirmButton: "btn fw-semibold btn-light-primary",
        },
      }).then(() => {});
    })
    .catch((error) => {
      publishLoading.value = false;
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

const publishTelegram = () => {
  publishLoading.value = true;
  const data = new FormData();
  data.append("bot", selectedAccount.value);
  data.append("working", true);
  data.append("text", content.value);
  if (schedulePost.value) {
    const utcDate = new Date(date.value).toISOString();
    data.append("send_date", utcDate);
  }
  fileList.value.forEach((media) => {
    data.append("medias", media.raw);
    if (media.raw.type.startsWith("image")) {
      data.append("media_types", "photo");
    } else if (media.raw.type.startsWith("video")) {
      data.append("media_types", "video");
    } else if (media.raw.type.startsWith("audio")) {
      data.append("media_types", "audio");
    } else {
      data.append("media_types", "document");
    }
  });
  ApiService.post("/api/crawler/telegram-send-post/", data)
    .then((response) => {
      publishLoading.value = false;
      Swal.fire({
        text:
          "your post is successfully created!" +
          "you can see posts in post dashboard",
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
          confirmButton: "btn fw-semibold btn-light-primary",
        },
      });
    })
    .catch((error) => {
      publishLoading.value = false;
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

const publishPost = () => {
  if (!selectedAccount.value) {
    Swal.fire({
      text: "select an account to publish",
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "Ok, got it!",
      heightAuto: false,
      customClass: {
        confirmButton: "btn fw-semibold btn-light-primary",
      },
    });
    return;
  }
  if (platform.value === "instagram") {
    publishInstagram();
  } else if (platform.value === "twitter") {
    publishTwitter();
  } else if (platform.value === "telegram") {
    publishTelegram();
  }
};
</script>

<style lang="scss" scoped>
:deep(.el-textarea) {
  .el-input__count {
    bottom: -17px;
  }
}

.upload-box {
  :deep(.el-upload-list--picture-card) {
    flex-wrap: nowrap;
    .el-upload-list__item {
      justify-content: center;
    }
  }
}
</style>
<style scoped>
.social-tabs {
  display: flex;
  gap: 12px;
}

.social-tab {
  width: 50px;
  height: 50px;
  border: 1px solid #dcdfe6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
  font-size: 22px;
}

.social-tab:hover {
  border-color: #409eff;
}

.social-tab {
  &.active {
    border-color: #409eff;
    color: #a50228;
    i {
      color: #ffffff;
    }
    &.telegram {
      background: linear-gradient(135deg, rgb(55, 174, 226), rgb(30, 150, 212));
    }
    &.twitter {
      background: #000;
    }

    &.instagram {
      background: linear-gradient(
        135deg,
        #feda75,
        #fa7e1e,
        #d62976,
        #962fbf,
        #4f5bd5
      );
    }
  }
}

:deep(.el-loading-text) {
  white-space: pre-line;
}
.el-card {
  border: 1px solid rgba(178, 184, 195, 0.47);
  border-radius: 12px;
}

.flex-1 {
  flex: 1;
}

.gap-10 {
  gap: 10px;
}

.between {
  justify-content: space-between;
  align-items: center;
}
.instagram-card {
  padding: 0;
  overflow: hidden;
}

/* HEADER */
.ig-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
}

.ig-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #ddd;
}

.username {
  font-weight: 600;
  font-size: 14px;
}

/* MEDIA */
.ig-media {
  width: 100%;
  height: 100%;
  background: #fafafa;
}

.ig-media img,
.ig-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* EMPTY */
.ig-placeholder {
  height: 350px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}

/* ACTIONS */
.ig-actions {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  font-size: 20px;
}

/* LIKES */
.ig-likes {
  padding: 0 12px;
  font-size: 14px;
  margin-bottom: 8px;
}

/* CAPTION */
.ig-caption {
  padding: 0 12px;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 10px;
}

/* TIME */
.ig-time {
  padding: 0 12px 12px;
  font-size: 11px;
  color: #999;
}
.time {
  text-align: right;
  font-size: 12px;
  color: #999;
}

.username {
  font-weight: bold;
  margin-bottom: 10px;
}

.actions {
  margin-top: 20px;
}

.w-full {
  width: 100%;
}

.upload-box {
  padding: 12px;
  width: 100%;
}
.instagram-card {
  padding: 0;
  overflow: hidden;
}

.ig-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.ig-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ddd;
}

.dots {
  font-size: 18px;
  cursor: pointer;
}

.ig-actions {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 18px;
}

.likes {
  padding: 0 10px;
  font-size: 13px;
  margin-bottom: 5px;
}

.caption {
  padding: 0 10px;
  font-size: 14px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-word;
}

.box {
  padding: 10px;
  border-radius: 8px;
  background: rgb(245, 245, 245);
  margin-bottom: 10px;
}

.time {
  padding: 10px;
  font-size: 11px;
  color: #999;
}
.telegram-card {
  padding: 10px;
  background: #e5ddd5;
}

.tg-message {
  background: white;
  padding: 10px;
  border-radius: 12px;
  max-width: 80%;
}

.tg-media {
  margin-bottom: 8px;
  border-radius: 10px;
  overflow: hidden;
}

.tg-media img,
.tg-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.tg-text {
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-line;
  overflow-wrap: break-word;
  word-break: break-word;
}

.tg-username {
  font-weight: bold;
  margin-bottom: 5px;
}

.tg-time {
  text-align: right;
  font-size: 11px;
  color: #999;
  margin-top: 5px;
}
.twitter-card {
  border-radius: 18px;
  overflow: hidden;
}

/* HEADER */
.tw-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.tw-user {
  display: flex;
  gap: 10px;
}

.tw-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #d9d9d9;
}

.tw-user-info {
  display: flex;
  flex-direction: column;
}

.tw-name-row {
  display: flex;
  align-items: center;
  gap: 5px;
}

.tw-name {
  font-weight: 700;
  font-size: 15px;
}

.tw-badge {
  color: #1d9bf0;
  font-size: 14px;
}

.tw-username {
  color: #536471;
  font-size: 14px;
}

/* CONTENT */
.tw-content {
  font-size: 15px;
  line-height: 1.6;
  margin-bottom: 12px;
  white-space: pre-line;
  word-break: break-word;
  overflow-wrap: break-word;
}

/* MEDIA */
.tw-media {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #eff3f4;
  margin-bottom: 12px;
}

.tw-media img,
.tw-media video {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  display: block;
}

/* ACTIONS */
.tw-actions {
  display: flex;
  justify-content: space-between;
  color: #536471;
  font-size: 14px;
  padding-top: 8px;
}

.tw-actions div {
  cursor: pointer;
  transition: 0.2s;
}

.tw-actions div:hover {
  opacity: 0.7;
}
.ig-media-slider {
  position: relative;
}
.ig-media-container img,
.ig-media-container video {
  max-height: 500px;
  justify-self: center;
  //width: 100%;
  aspect-ratio: v-bind(previewRatio);
  object-fit: cover;
  display: block;
}

.ig-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  z-index: 5;
}

.ig-nav.left {
  left: 10px;
}

.ig-nav.right {
  right: 10px;
}

.ig-dots {
  position: absolute;
  bottom: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
}

.dot.active {
  background: white;
}
:deep(.el-textarea__inner) {
  scrollbar-width: auto;
  scrollbar-color: #909399 transparent;
}
</style>
