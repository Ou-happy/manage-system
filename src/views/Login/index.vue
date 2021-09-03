<template>
  <div class="gp-login">
    <div class="gp-login__content">gp-login</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    this.$request.get('/login', { data: 11 }, { mock: true }).then((res) => {
      console.log('res', res);
    });

    this.$storage.setItem('name', 11);
    this.$storage.clearAll();
  },
};
</script>

<style lang="scss">
@include b(login) {
  @include e(header) {
    background-color: red;
  }
}
</style>

