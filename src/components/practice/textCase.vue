<template>
  <div class="type-text">
    <div class="answer-cnt" :style="{'paddingBottom':(open ? autoHeight:'.8rem')}" >
      <div  class="default-font" v-html="dataObj.content"></div>
      <!-- <video class="video" v-if="dataObj.video" :src="videoUrl(dataObj.video)" controls="controls"
          x5-playsinline="" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true" 
          x5-video-player-type="h5-page" x5-video-player-fullscreen="" x5-video-orientation="portraint"></video> -->
      <div class="video" v-if="dataObj.video">
        <div id="mse"></div>
      </div>
    </div>
    <div class="answer-text" :style="{'height':(open ? autoHeight:'.8rem')}">
      <div class="icon-wrap" >
        <div class="icon-wrap_inner" @click="changeOpen">
          <img v-if="open" src="@/assets/img/practice/p-down.png" alt="">
          <img v-if="!open" src="@/assets/img/practice/p-up.png" alt="">
        </div>
      </div>
      <div class="slot-con"  id="case" :style="{'height':(open ? slotHeight:'.55rem')}">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideo, videoUrl } from '@/utils/global'
import Player from 'xgplayer'
import HlsJsPlayer from 'xgplayer-hls.js';
import { getFilePathAPI } from '@/api/week'
export default {
  name: 'textCase',
  props:{
    dataObj:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      videoUrl:videoUrl,
      getVideo:getVideo,
      open:false,
      autoHeight:null,
      slotHeight:null,
      playerConfig:{
        id: "mse",                      // 挂载节点id
        playsinline: true,              // 是否在线播放
        url:'',                              
        autoplay: false,                // 自动播放
        fluid: true,                    // 流式布局
        useHls:true,
        "x5-video-player-type": "h5"
      },
      player:null
    }
  },
  created() {
    this.autoHeight = this.autoHeigh(3) 
    this.slotHeight = this.autoHeigh(3.25) 
  },
  mounted() {
    if(!this.dataObj.video) return 
    getFilePathAPI(this.dataObj.video).then(res=>{
      if(res.data.code == 0){
        let data = res.data.data
        data = data.replace('.mp4','')
        this.playerConfig.url = this.getVideo(data)
        this.player = new HlsJsPlayer(this.playerConfig)
      }else{
        warningMessage(res.data.msg)
      }
    })

  },
  watch: {},
  methods: {
    changeOpen(){
      this.open = !this.open
      this.scrollTop()
    },
    scrollTop(){
      document.getElementById('case').scrollTop=0
    },
    autoHeigh(h = 0) {
      let height = (window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight)/100
      return (height - h)+'rem'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.type-text{
  position: relative;
  border-radius: .1rem .1rem 0 0 ;
  background: #fff;
  padding: .185rem 0 .3rem;
  // margin-bottom: .3rem;
}

.answer-cnt{
  padding: 0 .15rem .2rem;
  .default-font{
    font-size: .16rem;
    line-height: .24rem;
    margin-bottom: .15rem;
  }
  .video{
    max-height:2rem; 
    width: 100%;
  }
}
.answer-text{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1rem;
  z-index: 999999;
  background: #fff;
  .icon-wrap{

    height: .25rem;
    background: linear-gradient(rgba(255, 255, 255,1) ,rgba(200, 200, 200,0.5));
    .icon-wrap_inner{
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: .8rem;
      height: .25rem;
      border-radius: .05rem .05rem 0 0;
      background: #FE8B58;
      display: flex;
      align-items: center;
      img{
        margin: 0 auto;
        display: inline-block;
        width: .15rem;
        height: .09rem;
      }
    }
    
  }
  .slot-con{
    overflow:scroll;
  }
}
</style>
