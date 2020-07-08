<template>
<!--    动态绑定class v-bind-->
    <div v-bind:class="activeLi.name">
        <header>
            <span>首页</span>
            <p>{{activeLi.title}}</p>
        </header>
        <nav>
            <ul>
<!--                为什么用v-bind:key="item.id"-->
<!--                因为，页面发生变化时，通过key可以加快查找谁发生了变化-->
                <li v-for="item in navList" v-bind:key="item.id" v-on:click="goPage(item)">{{item.title}}</li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                activeLi:{
                    id:101,
                    title:"剧集",
                    path:"/",
                    name:"tvplay"
                },
                // navList 为了动态创建导航栏，不在template模板中写死
                navList:[
                    {
                        id:101,
                        title:"剧集",
                        path:"/",
                        name:"tvplay"
                    },
                    {
                        id:102,
                        title:"音乐",
                        path:"/music",
                        name:"music"
                    },
                    {
                        id:103,
                        title:"书籍",
                        path:"/book",
                        name:"book"
                    },
                    {
                        id:104,
                        title:"聊天",
                        path:"/talk",
                        name:"talk"
                    }
                ]
            }
        },
        methods:{
            goPage(item){
                console.log(item);
                if(item.name != this.activeLi.name){ //判断：当前页面的是否和activeLi一致。理论上可行，实际报错，因为json转换后，遵守严格的格式，比如单双引号，所以在这里用属性name判断
                    this.$router.push(item.path);  //如果一致，不做修改，如果不一致，更改属性名，同时跳转路由
                    this.activeLi=item;
                    // 解决数据初始化 第一步 拿到当前页面的activeLi，并存到本地
                    // 但是sessionStorage不能存储对象，所以转换成json格式
                    sessionStorage.setItem("activeNav",JSON.stringify(item))
                }
            }
        },
        // 生命周期 创建完成 访问当前this实例

        created() {
            console.log(JSON.parse(sessionStorage.getItem("activeNav")));
            // 拿到的activeNav是json格式 转换一下
            this.activeLi.name = JSON.parse(sessionStorage.getItem("activeNav")).name;
        }
    }
</script>

<style scoped>
    header,nav{
        height: 1rem;
        color: black;
        position: fixed;
        width: 100%;
    }
    header{
        top: 0;
    }
    nav{
        bottom: 0;
    }
    nav ul{
        height: 1rem;  /*为了使ul同li有相同的高度*/
        display: flex;
        align-items: center; /*li垂直居中*/
    }
    nav li{
        flex-grow: 1;  /*li平分水平空间*/
        text-align: center;  /*文字水平居中*/
        font-size: 0.5rem;
    }
    header span{
        font-size: 0.3rem;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
    header p{
        font-size: 0.7rem;
        text-align: center;

    }
    .tvplay header,.tvplay nav{
        background-color: rgb(33,150,243);
    }
    .music header,.music nav{
        background-color: rgb(0,135,136);
    }
    .book header,.book nav{
        background-color: rgb(121,85,72);
    }
    .talk header,.talk nav{
        background-color: rgb(63,81,181);
    }
</style>