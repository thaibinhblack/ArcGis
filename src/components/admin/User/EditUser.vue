<template>
  <form v-if="userLocal != null" v-on:submit.prevent="updateuserLocal">
    <!-- Side Modal Top Right -->

    <mdb-modal fullHeight  position="right" direction="right" :show="showLocal" @close="closemodal">
        <mdb-modal-header>
            <mdb-modal-title>Chỉnh sửa thông tin userLocal: {{userLocal.name}}</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <mdb-input v-model="userLocal.name" label="Name" size="sm"  required/>
            <mdb-input v-model="userLocal.nickname" label="NickName" size="sm" required />
            <select v-model="userLocal.gender" class="form-control" required>
                <option value="-1" selected>Gender</option>
                <option value="M">Male</option>
                <option value="F">FeMale</option>
            </select>
            <mdb-input v-model="userLocal.address.fax" label="Fax" size="sm" />
            <mdb-input v-model="userLocal.email" label="Email" size="sm" required />
            <mdb-input v-model="userLocal.address.line1" type="textarea" label="Address 1" size="sm" required />
            <mdb-input v-model="userLocal.address.line2" type="textarea" label="Address 2" size="sm" required />
            <!-- <mdb-input v-model="userLocal.address" type="textarea" label="Address" size="sm" required />
            <mdb-input v-model="userLocal.userLocalname" label="userLocalname" size="sm" required />
            <mdb-input v-model="userLocal.password" label="Password" size="sm" required />    -->
        </mdb-modal-body>
        <mdb-modal-footer>

            <mdb-btn type="submit" color="secondary">Cập nhật</mdb-btn>

        </mdb-modal-footer>
    </mdb-modal>
  </form>
</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, mdbIcon,
  mdbListGroup, mdbListGroupItem, mdbBadge} from 'mdbvue'

import Vue from 'vue'

import { async } from 'q'
Vue.use(Vuex)
export default {
  name: 'EdituserLocal',
  props: {
    user: {
      type: Object,
      required: true
    }
  },

  watch: {

    async user (newVal, oldVal) {
      if (newVal !== '') {
        this.userLocal = newVal
        this.showLocal = true
        console.log(newVal)
      }
    }
  },

  data () {
    return {

      showLocal: false,
      userLocal: null
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

    closemodal () {
      this.$emit('edited', null)
      this.showLocal = false
    },
    updateuserLocal () {

    }

  },
  created () {

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
