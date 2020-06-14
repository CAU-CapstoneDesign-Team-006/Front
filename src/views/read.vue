<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                      <div class="card shadow" 
                            :class="type === 'dark' ? 'bg-default': ''">
                            <div class="card-header border-0"
                                :class="type === 'dark' ? 'bg-transparent': ''">
                            <div class="row align-items-center" style = "margin-bottom : 10px;">
                                <div class="col d-flex justify-content-between" >
                                <h2><img id = "bestHandler" @click="updown()" src = "img/brand/empty.png"> {{this.best}} </h2>
                                <h2 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                                    {{this.title}}
                                </h2>
                                <h5>
                                {{this.date.slice(0,10)}}<p></p>
                                글쓴이 : {{this.name}} 
                                </h5>
                                </div>
                            </div>
                            <div style = "align-items-right">
                                    
                            </div>
                            <div class="container" style = "border : 1px solid black; height : 400px; font-size : 20px; margin-bottom : 50px;">
                                    <pre>{{this.content}}</pre>
                            </div>
                            <div class = "d-flex justify-content-between">
                            <base-button type = "primary" @click="update()">수정</base-button>
                            <base-button type = "primary" @click="del()">삭제</base-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import axios from 'axios'
    import { store } from "../store";
    export default {
        data() {
            return {
                no : null,
                gmail : '',
                name : '',
                title : '',
                content : '',
                date : '',
                time : '',
                type : '',
                best : 0,
                state : false
            }
        },
        mounted() {
            var params = new URLSearchParams();
            var temp_gmail = this.$store.state.gmail;
            params.append('no', this.$route.params.no);

            axios
                .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/read', params)
                .then(res => {
                  this.no = res.data[0].no;
                  this.gmail = res.data[0].gmail;
                  this.name = res.data[0].name;
                  this.title = res.data[0].title;
                  this.content = res.data[0].content;
                  this.date = res.data[0].date;
                  this.time = res.data[0].time;
                  this.type = res.data[0].type;
                  this.best = res.data[0].best;
                })
            
            axios
                .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/getbest', params)
                .then(res => {
                    var myimage = document.getElementById('bestHandler');
                    var userList = res.data.filter((v) => { return v.gmail === temp_gmail});

                    if (userList[0].gmail === temp_gmail) {
                        this.state = true;
                        myimage.src = "img/brand/full.png";
                    }
                    else {
                        this.state = false;
                        myimage.src = "img/brand/empty.png";
                    }
                });
                
        },

        methods : {
            update() {
                var temp_gmail = this.$store.state.gmail;

                if (this.gmail === temp_gmail)
                {
                    var router = this.$router;
                    const params = new URLSearchParams();
                    params.append('no', this.no);
                    params.append('title', this.title);
                    params.append('content', this.content);
                    params.append('date', this.date);
                    params.append('time', this.time);

                    axios
                        .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/update', params)
                        .then(res => {
                            alert('수정 페이지로 이동합니다.');

                            router.push({
                                name : 'update',
                                params : {
                                    'no' : this.no,
                                    'title' : this.title,
                                    'content' : this.content,
                                    'date' : this.date,
                                    'time' : this.time
                                }
                            })
                        })
                }
                else 
                    alert('권한 없음');

            },

            del() {
                var temp_gmail = this.$store.state.gmail;

                if (this.gmail === temp_gmail) 
                {
                    var sure = prompt('"삭제"를 입력하면 삭제됩니다.');

                    if (sure === "삭제")
                    {
                        var router = this.$router;
                        const params = new URLSearchParams();
                        params.append('no', this.no);
                        axios
                            .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/delete', params)
                            .then(res => {
                                alert('성공! 게시판으로 돌아갑니다.');

                                router.push({
                                    name : 'Communication'
                                })
                            })
                    }
                }
                else
                    alert('권한 없음');
            },

            updown() {
                var temp_gmail = this.$store.state.gmail;
                const params = new URLSearchParams();
                params.append('no', this.no);
                params.append('gmail', temp_gmail);
                var myimage = document.getElementById('bestHandler');

                if (this.state === false) {
                    axios
                        .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/pushbest', params)
                        .then(res => {
                            console.log('f')
                            console.log(res.data);
                            if (res.data === 'done') {
                                myimage.src = "img/brand/full.png"; 
                                this.best += 1;
                                this.state = true;
                            }
                            else
                                alert('error');
                        })
                }
                else if (this.state === true) {
                    axios
                        .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/deletebest', params)
                        .then(res => {
                            console.log('t')
                            console.log(res.data)
                            if (res.data === 'done') {
                                myimage.src = "img/brand/empty.png";
                                this.best -= 1;
                                this.state = false;
                            }
                            else
                                alert('error');
                        });
                }
            }
        }
    }
</script>