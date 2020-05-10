<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6">
            <div class="card bg-secondary shadow border-0">

                <div class="card-body px-lg-5 py-lg-6">

                </div>
                <div class="card-header bg-transparent">
                        <div class="text-center mb-3"><img src = "img/brand/unnamed2.png"></div>
                        <div class="btn-wrapper text-center">
                            <!-- <button data-onsuccess="onSignIn" class="btn btn-neutral btn-icon btn-block btn-size">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </button> -->
                            <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                                <!-- <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin> -->
                                <!-- <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin> -->
                            <p></p>
                        </div>
                    </div>
                </div>
        </div>
        <div>
            <modal :show.sync="modals.modal0">
                <template slot="header">
                    <h5 class="modal-title" id="exampleModalLabel">Error</h5>
                </template>
                <div>
                Cannot communicate with server
                </div>
                <template slot="footer">
                    <base-button type="secondary" @click="modals.modal0 = false">Close</base-button>
                </template> 
            </modal>
        </div>
    </div>
</template>
<script>
  import GoogleLogin from 'vue-google-login';
  import axios from 'axios';
  import modal from '../components/Modal';

  export default {
    name: 'login',
     data() {
            return {
                // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
                params: {
                    client_id: "656386263034-8fq6oqa3ei48nt0t1mjrk2ri4ribrmbk.apps.googleusercontent.com"
                },
                // only needed if you want to render the button with the google ui
                renderParams: {
                    width: 375,
                    height: 50,
                    longtitle: true
                },
                modals: {
                    modal0 : false
                }
            }
        },
        components: {
            GoogleLogin,
            modal
        },
        methods: {
        onSuccess(googleUser) {
            var router = this.$router;
            const params = new URLSearchParams();
            var gmail2 = googleUser.getBasicProfile().zu;
            params.append('gmail', gmail2)
            axios
            // .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/mysql', params) 
                .post('http://localhost:3000/mysql', params, {
                    headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'}
                }) 
                .then(res => { 
                    if (res.data == "g") {
                        router.push({ 
                            name: 'maps',
                            params: {
                                'gmail' : googleUser.getBasicProfile().zu,
                                'name' : googleUser.getBasicProfile().Ad,
                                'type' : 's'
                            }
                        }) 
                    }
                    else if (res.data == "o"){
                        router.push({ 
                            name: 'dashboard',
                            params: {
                                'gmail' : googleUser.getBasicProfile().zu,
                                'name' : googleUser.getBasicProfile().Ad,
                                'type' : 'm'
                            }
                        }) // 해
                    }
                    else {
                        router.push({ 
                            name: 'selectType',
                            params: {
                                'gmail' : googleUser.getBasicProfile().zu ,
                                'name' : googleUser.getBasicProfile().Ad
                            }
                        }) 
                    }
                })
                .catch(ex =>{
                    console.log(ex);
                    this.modals.modal0 = true;
                })
        },
        onFailure(error) {
          console.log(error);
        }
    }
  }

</script>
<style>
</style>
