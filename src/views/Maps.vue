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
                var container = document.getElementById('map-canvas'); 
                var options = { 
                    center: new kakao.maps.LatLng(33.450701, 126.570667), 
                    level: 3 
                    }; 
                var map = new kakao.maps.Map(container, options); //마커추가하려면 객체를 아래와 같이 하나 만든다. 
                var marker = new kakao.maps.Marker({ position: map.getCenter() }); 
                marker.setMap(map); 
                var that = this;
                kakao.maps.event.addListener(map, 'idle', function() {
                    
                    console.log('hi');
                    that.findBounds(map);
                });
            }, 
            addScript() { 
                const script = document.createElement('script'); /* global kakao */ 
                script.onload = () => kakao.maps.load(this.initMap); 
                script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a7578f58544246c17d8dbff43d4b7902'; 
                document.head.appendChild(script); 
            },
            findBounds(map) {
                var bounds = map.getBounds();
                var sw = bounds.getSouthWest(); 
                var ne = bounds.getNorthEast(); 
                var swLat = sw.getLat();
                var swLng = sw.getLng();
                var neLat = ne.getLat();
                var neLng = ne.getLng();

                const params = new URLSearchParams();
                params.append('swLat', swLat);
                params.append('swLng', swLng);
                params.append('neLat', neLat);
                params.append('neLng', neLng);

                // axios
                //     .post("sdkjfsklfdslkf", params);
                //     .then((res) => {
                //         var markers = [];
                //         res.forEach((mark) => {
                //             markers.push(mark);
                //         });

                //     })
            }
        }
    }
</script>
<style>
</style>
