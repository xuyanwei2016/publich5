import MyAlert from './index.vue'
let $vm;
export default {
  install(Vue, options) {
    if (!$vm) {
      const Alert = Vue.extend(MyAlert);
      $vm = new Alert({
        el: document.createElement('div')
      });
      document.body.insertBefore($vm.$el, document.getElementById('app'))
    }
    $vm.show = false;
    let index = {
      show(text) {
        $vm.show = true;
        let timer = setTimeout(() => {
          $vm.show = false
          clearTimeout(timer)
          timer = null
        },2000)
        $vm.text = text;
      }
    };

    if (!Vue.$valert) {
      Vue.$valert = index;
    }
    Vue.mixin({
      created() {
        this.$valert = Vue.$valert;
      }
    })
  }
}



