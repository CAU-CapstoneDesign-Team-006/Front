<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
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
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        mounted() {
            window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
            // console.log(this.$route.params)
            
        },

        methods : {
            initMap() {
                var vm = this;
                var container = document.getElementById('map-canvas'); 
                var options = { 
                    center: new kakao.maps.LatLng(37.564214, 127.001699), 
                    level: 3 
                }; 
                var map = new kakao.maps.Map(container, options); 
                kakao.maps.event.addListener(map, 'idle', function() {
                    vm.fetchMarker(map);
                });
                vm.fetchMarker(map);
            }, 
            addScript() { 
                const script = document.createElement('script'); /* global kakao */ 
                script.onload = () => kakao.maps.load(this.initMap); 
                script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a7578f58544246c17d8dbff43d4b7902'; 
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

                const params = new URLSearchParams();
                params.append('latitude0', swLat);
                params.append('longitude0', swLng);
                params.append('latitude1', neLat);
                params.append('longitude1', neLng);
                axios
                    .post('http://ec2-13-125-55-59.ap-northeast-2.compute.amazonaws.com:3000/find', params) 
                    .then(res => { 
                        let mks = res.data;
                        for (var i in mks){
                            console.log(mks[i]);
                            var marker = new kakao.maps.Marker({
                                map: map,
                                position: new kakao.maps.LatLng(mks[i].latitude, mks[i].longitude)
                            });
                            marker.setMap(map);
                        }
                    })
                    .catch(ex =>{
                        console.log('why')
                    })
            }
        }
    }
</script>
<style>
</style>
