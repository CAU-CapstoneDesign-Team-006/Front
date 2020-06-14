<template>
  <div class="card shadow" 
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col d-flex justify-content-between" >
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            Store Management
          </h3>
          <base-button type = "secondary" @click="insertStore()">매장 등록</base-button>
        </div>
      </div>
    </div>

<div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="store">
              <template slot="columns">
                <th>StoreName</th>
                <th>Information</th>
                <th>Address</th>
                <th></th>
              </template>

              <template slot-scope="{row}">
                
                <td class="storeName">
                  <a style = "cursor:pointer" @click = "readStore(row.storename)">{{row.storename}}</a>
                </td>
                <td class ="information">
                    {{row.information}}
                </td>
                <td class ="address">
                    {{row.address}}
                </td>
                <td>
                    <base-button outline type = "primary" @click = "updateStore(row.storename, row.gmail, row.information, row.address, row.category, row.phone, row.latitude, row.longitude)">수정</base-button>
                    <base-button outline type = "danger" @click = "deleteStore(row.storename)">삭제</base-button>
                </td>

              </template>

            </base-table>
          </div>
      
      <div class="card-footer d-flex justify-content-end"
          :class="type === 'dark' ? 'bg-transparent': ''" style = "margin-bottom : 30px;">
        <base-pagination total= 1></base-pagination>
      </div>
        
      </div>
      
</template>
<script>
import axios from 'axios'
  export default {
    name: 'dashboard-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    mounted() {
        var temp_gmail = this.$store.state.gmail;
        const params = new URLSearchParams();
        params.append('gmail', temp_gmail);

        axios
          .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/store', params)
          .then(res => {
            console.log(res.data);
            this.store = res.data;
            // if (res.data.length === 0)
            //                   {
            //                     var router = this.$router;
            //                     router.push({
            //                       name : 'InsertStore',
            //                       gmail : temp_gmail
            //                     })
            //                   }
          });
      },
    data() {
      return {
        store: [
        ]
      }
    },
    methods : {
      insertStore() {
        var router = this.$router;
        router.push({
            name : 'InsertStore'
        })
      },

      readStore(storename) {
        var router = this.$router;
        var params = new URLSearchParams();
        params.append('storename', storename);
        console.log(storename);


        // router.push({
        //   name : 'read',
        //   params : {
        //     'no' : no
        //   }
        // });
      },
      
      deleteStore(name) {
          var params = new URLSearchParams();
          var temp_gmail = this.$store.state.gmail;

          params.append('name', name);
          params.append('gmail', temp_gmail);
          console.log(name);
          console.log(temp_gmail);

          axios
              .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/store/delete', params)
              .then(res => {
                    if (res.data === 'done') {
                        alert('삭제 완료');
                        var temp_params = new URLSearchParams();
                        temp_params.append('gmail', temp_gmail);
                        axios
                            .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/store', temp_params)
                            .then(res => {
                              this.store = res.data;
                              if (res.data.length === 0)
                              {
                                var router = this.$router;
                                router.push({
                                  name : 'InsertStore',
                                  gmail : temp_gmail
                                })
                              }
                        });
                    }
              });
      },

      updateStore(name, gmail, info, address, category, phone, latitude, longitude) {
          var params = new URLSearchParams();
          var temp_gmail = this.$store.state.gmail;
          var router = this.$router;

          params.append('name', name);
          params.append('gmail', gmail);
          params.append('phone', phone);
          params.append('address', address);
          params.append('category', category);
          params.append('information', info);
          params.append('latitude', latitude);
          params.append('longitude',longitude);

          axios
            .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/store/update', params)
            .then(res => {
              router.push({
                name : 'UpdateStore',
                params : {
                    'storename' : name,
                    'gmail' : gmail,
                    'phone' : phone,
                    'category' : category,
                    'information' : info,
                    'address' : address,
                    'latitude' : latitude,
                    'longitude' : longitude
                }
              })
            })
      }
    }
    

  }
</script>
<style>
</style>