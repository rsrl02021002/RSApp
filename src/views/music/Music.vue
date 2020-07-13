<template>
    <div>
        <div class="music-player">
            <aplayer
                :music="music"
            />
        </div>
        <div class="music-list">
            <ul>
                <li class="title">
                    <div class="music-num">序号</div>
                    <div class="music-title">歌曲名称</div>
                    <div class="music-star">歌手</div>
                </li>
                <li v-on:click="checkMusic(item.id)" v-for="(item,index) in musicList" v-bind:key="item.id">
                    <div class="music-num">{{index+1}}</div>
                    <div class="music-title">{{item.name}}</div>
                    <div class="music-star">{{item.ar[0].name}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    // 引入aplyer组件，前提是安装了vue-aplayer
    import aplayer from 'vue-aplayer'
    import axios from 'axios'
    export default {
        // 注册组件
        components:{
            aplayer
        },
        data(){
            return{
                musicList:[],
                music:{

                }
            }
        },
        methods:{
            // 获取单首歌曲
            checkMusic(id){
                let thisUrl = 'https://bird.ioliu.cn/netease/song?id='+id;
                let musicObj = {}
                axios.get(thisUrl).then((res)=>{
                    console.log(res);
                    musicObj = {
                        title:res.data.data.name,
                        artist:res.data.data.ar[0].name,
                        src:res.data.data.mp3.url,
                        pic:res.data.data.al.picUrl
                    }
                    console.log(musicObj);
                    this.music = musicObj;
                })
            },
            // 获取歌曲列表
            getData(){
                let thisId = '61102158'
                let thisUrl = 'https://bird.ioliu.cn/netease/playlist?id='+thisId
                axios.get(thisUrl).then((res)=>{
                    console.log(res);
                    this.musicList = res.data.playlist.tracks;
                })
            }
        },
        // 生命周期 创建完成 可以访问this实例
        created(){
        // 页面加载时调用getData
        this.getData()
        }
    }
</script>

<style scoped>
    .music-list{
        margin-top: 30px;
    }
    .music-list .title{
        font-weight: bolder;
    }
    .music-list li:nth-child(odd){
        background-color: rgba(0,150,136,.5);
    }
    .music-list li{
        display: flex;
        margin: 10px;
        font-size: 0.3rem;
    }
    .music-list li .music-num{
        flex: 1;
    }
    .music-list li .music-title{
        flex: 3;
    }
    .music-list li .music-star{
        flex: 3;
    }
</style>