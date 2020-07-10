<template>
    <div class="foot">
      <span class="footer">
        {{title}}
      </span>
    </div>
</template>

<script>
export default {
  name: 'listFooter',
  props:{
    title:{
      type:String,
      default:''
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
.foot{
  line-height: .36rem;
  text-align: center;
}
.footer{
  color: #CCCCCC;
  position: relative;
}
.footer:before, .footer:after{
  position: absolute;
  content: '';
  top: .05rem;
  height: .0rem;
  width: .3rem;
  border: .005rem solid #CCCCCC;
}
.footer:before{
  left: -.35rem;
}
.footer:after{
  right: -.35rem;
}
</style>
