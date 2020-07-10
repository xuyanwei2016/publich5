<template>
  <!-- 'url(' + (coverImgUrl ? coverImgUrl : baseImg) + ')'-->
    <div class="header" :style="{backgroundColor:$route.name=='play'?'':'#02BCBE'}">
      <h1 @click="backBtn" >
        <slot name="title">{{headerTitle}}</slot>
      </h1>
      <div class="headerB">
        <img src="@/assets/img/public/left.png" alt="" @click="back">
        <h2 v-if="showCol">
          <slot></slot>
        </h2>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props:{
          headerTitle:{
            type:String,
            default:''
          },
          showCol:{
            type:Boolean,
            default:true
          }
        },
        data() {
            return {}
        },
        created() {
          console.log(this.$route.meta=={})
        },
        watch: {},
        methods: {
          backBtn(){
            // this.$router.go(-1)
          },
          back(){
            this.$emit('back')
          }
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
  z-index: 999999;
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
    width: 3.51rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{width: .09rem;object-fit: contain}
    h2{/*font-family: my-font;*/
      color: #fff;
      font-size: .18rem;
    img{
      width: .17rem;
      height: .17rem;
    }}
  }
}
</style>
