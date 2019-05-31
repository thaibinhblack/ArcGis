<template>
  <div v-if="loadding == true" id="loading">
    <div class="spinner-border text-info" role="status">
        <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>
<script>
export default {
    name: "load",
    prop:["loadding"],
    data(){
        return{
            loadding: this.loadding
        }
    }
}
</script>
<style>
#loading {position: absolute;top:50%;left: 50%;transform: translate(-50%,-50%)}
.spinner-border {width: 5rem !important;height: 5rem !important;}
</style>
