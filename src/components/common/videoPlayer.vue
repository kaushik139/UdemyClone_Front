<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
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
  // data() {
  //   return {
  //     playerOptions: {
  //       controls: true,
  //       preload: "auto",
  //     },
  //     // webmSource: "https://vjs.zencdn.net/v/oceans.mp4",
  //   };
  // },
  computed: {
    pathProp() {
      return this.path;
    },
    // ...mapGetters(["instructor/courseDraftGetter"]),
    //   path() {
    //     this.player = videojs(this.$refs.videoPlayer, this.options, () => {
    //   this.player.log("onPlayerReady", this);
    // });
    //     this.sources.src = `http://localhost:3000/courses/getCurrentVideo/${this["instructor/courseDraftGetter"].videoPath}`
    //       return 0;
    // }
  },

  data() {
    return {
      player: null,
      options: {
        height: 250,
        width: 500,
        autoplay: false,
        controls: true,
        // fluid: true,
        responsive: true,
        sources: {
          src: ``,
          // http://localhost:3000/courses/getCurrentVideo/20231027124110842sampleVideo5.mp4
          // http://localhost:3000/courses/getCurrentVideo/${this.path}
          // http://localhost:3000/courses/getCurrentVideo/20231027124110842sampleVideo5.mp4
          type: "video/mp4",
        },
        playbackRates: [2, 1.5, 1, 0.5],
      },
    };
  },

  watch: {
    // Watch a property named 'path'
    pathProp: function (Value) {
      console.log(this.player);
      this.options.sources.src = `http://localhost:3000/courses/getCurrentVideo/${Value}`;
      // console.log('Value:', Value);
      // console.log(this.options.sources.src);


      if (this.player === null) {
        this.player = videojs(this.$refs.videoPlayer, this.options, () => {
          // console.log(this.options);
          this.player.on("ready", () => {
            this.player.log("onPlayerReady", this);
          });
        });
      } else {
        this.player.options_.src = `http://localhost:3000/courses/getCurrentVideo/${Value}`;
        // console.log(this.player);
        this.player.on("ready", () => {
          this.player.log("onPlayerReady", this);
          this.player.load();
        });
        // this.player.options.sources.src=`http://localhost:3000/courses/getCurrentVideo/${Value}`
      }
      // this.player.load();
    },
  },

  mounted() {
    // this.player = videojs(this.$refs.videoPlayer, this.options, () => {
    //   this.player.log("onPlayerReady", this);
    // });
  },
};
</script>
  