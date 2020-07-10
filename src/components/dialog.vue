<template>
  <div class="confirn-dialog" v-if="isShow">
      <div class="dialog-wrap">
        <slot></slot>
        <ul>
          <li>
            <slot name="left"></slot>
          </li>
          <li>
            <slot name="right"></slot>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
export default {
  name:'p-dialog',
  props:{
    isShow:{
      type:Boolean,
      default:false
    }
  },
  methods:{
  }

}
</script>
<style lang="less" scoped>
.confirn-dialog{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999999999999;
  .dialog-wrap{
    margin: 2.5rem auto 0;
    width: 3.01rem; 
    // height: 1.34rem;
    border-radius: .08rem;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    ul {
      width: 100%;
      display: flex;
      border-top: 1px solid #f3f3f3;
      justify-content: center;
      height: .48rem;
      line-height: .48rem;
      li {
        flex: 1;
        text-align: center;
        color: #02A1A4;
        font-size: .17rem;
      }

      li:first-child {
        border-right: 1px solid #f3f3f3;
      }
    }
  }
}
</style>
