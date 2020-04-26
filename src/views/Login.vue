<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
                <div class="card bg-secondary shadow border-0">

                    <div class="card-body px-lg-5 py-lg-5">

                    </div>
                    <div class="card-header bg-transparent">
                            <div class="text-center mb-3"><img src = "img/brand/unnamed2.png"></div>
                            <div class="text-muted text-center mb-3">
                                <p>Sign in with Google</p>
                            </div>
                            <div class="btn-wrapper text-center">
                                <!-- <button data-onsuccess="onSignIn" class="btn btn-neutral btn-icon btn-block btn-size">
                                    <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                    <span class="btn-inner--text">Google</span>
                                </button> -->
                                <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
                                 <!-- <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure">Login</GoogleLogin> -->
                                 <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>
                                <p></p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
</template>
<script>
  import GoogleLogin from 'vue-google-login';

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
                }
            }
        },
        components: {
            GoogleLogin
        },
        methods: {
        onSuccess(googleUser) {
            console.log(googleUser);
 
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());
        },
        onFailure(error) {
          console.log(error);
        }
    }
  }

</script>
<style>
</style>
