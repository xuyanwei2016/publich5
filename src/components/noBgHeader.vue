<template>
    <div class="noBgHeader" :style="{backgroundImage: `url(./static/img/${$route.name}.jpg)`}">
      <h1>{{$route.meta.title||$route.meta}}</h1>
      <div class="headerB">
        <span @click="$router.go(-1)"><img src="../assets/img/public/left.png" alt=""></span>
        <!--<h2 v-if="$route.name=='play'"><img src="../../static/img/coll.png" alt=""></h2>-->
      </div>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {}
        },
        created() {
        },
        watch: {},
        methods: {},
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.noBgHeader{
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
