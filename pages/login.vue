<template>

  <v-row style="background:url('/cover-triangle.jpg');   
  background-position: center;
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-attachment: fixed;
    background-repeat: no-repeat;
  background-size: 100% 100%;
  height:95vh; width:100vw !important;
   " justify="center">

    <v-col class="" cols="6" 
          >
           <v-card style="" >
        <v-row>
       
             <v-col cols="6">
        <div class="" style=" padding:2rem; ">
        <v-card-title class="text-h3">Login</v-card-title>
     
           <v-text-field
            v-model="name"
            label="Username"
            required
          ></v-text-field>
        <v-text-field
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            
            :type="show ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 7 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>
        <v-card-actions>
          <v-btn color="green" class="white--text" @click="login">LOGIN</v-btn>
        </v-card-actions>
      
        </div>
          </v-col>
        <v-col cols="6">
          <div class=""  style="margin-top:5rem; background-color:white;">
              <h1 class="display-2 red--text font-weight-bold">Redglee</h1>
              <h1 class="display-1 red--text font-weight-bold">Delivery Tracking</h1>
         </div>
        </v-col>
        
        </v-row>
        </v-card>
         <v-alert
      v-model="alert"
      border="bottom"
      colored-border
      close-text="Close"
      color="red"
      style="white--text"
      dense
      prominent
      dismissible
    >
      <h1 class="red--text">Login Failed</h1>
    </v-alert>
    </v-col>
   
  </v-row>

</template>


<script>
export default {
  data() {
      return {
        show: false,
        name:"",
        password:"",
        alert:false
      };
    },
    methods: {
      async login(){
     
        try {
        let username = this.name;
        let password = this.password;
        let response = await this.$auth.loginWith('local',  { data:{ username, password    } })
        
        } catch (err) {
          this.alert = true;
          await this.$auth.logout();
        }
      }
    },
    mounted() {
      if(this.$auth.loggedIn == true){
        this.$router.push('/')
      }
    },
}
</script>