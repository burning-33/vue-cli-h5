<template>
  <section>
      <h1>homePage</h1>
      <p> {{ $route.fullPath }}</p>
      <van-button type="info" @click="getApiRes">接口请求</van-button>
  </section>
</template>

<script>
import { Button } from 'vant';
export default {
    components:{ 'van-button': Button},
    data() {
        return {
            
        }
    },
    created() {
    },
    methods: {
        async getApiRes(){
            let params = {
                a: '1',
                b: 'cc'
            }
            let res = await this.$api.getAa(params)
            console.log('res',res)
        }
    },
}
</script>

<style>

</style>