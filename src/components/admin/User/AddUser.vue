<template>
    <div>
        <form v-on:submit.prevent="addUser">
            <!-- Side Modal Top Right -->

            <mdb-modal fullHeight  position="right" direction="right" :show="showLocal" @close="closemodal">
                <mdb-modal-header>
                    <mdb-modal-title>Thêm mới user</mdb-modal-title>
                </mdb-modal-header>
                <mdb-modal-body>
                    <mdb-input v-model="user.firstname" label="First Name" size="sm"  required/>
                    <mdb-input v-model="user.lastname" label="Last Name" size="sm" required />
                    <select v-model="user.gender" class="form-control" required>
                        <option value="-1" selected>Gender</option>
                        <option value="0">Male</option>
                        <option value="1">FeMale</option>
                    </select>
                    <!-- <mdb-input label="Gender" size="sm" /> -->
                    <mdb-input v-model="user.mobile" label="Mobile" size="sm" required />
                    <mdb-input v-model="user.address" type="textarea" label="Address" size="sm" required />
                    <mdb-input v-model="user.username" label="Username" size="sm" required />
                    <mdb-input v-model="user.password" label="Password" size="sm" required />
                </mdb-modal-body>
                <mdb-modal-footer>

                    <mdb-btn type="submit" color="secondary">Thêm mới</mdb-btn>

                </mdb-modal-footer>
            </mdb-modal>
        </form>
        <!--  -->
    </div>
</template>
<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, mdbBtn, mdbInput, mdbIcon,
  mdbListGroup, mdbListGroupItem, mdbBadge} from 'mdbvue'

import Vue from 'vue'
import Vuex, { mapState } from 'vuex'


Vue.use(Vuex)
export default {
  name: 'AddUser',
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
      user: {
        gender: -1
      },
      showLocal: false

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
      this.$emit('updateshow', false)
      this.showLocal = false
    },
    addUser () {

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
