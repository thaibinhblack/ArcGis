<template>
  <div>
    <!-- Side Modal Top Right -->

    <mdb-modal fullHeight  position="right" direction="right" :show="show" @close="closemodal"  v-if="feature != null">
        <mdb-modal-header>
            <mdb-modal-title>{{feature.attributes.MaTenCX}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
             <mdb-input v-model="feature.attributes.SoHieu" label="Số Hiệu" size="sm" />
            <mdb-input v-model="feature.attributes.TuyenDuong" label="Tuyến Đường" size="sm" />
            <mdb-input v-model="feature.attributes.KinhDo" label="Kinh Độ" size="sm" disabled />
            <mdb-input v-model="feature.attributes.ViDo" label="Vĩ Độ" size="sm" />
            <mdb-input v-model="feature.attributes.ThuocTinh" label="Thuộc Tính" size="sm" />
            <mdb-input v-model="feature.attributes.DoRongTan" label="Độ Rộng Tán" size="sm" />
            <mdb-input v-model="feature.attributes.DuongKinh" label="Đường Kính" size="sm" />
            <mdb-input v-model="feature.attributes.MaTinhTrang" label="Mã Tình Trạng" size="sm" />
            <mdb-input type="datetime" v-model="feature.attributes.NgayTrong" label="Ngày Trồng" size="sm" />
            <!-- <mdb-input type="datetime" v-model="feature.attributes.NgayCapNhat" label="Ngày Cập Nhật" size="sm" /> -->
            <mdb-input v-model="feature.attributes.NguoiCapNhat" label="Người Cập Nhật" size="sm" />
        </mdb-modal-body>
        <mdb-modal-footer>

            <mdb-btn color="primary" @click="updateFeature">Save</mdb-btn>
            <mdb-btn color="primary" @click="deleteFeature">Delete </mdb-btn>

        </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput} from 'mdbvue'
import { deleteFeatures, updateFeatures } from '@esri/arcgis-rest-feature-layer'
import moment from 'moment'
export default {
  name: 'UpdateFeature',
  props: ['showUpdate'],
  watch: {
    async showUpdate (newVal, oldVal) {
      this.show = newVal
      console.log('showUpdate', newVal)
      this.feature = this.$store.state.feature
      this.feature.attributes.NgayTrong = moment(this.feature.attributes.NgayTrong).format('YYYY/MM/DD')
      console.log('NgayTrong', this.feature.attributes.NgayTrong)
    }
  },
  data () {
    return {
      show: false,
      feature: null,
      NgayCapNhat: moment().format('YYYY-MM-DD')
    }
  },
  components: {
    mdbModal,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbBtn,
    mdbInput
  },
  methods: {
    closemodal () {
      this.$emit('updateshowUpdate', false)
      this.show = false
    },
    getSome (dateValue) {
      return moment(dateValue, 'YYYY-MM-DD').unix()
    },
    deleteFeature () {
      deleteFeatures({
        url: this.$store.state.url,
        objectIds: [this.feature.attributes.OBJECTID]
      })
      alert('Bạn vừa xóa một cây xanh')
    },
    updateFeature () {
      this.feature.attributes.NgayCapNhat = this.NgayCapNhat
      updateFeatures({
        url: this.$store.state.url,
        features: [
          this.feature
        ]
      }).then((response) => {
        alert('cập nhật thành công')
        this.closemodal()
        this.$emit('goto', this.feature)
      }).catch((erorr) => {
        alert('cập nhật thất bại')
      })
    }

  },
  created () {
    console.log('featrue updated', this.$store.state.feature)
  },
  destroyed () {
    this.modal = true
  }
}
</script>
