<template>
  <section class="home-wrapper">
    <div class="home-content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item name="homepage" to="/home/homepage" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="demo1" to="/home/demo1" icon="search">Demo1</van-tabbar-item>
      <van-tabbar-item name="demo2" to="/home/demo2" icon="friends-o">Demo2</van-tabbar-item>
      <van-tabbar-item name="userpage" to="/home/userpage" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </section>
</template>


<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  components: { "van-tabbar": Tabbar, "van-tabbar-item": TabbarItem },
  data() {
    return {
      active: 'homepage'
    };
  }
};
</script>

<style lang="less">
</style>