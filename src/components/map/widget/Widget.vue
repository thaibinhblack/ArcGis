<template>
    <div>
        <div id="widget" class="esri-widget widget-addfeature">
            <AddFeature v-if="action == 'addFeature'" />
            <!-- <UpdateFeature v-if="action == 'updateFeature'" @updateaction="updateaction" /> -->
        </div>
    </div>
</template>

<script>
import AddFeature from './AddFeature.vue'
import UpdateFeature from './UpdateFeature.vue'

export default {
    name: 'widget',
    props: ["action"],
    watch:{
        
    },
    data(){
        return{
            modal: true
        }
    },
    components:{
        AddFeature,
        UpdateFeature
    },
    methods:{
        updateaction(val){
            this.$emit('updateaction',val)
            console.log("widget", val)
            console.log(this.action)
        }
    },
    mounted(){
    //    if(this.action == 'updateFeature'){
    //         this.modal = true
    //     }
    },
    created(){
        // if(this.action == 'updateFeature'){
        //     this.modal = true
            
        // }
        console.log('action created',this.action)
    },
    updated(){
        // this.$store.state.action = this.action
        // console.log(this.$store.state.action)
    }
}
</script>

<style>
.widget-addfeature {max-height:500px;overflow-y:scroll;padding:10px;}
</style>
