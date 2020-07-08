<template>
    <div>
        <ul class="tv-list">
            <li>
                <div class="left">
                    <img src="https://img1.doubanio.com/view/photo/m_ratio_poster/public/p2609064048.jpg" alt="">
                </div>
                <div class="right">
                    <p class="title">隐秘的角落</p>
                    <p class="info">中国大陆 / 剧情 犯罪 悬疑 / 辛爽 / 秦昊 王景春</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return{
                dataList:[]
            }
        },
        // 请求数据 在created周期调用，写在methods，为了使created简洁 推荐
        methods:{
            // 跨域
            // 同源策略
            getData(){
                let requestUrl = "https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?start=0&count=18"
                let birdUrl = "https://bird.ioliu.cn/v2?url="
                axios.get(birdUrl+requestUrl).then((res)=>{
                    console.log(res)
                }).catch(()=>{
                    console.log("出错了")
                })
            }
        },
        // 生命周期创建完成 可以访问当前this实例
        created() {
            // 一旦刷新页面，开始发送网络请求
            this.getData();
        }

    }
</script>
<style scoped>
    .tv-list li .left{
        
    }
</style>