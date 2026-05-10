<template>
  <el-row :gutter="20">
    <!-- LEFT SIDE -->
    <el-col :span="14">
      <!-- Platform & Account -->
      <el-card class="mb-5">
        <div class="d-flex gap-10">
          <el-select placeholder="Platform" class="flex-1" v-model="platform">
            <el-option label="Instagram" value="instagram" />
            <el-option label="Telegram" value="telegram" />
          </el-select>

          <el-select class="flex-1" v-model="selectedAccount">
            <el-option value="">Select an Account...</el-option>
            <el-option
              v-for="item in users"
              :key="item.id"
              :value="item.id"
              :label="item.username"
            >
            </el-option>
          </el-select>
        </div>
      </el-card>

      <!-- Content -->
      <el-card class="mb-5">
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
          :limit="1"
          drag
          :auto-upload="false"
          :on-change="handleUpload"
          class="upload-box"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
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
            <span class="username">username</span>
          </div>
          <span class="dots">•••</span>
        </div>

        <!-- Image -->
        <div v-if="mediaUrl" class="ig-media">
          <!-- IMAGE -->
          <img v-if="mediaType === 'image'" :src="mediaUrl" />

          <!-- VIDEO -->
          <video v-else-if="mediaType === 'video'" :src="mediaUrl" controls />
        </div>

        <!-- EMPTY PLACEHOLDER -->
        <div v-else class="ig-placeholder">📷</div>

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
          <b>username</b>
          {{ content || "Your content preview will appear here..." }}
        </div>

        <!-- Time -->
        <div class="time">2 HOURS AGO</div>
      </el-card>

      <el-card class="telegram-card" v-else-if="platform === 'telegram'">
        <div class="tg-chat">
          <div class="tg-message">
            <!-- username -->
            <div class="tg-username">Username</div>

            <!-- MEDIA -->
            <div v-if="mediaUrl" class="tg-media">
              <img v-if="mediaType === 'image'" :src="mediaUrl" />

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
import { onMounted, ref } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import ApiService from "@/core/services/ApiService";
import { hideModal } from "@/core/helpers/modal";
import Swal from "sweetalert2";
import { ElMessage } from "element-plus";

const content = ref("");
const loading = ref(false);
const platform = ref("instagram");
const mediaUrl = ref("");
const mediaType = ref("");
const users = ref([]);
const selectedAccount = ref("");
const fileList = ref(null);
const link = ref(null);
const footer = ref(null);
const hashtag = ref(null);
const links = ref([]);
const footers = ref([]);
const hashtags = ref([]);

onMounted(() => {
  getProfiles();
});

const handleUpload = (file) => {
  const raw = file.raw;
  fileList.value = file;

  mediaUrl.value = URL.createObjectURL(raw);

  if (raw.type.startsWith("image")) {
    mediaType.value = "image";
  } else if (raw.type.startsWith("video")) {
    mediaType.value = "video";
  }
  return false;
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
  ApiService.get("/social-media/profile")
    .then((response) => {
      users.value = response.data.results;
    })
    .catch((error) => {});
};

const requestAi = () => {
  const data = {
    ai_type: "chatgpt",
    request: content.value,
  };
  ApiService.post("/ai/", data)
    .then((response) => {
      getAiResponse(response.data.data.id);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getAiResponse = (id) => {
  ApiService.post(`/ai/${id}`)
    .then((response) => {
      content.value = "this is ai response";
    })
    .catch((error) => {});
};

const publishPost = () => {
  loading.value = true;
  const data = new FormData();
  data.append("bot", selectedAccount.value);
  data.append("text", content.value);
  data.append("social_media", platform.value);
  data.append("action", "post");
  data.append("media", fileList.value?.raw);
  ApiService.post("/social-media/actions/", data)
    .then((response) => {
      loading.value = false;
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
</script>

<style scoped>
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
  background: #fafafa;
}

.ig-media img,
.ig-media video {
  width: 100%;
  max-height: 500px;
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
  max-height: 300px;
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
</style>
