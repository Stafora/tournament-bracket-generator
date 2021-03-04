<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>

  import DefaulLayout from '@/layouts/DefaultLayout.vue'
  import HomeLayout from '@/layouts/HomeLayout.vue'

  export default {
      name: 'App',
      computed:{
        layout() {
          return this.$route.meta.layout || 'DefaulLayout'
        }
      },
      components: {
        DefaulLayout, HomeLayout
      }
  }
</script>

<style lang="scss">
    body{
      background-color: DarkSalmon ;
    }
    .wrapper{
      width: 1200px;
      height: auto;
      padding: 0px 15px;
      margin-left: auto;
      margin-right: auto;
    }
</style>
