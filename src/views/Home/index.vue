<template>
  <!-- <BasicLayout :options="{ width: 1920, height: 1080 }"> -->
    <div class="basic-layout">
      <div class="nav-side"></div>
      <div class="content-right">
        <div class="nav-top">
          <div class="nav-left">面包屑</div>
          <div class="user-info">用户信息</div>
        </div>
        <div class="wrapper">
          <div class="main-page">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  <!-- </BasicLayout> -->
</template>
<script>
import BasicLayout from '@/components/BasicLayout/index.vue';

export default {
  name: 'Home',
  components: {
    BasicLayout,
  },
  // mounted() {
  //   this.$request.get('/login', { data: 11 }, { mock: true }).then((res) => {
  //     console.log('res', res);
  //   });

  //   this.$storage.setItem('name', 11);
  //   this.$storage.clearAll();
  // },
};
</script>

<style lang="scss" scoped>
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
  }
  .content-right {
    margin-left: 200px;
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
    }
    .wrapper {
      height: calc(100vh - 50px);
      background: #eef0f3;
      padding: 20px;
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>

