<template>
    <div>
       <v-container>
           <v-row>
               <v-col>
                    <v-card
                            class="mx-auto"
                            style="max-width: 50%;"                          
                        >
                            
                            <v-card-title>
                            <h1 class="grey--text">Password Reset</h1>
                            </v-card-title>
                            <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field
                                                v-model="password"
                                                autocomplete='new-password'
                                                :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show_password ? 'text' : 'password'"
                                                @click:append="show_password = !show_password"
                                                label="Password"
                                                hide-details="auto"
                                                ></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field
                                                v-model="re_password"
                                                autocomplete='new-password'
                                                :append-icon="show_retype_password ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="show_retype_password ? 'text' : 'password'"
                                                @click:append="show_retype_password = !show_retype_password"
                                                label="Retype Password"
                                                hide-details="auto"
                                                ></v-text-field>
                                </v-col>
                                
                                <v-col>
                                    <v-text-field
                                                v-model="reset_code"
                                                autocomplete='new-password'
                                                label="Activation Code"
                                                type="number"
                                                hide-details="auto"
                                                ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                <strong class="red--text">{{error_status}}</strong>
                                </v-col>
                            </v-row>
                            </v-container>
                     

                            <v-card-actions>
                            <v-btn
                                color="green"
                                class="white--text"
                                @click="change_password"
                            >
                                SAVE
                            </v-btn>
                            </v-card-actions>
                               <v-alert
                                v-model="error_alert"
                                border="bottom"
                                colored-border
                                close-text="Close"
                                color="red"
                                style="white--text"
                                dense
                                prominent
                                dismissible
                                >
                                <v-row align="center">
                                    <v-col class="grow">
                                    <h1 class="red--text">Password Reset failed</h1>
                                    <strong  class="red--text">{{error_alert_details}}</strong>
                                    </v-col>
                                </v-row>

                                </v-alert>
                                 <v-alert
                                v-model="success_alert"
                                border="bottom"
                                colored-border
                                close-text="Close"
                                color="green"
                                style="white--text"
                                dense
                                prominent
                                dismissible
                                >
                                <v-row align="center">
                                    <v-col class="grow">
                                    <h1 class="green--text">Password Reset Success</h1>
                                    <strong v-if="success_agent == 'agent'" class="green--text">Your password have been updated, please login with the new password through the mobile application.</strong>
                                    <strong v-if="success_agent == 'user'" class="green--text">Your password have been updated, please login with the new password through here.</strong>
                                    </v-col>
                                    <v-col v-if="success_agent == 'user'" class="shrink">
                                    <v-btn color="green" class="white--text" to="/login">Login Now</v-btn>
                                    </v-col>
                                </v-row>
                                </v-alert>
                        </v-card>
               </v-col>
           </v-row>
        </v-container> 
    </div>
</template>

<script>
export default {
    auth: 'guest',
    asyncData({params}) {
        var slug = params.password;
        return{slug}
    },
    data() {
        return {
            password:"",
            re_password:"",
            reset_code:"",
            show_password:false,
            show_retype_password:false,
            error_status:"",
            error_alert:false,
            error_alert_details:"",
            success_alert:false,
            success_agent:""
        }
    },
    created() {

    },
    async mounted() {
               // if(this.slug){this.$router.push('/login');}
       // if(this.slug == null){this.$router.push('/login');}
       if(!this.slug){
           this.$router.push('/');
       }
       
    },
    methods: {
        check_token(){

        },
        async change_password(){
            try{
                this.error_status = null;
           const key =  this.slug;
           if(key == undefined ){return}
           if(this.password != this.re_password){
               this.$toast.error("Password mismatch!");
               this.error_status = "Error : Password mismatch.."
               return;
           }
           if(this.password == ""){return}
           if(this.reset_code == ""){
               this.error_status = "Error : Authentication code required";
               return;
            }
            if(this.password.length < 7){
                this.error_status = "Error : Password minimum length of 7 is required";
               return;
            }
            if(this.reset_code.length != 6){
                this.error_status = "Error : Activation code is 6 digits";
               return;
            }
           const reset_confirm =await  this.$axios.post('/api/auth/change/password',{key:key,password:this.password,auth_code:this.reset_code});
           console.log(reset_confirm)
           if(reset_confirm.data.status == true){
               this.error_alert = false;
               this.success_alert = true;
               this.success_agent = reset_confirm.data.data.agent;
           }else{
               this.success_alert = false;
               
               switch (reset_confirm.data.error) {
                   case "no_key":
                       this.error_alert_details = "Invalid Reset Link";
                       break;
                   case "no_pass":
                       this.error_alert_details = "No Password provided";
                       break;
                   case "no_code":
                       this.error_alert_details = "No Authentication code provided";
                       break;
                   case "no_user":
                       this.error_alert_details = "Invalid Reset Link";
                       break;
                   case "notfound":
                       this.error_alert_details = "Invalid Reset Link";
                       break;
                   case "expired":
                       this.error_alert_details = "Reset Link Expired";
                       break;

               }

               this.error_alert = true;
               this.password = "";
               this.re_password = "";
               this.reset_code = "";
           }
            }catch(err){
                //this.$router.push('/'); 
                this.password = "";
               this.re_password = "";
               this.reset_code = "";
            }
        },
        get_form_toekn(){

        }
    },

}
</script>