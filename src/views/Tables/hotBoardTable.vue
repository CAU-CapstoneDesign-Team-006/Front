<template>
    <div class="card shadow" 
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col d-flex justify-content-between" >
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            Hot Hot Hot
          </h3>
          <h4>
            Search
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>
              <template>
                <a class="dropdown-item" @click = "daily()">Daily</a>
                <a class="dropdown-item" @click = "week()">Week</a>
                <a class="dropdown-item" @click = "month()">Month</a>
                <a class="dropdown-item" @click = "total()">Total</a>                
              </template>
            </base-dropdown>
          </h4>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="hotList">
              <template slot="columns">
                <th>Type</th>
                <th>Title</th>
                <th>Name</th>
                <th>Best</th>
                <th>Date</th>
                <th>Time</th>
              </template>

              <template slot-scope="{row}">
                <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="name mb-0 text-sm">{{row.type === '0' ? "소통" : "정보"}}</span>
                    </div>
                  </div>
                </th>
                <td class="title">
                  <a style = "cursor:pointer" @click = "read(row.no, row.type)">{{row.title}}</a>
                </td>
                <td class ="name">
                  {{row.name}}
                </td>
                <td class ="best">
                  {{row.best}}
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
      </div>
</template>
<script>
import axios from 'axios'
  export default {
    name: 'hot-board-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    mounted() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/hotrank')
          .then(res => {            
                this.hotList = res.data.sort((a,b) => { return a.date > b.date ? -1 : 1; });
          });
      },
    data() {
      return {
        hotList : [
        ],
      }
    },
    methods : {
      read(no, type) {
        var router = this.$router;
        var params = new URLSearchParams();
        params.append('no', no);
        params.append('type', type);

        if (type === '0') {
          router.push({
            name : 'read',
            params : {
              'no' : no
            }
          })
        }
        else if (type === '1') {
          router.push({
            name : 'inforead',
            params : {
              'no' : no
            }
          });
        }
      },
      daily() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/hotrank/daily')
          .then(res => {
                this.hotList = res.data.sort((a,b) => { return a.date > b.date ? -1 : 1; });
          });
      },
      week() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/hotrank/week')
          .then(res => {
                this.hotList = res.data.sort((a,b) => { return a.date > b.date ? -1 : 1; });
          });
      },
      month() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/hotrank/month')
          .then(res => {
                this.hotList = res.data.sort((a,b) => { return a.date > b.date ? -1 : 1; });
          });
      },
      total() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/hotrank')
          .then(res => {
                this.hotList = res.data.sort((a,b) => { return a.date > b.date ? -1 : 1; });
          });
      },
    }
  }
</script>