<template>
    <div style="margin-top: 200px ">
        <v-card width="700" height="500" class="mx-auto">
        <v-sheet width="400" height="380px" class="mx-auto" >
            <v-form fast-fail @submit.prevent="login(username)" v-model="isLoginValid">
                <v-row >
                <v-col style="margin-top: 40px">
                <v-card-text style="display: flex; align-items: center; margin-bottom: 20px;">
                    <v-icon size="50px" style="margin-right: 8px;">mdi-account </v-icon> <h1>LOGIN</h1>
                </v-card-text>
                <v-text-field variant="outlined" outlined v-model="username" label="Username"
                :rules="[() => !!username || 'Username Required']"
                ></v-text-field>

                <v-text-field variant="outlined" outlined v-model="password" label="Password"
                :rules="[() => !!password || 'Password Required']"
                @click:append="show1 = !show1"
              :type="show1 ? 'text' : 'password'"
                ></v-text-field>
                <a href="#" class="text-body-2 font-weight-regular">Forgot Password?</a>

                <!-- <v-btn :disabled="!isLoginValid" type="submit" color="primary" block class="mt-2">Sign in</v-btn> -->

           <v-btn :disabled="!isLoginValid" type="submit" color="primary" block class="mt-2" @click="login(username)"
                  v-bind="props"> Sign in </v-btn>
        </v-col>
    </v-row>
            </v-form>
            <div class="mt-2">
                <p class="text-body-2">Don't have an account? <a @click="goSign">Sign Up</a></p>
            </div>
        </v-sheet>
    </v-card>
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
        };
    },
    methods: {
        login(username) {
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