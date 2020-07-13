<template>
    <div>
        <div class="list-bar">
            <ul>
                <li v-for="(item,index) in talkList" v-bind:key="index">
                    <div class="right clearfix">
                        <div>
                            {{item.question}}
                        </div>
                    </div>
                    <div class="left clearfix">
                        <div>
                            {{item.answer}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="form-bar">
            <input v-model="inpVal" type="text" placeholder="请输入您的问题">
            <button v-on:click="sendMes">发送</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import md5 from 'md5'
    export default {
        data(){
            return{
                inpVal:"",
                talkList:[]
            }
        },
        methods:{
            // 控制滚动
            scrollBottom(){
                let htmlDom = document.documentElement;
                // 获取html高度 即视口高度
                let htmlHight = htmlDom.clientHeight;
                // 获取滚动多少距离
                // let scrollTop = htmlDom.scrollTop;
                // 滚动条的总长度
                let scrollHeight = htmlDom.scrollHeight;
                if(scrollHeight>htmlHight){
                    htmlDom.scrollTop = scrollHeight - htmlHight -50;
                }
            },

            // 生成时间戳
            getTimeStamp(){
              let timer = new Date();
              // 将timer转化为时间戳
              timer = Date.parse(timer);
              // 将时间戳数值型转化为字符型，并截取前十位
              timer = timer.toString().substr(0,10);
              // 转化为整数
              timer = Number.parseInt(timer);
                console.log("我是时间戳");
                console.log(timer);
              return timer;
            },

            // 生成16进制随机字符串
            getNonceStr(){
                // 生成随机数
                let str = Math.random();
                // 将随机数转化为16进制
                str = str.toString(16);
                // 截取从第2位开始的字符串
                str = str.substr(2);
                console.log("我是16进制随机字符串");
                console.log(str);
                return str;
            },

            // 生成签名
            getSign(obj){
                // 第一步：将<key, value>请求参数对按key进行字典升序排序，得到有序的参数对列表N
                // 获取obj的key，并返回数组  sort对数组进行排序，默认升序
                let arr = Object.keys(obj).sort();
                console.log("key排序");
                console.log(arr);
                // 第二步 对排列后的对象进行url格式拼接
                let str = "";
                arr.map(function (val) {
                    str+=`${val}=${encodeURI(obj[val])}&`
                })
                console.log("拼接后的url");
                console.log(str);
                // 第三步 将应用密钥以app_key为键名，组成URL键值拼接到字符串T末尾
                str+="app_key=tej0QutZqfzvKuFC"
                console.log("拼接appkey后的url");
                console.log(str);
                // 第四步 对字符串S进行MD5运算，将得到的MD5值所有字符转换成大写
                // 在rsapp下安装类库 npm install --save md5
                str = md5(str).toUpperCase();
                console.log(str);
                // 第五步 return
                return str;
            },


            sendMes(){
                console.log(this.inpVal);
                let thisUrl = "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat"
                let birdUrl = "https://bird.ioliu.cn/v2?url="
                let params = {
                    app_id:2128704046,
                    time_stamp:this.getTimeStamp(),
                    nonce_str:this.getNonceStr(),
                    session:"10000",
                    question:this.inpVal
                }
                let sign = this.getSign(params);
                params.sign = sign;

                axios.get(birdUrl+thisUrl,{
                    params
                }).then((res)=>{
                    console.log(res);
                    let obj = {
                        answer:res.data.data.answer,
                        question:this.inpVal
                    }
                    this.talkList.push(obj);
                    // 每次输入完，清楚输入框
                    this.inpVal="";
                    // 每次聊天，滚动到底部
                    this.scrollBottom();
                })
            }
        }
    }
</script>

<style scoped>
    .list-bar .left,.list-bar .right{
        font-size: 0.4rem;
        margin-bottom: 10px;
    }
    .list-bar .left div{
        float: left;
        background-color: green;
    }
    .list-bar .right div{
        float: right;
        background-color: pink;
    }
    .form-bar{
        position: fixed;
        bottom: 1rem;
        text-align: center;
        width: 100%;
        height: 1rem;
        background-color: #eee;
        line-height: 0.5rem;
    }
    .form-bar input{
        width: 70%;
        height: 0.5rem;
    }
    .form-bar button{
        background-color: green;
        padding: 8px;
    }
</style>