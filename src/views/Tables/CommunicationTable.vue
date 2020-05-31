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
        <base-pagination total= 1></base-pagination>
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
    mounted() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication')
          .then(res => {
            this.communication = res.data.reverse();
          });
      },
    data() {
      return {
        communication: [
        ]
      }
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

        axios
          .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/communication/read', params)
          .then(res => {
              params.append('gmail', res.data.gmail);
              params.append('name', res.data.name);
              params.append('title', res.data.title);
              params.append('content', res.data.content);
              params.append('date', res.data.date);
              params.append('time', res.data.time);
              params.append('type', res.data.type);

              console.log(no);
              console.log(params);

              router.push({
                name : 'read',
                params : {
                  'no' : params.no,
                  'gmail' : params.gmail,
                  'name' : params.name,
                  'title' : params.title,
                  'content' : params.content,
                  'date' : params.date,
                  'time' : params.time,
                  'type' : params.type
              }
            });
          });
        
      }
    }
    

  }
</script>
<style>
</style>