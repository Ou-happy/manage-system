<template>
  <div class="gp-demo">
    <!-- <Map3D></Map3D> -->
    <div class="gp-demo__content">
      <div>{{ nowTime }}</div>
      <button @click="getNowTime">时间</button>
    </div>
    <teleport to="#modal">
      <div id="center">
        <h2>testteleport</h2>
      </div>
    </teleport>
  </div>
</template>

<script>
import Map3D from '@/components/Map3D/index.vue';
import { reactive, ref, toRefs } from 'vue';
import { nowTime, getNowTime } from '@/hooks/useNowTime';
export default {
  name: 'Demo',
  components: {
    Map3D,
  },
  setup() {
    // const nowTime = ref('00:00:00');

    // const getNowTime = () => {
    //   const now = new Date();
    //   const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    //   const minu = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    //   const sec = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    //   nowTime.value = hour + ':' + minu + ':' + sec;
    //   setTimeout(getNowTime, 1000); //每一秒执行一次这个方法
    // };

    return {
      nowTime,
      getNowTime,
    };
  },
};
</script>

<style lang="scss" >
@include b(demo) {
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

