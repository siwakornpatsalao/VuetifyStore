<template>
  <div style="margin-top: 100px">
  <v-toolbar  class="mx-auto" width="700px" color="rgb(28, 123, 139)" >
      <v-toolbar-title>Add New Account</v-toolbar-title>
    </v-toolbar>
  <v-stepper class="mx-auto" style="max-width: 700px" v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1"
        >Account Detail</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2"
        >Profile Detail</v-stepper-step
      >
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-5" color="#121212" height="380px">
          <v-card-text>
            <v-form ref="form" v-model="isFormValid">
            <v-text-field
              label="username"
              v-model="username"
              :rules="[() => !!username || 'UserName Required', checkUsername]">
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
                  () => (password && password.length >= 8) || 'Min 8 characters',
                ]"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                :type="show1 ? 'text' : 'password'"
                counter
              ></v-text-field>
              <v-text-field
                label="confirm password"
                v-model="passwordC"
                :rules="[
                  () => !!passwordC || 'Password Confirm Required',
                  () => (password && passwordC && password === passwordC) || 'Confirm Password not correct',
                ]"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                :type="show1 ? 'text' : 'password'"
                counter
              ></v-text-field>

          </v-form>

          </v-card-text>
        </v-card>

        <!--<v-btn color="primary" @click="e1 = 2"> Continue </v-btn>-->
        <v-btn color="rgb(28, 123, 139)" :disabled="!isFormValid" @click="e1=2"> Continue </v-btn>

        <v-btn @click="e1 = 1" text>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-5" color="#121212" height="700px">
          <v-form ref="form2" v-model="isFormValid2">
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
                    <div v-if="ageCal>=1">
                      <h2>Your Age is {{ ageCal }} Years Old</h2>
                    </div>
                    <div v-else>
                      <h2>Age is Available from 1 or more</h2>
                    </div>
                  </v-card-text>
              </v-col>


            </v-row>
          </v-card-text>
        </v-form>
        </v-card>

       <v-dialog
              v-model="dialog"
              width="500px"
              height="500px"
            >
              <template v-slot:activator="{ props }">
           <v-btn color="primary" :disabled="ageCal<=0 || !isFormValid2" @click="dialog = true"
                  v-bind="props"> Continue </v-btn></template>
                  <v-card width="500px"
              height="150px">
                <v-card-text>
                 <h1 style="margin-top: 10px"> You're Adding New Account, Are you sure?</h1>
                </v-card-text>
                <v-card-actions style="margin-top:20px">
                  <v-btn color="primary" width="220px" @click="goTo(username)">Yes</v-btn>
                  <v-btn style="margin-left: 40px" color="grey" width="220px" @click="reset">Create New Account</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>


        <v-btn @click="e1 = 1" text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      e1: 1,
      dialog: false,
      show1: false,
      isFormValid: false,
      isFormValid2: false,
      username: "",
      name: "",
      surname: "",
      gmail: "",
      password: "",
      passwordC: "",
      alert: false,
      alert2: false,
      datas: [],
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
        name: this.name,
        surname: this.surname,
        city: this.city,
        ageCal: this.ageCal,
      };
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
    goTo(username) {
      if(JSON.parse(localStorage.getItem('User'))){
        let data = JSON.parse(localStorage.getItem('User'));
      if (!data) {
        data = [];
      }
      data.push(this.form);
      localStorage.setItem('User', JSON.stringify(data));
      this.$router.push({ name: "index", params: { username } });
      }else{
        this.datas.push(this.form);
        localStorage.setItem('User', JSON.stringify(this.datas));
        this.$router.push({ name: "index", params: { username } });
      }
    },
    reset(){
      this.e1 = 1;
      this.$refs.form.reset();
      this.$refs.form2.reset();
      this.date =  new Date().toISOString().substr(0, 10);
      this.dialog = false;
    },
    checkUsername() {
      if(JSON.parse(localStorage.getItem('User'))){
        const userData = JSON.parse(localStorage.getItem('User'));
      for (let user of userData) {
        if (user.username === this.username) {
          return 'Username already in use';
        }
      }
      return true;
      }
    }
  },
  head() {
    return {
      title: "Register",
    };
  },
};
</script>
