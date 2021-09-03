<template>
  <div class="gp-animate">
    <!-- <Map3D></Map3D> -->
    <div class="gp-animate__content">
      <transition>
        <div v-if="isShow">展示展示展示展示展示</div>
        <div v-else>消失消失消失消失</div>
      </transition>
      <button @click="hanldClick">切换动画</button>
    </div>
  </div>
</template>

<script>
import Map3D from '@/components/Map3D/index.vue';
import { reactive, toRefs } from 'vue';
export default {
  name: 'Animate',
  components: {
    Map3D,
  },
  setup() {
    const data = reactive({
      isShow: false,
      hanldClick: () => {
        data.isShow = !data.isShow;
      },
      // doubleCount: computed(() => data.count * 2),
      // watch:
      //   (() => data.count,
      //   (val) => {
      //     console.log('countval', val);
      //   }),
    });

    // const count = ref(0);
    // const add = () => {
    //   count.value++;
    // };

    // watch(
    //   () => data.count,
    //   (val) => {
    //     console.log('countval', val);
    //   },
    // );
    // const doubleCount = computed(() => count.value * 2);
    const refData = toRefs(data);
    return {
      // count,
      // doubleCount,
      // add,
      ...refData,
    };
  },
};
</script>

<style lang="scss" >
@include b(animate) {
  @include e(content) {
    // background-color: red;
    .v-enter-from {
      opacity: 0;
    }
    .v-enter-to {
      opacity: 1;
    }
    .v-enter-active {
      transition: opacity 2s ease-in;
    }
  }
}
</style>

