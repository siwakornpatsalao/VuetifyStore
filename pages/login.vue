<template>
    <div style="margin-top: 170px ">
        <v-row style="margin-left:300px">     
        <v-img src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" height="500" width="0"></v-img>
        <!-- <v-img src="https://img.freepik.com/premium-vector/video-game-shop-logo_1056-48.jpg" height="500" width="0"></v-img> -->
        <v-card style="margin-right: 370px" width="600" height="500">
        <v-sheet style="margin-top: 10px" width="400" height="380px" class="mx-auto" >
            
            <v-form fast-fail @submit.prevent="login(username)" v-model="isLoginValid">
                <v-row >
                <v-col style="margin-top: 30px">
                <v-card-text style="display: flex; align-items: center; margin-bottom: 20px;">
                    <v-icon size="50px" style="margin-right: 8px;">mdi-account </v-icon> <h1>LOGIN</h1>
                </v-card-text>
                <v-text-field variant="outlined" outlined v-model="username" label="Username"
                :rules="[() => !!username || 'Username Required']"
                ></v-text-field>

                <v-text-field variant="outlined" outlined v-model="password" label="Password"
                :rules="[() => !!password || 'Password Required']"
                @click:append="show = !show"
              :type="show ? 'text' : 'password'"
                ></v-text-field>
                <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>
                <br><br>

           <v-btn :disabled="!isLoginValid" type="submit" color="primary" block class="mt-2" @click="login(username)"
                  > Sign in </v-btn>
        </v-col>
    </v-row>
            </v-form>
            <div class="mt-2">
                <p class="text-body-2">Don't have an account? <a @click="goSign">Sign Up</a></p>
            </div>
        </v-sheet>
    </v-card>
</v-row>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            dialog: false,
            dialogText: "",
            username: "",
            password: "",
            isLoginValid: false,
            show: false,
        };
    },
    methods: {
        login(username) {
            if(JSON.parse(localStorage.getItem('User'))){
                let a = JSON.parse(localStorage.getItem('User'))
                let exist = false;
                for (let user of a) {
                    if(user.username == this.username){
                    console.log("Have this username");
                    exist = true;
                    this.checkPassword(user,username);
                    }
                }
                if(exist == false){
                    //Swal.fire('Hello, No username')
                    Swal.fire({
                        title: '<strong>No Username</strong>',
                        icon: 'error',
                    })
                }
            }else{
                Swal.fire({
                    title: '<strong>No Username</strong>',
                    icon: 'error',
                })
            }
        },
        checkPassword(user,username){
            if(user.password == this.password){
                localStorage.setItem("username", username);
                this.$router.push({name:"index"});
                //this.$router.push({name:"index",params:{username}});
            }else{
                Swal.fire({
                    title: '<strong>Password is wrong</strong>',
                    icon: 'error',
                })
            }
        },
        goSign(){
            this.$router.push({name:"register"});
        }
    },
}
</script>