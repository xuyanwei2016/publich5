<template>
  <div class="no-data-tip">
    <img src="@/assets/img/list/no-content.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'noneData',
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
.no-data-tip{
  padding-top: 2rem;
  color: #A8A8A8;
  text-align: center;
  line-height: .36rem;
  font-size: .16rem;
  img{
    margin: 0 auto;
  }
}
</style>
