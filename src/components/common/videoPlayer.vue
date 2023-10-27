<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>
  
  <script>
import { VideoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import videojs from "video.js";

export default {
  name: "VideoPlayer",
  components: {
    VideoPlayer,
  },
  data() {
    return {
      playerOptions: {
        controls: true,
        preload: "auto",
      },
      webmSource: "https://vjs.zencdn.net/v/oceans.mp4",
    };
  },
      props: {},

      computed: {
            url() {
                const path = this.$store.state.courseDraft.uploadedVideoPath;
                console.log(`http://localhost:3000/courses/getCurrentVideo/${path}`);
                return `http://localhost:3000/courses/getCurrentVideo/${path}`;
    }
  },
      
  data() {
    return {
      player: null,
        options: {
        height: 250,
        width: 500,
        autoplay: false,
        controls: true,
        sources: [
          {
            src: "http://localhost:3000/courses/getCurrentVideo/20231027124110842sampleVideo5.mp4",
            type: "video/mp4",
          },
              ],
              playbackRates:[2,1.5,1,0.5]
      },
    };
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log("onPlayerReady", this);
    });
  },
};
</script>
  