<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>
                            <h2 class="grey--text">Profile</h2>
                              <v-divider
                                class="mx-4"
                                inset
                                vertical
                                ></v-divider>
                        </v-card-title>
                        <v-container>
                             <v-form
                                ref="form"
                                v-model="valid"
                                lazy-validation
                            >
                        <v-row>
                        
                            <v-col>
                                    <v-container>
                                        
                                <v-row>
                                    <v-col cols="5">
                                    <v-text-field
                                        v-model="username"
                                        label="Username"
                                        hide-details="auto"
                                        :rules=" username_rule"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="5">
                                        <v-text-field
                                            v-model="email"
                                            label="Email"
                                            hide-details="auto"
                                             :rules="email_rule"
                                            ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            v-model="first_name"
                                            label="First Name"
                                            hide-details="auto"
                                            :rules="required_rule"
                                            ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            v-model="middle_name"
                                            label="Middle Name"
                                            hide-details="auto"
                                            ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-text-field
                                            v-model="last_name"
                                            label="Last Name"
                                            hide-details="auto"
                                            
                                            ></v-text-field>
                                    </v-col>
                                </v-row>
                                    <v-row style="border-style: solid; border-color: grey;  border-width: 1px;" class="">
                                        <h3 style="padding:2%;" class="grey--text">
                                            Security
                                        </h3>
                                        <v-col cols="4">
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
                                        <v-col cols="4">
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
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                        <v-label>Phone Number</v-label>
                                           <vue-tel-input v-model="phone_number"></vue-tel-input>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col v-if="this.$auth.user.role != 'S'">
                                             <v-select
                                            :items="teams"
                                            multiple
                                            hint="Select teams to manage "
                                            item-text="team_name"
                                            label="Teams"
                                            persistent-hint
                                            v-model="team_selected"
                                            ></v-select>
                                        </v-col>
                                        <v-col v-if="this.$auth.user.role != 'S'">
                                            <v-switch
                                                v-model="role"
                                                label="Grant Admin Privilages"
                                                ></v-switch>
                                        </v-col>
                                    </v-row>
                        </v-container>
                            </v-col>
                            <v-col>
                                <v-image-input
                                    v-model="profile_icon"
                                    clearable
                                    image-format="jpeg"
                                    />
                            </v-col>
                        </v-row>
                             </v-form>
                        </v-container>
                        <v-card-actions>
                            <v-btn class="white--text" color="green" @click="add_manager">SAVE</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-snackbar
            v-model="snackbar"
            :timeout="3000"
            >
            {{ snackbar_text}}

            <template v-slot:action="{ attrs }">
                <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >
                Close
                </v-btn>
            </template>
            </v-snackbar>
    </div>
</template>
<script>

export default {
    async asyncData({ params }) {
      const slug = params.edit // When calling /abc the slug will be "abc"
      //console.log(slug)
      return { slug }
    },
    components:{
       
    },
    data() {
        return {
            
            username:"",
            email:"",
            first_name:"",
            middle_name:"",
            last_name:"",
            password:"",
            re_password:"",
            phone_number:"",
            role:false,
            profile_icon:null,
            team_selected:"",

            teams:[],


            show_password:false,
            show_retype_password:false,

            snackbar:false,
            snackbar_text:"",


            email_rule: [
            value => !!value || 'Required.',
            value => (value || '').length <= 200 || 'Max 20 characters',
            value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
            },
            ],
            username_rule: [
                value => !!value || 'Required.',
                value => (value && value.length >= 5) || 'Min 5 characters',
            ],

            required_rule: [
                value => !!value || 'Required.',
            ],
        }
    },
    async mounted() {
        
        var s_data = await this.$axios.get('/api/manager/get/'+this.$auth.user._id);
        var s_data = s_data.data;
        console.log(s_data.data)
        if(s_data.status){
            var temp_data = s_data.data[0];
            this.username = temp_data.username;
            this.email = temp_data.email;
            this.first_name = temp_data.first_name;
            this.middle_name = temp_data.middle_name;
            this.last_name = temp_data.last_name;
            this.phone_number = temp_data.phone_number;
            this.role = temp_data.role  == "M" ? true : false ;
            this.profile_icon = temp_data.profile_icon;
            this.team_selected = temp_data.team_selected;
        }
        //console.log(this.$auth.user)
    },
    methods: {
        async add_manager(){
            var data = {
                username:this.username,
                email:this.email,
                first_name:this.first_name,
                middle_name:this.middle_name,
                last_name:this.last_name,
                phone_number:this.phone_number,
                profile_icon:this.profile_icon

            };
            if(this.$auth.user.role != 'S'){
               const t_role = this.role == true ? "A" : "M";
               data.role = t_role;
            }
            if(this.password != ""){
                if(this.password == this.re_password){
                    data.password = this.password;
                }else{
                  alert("Please provide same password")
                  return;
                }
            }
            var payload = {
                data : data,
                id:this.$auth.user._id
            }
            
            var res = await this.$axios.post('/api/manager/update',payload);
            var s_data = res.data;
           
            if(s_data.status == false)
            {
                 this.$toast.error("Update Failed ");
            }else{
                this.$toast.success("Data updated successfully redirecting to home page in 3 seconds");
                if(s_data.status){
                var temp_data = s_data.data;
                this.username = temp_data.username;
                this.email = temp_data.email;
                this.first_name = temp_data.first_name;
                this.middle_name = temp_data.middle_name;
                this.last_name = temp_data.last_name;
                this.phone_number = temp_data.phone_number;
                this.role = temp_data.role == "A" ? true : false;
                this.profile_icon = temp_data.profile_icon;
                this.team_selected = temp_data.team_selected;
                await this.$auth.fetchUser()
                 setTimeout( () =>  this.$router.push({ path: '/'}) , 3000);
               
            }
            }
            
            
        }
    },
}
</script>