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
                        <h3>
                        Category
                        <base-dropdown class="dropdown"
                                    position="right">
                        <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <template>
                            <a class="dropdown-item">여가</a>
                            <a class="dropdown-item">음식점</a>
                            <a class="dropdown-item">커피</a>
                            <a class="dropdown-item">아이스크림</a>
                            <a class="dropdown-item">제과</a>
                            <a class="dropdown-item">도넛</a>                
                        </template>
                        </base-dropdown>
                        </h3>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="name"
                                    v-model="model.name">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="phone"
                                    v-model="model.phone">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="information"
                                    v-model="model.inforation"
                                    style="width:350px;height:200px">
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
    name: 'register',
    data() {
      return {
        model: {
          name: '',
          category: '',
          phone: '',
          information: ''
        }
      }
    }
  }
</script>
<style>
</style>
