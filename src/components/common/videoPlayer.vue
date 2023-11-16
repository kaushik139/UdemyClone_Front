<template>
  <div>
    <video ref="videoPlayer" class="video-js vjs-big-play-centered"></video>
  </div>
</template>
  
  <script>
import { VideoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import videojs from "video.js";
import { mapGetters } from "vuex";

export default {
  name: "VideoPlayer",
  props: {
    path: String,
  },
  components: {
    VideoPlayer,
  },
  computed: {
    pathProp() {
      return this.path;
    },
  },

  data() {
    return {
      player: null,
      options: {
        height: 450,
        width: 800,
        autoplay: false,
        controls: true,
        fluid: true,
        responsive: true,
        sources: {
          src: ``,
          type: "video/mp4",
        },
        playbackRates: [2, 1.5, 1, 0.5],
      },
    };
  },

  watch: {
    pathProp: function (Value) {
      this.options.sources.src = `http://localhost:3000/courses/getCurrentVideo/${Value}`;
      this.$refs.videoPlayer.src = `http://localhost:3000/courses/getCurrentVideo/${Value}`;
    },
  },

  mounted() {
      if (this.pathProp) {
        this.options.sources.src = `http://localhost:3000/courses/getCurrentVideo/${this.pathProp}`;

        this.player = videojs(this.$refs.videoPlayer, this.options, () => {
          this.player.log("onPlayerReady", this);
        });
      }
      // console.log(this.path);
  },
};
</script>
  