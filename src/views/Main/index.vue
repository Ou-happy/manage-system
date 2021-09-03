<template>
  <div class="gp-home">
    <!-- <Map3D></Map3D> -->
    <div class="gp-home__content">
      <div class="test">
        <h1>test count: {{ data.count }}</h1>
        <div>count * 2 = {{ data.doubleCount }}</div>
        <button @click="data.add">add</button>
      </div>
    </div>
  </div>
</template>

<script>
import Map3D from '@/components/Map3D/index.vue';
import { ref, computed, watch, reactive } from 'vue';
export default {
  name: 'Welcome',
  components: {
    Map3D,
  },
  setup() {
    const data = reactive({
      count: 0,
      add: () => {
        data.count++;
      },
      doubleCount: computed(() => data.count * 2),
      watch:
        (() => data.count,
        (val) => {
          console.log('countval', val);
        }),
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
    return {
      // count,
      // doubleCount,
      // add,
      data
    };
  },
};
</script>

<style lang="scss" scoped>
.welcome {
  width: 100%;
  height: 100%;
}

@include b(home) {
  @include e(content) {
    // background-color: red;
  }
}
</style>

