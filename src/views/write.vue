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
                            <div class="row align-items-center" style = "margin-bottom : 30px;">
                                <div class="col d-flex justify-content-between" >
                                <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                                    Write
                                </h3>
                                <base-button type = "primary" @click="write()">완료</base-button>
                                </div>
                            </div>
                            
                            <form class = "writing">
                                <div style = "margin-bottom : 30px;">
                                    <textarea class="form-control" id="titleArea" v-model = "title" rows ="1" placeholder="Write Title here.."></textarea>
                                </div>
                                <div>
                                    <textarea class="form-control" id="contentArea" v-model = "content" rows = "10" placeholder="Write Content here.."></textarea>
                                </div>
                            </form>

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
                name : null,
                title : null,
                content : null,
                date : null,
                time : null
            }
        },

        methods : {
            write() {
                var router = this.$router;
                const params = new URLSearchParams();
                params.append('name', this.$store.state.gmail);
                params.append('title', this.title);
                params.append('content', this.content);
                var tempDate = new Date();
                var Year = tempDate.getFullYear();
                var Month = "" + (tempDate.getMonth()+1);
                var Day = "" + tempDate.getDate();   
                if(Month.length < 2) Month = "0" + Month;
                if(Day.length < 2) Day = "0" + Day;
                var today = Year.toString() + '-' + Month + '-' + Day;
                params.append('date', today);
                var tempHour = tempDate.getHours();
                var tempMinutes = tempDate.getMinutes();
                var tempSecond = tempDate.getSeconds();
                params.append('time', (tempHour < 10 ? '0'+ tempHour : tempHour) + ':' + (tempMinutes < 10 ? '0'+tempMinutes : tempMinutes) + ':' + (tempSecond < 10 ? '0'+tempSecond : tempSecond));
                axios
                    .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/createContent', params)
                    .then(res => {
                        router.push({
                            name : 'Communication'
                        })
                    });
            }
        }
    }
</script>