<template>
  <div class="card shadow" 
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col d-flex justify-content-between" >
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
                <a class="dropdown-item" @click = "restaurant()">음식점</a>
                <a class="dropdown-item" @click = "coffee()">커피</a>
                <a class="dropdown-item" @click = "icecream()">아이스크림</a>
                <a class="dropdown-item" @click = "bakery()">제과</a>
                <a class="dropdown-item" @click = "donut()">도넛</a>                
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
    
    <div>
      <div class="card shadow"
        :class="type === 'dark' ? 'bg-default': ''">
        <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col d-flex justify-content-between" >
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            Card
          </h3>
          <h4>
            Search
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>
              <template>
                <a class="dropdown-item" @click = "KBcard()">KB국민카드</a>
                <a class="dropdown-item" @click = "IBKcard()">IBK기업카드</a>
                <a class="dropdown-item" @click = "allcard()">모두보기</a>                
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
                  자영업자
                </h3>
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
          <base-pagination id = "pagenum" :page-count='pagination.pageCount' v-model='value'></base-pagination>
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
    data() {
      return {
        franchise: [
        ],
        card : [
        ],
        accommodation : [
        ],
        store : [
        ],
        value : 1,
        pagination: {
          default : 1,
          pageCount : 1,
        }
      }
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
        axios
        .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/showstore/' + 1 )
        .then(res => {
          this.store = res.data;
          console.log(this.store)
        })
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/showstore/totalpage')
          .then(res => {
            this.pagination.pageCount = res.data.total;
          })

          
      },
    methods : {
      vacation() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
          .then(res => {
            this.franchise = res.data.filter((v) => {return v.category === '여가'});
          });
      },
      restaurant() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
          .then(res => {
            this.franchise = res.data.filter((v) => {return v.category === '음식점'});
          });
      },
      coffee() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
          .then(res => {
            this.franchise = res.data.filter((v) => {return v.category === '커피'});
          });
      },            
      icecream() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
            .then(res => {
              this.franchise = res.data.filter((v) => {return v.category === '아이스크림'});
            })
      },
      bakery() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
            .then(res => {
              this.franchise = res.data.filter((v) => {return v.category === '제과'});
            })
      },
      donut() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
            .then(res => {
              this.franchise = res.data.filter((v) => {return v.category === '도넛'});
            })
      },
      all() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/franchise')
            .then(res => {
              this.franchise = res.data;
            })
      },
      KBcard() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/card')
            .then(res => {
              this.card = res.data.filter((v) => {return v.cardname === 'KB나라사랑카드'});
            })
      },
      IBKcard() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/card')
            .then(res => {
              this.card = res.data.filter((v) => {return v.cardname === 'IBK나라사랑카드'});
            })
      },
      allcard() {
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/card')
            .then(res => {
              this.card = res.data;
            })
      },
    },
    watch: {
      value: function (newVal, oldVal) {
        var vm = this;
        console.log(vm.value);
        axios
          .get('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/showstore/' + vm.value)      
          .then(res => {
            this.store = res.data;
            console.log('hi')
          })
      }
    }
  }
</script>
<style>
</style>
