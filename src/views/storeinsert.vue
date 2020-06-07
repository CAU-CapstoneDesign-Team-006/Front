<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                        <big>Sign up your store</big>
                    </div>
                    <div class="btn-wrapper text-center">
                    </div>
                </div>
                
                <div class="card-body px-lg-5 py-lg-5">

                    <form role="form">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="store name"
                                    v-model="model.name">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="address"
                                    v-model="model.address">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="phone"
                                    v-model="model.phone">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="information"
                                    v-model="model.inforation">
                        </base-input>

                        <div class="text-center">
                            <base-button type="primary" class="my-4">Create Store</base-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

  export default {
    name: 'storeinsert',
    data() {
      return {
        model: {
          name: '',
          category: '',
          phone: '',
          information: ''
        }
      }
    },


  }

  
  
</script>
<style>
</style>
