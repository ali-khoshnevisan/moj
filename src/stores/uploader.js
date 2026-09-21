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
  }),

  actions: {
    async createPost({ bot, social_media, text, send_date }) {
      this.active = true;
      this.status = "creating";
      this.progress = 0;
      this.errorMessage = null;

      const createPayload = new FormData();
      createPayload.append("bot", bot);
      createPayload.append("social_media", social_media);
      createPayload.append("text", text);
      createPayload.append("status", "uploading");
      if (send_date) {
        createPayload.append("send_date", send_date);
      }

      try {
        const res = await ApiService.post("/social-media/post/", createPayload);
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
        await ApiService.put(`/social-media/post/${postId}/`, mediaPayload, {
          onUploadProgress: (progressEvent) => {
            console.log("[postUpload] progress event:", progressEvent);
            if (progressEvent.total) {
              this.progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
            }
          },
        });
        this.status = "success";
      } catch (err) {
        this.status = "error";
        this.errorMessage = "Media upload failed.";
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
    },
  },
});
