<template>
        <div class="row justify-content-center">
            <div class="col-lg-8 col-md-6">
                <div class="card bg-secondary shadow border-0">

                    <div class="card-body px-lg-5 py-lg-2">

                    </div>
                    <div class="card-header bg-transparent">
                            <div class="text-muted text-center mb-1">
                            타입을 선택하세요.
                            </div>

                            <div class="btn-wrapper text-center">
                                <a href="#/dashboard" @click="soldier()"  class="soldier btn btn-neutral btn-icon btn-size">
                                    <img src = "img/brand/soldier.png">
                                </a>
                                <a href='#/dashboard' @click="person()" class="person btn btn-neutral btn-icon btn-size">
                                    <img src = "img/brand/person.png">
                                </a>
                                <a href='#/InsertStore' @click="others()" class="others btn btn-neutral btn-icon btn-size">
                                    <img src = "img/brand/manager.png">
                                </a>
                                <p></p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            id : null,
            name : null,
            type : null,
        }
    },
    methods: {
        soldier() {
            var router = this.$router;
            const params = new URLSearchParams();
            params.append('gmail', this.$route.params.gmail)
            params.append('name', this.$route.params.name)
            params.append('type', 1)
            axios
                .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/mysql/insert', params) 
                .then(res => { 
                   router.push({
                       name: 'maps',
                       params: {
                                'gmail' : this.$route.params.gmail,
                                'name' : this.$route.params.name,
                                'type' : 's'
                            }
                   })
                })
                .catch(ex =>{
                    console.log("bye");
                })
        },
        person() {
            this.$store.commit('type', 2);
            var router = this.$router;
            const params = new URLSearchParams();

            params.append('gmail', this.$route.params.gmail)
            params.append('name', this.$route.params.name)
            params.append('type', 2)
            axios
            .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/mysql/insert', params) 
                .then(res => { 
                    this.$store.commit('name', googleUser.getBasicProfile().Bd);
                    router.push({
                       name: 'maps',
                       params: {
                                'gmail' : this.$route.params.gmail,
                                'name' : this.$route.params.name,
                                'type' : 'i'
                            }
                   })
                })
                .catch(ex =>{
                })
        },
        others() {
            this.$store.commit('type', 0);
            var router = this.$router;
            const params = new URLSearchParams();
            console.log(this.$route.params);
            params.append('gmail', this.$route.params.gmail)
            params.append('name', this.$route.params.name)
            params.append('type', 0)
            axios
            .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/mysql/insert', params) 
                .then(res => { 
                    this.$store.commit('name', googleUser.getBasicProfile().Bd);
                    router.push({
                       name: 'InsertStore',
                       params: {
                                'gmail' : this.$route.params.gmail,
                                'name' : this.$route.params.name,
                                'type' : 'y'
                            }
                   })
                })
                .catch(ex =>{
                })
        }
    }
}
</script>