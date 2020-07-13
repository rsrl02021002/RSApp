<template>
    <div>
        <h2>{{detailInfo.title}}</h2>
        <p>{{detailInfo.intro}}</p>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
          return {
              detailInfo:{

              }
          }
        },
        methods:{
            getData(id){
                let requestUrl = 'https://m.douban.com/rexxar/api/v2/tv/'+id;
                let birdUrl = "https://bird.ioliu.cn/v2?url="
                axios.get(birdUrl+requestUrl).then((res)=>{
                    console.log(res);
                    this.detailInfo = res.data;
                })
            }
        },
        // 生命周期-创建完成 访问当前this实例
        created() {
            console.log(this.$route.params.id);
            this.getData(this.$route.params.id);
        }
    }
</script>

<style scoped>

</style>