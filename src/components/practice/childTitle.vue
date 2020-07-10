<template>
  <div class="titlt-wrap">
    <div class="type-title">
      <div class="title-name">{{title}}</div>
      <div>
        <span class="now-index">{{currentIndex}}</span>
        <span class="all-index">/{{allNum}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'childTitle',
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
.titlt-wrap{
  margin-top: .1rem; 
  padding: 0 .15rem 0 ;
}
.type-title{
  height: .45rem;
  line-height: .45rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f2f2f2;
  // margin: .05rem;
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
