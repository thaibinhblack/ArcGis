<template>
    <div class="esri-widget ">
        <mdb-input placeholder="Disabled input" label="Disabled input" disabled />
    </div>
</template>
<script>
  import { mdbInput } from 'mdbvue'
  
  export default {
    name: "Input",
    components: {
      mdbInput
    },
  }
</script>
<style>

</style>
