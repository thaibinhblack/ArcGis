<template>
<div id="table-wrapper" class="ui" style="padding-left:55px;padding-top:25px;">
    <div class="row top-bar" >
       
        <button class="btn btn-info custom">Xuất File</button>
    </div>
    <div class="row top-bar" >
        <select class="col-md-2 form-control" v-model="actionUser">
            <option value="-1">Tác Vụ</option>
            <option value="1">Xóa</option>
            <option value="2">Thêm mới</option>
        </select>
        <button class="btn btn-info custom" @click="btnAction">Áp dụng</button>
        <AddUser v-bind:show="show"  @updateshow="updateshow" />
    </div>
  <vuetable ref="vuetable"
    api-url="https://vuetable.ratiw.net/api/users"
    :data="data"
    :fields="fields"
    :sort-order="sortOrder"
    :css="css.table"
    pagination-path=""
    :per-page="15"
    @vuetable:pagination-data="onPaginationData"
    @vuetable:loading="onLoading"        
    @vuetable:loaded="onLoaded"
  >
    <template slot="actions" scope="props">
      <div class="table-button-container">
          <button class="btn btn-warning btn-sm" @click="editRow(props.rowData)">
            <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
          <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
            <span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;&nbsp;
      </div>
    </template>
    </vuetable>
    <vuetable-pagination ref="pagination"
      :css="css.pagination"
      @vuetable-pagination:change-page="onChangePage"
    ></vuetable-pagination>
    <EditUser v-bind:user="user" @edited="edited" />
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import AddUser from './User/AddUser.vue'
import EditUser from './User/EditUser.vue'
import axios from 'axios'
export default {
    components:{
        Vuetable,
        VuetablePagination,
        AddUser,
        EditUser
    },
    data(){
        return{
            fields: [
                {
                    name: '__sequence',
                    title: '#',
                    titleClass: 'text-right',
                    dataClass: 'text-right'
                },
                // {
                //     name: '__checkbox',
                //     titleClass: 'text-center',
                //     dataClass: 'text-center',
                // },
                { 
                    name: 'name', 
                    title: '<span class="orange glyphicon glyphicon-user"></span> Full Name',
                    sortField: 'name'
                }, 
                {
                    name: 'email',
                    title: 'Email',
                    sortField: 'email'
                },
                'birthdate','nickname',
                {
                    name: 'gender',
                    title: 'Gender',
                    sortField: 'gender'
                },
                '__slot:actions'
                ],
                sortOrder: [
                { field: 'name', direction: 'asc' }
            ],
            css: {
                table: {
                    tableClass: 'table table-striped table-bordered table-hovered',
                    loadingClass: 'loading',
                    ascendingIcon: 'glyphicon glyphicon-chevron-up',
                    descendingIcon: 'glyphicon glyphicon-chevron-down',
                    handleIcon: 'glyphicon glyphicon-menu-hamburger',
                },
                pagination: {
                    infoClass: 'pull-left',
                    wrapperClass: 'vuetable-pagination pull-right',
                    activeClass: 'btn-primary',
                    disabledClass: 'disabled',
                    pageClass: 'btn btn-border',
                    linkClass: 'btn btn-border',
                    icons: {
                    first: '',
                    prev: '',
                    next: '',
                    last: '',
                    },
                }
            },
            showpage: "10",
            actionUser: -1,
            show: false,
            data: null,
            user: {}
        }
    },
    computed:{
  /*httpOptions(){
    return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
  },*/
 },
    methods: {
        onPaginationData (paginationData) {
        this.$refs.pagination.setPaginationData(paginationData)
        },
        onChangePage (page) {
        this.$refs.vuetable.changePage(page)
        },
        edited(val)
        {
            this.user = null
        },
        editRow(rowData){
            this.user = rowData
        // alert("You clicked edit on"+ JSON.stringify(rowData))
        },
        deleteRow(rowData){
        alert("You clicked delete on"+ JSON.stringify(rowData))
        },
        onLoading() {
        console.log('loading... show your spinner here')
        },
        onLoaded() {
        console.log('loaded! .. hide your spinner here')
        },
        btnAction(){
            if(this.actionUser == 2)
            {
                this.show =true
            }
        },
        updateshow(val){
            this.show =val
        },
        apiData()
        {
            axios.get('https://vuetable.ratiw.net/api/users').then((response) => {
                this.data = response.data
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    created()
    {
        this.apiData()
    }
}
</script>

<style>
    a.btn:not([href]):not([tabindex]), a.btn:not([href]):not([tabindex]):focus, a.btn:not([href]):not([tabindex]):hover {
        color: #333 !important;
    }
    .top-bar {margin-left:0px !important;margin-bottom:15px !important;}
    .btn-info.custom {padding: .375rem 1rem !important;margin:0 0 0 15px !important;}
</style>
