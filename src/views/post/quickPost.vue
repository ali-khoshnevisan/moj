<template>
  <el-row :gutter="20" v-loading="publishLoading">
    <!-- LEFT SIDE -->
    <el-col :span="14">
      <!-- Platform & Account -->
      <el-card class="mb-5">
        <div class="d-flex align-items-center gap-10">
          <div class="social-tabs flex-1">
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

          <div class="account flex-1">
            <p class="fs-5">select Account</p>
            <el-select class="" v-model="selectedAccount">
              <el-option value="">Select an Account...</el-option>
              <el-option
                v-for="item in users"
                :key="item.id"
                :value="item.id"
                :label="item.username ? item.username : item.channel"
              >
              </el-option>
            </el-select>
          </div>

          <div class="account flex-1">
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
          <el-button @click="requestAi" type="primary"
            >Generate with AI</el-button
          >
        </div>

        <el-input
          v-model="content"
          type="textarea"
          :rows="5"
          maxlength="2000"
          show-word-limit
          placeholder="Write something..."
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
        <h3 class="mb-10">Media</h3>

        <el-upload
          v-model:file-list="fileList"
          :limit="platform === 'instagram' ? 10 : 1"
          :auto-upload="false"
          :on-change="manualUpload"
          :on-remove="handleRemove"
          class="upload-box"
          list-type="picture-card"
          :accept="platform === 'instagram' ? 'image/*,video/*' : '*'"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-card>
    </el-col>

    <!-- RIGHT SIDE (Preview) -->
    <el-col :span="10">
      <el-card class="instagram-card" v-if="platform === 'instagram'">
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
        <!--        <div v-if="false" class="ig-media">-->
        <!--          &lt;!&ndash; IMAGE &ndash;&gt;-->
        <!--          <img v-if="mediaType === 'photo'" :src="mediaUrl" />-->

        <!--          &lt;!&ndash; VIDEO &ndash;&gt;-->
        <!--          <video v-else-if="mediaType === 'video'" :src="mediaUrl" controls />-->
        <!--        </div>-->
        <div
          v-if="fileList.length > 0"
          class="ig-media-slider"
          v-loading="mediaLoading"
        >
          <!-- MEDIA -->
          <div class="ig-media-container">
            <div class="image">
              <img
                v-if="fileList[currentMediaIndex].raw.type.startsWith('image')"
                :src="fileList[currentMediaIndex].url"
              />
              <video v-else :src="fileList[currentMediaIndex].url" controls />
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
            v-if="currentMediaIndex < fileList.length - 1"
            class="ig-nav right"
            @click="currentMediaIndex++"
          >
            ›
          </button>

          <!-- DOTS -->
          <div class="ig-dots">
            <span
              v-for="(item, index) in fileList"
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
          {{ content || "Your content preview will appear here..." }}
        </div>

        <!-- Time -->
        <div class="time">2 HOURS AGO</div>
      </el-card>

      <el-card v-else-if="platform === 'twitter'" class="twitter-card">
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

      <el-card class="telegram-card" v-else-if="platform === 'telegram'">
        <div class="tg-chat">
          <div class="tg-message">
            <!-- username -->
            <div class="tg-username">
              {{ selectedAccount ? selectedAccountUsername : "username" }}
            </div>

            <!-- MEDIA -->
            <div v-if="mediaUrl" class="tg-media">
              <img v-if="mediaType === 'photo'" :src="mediaUrl" />

              <video
                v-else-if="mediaType === 'video'"
                :src="mediaUrl"
                controls
              />
            </div>

            <!-- TEXT -->
            <div class="tg-text">
              {{ content || "Your content preview will appear here..." }}
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
import { computed, onMounted, ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";

const content = ref("");
const currentMediaIndex = ref(0);
const loading = ref(false);
const mediaLoading = ref(false);
const publishLoading = ref(false);
const schedulePost = ref(false);
const date = ref("");
const platform = ref("instagram");
const mediaUrl = ref("");
const mediaType = ref("");
const users = ref([]);
const selectedAccount = ref(null);
const fileList = ref([]);
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
  {
    value: "twitter",
    label: "Twitter",
    icon: "bi bi-twitter-x",
  },
];

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
  fileList.value = [];
  mediaUrl.value = "";
  getProfiles();
};

const getCrawlPost = (id) => {
  ApiService.get(`/crawler/post/${id}`)
    .then(async (res) => {
      content.value = res.data.text;
      if (res.data.media) {
        const response = await fetch(res.data.media);
        const blob = await response.blob();

        const file = new File(
          [blob],
          "media." + res.data.media.split("/").pop().split(".").pop(),
          {
            type: blob.type,
          }
        );
        handleUpload({
          name: file.name,
          url: res.data.media,
          raw: file,
        });
      }
    })
    .catch((err) => {});
};

const getPost = (id) => {
  publishLoading.value = true;
  ApiService.get(`social-media/actions/${id}`)
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
        });
      } else if (res.data.medias) {
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
          });
        }
      }
    })
    .catch((err) => {
      publishLoading.value = false;
    });
};

const selectedAccountUsername = computed(() => {
  const user = users.value.find((item) => item.id === selectedAccount.value);
  return user.username ? user.username : user.channel;
});

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
const manualUpload = (file) => {
  if (platform.value !== "instagram") {
    const raw = file.raw;
    mediaUrl.value = URL.createObjectURL(raw);

    if (raw.type.startsWith("image")) {
      mediaType.value = "photo";
    } else if (raw.type.startsWith("video")) {
      mediaType.value = "video";
    } else if (raw.type.startsWith("audio")) {
      mediaType.value = "audio";
    } else {
      mediaType.value = "document";
    }
  }
};

const handleUpload = async (file) => {
  if (platform.value === "instagram") {
    try {
      const fixedFile = await makeInstagramCompatible(file.raw);

      file.raw = fixedFile;

      file.url = URL.createObjectURL(fixedFile);

      fileList.value.push(file);
    } catch (err) {}
  } else {
    const raw = file.raw;
    fileList.value = file;
    mediaUrl.value = URL.createObjectURL(raw);

    if (raw.type.startsWith("image")) {
      mediaType.value = "photo";
    } else if (raw.type.startsWith("video")) {
      mediaType.value = "video";
    } else if (raw.type.startsWith("audio")) {
      mediaType.value = "audio";
    } else {
      mediaType.value = "document";
    }
  }
};

const handleRemove = (uploadFile, uploadFiles) => {
  // fileList.value = uploadFiles;
  mediaUrl.value = "";
  // fileList.value = null;
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
    ApiService.get("/social-media/profile")
      .then((response) => {
        users.value = response.data.results;
      })
      .catch((error) => {});
  }
  if (platform.value === "telegram") {
    ApiService.get("/crawler/telegram-bot")
      .then((response) => {
        users.value = response.data.results;
      })
      .catch((error) => {});
  }
};

const requestAi = () => {
  loading.value = true;
  const data = {
    ai_type: "chatgpt",
    request: content.value,
  };
  ApiService.post("/ai/", data)
    .then((response) => {
      getAiResponse(response.data.id);
    })
    .catch((error) => {
      loading.value = false;
    });
};

const getAiResponse = (id) => {
  ApiService.get(`/ai/${id}`)
    .then((response) => {
      if (
        response.data.status === "requested" ||
        response.data.status === "pending"
      ) {
        setTimeout(() => {
          getAiResponse(id);
        }, 10000);
      }
      if (response.data.status === "success") {
        loading.value = false;
        content.value = response.data.response;
      }
    })
    .catch((error) => {
      loading.value = false;
    });
};

const publishInstagram = () => {
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
    }
  });
  data.append("social_media", platform.value);
  ApiService.post("/social-media/post", data)
    .then((response) => {
      publishLoading.value = false;
      Swal.fire({
        text:
          "your post is successfully created!" +
          "you can see posts in post dashboard",
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

const publishTwitter = () => {
  publishLoading.value = true;
  const data = new FormData();
  data.append("bot", selectedAccount.value);
  data.append("working", true);
  data.append("text", content.value);
  data.append("media", fileList.value[0]?.raw);
  if (schedulePost.value) {
    const utcDate = new Date(date.value).toISOString();
    data.append("send_date", utcDate);
  }
  data.append("social_media", platform.value);
  ApiService.post("/social-media/post", data)
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
  data.append("media", fileList.value[0]?.raw);
  data.append("media_type", mediaType.value);
  ApiService.post("/crawler/telegram-send-post/", data)
    .then((response) => {
      publishLoading.value = false;
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
  if (platform.value === "instagram") {
    publishInstagram();
  } else if (platform.value === "twitter") {
    publishTwitter();
  } else if (platform.value === "telegram") {
    publishTelegram();
  }
};
</script>

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
  width: 100%;
  //aspect-ratio: 1.91/1;
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
</style>
