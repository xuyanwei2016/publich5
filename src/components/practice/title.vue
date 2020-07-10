<template>
  <div class="type-title">
    <div class="title-name">{{title}}</div>
    <div>
      <span class="now-index">{{currentIndex}}</span>
      <span class="all-index">/{{allNum}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pTitle',
  props:{
    title:{
      type:String,
      default:''
    },
    currentIndex:{
      type:Number,
      default:0
    },
    allNum:{
      type:Number,
      default:0
    }
  },
  data() {
      return {

      }
  },
  created() {
    
    
  },
  mounted() {
  },
  watch: {},
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.type-title{
  position:fixed;
  top: .44rem;
  left: 0;
  right: 0;
  z-index: 999;
  padding: .06rem .15rem 0 ;
  height: .45rem;
  line-height: .45rem;
  display: flex;
  justify-content: space-between;
  background:#f2f2f2;
  .title-name{
    color: #000000;
    font-size: .16rem;
    font-weight: Bold;
  }
  .now-index{
    color: #000;
  }
  .all-index{
    color: #666666;
  }
}
</style>
