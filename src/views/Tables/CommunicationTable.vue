<template>
  <div class="card shadow" 
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col d-flex justify-content-between" >
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            Communication
          </h3>
          <base-button type = "primary" @click="write()">작성</base-button>
        </div>
      </div>
    </div>

<div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="communication">
              <template slot="columns">
                <th>No.</th>
                <th>Title</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
              </template>

              <template slot-scope="{row}">
                <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="name mb-0 text-sm">{{row.no}}</span>
                    </div>
                  </div>
                </th>
                <td class="title">
                  <a style = "cursor:pointer" @click = "read(row.no)">{{row.title}}</a>
                </td>
                <td class ="name">
                  {{row.name}}
                </td>
                <td class = "date">
                    {{row.date.slice(0, 10)}}
                </td>
                <td calss = "time">
                    {{row.time}}
                </td>


              </template>

            </base-table>
          </div>
      
      <div class="card-footer d-flex justify-content-end"
          :class="type === 'dark' ? 'bg-transparent': ''" style = "margin-bottom : 30px;">
        <base-pagination id = "pagenum" :page-count='pagination.pageCount' v-model='value'></base-pagination>
      </div>
        
      </div>
      
</template>
<script>
import axios from 'axios'
  export default {
    name: 'communication-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        communication: [],
        temp : [],
        value : 1,
        pagination: {
          default : 1,
          pageCount : 1,
        }
      }
    },
    mounted() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/totalpage')
          .then(res => {
            this.pagination.pageCount = res.data.total;
          })

        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/' + 1)
          .then(res => {
            this.communication = res.data.sort((a,b) => { return b.no - a.no;});
          });
      },
    methods : {
      write() {
        var router = this.$router;
        router.push({
            name : 'write'
        })
      },
      read(no) {
        var router = this.$router;
        var params = new URLSearchParams();
        params.append('no', no);

        router.push({
          name : 'read',
          params : {
            'no' : no
          }
        });
        
      }
    },
    // beforeUpdate() {
    //   var vm = this;
    //   console.log(vm.pagination.value)
    //   axios
    //       .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/' + vm.pagination.value)
    //       .then(res => {
    //         vm.communication = res.data.sort((a,b) => { return b.no - a.no;});
    //       });
    //   this.$nextTick(function () { // 모든 화면이 렌더링된 후 실행합니다. 
    //   });
    // }
    watch: {
      value: function (newVal, oldVal){
        var vm = this;
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/' + vm.value)
          .then(res => {
            vm.communication = res.data.sort((a,b) => { return b.no - a.no;});
          });
      }
    }
  }
</script>
<style>
</style>