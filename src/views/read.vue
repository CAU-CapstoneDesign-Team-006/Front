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
                                    {{this.title}}
                                </h3>
                                </div>
                            </div>
                            <div>
                                    {{this.name}}
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
                no : this.$route.params.no,
                gmail : this.$route.params.gmail,
                name : this.$route.params.name,
                title : this.$route.params.name,
                content : null,
                date : null,
                time : null,
                type : null
            }
        },
        // mounted() {

        //     this.no = this.$route.params.no;
        //     this.gmail = this.$route.params.gmail;
        //     this.name = this.$route.params.name;
        //     this.title = this.$route.params.title;
        //     this.content = this.$route.params.content;
        //     this.date = this.$route.params.date;
        //     this.time = this.$route.params.time;
        //     this.type = this.$route.params.type;
        // },

        methods : {
            
        }
    }
</script>