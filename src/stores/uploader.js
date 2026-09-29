import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";

export const usePostUploadStore = defineStore("postUpload", {
  state: () => ({
    active: false, // whether there's a create+upload flow currently running
    postId: null,
    status: "idle", // idle | creating | uploading | success | error
    progress: 0, // 0-100, meaningful only during "uploading"
    errorMessage: null,
    fileCount: 0,
    retryTime: 0,
  }),

  actions: {
    async editPost({ bot, social_media, text, crop, send_date, postId }) {
      this.postId = postId;
      this.active = true;
      this.status = "editing";
      this.progress = 0;
      this.retryTime = 0;
      this.errorMessage = null;
      const payload = {
        bot,
        social_media,
        text,
        send_date,
        crop,
      };

      try {
        const res = await ApiService.patch(
          `/api/social-media/post/${postId}/`,
          payload
        );
        return res.data;
      } catch (err) {
        this.status = "error";
        this.errorMessage = "Could not create the post.";
        this.active = false;
        throw err;
      }
    },

    async createPost({ bot, social_media, text, crop, send_date }) {
      this.active = true;
      this.status = "creating";
      this.progress = 0;
      this.retryTime = 0;
      this.errorMessage = null;

      const payload = {
        bot,
        social_media,
        text,
        send_date,
        crop,
        status: "uploading",
      };

      try {
        const res = await ApiService.post("/api/social-media/post/", payload);
        this.postId = res.data.id;
        return res.data;
      } catch (err) {
        this.status = "error";
        this.errorMessage = "Could not create the post.";
        this.active = false;
        throw err;
      }
    },

    async uploadPostMedia(postId, mediaItems) {
      if (!mediaItems.length) {
        this.status = "success";
        this.active = false;
        return;
      }

      this.status = "uploading";
      this.fileCount = mediaItems.length;

      const mediaPayload = new FormData();
      mediaItems.forEach((media) => {
        mediaPayload.append("medias", media.raw);
        if (media.mediaType) {
          mediaPayload.append("media_types", media.mediaType);
        }
      });

      try {
        await ApiService.put(
          `/api/social-media/post/${postId}/`,
          mediaPayload,
          {
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                this.progress = Math.round(
                  (progressEvent.loaded / progressEvent.total) * 100
                );
              }
            },
          }
        );
        this.status = "success";
      } catch (err) {
        this.status = "error";
        this.errorMessage = "Media upload failed(retrying ..)";
        this.retryTime += 1;
        if (this.retryTime < 2) {
          this.uploadPostMedia(postId, mediaPayload);
        }
      } finally {
        this.active = false;
      }
    },

    dismiss() {
      this.active = false;
    },

    reset() {
      this.active = false;
      this.postId = null;
      this.status = "idle";
      this.progress = 0;
      this.errorMessage = null;
      this.fileCount = 0;
      this.retryTime = 0;
    },
  },
});
