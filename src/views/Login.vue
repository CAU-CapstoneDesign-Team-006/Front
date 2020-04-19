<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
                <div class="card bg-secondary shadow border-0">

                    <div class="card-body px-lg-5 py-lg-5">

                    </div>
                    <div class="card-header bg-transparent">
                            <div class="text-center mb-3"><img src = "img/brand/unnamed2.png"></div>
                            <div class="text-muted text-center mb-3">
                                <large>Sign in with Google</large>
                            </div>
                            <div class="btn-wrapper text-center">
                                <a href="#" class="btn btn-neutral btn-icon btn-block btn-size">
                                    <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                    <span class="btn-inner--text">Google</span>
                                </a>
                                <p></p>
                            </div>
                            
                        </div>
                    </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'login',
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    }
  }
</script>
<style>
</style>
