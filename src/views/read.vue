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
                                <h2 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                                    {{this.title}}
                                </h2>
                                <h5>
                                글쓴이 : {{this.name}}
                                </h5>
                                <h5> {{this.date.slice(0,10)}}
                                </h5>
                                </div>
                            </div>
                            <div style = "align-items-right">
                                    
                            </div>
                            <div>
                                    {{this.content}}
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
                gmail : null,
                name : null,
                title : null,
                content : null,
                date : null,
                time : null,
                type : null
            }
        },
        mounted() {
            var params = new URLSearchParams();
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

            });
        },

        methods : {
            
        }
    }
</script>