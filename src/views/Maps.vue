<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <base-dropdown>
                <base-button slot="title" type="secondary" class="dropdown-toggle">
                    {{filter}}
                </base-button>
                <a class="dropdown-item" href="#" @click="markerFiltering('여가')">여가</a>
                <a class="dropdown-item" href="#" @click="markerFiltering('도넛')">도넛</a>
                <a class="dropdown-item" href="#" @click="markerFiltering('커피')">커피</a>
                <a class="dropdown-item" href="#" @click="markerFiltering('아이스크림')">아이스크림</a>
                <a class="dropdown-item" href="#" @click="markerFiltering('음식점')">음식점</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click="markerFiltering('all')">모두보기</a>
            </base-dropdown>
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0">
                        <div id="map-canvas" class="map-canvas" style="height: 600px;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <modal :show.sync="modals.modal0">
                <template slot="header">
                    <h5 class="modal-title" id="exampleModalLabel">상세정보</h5>
                </template>
                <div>
                {{ exp }}
                </div>
                <template slot="footer">
                    <base-button type="secondary" @click="modals.modal0 = false">Close</base-button>
                </template> 
            </modal>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import modal from '../components/Modal';

    export default {
        mounted() {
            window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
            // console.log(this.$route.params)   
        },
        components: {
            modal
        },
        data() {
            return {
                mks : [],
                modals: {
                    modal0 : false
                },
                exp : String,
                kakaomap : Object,
                markers: [],
                filter: "all",
                category: {
                    '도넛' : 'img/icons/donut.png',
                    '커피' : 'img/icons/coffee.png',
                    '아이스크림' : 'img/icons/ice.png',
                    '음식점' : 'img/icons/rest.png',
                    '여가' : 'img/icons/movie.png',
                },
                lat : 37.564214,
                lon : 127.001699
            }
        },
        methods : {
            initMap() {
                var vm = this;
                var container = document.getElementById('map-canvas');
                var options = { 
                    center: new kakao.maps.LatLng(vm.lat, vm.lon), 
                    level: 3 
                }; 
                var map = new kakao.maps.Map(container, options); 
                vm.kakaomap = map;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        vm.lat = position.coords.latitude // 위도
                        vm.lon = position.coords.longitude; // 경도
                        var locPosition = new kakao.maps.LatLng(vm.lat, vm.lon)
                        map.setCenter(locPosition);
                    });
                } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                    console.log("현재위치 조회 불가")
                }
                kakao.maps.event.addListener(map, 'idle', function() {
                    vm.fetchMarker(map);
                });
                vm.fetchMarker(map);
            }, 
            addScript() { 
                const script = document.createElement('script'); /* global kakao */ 
                script.onload = () => kakao.maps.load(this.initMap); 
                script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a7578f58544246c17d8dbff43d4b7902&libraries=services'; 
                document.head.appendChild(script); 
            },
            fetchMarker(map) {
                var bounds = map.getBounds();
                var sw = bounds.getSouthWest(); 
                var ne = bounds.getNorthEast(); 
                var swLat = sw.getLat();
                var swLng = sw.getLng();
                var neLat = ne.getLat();
                var neLng = ne.getLng();
                var vm = this;
                let dup_lat = [];
                let dup_lon = [];
                const params = new URLSearchParams();
                params.append('latitude0', swLat);
                params.append('longitude0', swLng);
                params.append('latitude1', neLat);
                params.append('longitude1', neLng);
                axios
                    .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/find', params) 
                    .then(res => {
                        vm.mks = res.data
                        for (let i in vm.markers){
                            vm.markers[i].setMap(null);
                        }
                        vm.markers = [];
                        for (var i in vm.mks){
                            console.log(map.getLevel())
                            if (map.getLevel() < 6){
                                for (var j in dup_lat){
                                    if (dup_lat[j] == vm.mks[i].latitude){
                                        if(dup_lon[j] == vm.mks[i].longitude){
                                            vm.mks[i].longitude += 0.00015
                                        }
                                    }
                                }
                                dup_lat.push(vm.mks[i].latitude);
                                dup_lon.push(vm.mks[i].longitude);
                            }
                            var imageSrc = vm.category[vm.mks[i].category], // 마커이미지의 주소입니다    
                            imageSize = new kakao.maps.Size(47, 47), // 마커이미지의 크기입니다
                            imageOption = {offset: new kakao.maps.Point(47, 47)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
                            let marker = new kakao.maps.Marker({
                                map: map,
                                position: new kakao.maps.LatLng(vm.mks[i].latitude, vm.mks[i].longitude),
                                zIndex: i,
                                image: markerImage
                            });
                            kakao.maps.event.addListener(marker, 'click', function() {
                                let temp = marker.getZIndex();
                                vm.exp = vm.mks[temp].name + "(" + vm.mks[temp].category + ")" + " : " + vm.mks[temp].information 
                                vm.modals.modal0 = true;
                            });
                            vm.markers.push(marker);
                        }
                        vm.markerFiltering(vm.filter);
                    })
                    .catch(ex =>{
                        console.log(ex)
                    })
            },
            markerFiltering(filter) {
                var vm = this;
                let map = vm.kakaomap;
                vm.filter = filter;
                if (vm.filter == "all"){
                    for (let i in vm.markers){
                        vm.markers[i].setMap(map);
                    }
                }
                else {
                    for (let i in vm.markers){
                        let temp = vm.markers[i].getZIndex();
                        if (vm.mks[temp].category == vm.filter){
                            vm.markers[i].setMap(map)
                        }
                        else {
                            vm.markers[i].setMap(null);
                        }
                    }
                }
            }
        }
    }
</script>
<style>
</style>
