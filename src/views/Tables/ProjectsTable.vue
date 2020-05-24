<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col d-flex justify-content-between">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            Franchise
          </h3>
          <h4>
            Search
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>
              <template>
                <a class="dropdown-item" @click = "vacation()">여가</a>
                <a class="dropdown-item" @click = "dessert()">디저트</a>
                <a class="dropdown-item" @click = "restaurant()">음식점</a>
                <a class="dropdown-item" @click = "cafe()">카페</a>
                <a class="dropdown-item" @click = "all()">모두보기</a>                
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
                  :data="franchise">
              <template slot="columns">
                <th>Name</th>
                <th>Information</th>
                <th>Category</th>
                <th></th>
              </template>

              <template slot-scope="{row}">
                <th scope="row">
                  <div class="media align-items-center">
                    <div class="media-body">
                      <span class="name mb-0 text-sm">{{row.name}}</span>
                    </div>
                  </div>
                </th>
                <td class="information">
                  {{row.information}}
                </td>
                <td class ="category">
                  {{row.category}}
                </td>


              </template>

            </base-table>
          </div>

      <div class="card-footer d-flex justify-content-end"
          :class="type === 'dark' ? 'bg-transparent': ''">
        <base-pagination total= 1></base-pagination>
      </div>
    
    <div>
      <div class="card shadow"
        :class="type === 'dark' ? 'bg-default': ''">
        <div class="card-header border-0"
            :class="type === 'dark' ? 'bg-transparent': ''">
            <div class="row align-items-center">
              <div class="col d-flex justify-content-between">
                <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                  Card
                </h3>
              </div>
            </div>
        </div>

        <div class="table-responsive">
        <base-table class="table align-items-center table-flush"
                   :class="type === 'dark' ? 'table-dark': ''"
                   :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                    tbody-classes="list"
                   :data="card">
        <template slot="columns">
        <th>Card</th>
        <th>Name</th>
        <th>Information</th>
        <th></th>
        </template>

        <template slot-scope="{row}">
        <th scope="row">
        <div class="media align-items-center">
          <div class="media-body">
            <span class="name mb-0 text-sm">{{row.cardname}}</span>
          </div>
        </div>
        </th>
        <td class="name">
        {{row.name}}
        </td>
        <td class ="information">
        {{row.information}}
        </td>


        </template>

        </base-table>
        </div>

        <div class="card-footer d-flex justify-content-end"
            :class="type === 'dark' ? 'bg-transparent': ''">
          <base-pagination total= 1></base-pagination>
        </div>
      </div>
    </div>  
        <div>
      <div class="card shadow"
        :class="type === 'dark' ? 'bg-default': ''">
        <div class="card-header border-0"
            :class="type === 'dark' ? 'bg-transparent': ''">
            <div class="row align-items-center">
              <div class="col d-flex justify-content-between">
                <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                  Accommodation
                </h3>
              </div>
            </div>
        </div>

        <div class="table-responsive">
        <base-table class="table align-items-center table-flush"
                   :class="type === 'dark' ? 'table-dark': ''"
                   :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                    tbody-classes="list"
                   :data="accommodation">
        <template slot="columns">
        <th>Name</th>
        <th>Address</th>
        <th>Information</th>
        <th>Phone</th>
        </template>

        <template slot-scope="{row}">
        <th scope="row">
        <div class="media align-items-center">
          <div class="media-body">
            <span class="name mb-0 text-sm">{{row.name}}</span>
          </div>
        </div>
        </th>
        <td class="name">
        {{row.address}}
        </td>
        <td class ="information">
        {{row.information}}
        </td>
        <td class = "phone">
        {{row.phone}}
        </td>


        </template>

        </base-table>
        </div>

        <div class="card-footer d-flex justify-content-end"
            :class="type === 'dark' ? 'bg-transparent': ''">
          <base-pagination total= 1></base-pagination>
        </div>
      </div>
    </div>  
  </div>
</div>

</template>
<script>
import axios from 'axios'
  export default {
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    mounted() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
          .then(res => {
            this.franchise = res.data;
          });
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/card')
          .then(res => {
            this.card = res.data;
          });
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/accommodation')
          .then(res => {
            this.accommodation = res.data;
          })
      },
    data() {
      return {
        franchise: [
        ],
        card : [
        ],
        accommodation : [
        ]
      }
    },
    
    methods : {
      vacation() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
          .then(res => {
            this.franchise = res.data.filter((v) => {return v.category === '여가'});
          });
      },
      dessert() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
            .then(res => {
              this.franchise = res.data.filter((v) => {return v.category === '디저트'});
            })
      },
      restaurant() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
            .then(res => {
              this.franchise = res.data.filter((v) => {return v.category === '음식점'});
            })
      },
      cafe() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
            .then(res => {
              this.franchise = res.data.filter((v) => {return v.category === '카페'});
            })
      },
      all() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
            .then(res => {
              this.franchise = res.data;
            })
      }
    }

  }
</script>
<style>
</style>
