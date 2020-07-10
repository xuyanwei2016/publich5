<template>
  <div class="box"  v-show="show">
    <p class="success">{{text}}</p>
  </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
      props: {
        show: Boolean,

        text: {
          type:String
        }
      },
        data() {
            return {
            }
        },
        created() {


        },
        watch: {},
        methods: {},
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .box{
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 66;
    position: fixed;
    top:0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      position: fixed;
      /*bottom: 0.65rem;*/
      display: inline-block;
      line-height: 0.44rem;
      height: 0.44rem;
      font-size: 0.15rem;
      color: #fff;
      background: rgba(0,0,0,0.7);
      border-radius: 0.22rem;
      padding: 0 0.2rem;
    }
  }
</style>
