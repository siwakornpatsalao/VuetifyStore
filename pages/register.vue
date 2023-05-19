<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1"
        >Account Detail</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2"
        >Profile Detail</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step step="3">Final Step</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5" color="black" height="380px">
          <v-card-text>
            <v-text-field
              label="username"
              v-model="username"
              :rules="[() => !!username || 'UserName Required']">
          </v-text-field>
            <v-text-field
              label="gmail"
              v-model="gmail"
              :rules="[
                () => !!gmail || 'Gmail Required',
                () =>
                  !!/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(gmail) ||
                  'Gmail is not Valid',
              ]"
            ></v-text-field>
            <v-text-field
              label="password"
              v-model="password"
              :rules="[
                () => !!password || 'Password Required',
                () => password.length >= 8 || 'Min 8 character',
              ]"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :type="show1 ? 'text' : 'password'"
              counter
            >
            </v-text-field>
            <v-text-field
              label="confirm password"
              v-model="passwordC"
              :rules="[
                () => !!passwordC || 'Password Confirm Required',
                () => password == passwordC || 'Confirm Password not correct',
              ]"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
              :type="show1 ? 'text' : 'password'"
              counter
            >
            </v-text-field>

            <v-alert :value="alert" color="pink" >
              Some Fields is Empty
            </v-alert>

          </v-card-text>
        </v-card>

        <!--<v-btn color="primary" @click="e1 = 2"> Continue </v-btn>-->
        <v-btn color="primary" @click="toPage2"> Continue </v-btn>

        <v-btn @click="e1 = 1" text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-5" color="black" height="700px">
          <v-card-text>
            <v-text-field
              label="name"
              v-model="name"
              :rules="[() => !!name || 'Name Required']"
            ></v-text-field>
            <v-text-field
              label="surname"
              v-model="surname"
              :rules="[() => !!surname || 'Surname Required']"
            ></v-text-field>
            <v-autocomplete
              label="Place of Residence"
              v-model="city"
              :items="cities"
              :rules="[() => !!city || 'Place of Residence Required']"
            ></v-autocomplete>

            <v-row>
              <v-col>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Pick Your Date of Birth"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker  v-model="date" 
                      :max="new Date().toISOString().substr(0, 10)" 
                      @input="menu = false"
                      locale="th"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-card-text v-model="ageCal">
                  <div v-if="ageCal <= 0" >
                    <h1>Age is Available from 1 or more</h1>
                  </div>
                  <div v-else>
                    <h1>Your Age is {{ ageCal }} Years Old</h1>
                  </div>
                </v-card-text>
              </v-col>
            </v-row>
            
            <v-alert :value="alert2" color="pink">
              Some Fields is Empty
            </v-alert>
            
          </v-card-text>
        </v-card>

        <!--<v-btn color="primary" @click="e1 = 3"> Continue </v-btn>-->
        <v-btn color="primary" @click="toPage3"> Continue </v-btn>

        <v-btn @click="e1 = 1" text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card class="mb-5" height="200px">
          <h1>Congratulations, You're all setup!</h1>
          <!--<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Yellow_Happy.jpg/1200px-Yellow_Happy.jpg" height="100px">-->
        </v-card>
        
        <v-btn color="primary" @click="goTo(username)"> Go to Index Page </v-btn>

        <v-btn @click="reset">Create New Account</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      e1: 1,
      show1: false,
      username: "",
      name: "",
      surname: "",
      gmail: "",
      password: "",
      passwordC: "",
      alert: false,
      alert2: false,
      country: "",
      city: "",
      cities: [
        "Amnat Charoen", "Ang Thong", "Bangkok", "Bueng Kan", "Buri Ram", "Chachoengsao", "Chai Nat", "Chaiyaphum", "Chanthaburi", "Chiang Mai", "Chiang Rai", "Chon Buri", "Chumphon", "Kalasin", "Kamphaeng Phet", "Kanchanaburi", "Khon Kaen", "Krabi", "Lampang", "Lamphun", "Loei", "Lop Buri", "Mae Hong Son", "Maha Sarakham", "Mukdahan", "Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom", "Nakhon Ratchasima", "Nakhon Sawan", "Nakhon Si Thammarat", "Nan", "Narathiwat", "Nong Bua Lam Phu", "Nong Khai", "Nonthaburi", "Pathum Thani", "Pattani", "Phangnga", "Phatthalung", "Phayao", "Phetchabun", "Phichit", "Phitsanulok", "Phra Nakhon Si Ayutthaya", "Phuket", "Prachin Buri", "Prachuap Khiri Khan", "Ranong", "Rayong", "Roi Et", "Sa Kaeo", "Sakon Nakhon", "Samut Prakan", "Samut Sakhon", "Samut Songkhram", "Saraburi", "Satun", "Sing Buri", "Si Sa Ket", "Songkhla", "Sukhothai", "Suphan Buri", "Surat Thani", "Surin", "Tak", "Trang", "Trat", "Ubon Ratchathani", "Uthai Thani", "Uttaradit", "Yala", "Yasothon",],
      date: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: false,
      age: "",
      menu: false,
    };
  },
  computed: {
    form() {
      return {
        username: this.username,
        gmail: this.gmail,
        password: this.password,
        passwordC: this.passwordC,
      };
    },
    form2(){
      return{
        name: this.name,
        surname: this.surname,
        city: this.city,
        ageCal: this.ageCal,
      }
    },
    ageCal() {
      const birth = new Date(this.date);
      const now = new Date();
      const diff = now.getFullYear() - birth.getFullYear();
      if (now.getMonth() < birth.getMonth() || (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate())
      ) {
        return diff - 1;
      }
      return diff;
    },
  },
  methods: {
    toPage2() {
      let filled = true;
      Object.keys(this.form).forEach((forms) => {
        if (!this.form[forms]) {
          console.log(`"${forms}" is empty.`);
          this.alert = true;
          setTimeout(() => {
            this.alert = false;
          }, 5000);
          filled = false;
        }
      });
      if (filled) {
        this.e1 = 2;
      }
    },
    toPage3(){
      let filled = true;
      Object.keys(this.form2).forEach((forms) => {
        if (!this.form2[forms]) {
          console.log(`"${forms}" is empty.`);
          this.alert2 = true;
          setTimeout(() => {
            this.alert2 = false;
          }, 5000);
          filled = false;
        }
      });
      if (filled) {
        this.e1 = 3;
      }
    },
    goTo(username){
      this.$router.push({name:"index",params:{username}});
      //this.$router.push(`/`,this.username);
      console.log(this.username)
    },
    reset(){
      this.e1 = 1;
      this.username= "";
      this.name = "";
      this.surname = "";
      this.gmail ="";
      this.password = "";
      this.passwordC = "";
      this.country = "";
      this.city = "";
      this.ageCal = "";
    }
  },
  head() {
    return {
      title: "Register",
    };
  },
};
</script>
