<template>
  <!--视频播放-->
  <div class="play">
    <comHeader @collectionV="collectionV" :isColl="isColl"></comHeader>
    <div class="video">
      <!--<video :src="imgLink($route.query.videoAndPdf)" controls></video>--><!--http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4-->
      <div id="mse"></div>
    </div>
  </div>
</template>

<script>
  import 'xgplayer'
  /*import HlsJsPlayer from 'xgplayer-hls.js';*/
  import HlsJsPlayer from 'xgplayer-hls.js';
  import { Toast,Icon } from 'vant';
  import { getCollectioncheckAPI,addCollectionAPI,delCollectionAPI,getFilePathAPI} from '@/api/xywApi';
  import {getVideo} from '../../utils/global';
  export default {
    name: 'HelloWorld',
    data() {
      return {
        isColl:false,
        player:null,
      }
    },
    created() {
      this.getCollectioncheck();
      this.palyVideo();

    },
    watch: {},
    methods: {
      getVideo(data){
        console.log(2222,`${process.env.BASE_API}/file/${data}/index.m3u8`)
        return `${process.env.BASE_API}/file/${data}/index.m3u8`
      },
      // 播放视频
      palyVideo(record) {

          getFilePathAPI(this.$route.query.videoAndPdf).then(res=>{
            if(res.data.code == 0){
              let startIndex=res.data.data.indexOf('.mp4');
              let file=res.data.data.slice(0,startIndex);
              let player = new HlsJsPlayer({
              id: 'mse',
              url: this.getVideo(file),
              autoplay: true,
              playsinline: true,
              height: 'auto',
              width: '100%'
            });
            }else{
            }
          })
      },


      getCollectioncheck(){
        getCollectioncheckAPI({
          videoId:this.$route.query.id,
          goodsType:6,
        }).then(res=>{
          if(res.data.status){
            this.isColl=res.data.data;
          }else{
            Toast.fail('获取失败');
          }
        })
      },
      collectionV(){
        let api=null,data=null;
        if(this.isColl){
          api=delCollectionAPI;
          data={
            videoId:this.$route.query.id,
            objectType:6,
          };
        }else{
          api=addCollectionAPI;
          data={
            videoId:this.$route.query.id,
            objectType: '视频',
          };
        }

        api(data).then(res=>{
          if(res.data.status){
            this.isColl=!this.isColl;
            Toast.success(`${!this.isColl?'取消收藏':'收藏成功'}`);
          }else{
            Toast.fail('收藏失败');
          }
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .play{
    width: 100%;
    height: 100%;
    background: #222222;
    display: flex;
    justify-content: center;
    align-items: center;
    .video{
      width: 100%;
      /*height: 2.15rem;*/
      background: rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      video{width: 100%;}
    }
  }
</style>
