<template>
    <div id="app">
       
            <sidebar-menu :menu="menu"  @itemClick="onItemClick" />
            <Map v-bind:actionName="actionName" @updateaction="upadteaction" />
        
    </div>
</template>

<script>
import Map from './map/Map.vue'

export default {
    name: 'Index',
    data(){
        return{
            menu:[
                {
                    href: '/',
                    title: 'Trang Chủ',
                    icon: 'fa fa-home'
                },
                {
                    title: 'Quản Lý Cây Xanh',
                    icon: 'fa fa-pen',
                    nameEvent: 'NULL',
                    child:[
                        {
                            title: 'Thêm mới',
                            nameEvent: 'addFeature'
                        },

                    ]
                },
                {
                    title: 'Tìm Kiếm',
                    icon: 'fa fa-search',
                    nameEvent: 'Search'
                    
                }
            ],
            actionName: ''
           
        }
    },
    components:{
        Map,
        
    },
    methods:{
        
        onItemClick(event, item) {
            this.actionName = item.nameEvent
            // this.$store.state.action = item.nameEvent
            // console.log(item.nameEvent)
           
        },
        upadteaction(val){
            this.actionName = val
        }
        
    },
    mounted(){
        console.log(this.action);
       
    },
    created(){

    },
    
}
</script>

<style>
    .v-sidebar-menu.vsm-default {width:250px !important;}
</style>
