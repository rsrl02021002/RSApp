<template>
    <div>
        <ul class="tv-list">
            <li class="clearfix" v-on:click="goDetail(item.id)" v-for="item in dataList" v-bind:key="item.id">
                <div class="left">
                    <img v-bind:src="item.cover.url" alt="">
                </div>
                <div class="right">
                    <p class="title">{{item.title}}</p>
                    <p class="info">{{item.info}}</p>
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
                dataList:[],
                start:0,
                // 避免重复加载
                isContinue:true,
                // 避免全部加载完 再次请求
                total:1
            }
        },
        // 请求数据 在created周期调用，写在methods，为了使created简洁 推荐
        methods:{
            // 跳转至详情页
            goDetail(id){
              this.$router.push('/tvdetail/'+id);
            },
            // 事件：滚动时，触发事件
            listenScroll(){
                // 获取html
                let htmlDom = document.documentElement;
                window.onscroll=()=>{
                    // 获取html高度 即视口高度
                    let htmlHight = htmlDom.clientHeight;
                    // 获取滚动多少距离
                    let scrollTop = htmlDom.scrollTop;
                    // 滚动条的总长度
                    let scrollHeight = htmlDom.scrollHeight;
                    console.log(htmlHight,scrollTop,scrollHeight);
                    if(htmlHight+scrollTop+10>=scrollHeight){
                        console.log("到底了");
                        this.getData();
                    }
                }
            },
            // 跨域
            // 同源策略
            // 获取数据列表
            getData(){
                if(this.isContinue&&this.total>this.start){
                    // 模板字符串 start每次要改变
                    let requestUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?start=${this.start}&count=5`
                    let birdUrl = "https://bird.ioliu.cn/v2?url="
                    this.isContinue = false;
                    axios.get(birdUrl+requestUrl).then((res)=>{
                        console.log(res.data.subject_collection_items);
                        // 使用Array下的方法 拼接数组
                        this.dataList = this.dataList.concat(res.data.subject_collection_items)
                        // // 获取的新数据，拼接到原来数组里 扩展运算符
                        // this.dataList=[...(this.dataList),...(res.data.subject_collection_items)];
                        // 每次请求成功 start加10
                        this.start+=5;
                        this.isContinue = true;
                        this.total = res.data.total
                    }).catch(()=>{
                        console.log("出错了")
                    })
                }
            }
        },
        // 生命周期创建完成 可以访问当前this实例
        created() {
            // 一旦刷新页面，开始发送网络请求
            this.getData();
            // 滚动时触发事件
            this.listenScroll();
        }

    }
</script>
<style scoped>
    .tv-list li{
        padding: 20px 20px 5px 20px;
        margin: 0 10px;
        border-bottom: 1px solid black;
    }
    .tv-list li .left{
        float: left;
        width: 40%;
    }
    .tv-list .left img{
        width: 80%;
    }
    .tv-list li .right{
        float: left;
        width: 60%;
    }
    .tv-list .right .title{
        font-size: 25px;
    }
    .tv-list .right .info{
        font-size: 12px;
    }
</style>