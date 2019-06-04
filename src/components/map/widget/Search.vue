<template>
  <div>
    <!-- Side Modal Top Right -->

    <mdb-modal fullHeight  position="right" direction="right" :show="showLocal" @close="closemodal">
        <mdb-modal-header>
            <mdb-modal-title>Tìm Kiếm</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <div class="input-group md-form form-sm form-2 pl-0">

                <select @change="changeCX" class="browser-default custom-select" v-model="MaTenCX">
                      <option value="null">Cây Xanh</option>
                      <option v-for="cx in dataCX" v-bind:value="cx[0]">{{cx[1]}}</option>
                  </select>
            </div>
            <mdb-list-group v-if="MaTenCX != null">
              <div class="row" style="margin:15px 0!important">
                  <select @change="changeTuyenDuong" class="browser-default custom-select col-md-6" v-model="TuyenDuong">
                      <option value="-1">Tuyến Đường</option>
                      <option v-for="tuyenduong in ListTuyenDuong" v-bind:value="tuyenduong[0]">{{tuyenduong[1]}}</option>
                  </select>
                  <select @change="changeTrangThai" v-model="TrangThai" class="browser-default custom-select col-md-6">
                      <option value="-1" >Trạng Thái</option>
                      <option v-for="status in ListStatus" v-bind:value="status[0]">{{status[1]}}</option>
                  </select>

              </div>
              <mdb-list-group-item v-for="search in Seachtmp"  class="custom-item">
                <p><label>Tuyến đường:</label>

                <span v-for="tuyenduong in ListTuyenDuong" v-if="tuyenduong[0] == search.attributes.TuyenDuong">
                    {{tuyenduong[1]}}
                </span>

                </p>

                <p><label>Trạng Thái: </label>
                <span v-for="status in ListStatus" v-if="status[0] == search.attributes.MaTinhTrang">
                    {{status[1]}}
                </span>
                <span class="btn-goto"  v-on:click="gotoSearch(search)">
                  <mdb-icon icon="angle-double-right"  />
                </span>
                </p>

              </mdb-list-group-item>

            </mdb-list-group>

        </mdb-modal-body>
        <mdb-modal-footer>

            <mdb-btn color="secondary" @click.native="showLocal = false">Close</mdb-btn>
            <mdb-btn color="primary" @click="resetFeature">Reset</mdb-btn>

        </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, mdbIcon,
  mdbListGroup, mdbListGroupItem, mdbBadge} from 'mdbvue'

import { queryFeatures, queryRelated } from '@esri/arcgis-rest-feature-layer'
import { loadModules } from 'esri-loader'
import axios from 'axios'
import Vue from 'vue'
import Vuex, { mapState } from 'vuex'
import { async } from 'q'
Vue.use(Vuex)
export default {
  name: 'Search',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },

  watch: {
    async show (newVal, oldVal) {
      this.showLocal = newVal
    }
  },

  data () {
    return {
      showLocal: false,
      ListSearch: [],
      Seachtmp: [],
      ListStatus: [],
      ListTuyenDuong: [],
      TuyenDuong: -1,
      TrangThai: -1,
      MaTenCX: 'null',
      dataCX: null

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
    mdbIcon,
    mdbListGroup,
    mdbListGroupItem,
    mdbBadge
  },
  methods: {
    apiTenCX () {
      axios.get('http://127.0.0.1:8000/api/danh-sach-ten-cay-xanh/').then(async (response) => {
        this.dataCX = response.data
      })
    },
    apistatus () {
      axios.get('http://127.0.0.1:8000/api/danh-sach-trang-thai-cay-xanh/').then((response) => {
        this.ListStatus = response.data
      })
    },
    apituyenduong () {
      axios.get('http://127.0.0.1:8000/api/danh-sach-tuyen-duong').then((response) => {
        this.ListTuyenDuong = response.data
      })
    },
    resetFeature () {
      this.$emit('resetFeature')
      this.MaTenCX = null
      this.closemodal()
    },
    changeCX () {
      this.searchFeature(this.MaTenCX)
    },
    searchFeature (value) {
      this.$store.state.featureLayer.definitionExpression = "MaTenCX = '" + value + "'"

      // this.MaTenCX = e.target.value
      // console.log(this.$store.state.featureLayer)
      this.searchFeatureChungLoai(value)
    },
    searchFeatureChungLoai (value) {
      loadModules([

        'esri/tasks/support/Query',
        'esri/tasks/QueryTask',
        'esri/Graphic'
      ], {
        url: 'https://js.arcgis.com/4.11/'
      }).then(([ Query, QueryTask, Graphic]) => {
        var query = new Query()
        query.where = "MaTenCX = '" + value + "'"
        query.outFields = ['*']
        query.returnGeometry = true
        var queryTask = new QueryTask({
          url: this.$store.state.url
        })
        queryTask.execute(query)
          .then(async (result) => {
            console.log(result)
            this.ListSearch = await result.features
            this.Seachtmp = this.ListSearch
            // return ListSearch

            // this.$emit('resultSearch',ListSearch)
          })
          .otherwise(function (e) {
            console.log(e)
          })
      })
    },
    FilterCX (tuyenduong, tinhtrang) {
      if (tuyenduong != -1) {
        if (tinhtrang != -1) {
          this.Seachtmp = this.ListSearch.filter((value, index, array) => {
            // console.log('item',array[index].attributes.TuyenDuong)
            return array[index].attributes.TuyenDuong == tuyenduong && array[index].attributes.MaTinhTrang == tinhtrang
          })
        } else {
          this.Seachtmp = this.ListSearch.filter((value, index, array) => {
            return array[index].attributes.TuyenDuong == tuyenduong
          })
        }
      } else {
        if (tinhtrang != -1) {
          this.Seachtmp = this.ListSearch.filter((value, index, array) => {
            return array[index].attributes.MaTinhTrang == tinhtrang
          })
        } else {
          this.Seachtmp = this.ListSearch
        }
      }
    },
    filterTenCX () {
      axios.get('http://127.0.0.1:8000/api/getListSpecies/', {

      }).then((response) => {
        this.ListTenCX = response.data
      })
    },
    closemodal () {
      this.$emit('updateshow', false)
      this.showLocal = false
    },
    gotoSearch (value) {
      // alert('123')
      this.$emit('goto', value)
      this.closemodal()
    },
    changeTuyenDuong (e) {
      this.FilterCX(e.target.value, this.TrangThai)
      console.log('Search', this.ListSearch)
      console.log('Filter', this.Seachtmp)
      if (e.target.value == -1) {
        if (this.TrangThai == -1) {
          var $sql = "MaTenCX = '" + this.MaTenCX + "'"
        } else {
          var $sql = "MaTenCX = '" + this.MaTenCX + "' AND MaTinhTrang = '" + this.TrangThai + "'"
        }
        this.$store.state.featureLayer.definitionExpression = $sql
        // this.ListSearch = this.Seachtmp
      } else {
        if (this.ListSearch) {
          if (this.TrangThai == -1) {
            var $sql = "TuyenDuong = '" + e.target.value + "' AND MaTenCX = '" + this.MaTenCX + "'"
          } else {
            var $sql = "TuyenDuong = '" + e.target.value + "' AND MaTenCX = '" + this.MaTenCX + "' AND MaTinhTrang = '" + this.TrangThai + "' "
          }

          this.$store.state.featureLayer.definitionExpression = $sql
          console.log($sql)
        }
      }
    },
    changeTrangThai (e) {
      this.FilterCX(this.TuyenDuong, e.target.value)
      console.log('Search', this.ListSearch)
      console.log('Filter', this.Seachtmp)
      if (e.target.value == -1) {
        if (this.TuyenDuong == -1) {
          var $sql = "MaTenCX = '" + this.MaTenCX + "'"
        } else {
          var $sql = "MaTenCX = '" + this.MaTenCX + "' AND TuyenDuong = '" + this.TuyenDuong + "'"
        }
        this.$store.state.featureLayer.definitionExpression = $sql
        // this.ListSearch = this.Seachtmp
      } else {
        if (this.ListSearch) {
          if (this.TuyenDuong == -1) {
            var $sql = "MaTinhTrang = '" + e.target.value + "' AND MaTenCX = '" + this.MaTenCX + "'"
          } else {
            var $sql = "TuyenDuong = '" + this.TuyenDuong + "' AND MaTenCX = '" + this.MaTenCX + "' AND MaTinhTrang = '" + e.target.value + "' "
          }

          this.$store.state.featureLayer.definitionExpression = $sql
          console.log($sql)
        }
      }
    }
  },
  created () {
    this.apistatus()
    this.apituyenduong()
    this.apiTenCX()
  }

}
</script>
<style>
p{margin-bottom: 0 !important;font-size: 15px;}
span{font-size: 15px}
li.custom-item {display:inline-block !important}
.btn-goto {margin-left:10px; cursor: pointer; transition: cubic-bezier(0.075, 0.82, 0.165, 1);transition-duration: 1s;padding:15px 0}
.btn-goto:hover {color: skyblue;margin-left: 20px;}
</style>
