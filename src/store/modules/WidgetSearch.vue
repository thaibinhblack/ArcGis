<template>
  <div>
    <!-- Side Modal Top Right -->
  
    <mdb-modal fullHeight  position="right" direction="right" :show="showLocal" @close="show = false">
        <mdb-modal-header>
            <mdb-modal-title>Tìm Kiếm</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <div class="input-group md-form form-sm form-2 pl-0">
                <input @change="searchFeature" class="form-control my-0 py-1 lime-border" type="text" placeholder="Tìm kiếm theo tên cây xanh" aria-label="Search">
                <div class="input-group-append">
                    <span class="input-group-text lime lighten-2" id="basic-text1">
                    <mdbIcon icon="search"/>
                    </span>
                </div>
            </div>
            
        </mdb-modal-body>
        <mdb-modal-footer>
           
            <mdb-btn color="secondary" @click.native="showLocal(false)">Close</mdb-btn>
            <mdb-btn color="primary">Save changes</mdb-btn>
          

        </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>
<script>
  import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn , mdbInput, mdbIcon} from 'mdbvue'
 
  import { queryFeatures } from '@esri/arcgis-rest-feature-layer';

  export default {
    name: "Search",
    props: ["show"],
    model: {
        prop: 'show',
        event: 'updateshow'
    },
    computed:{
        showLocal: {
          get: function(){
            return this.show
          },
          set: function(value){
            this.$emit('updateshow',value)
          }
        }
    },
    data(){
        return{
            
        }
    },
    components: {
      mdbModal,
      mdbModalHeader,
      mdbModalTitle,
      mdbModalBody,
      mdbModalFooter,
      mdbBtn,
      mdbInput,
      mdbIcon
    },
    methods:{
       
        searchFeature(e){
            console.log(e.target.value)
        },
        filterTenCX(){
          axios.get('http://127.0.0.1:8000/api/getListSpecies/',{
           
          }).then((response) => {
             this.ListTenCX  = response.data
          })
        },
    },
    created(){
        console.log('featrue',this.$store.state.feature)
    },
   
  };
</script>