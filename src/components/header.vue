<template>
  <!-- 'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')'-->
    <div class="header" :style="{backgroundImage:$route.name=='lineStudy'?'url(./static/img/top-bg.png)':'',backgroundColor:$route.name=='play'?'':($route.name.indexOf('my')>=0?'#2A80FB':'#02BCBE')}">
      <h1 v-if="$route.meta!='视频播放'">{{$route.meta.title||$route.meta}}</h1>
      <div class="headerB">
        <span @click="backBtn"><img src="../assets/img/public/left.png" alt=""></span>
        <h2 v-if="$route.name=='play'" @click="collectionV"><img :src="`./static/img/icon_soucang_${isColl?'sel':'nor'}.png`" alt=""></h2>
      </div>
    </div>
</template>

<script>
    import store from "../store";
    import {getUserMessageAPI} from '@/api/xywApi.js';
    export default {
        name: 'HelloWorld',
      props:['isColl'],
        data() {
            return {}
        },
        created() {
          console.log(this.$route.meta=={})
        },
        watch: {},
        methods: {
          backBtn(){
            if(this.$route.name=='myCompletion'){
              getUserMessageAPI().then(res=>{
                if(res.data.status){
                  this.$store.state.isFirstLogin=res.data.isFirstLogin;
                }
              })
              if(this.$store.state.isFirstLogin==1){
                this.$router.push('/');
                return
              }
            }
            this.$router.go(-1);
          },
          collectionV(){
            this.$emit('collectionV')
          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
  height: .44rem;
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-size: cover;
  h1{
    /*font-family: my-font;*/
    color: #fff;
    font-size: .18rem;
    position: absolute;
    overflow: hidden;
    margin: 0 auto;
    height: .44rem;
    line-height: .44rem;
    z-index: 0;
  }
  .headerB{
    height: .44rem;
    width: 3.75rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      width:.33rem;
      height: .44rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img{width: .09rem;object-fit: contain}
    }
    h2{/*font-family: my-font;*/
      color: #fff;
      font-size: .18rem;
      padding-right: .12rem;
    img{
      width: .17rem;
      height: .17rem;
    }}
  }
}
</style>
