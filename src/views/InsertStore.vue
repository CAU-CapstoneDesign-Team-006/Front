<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent pb-5">
                    <div class="text-muted text-center mt-2 mb-3">
                        <big>Add your store</big>
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
                                    placeholder="phone"
                                    v-model="model.phone">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="information"
                                    v-model="model.inforation">
                        </base-input>

                        <base-dropdown>
                          <base-button slot="title" type="secondary" class="dropdown-toggle ">
                            {{ model.category }}
                          </base-button>
                          <a class="dropdown-item px-lg-6" href="#" @click="setCategory('도넛')">도넛</a>
                          <a class="dropdown-item px-lg-6" href="#" @click="setCategory('커피')">커피</a>
                          <a class="dropdown-item px-lg-6" href="#" @click="setCategory('아이스크림')">아이스크림</a>
                          <a class="dropdown-item px-lg-6" href="#" @click="setCategory('음식점')">음식점</a>
                          <a class="dropdown-item px-lg-6" href="#" @click="setCategory('여가')">여가</a>
                        </base-dropdown>
                        
                        <base-button @click="addressSearch()">주소 찾기</base-button>

                        <div class="text-center">
                            <base-button type="primary" class="my-4" @click="insertStore()">Create Store</base-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'storeinsert',
  mounted() {
            if (window.kakao && window.kakao.maps) {
                console.log("already")
            } else {
                const script = document.createElement('script');
                /* global kakao */
                script.onload = () => kakao.maps.load(console.log("done"));
                script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a7578f58544246c17d8dbff43d4b7902&libraries=services';
                document.head.appendChild(script);
            } 
            let recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('src', 'http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false')
            document.head.appendChild(recaptchaScript)
        },
  data() {
    return {
      model: {
        name: '',
        phone: '',
        information: '',
        category: "카테고리를 선택해 주세요.",
        address: ''
      }
    }
  },
  methods : {
    insertStore() {
      var vm = this;
      console.log(vm.model);

      var geocoder = new kakao.maps.services.Geocoder();

      var callback = function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
              console.log(result);
              const params = new URLSearchParams();
              params.append('name', vm.model.name)
              params.append('category', vm.model.category)
              params.append('phone', vm.model.phone)
              params.append('information', vm.model.information)
              params.append('address', vm.model.address)
              params.append('name', vm.model.name)
              params.append('gmail', vm.$store.state.gmail)
              params.append('latitude' , result.y)
              params.append('longitude' , result.x)
              axios
                .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/store/insert', params)
                .then(res => {
                   vm.$router.push({ 
                            name: 'dashboard'
                        }) 
                })
                .catch(ex => {

                })
          }
      };

      geocoder.addressSearch(vm.model.address, callback);
    },
    setCategory(ct) {
      var vm = this;
      vm.model.category = ct;
    },
    addressSearch: function() {
      var vm = this;
      daum.postcode.load(function(){
          new daum.Postcode({
              oncomplete: function(data) {
                  // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
                  // 예제를 참고하여 다양한 활용법을 확인해 보세요.
                  vm.model.address = data.address;
              }
          }).open();
      });
    }
  }
}
</script>