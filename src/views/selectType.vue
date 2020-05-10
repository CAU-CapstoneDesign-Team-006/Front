<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
                <div class="card bg-secondary shadow border-0">

                    <div class="card-body px-lg-5 py-lg-4">

                    </div>
                    <div class="card-header bg-transparent">
                            <div class="text-muted text-center mb-1">
                            타입을 선택하세요.
                            </div>

                            <div class="btn-wrapper text-center">
                                <a href="#/dashboard" class="soldier btn btn-neutral btn-icon btn-size">
                                    <img src = "img/brand/soldier.png">
                                </a>
                                <a href='#/dashboard' class="others btn btn-neutral btn-icon btn-size">
                                    <img src = "img/brand/manager.png">
                                </a>
                                <p></p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            id : null,
            name : null,
            type : null,
        }
    },
    methods: {
        soldier() {
            axios.get('https://localhost:8080/#/login')
                .then(res => {
                    this.id = res.data.zu,
                    this.name = res.data.Ad,
                    this.type = 1
                }),
            axios.post('https://localhost:8080/#/login')
                .then(() => {
                    this.$router.push({
                        name : 'map',
                        params : {
                            'gmail' : this.id,
                            '이름' : this.name,
                            '타입' : this.type
                        }
                    })
                })
        },
        others() {
            axios.get('https://localhost:8080/#/login')
                .then(res => {
                    this.id = res.data.zu,
                    this.name = res.data.Ad,
                    this.type = 2
                }),
            axios.post('https://localhost:8080/#/login')
                .then(() => {
                    this.$router.push({
                        name : 'dashboard',
                        params : {
                            'gmail' : this.id,
                            '이름' : this.name,
                            '타입' : this.type
                        }
                    })
                })
        }
    }
}
</script>