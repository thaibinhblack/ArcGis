<template>
    <div id="app">
    
        <div id="viewDiv">
            <load v-bind:loadding="loadding" />
            <widget v-if="action != null && action != 'Search'" v-bind:action="action" @updateaction="updateaction" />
            <UpdateFeature v-bind:showUpdate="showUpdate" @updateshowUpdate="updateshowUpdate" />
            <Search v-bind:show="show" @updateshow="updateshow" @goto="goto" @resetFeature="resetFeature"/>
        </div>
       
    </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import load from '../loading/Load.vue'
import widget from './widget/Widget.vue'
import UpdateFeature from './widget/UpdateFeature.vue'
import {mapActions} from 'vuex'
import { loadModules } from 'esri-loader'
import { getFeature, getLayer  } from '@esri/arcgis-rest-feature-layer';
import Search from './widget/Search.vue'
import { async } from 'q';
export default {
    name: 'Map',
    props: ["actionName"],
    watch:{
       async actionName(newVal,oldVal){
           this.action = newVal
           if(newVal == 'Search'){
               this.show = true
            //    console.log('Ssearch',this.show,newVal, oldVal)
           }
           else if(newVal == 'updateFeature')
           {
               this.showUpdate = true
           }
       },
    },
    data(){
        return{
            loadding: false,
            action: this.actionName,
            action: true,
            show: false,
            showUpdate: false
           
        }
    },
    components:{
        load,
        widget,
        Search,
        UpdateFeature
    },
    methods:{
        ...mapActions(['addFeature']),
        updateshow(val){
            this.show = val
            this.$emit("updateaction",null)
        },
        updateshowUpdate(val)
        {
            this.showUpdate = val
        },
        updateaction(val)
        {
            this.$emit("updateaction",val)
            this.action = val
        },
        goto(val){
            console.log('goto', val)
            // this.$store.state.map.highlight([val.attributes.objectId]);     
            this.$store.state.view.goTo({
                target: val.geometry,
               
                zoom: 200,
                highlightOptions: {
                    color: [255, 255, 0, 1],
                    haloOpacity: 0.5,
                    fillOpacity: 0.5
                }
            })
            const popupTemplate = this.$store.state.popup
            this.$store.state.view.popup.open({

                location: val.geometry,
                features: val,
                outFields: ["*"],
                title: "Cây "+val.attributes.SoHieu+" - "+val.attributes.MaTenCX+"",
                content:"<table class='esri-widget__table'> " +
          "<tr><th>Số Hiệu </th><td>" + val.attributes.SoHieu + "</td></tr> " +
          "<tr><th>Tên Cây Xanh</th><td>" + val.attributes.MaTenCX + "</td></tr> " +
          "<tr><th>Kinh độ </th><td>" + (val.attributes.KinhDo != null ? parseFloat(val.attributes.KinhDo) : '(Rỗng)') + "</td></tr> " +
          "<tr><th>Vĩ độ </th><td>" + (val.attributes.ViDo != null ? parseFloat(val.attributes.ViDo) : '(Rỗng)') + "</td></tr> " +
          "<tr><th>Đường Kính </th><td>" + parseFloat(val.attributes.DuongKinh) + "</td></tr> " +
          "<tr><th>Chiều Cao </th><td>" + parseFloat(val.attributes.ChieuCao) + "</td></tr> " +
          "<tr><th>Độ Rộng Tán </th><td>" + parseFloat(val.attributes.DoRongTan != null ? val.attributes.DoRongTan : '(Rỗng)') + "</td></tr> " +
          "<tr><th>Ngày Trồng </th><td>" + (val.attributes.NgayTrong != null ? val.attributes.NgayTrong : '(rỗng)') + "</td></tr> " +
          "<tr><th>Ngày Cập Nhật </th><td>" + val.attributes.NgayCapNhat + "</td></tr> " +
          "<tr><th>Thuộc Tính </th><td>" + (val.attributes.ThuocTinh != null ? val.attributes.ThuocTinh : '(rỗng)') + "</td></tr> " +
          "<tr><th>Ghi Chú </th><td>" + val.attributes.GhiChu + "</td></tr> " +
          "<tr><th>Tuyến Đường </th><td>" + val.attributes.TuyenDuong + "</td></tr> " +
          "<tr><th>NVKS_X </th><td>" + (val.attributes.NVKS_X != null ? val.attributes.NVKS_X : '(rỗng)') + "</td></tr> " +
          "<tr><th>NVKS_Y </th><td>" + (val.attributes.NVKS_Y != null ? val.attributes.NVKS_Y : '(rỗng)') + "</td></tr> " +
          "<tr><th>Người Cập Nhật </th><td>" + (val.attributes.NguoiCapNhat != null ? val.attributes.NguoiCapNhat : '(rỗng)') + "</td></tr> " +
          "</table> ",
                actions: [{
                    id: "showImg",
                    title: "Xem hình ảnh",
                    className: "esri-icon-media"
                }, {
                    id: "update-infor-tree",
                    title: "Cập nhật thông tin cây xanh",
                    className: "esri-icon-edit"
                }, {
                    id: "edit",
                    title: "Tới trang chỉnh sửa",
                    className: "esri-icon-home"
                }]
            })
        },
        resetFeature(){
            this.loadding = true
            loadModules([
                "esri/layers/FeatureLayer",
            ],{
                url: "https://js.arcgis.com/4.11/",
            }).then( async([FeatureLayer])=>{
                const featureLayer = new FeatureLayer(this.$store.state.init_featurelayer)
                this.$store.state.featureLayer = featureLayer
                await this.$store.state.map.add(featureLayer)
                this.loadding = false
            })
            
        },
        LoadMap(){
            this.loadding = true
            loadModules([
                "esri/Map",
                "esri/views/MapView",
                "esri/layers/FeatureLayer",
                "esri/Graphic"
            ],{
             url: "https://js.arcgis.com/4.11/",
           
            }).then(([Map,MapView,FeatureLayer, Graphic]) => {
                if(!this.$store.state.map)
                {
                    const map = new Map({
                        basemap: "osm",
                        // layers: this.features.features
                    });
                    this.$store.state.map = map
                   
                }
               
                // console.log(this.$store.state.map)
                if(!this.$store.state.view)
                {
                    const view = new MapView({
                        container: "viewDiv",
                        map: this.$store.state.map,
                        center:   [106.366362, 10.360622],
                        zoom: 13
                    });
                    this.$store.state.view = view
                }
        
                const featureLayer = new FeatureLayer({
                    url: "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0",
                    
                    title: "Cây Xanh",
                    outFields: ["*"],
                    popupTemplate: {
                        title: "Cây {SoHieu} - {MaTenCX}",
                        content:  [
                                {
                                    type: "fields",
                                    fieldInfos: [
                                        {
                                        fieldName: "SoHieu",
                                        label: "Số Hiệu"
                                        },
                                        {
                                        fieldName: "MaTenCX",
                                        label: "MÃ CÂY XANH"
                                        },
                                         {
                                        fieldName: "KinhDo",
                                        label: "Kinh Độ"
                                        },
                                        {
                                        fieldName: "ViDo",
                                        label: "Vĩ Độ"
                                        },
                                        {
                                        fieldName: "DuongKinh",
                                        label: "Đường Kính"
                                        },
                                        {
                                        fieldName: "ChieuCao",
                                        label: "Chiều Cao"
                                        },
                                        {
                                        fieldName: "DoRongTan",
                                        label: "Độ Rộng Tán"
                                        },
                                        {
                                        fieldName: "NgayTrong",
                                        label: "Ngày Trồng"
                                        },
                                        {
                                        fieldName: "NgayCapNhat",
                                        label: "Ngày Cập Nhật"
                                        },
                                        {
                                        fieldName: "ThuocTinh",
                                        label: "Thuộc Tính"
                                        },
                                        {
                                        fieldName: "GhiChu",
                                        label: "Ghi Chú"
                                        },
                                        {
                                        fieldName: "MaTinhTrang",
                                        label: "Mã Tình Trạng"
                                        },
                                        {
                                        fieldName: "TuyenDuong",
                                        label: "Tuyến Đường"
                                        },
                                        {
                                        fieldName: "NVKS_X",
                                        label: "NVKS_X"
                                        },
                                        {
                                        fieldName: "NVKS_Y",
                                        label: "NVKS_Y"
                                        },
                                        
                                    ]
                                }
                            ],
                        actions: [{
                            id: "showImg",
                            title: "Xem hình ảnh",
                            className: "esri-icon-media"
                        }, {
                            id: "update-infor-tree",
                            title: "Cập nhật thông tin cây xanh",
                            className: "esri-icon-edit"
                        }, {
                            id: "edit",
                            title: "Tới trang chỉnh sửa",
                            className: "esri-icon-home"
                        }]
                    }
                });
                
                

                this.$store.state.map.add(featureLayer);
                this.$store.state.featureLayer = featureLayer
                if(this.action != null)
                {
                        this.$store.state.view.ui.add("widget","top-right")
                }
                
                const popup = this.$store.state.view.popup
                popup.viewModel.on("trigger-action", async(event) => {
                   
                    const objecid = await event.target.selectedFeature.attributes.OBJECTID
                    const url = "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0"

                    getFeature({
                        url,
                        id: objecid
                        }).then(async (feature) => {
                        
                             this.$store.state.feature =  await feature
                             this.action = 'updateFeature'
                             this.showUpdate = true
                        
                        this.addFeature(feature)
                        console.log('feature trong',this.$store.state.feature); // 42
                    });
                    console.log('feature mapp',this.$store.state.feature)
                    console.log(event)
                })
                console.log(this.update)
                console.log(this.$store.state.featureLayer)

                // this.$store.state.map.highlight()
               
            } )
        },
    },
    created(){
        getLayer({
            url: this.$store.state.url
        })
        .then((response) => {
            console.log(response)
        })
    },
    mounted(){
        console.log("Start Mounted")
        // console.log('mouted',this.actionName)
        this.LoadMap()
    },
    updated(){
        console.log(this.action)
    }
}

</script>

<style>

#viewDiv {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
      padding-left:50px;
    }

</style>
