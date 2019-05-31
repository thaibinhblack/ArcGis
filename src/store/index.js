import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
import axios from 'axios'
import { async } from 'q';


const dataCX = null
const popupTemplate = { 
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
const init_featurelayer = {
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
}
const state = {
    map: null,
    view: null,
    message: 'Hello Vuex',
    feature: null,
    url: "https://tilis.vbgis.vn/arcgis/rest/services/DoThi/CayXanh/FeatureServer/0",
    action: null,
    show: false,
    featureLayer: null,
    init_featurelayer: init_featurelayer,
    popup: popupTemplate
}
const mutations = {
    setMap(state,map){
        state.map = map
    },
    setView(state,view){
        state.view = view
    },
    addFeature(state,feature)
    {
        state.feature = feature
    }

}
const actions = {
    async setMap({commit}, map){
        commit('setMap',map);
    },
    async setView({commit}, view)
    {
        commit('setView',view)
    },
    async addFeature({commit},feature){
        commit('addFeature',feature)
    }
}
const getters = {
    message(state){ return state.message}
}

export default new Vuex.Store({
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
})