<template>
  <div class="type-button">
    <div class="button-wrap" @click="click" :class="{'prev':classType=='prev'}">
      <span class="button-name">{{name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "pButton",
  props: {
    name: {
      type: String,
      default: ""
    },
    classType:{
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.type-button {
  width: 100%;
  margin: 0.1rem 0;
  padding: 0 0.15rem;
  .button-wrap {
    background: #03b0b3;
    text-align: center;
    padding: 0.1rem 0;
    border-radius: 0.4rem;
    .button-name {
      width: 100%;
      padding: 0.12rem 0;
      color: #fff;
      font-size: .15rem;
    }
  }
  .prev{
    background: #E3E3E3;
    .button-name{
      color: #333;
    }
  }
}

</style>
