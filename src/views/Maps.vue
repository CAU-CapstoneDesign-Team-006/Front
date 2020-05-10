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
    export default {
        mounted() {
            window.kakao && window.kakao.maps ? this.initMap() : this.addScript();
            console.log(this.$route.params)
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
            }, 
            addScript() { 
                const script = document.createElement('script'); /* global kakao */ 
                script.onload = () => kakao.maps.load(this.initMap); 
                script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a7578f58544246c17d8dbff43d4b7902'; 
                document.head.appendChild(script); 
            }
        }
    }
</script>
<style>
</style>
