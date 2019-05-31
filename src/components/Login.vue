<template>

    <mdb-card class="col-md-4" style="margin:auto;margin-top:50px;">

        <mdb-card-body class="mx-4">
            <div class="text-center">
                <h3 class="dark-grey-text mb-5"><strong>Sign up</strong></h3>
            </div>
            <mdb-input label="Your email" type ="email" v-model="username"/>
            <mdb-input label="Your password" type="password" v-model="password" containerClass="mb-0"/>
            
            <div class="text-center mb-3">
                <mdb-btn type="button" gradient="blue" rounded class="btn-block z-depth-1a" @click="login">Sign up</mdb-btn>
            </div>
            <p class="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign up with:</p>
            <div class="row my-3 d-flex justify-content-center">
                <mdb-btn type="button" color="white" rounded class="mr-md-3 z-depth-1a"><mdb-icon fab icon="facebook" class="blue-text text-center"/></mdb-btn>
                <mdb-btn type="button" color="white" rounded class="mr-md-3 z-depth-1a"><mdb-icon fab icon="twitter" class="blue-text"/></mdb-btn>
                <mdb-btn type="button" color="white" rounded class="z-depth-1a"><mdb-icon fab icon="google-plus" class="blue-text"/></mdb-btn>
            </div>
        </mdb-card-body>
        <mdb-modal-footer class="mx-5 pt-3 mb-1">
            <p class="font-small grey-text d-flex justify-content-end">Not a member? <a href="#" class="blue-text ml-1"> Sign In</a></p>
        </mdb-modal-footer>
    </mdb-card>
</template>
<script>
    import {mdbInput, mdbBtn, mdbCard, mdbCardBody, mdbModalFooter, mdbIcon } from 'mdbvue';
    import axios from 'axios'
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    // import bcrypt from 'bcrypt'
    export default {
        name: 'Login',
        components: {
            mdbInput,
            mdbBtn,
            mdbCard,
            mdbCardBody,
            mdbModalFooter,
            mdbIcon,
        },
        data() {
            return {
                username: null,
                password: null
            };
        },
        methods: {
            login(){
             
                // const saltRounds = 10;
                // const myPlaintextPassword = 's0/\/\P4$$w0rD';
                // const someOtherPlaintextPassword = 'not_bacon';
                // this.password = bcrypt.genSalt(10, function(err, salt) {
                //             bcrypt.hash(this.password, salt, function(err, hash) {
                //                 return hash
                //             });
                //         })
                // const FormData = new FormData()
                // FormData.append(this.username,this.password)
                // console.log(this.password)
                // axios({
                //     url:"http://127.0.0.1:8000/api/user-token/",
                //     method: 'POST',
                //     data: {
                //         username: this.username,
                //         password: this.password
                //     },
                //     headers:{
                //         'Content-Type': 'application/x-www-form-urlencoded'
                //     }
                // }).then((response) => {
                //     console.log(response)
                // }).catch((error) => {
                //     console.log(error)
                // })
                console.log('user',this.username,'password',this.password)
                axios.post("https://dtvithanh.vbgis.vn/api/login",
                {
                    username:  this.username,
                    password: this.password
                },
                {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*'
                    }
                }
                
                ).then((response) => {
                       console.log(response) 
                }).catch((error) => {
                    console.log(error)
                })
               
                
            }
        }
    }
</script>
<style scoped>
    .font-small {
        font-size: 0.8rem;
    }
</style>