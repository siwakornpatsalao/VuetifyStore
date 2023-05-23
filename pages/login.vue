<template>
    <div style="margin-top: 200px ">
        <v-card width="450" class="mx-auto">
        <v-sheet width="400" height="380px" class="mx-auto" >
            <v-form fast-fail @submit.prevent="login(username)" v-model="isLoginValid">
                <v-card-text style="display: flex; align-items: center; margin-bottom: 20px;">
                    <v-icon style="margin-right: 8px;">mdi-account </v-icon> <h2>LOGIN</h2>
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

                <v-dialog
              v-model="dialog"
              width="500px"
              height="500px"
            >
              <template v-slot:activator="{ props }">
           <v-btn :disabled="!isLoginValid" type="submit" color="primary" block class="mt-2" @click="login(username)"
                  v-bind="props"> Sign in </v-btn></template>
                  <v-card width="500px"
              height="80px">
                <v-card-text>
                 <h1 style="margin-top: 10px"> {{dialogText}}</h1>
                </v-card-text>
              </v-card>
            </v-dialog> 

            </v-form>
            <div class="mt-2">
                <p class="text-body-2">Don't have an account? <a @click="goSign">Sign Up</a></p>
            </div>
        </v-sheet>
    </v-card>
    </div>
</template>
<script>
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
            a.forEach(user =>{
                if(user.username == this.username){
                console.log("Have this username");
                exist = true;
                this.checkPassword(user,username);
                }
            })
            if(exist == false){
                this.dialog = true;
                this.dialogText = "No username in database"
            }
        },
        checkPassword(user,username){
            if(user.password == this.password){
                this.$router.push({name:"index",params:{username}});
            }else{
                this.dialog = true;
                this.dialogText = "Password is wrong"
            }
        },
        goSign(){
            this.$router.push({name:"register"});
        }
    },
}
</script>