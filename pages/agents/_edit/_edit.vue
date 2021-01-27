<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>
                            <h2 class="grey--text">Edit Agent</h2>
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
                                            :rules="email_rule"
                                            hide-details="auto"
                                            ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field
                                            v-model="first_name"
                                            label="First Name"
                                            hide-details="auto"
                                            
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
                                           <vue-tel-input v-model="phone"></vue-tel-input>
                                        </v-col>
                                         <v-col>
                                            <v-select
                                            :items="teams"
                                            hint="Select team to include "
                                            item-text="team_name"
                                            label="Teams"
                                            persistent-hint
                                            return-object
                                            v-model="team_selected"
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field
                                            v-model="aadhar_number"
                                            label="AADHAR Number"
                                            hide-details="auto"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field
                                            v-model="liscense_nnumber"
                                            label="Liscense Number"
                                            hide-details="auto"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-text-field
                                            v-model="vehicle_number"
                                            label="Vehicle Number"
                                            hide-details="auto"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-select
                                            :items="vehicle_type"
                                            hint="Vehicle Type"
                                            item-text="team_name"
                                            label="Vehicle type"
                                            persistent-hint
                                            v-model="vehicle_selected"
                                            
                                            >
                                                <template slot="selection" slot-scope="data">
                                                    <!-- HTML that describe how select should render selected items -->
                                                    <img style="height:48px; width:48px;" :src="data.item.vehicle_icon"/><v-spacer></v-spacer><h5>{{ data.item.vehicle_type }}</h5> 
                                                </template>
                                                <template slot="item" slot-scope="data">
                                                    <!-- HTML that describe how select should render items when the select is open -->
                                                    <img style="height:48px; width:48px;" :src="data.item.vehicle_icon"/><v-spacer></v-spacer><h5>{{ data.item.vehicle_type }}</h5>
                                                </template>
                                            </v-select>
                                        </v-col>
                                        <v-col>
                                            <v-text-field
                                            v-model="vehicle_description"
                                            label="Vehicle Description"
                                            hide-details="auto"
                                            ></v-text-field>
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
    watch:{
        team_selected(n,o){
            console.log(n)
        }
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
            phone:"",
            profile_icon:null,
            team_selected:"",
            vehicle_selected:"",
            vehicle_description:"",
            vehicle_number:"",
            liscense_nnumber:"",
            aadhar_number:"",
            teams:[],
            vehicle_type:[],



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
        var s_data = await this.$axios.get('/api/team/all');
        var s_data = s_data.data;
        this.teams = s_data;
        var veh_t = await this.$axios.get('/api/vehicle/all');
        this.vehicle_type = veh_t.data;
        var agent_id = await this.$axios.get('/api/agent/get/'+this.slug);
        console.log(agent_id.data);
        if(agent_id.data.status == false){
            return;
        }
        this.username = agent_id.data.data.username
        this.email = agent_id.data.data.email
        this.first_name = agent_id.data.data.first_name
        this.middle_name = agent_id.data.data.middle_name
        this.last_name = agent_id.data.data.last_name
        this.phone = agent_id.data.data.phone
        this.profile_icon = agent_id.data.data.profile_icon
        //this.team_selected = agent_id.data.data.team_selected
        this.vehicle_description = agent_id.data.data.vehicle_description
        this.vehicle_number = agent_id.data.data.vehicle_number
        this.liscense_nnumber = agent_id.data.data.liscense_nnumber
        this.aadhar_number = agent_id.data.data.aadhar_number
        //getting index of current vehicle Type
        var v_index = this.vehicle_type.findIndex( x => x._id == agent_id.data.data.vehicle_type);
        //var temp_v_index = -1;
        //this.vehicle_type.forEach(element => {
            //if(element._id == agent_id.data.vehicle_type)
            //{temp_v_index = element; return;} 
           // console.log(element._id + "--" + agent_id.data.vehicle_type)
        //});
        console.log(v_index)
        if(v_index != null || v_index != -1 ){
            this.vehicle_selected = this.vehicle_type[v_index];
        }
        //

    },
    methods: {
        async add_manager(){

        if(!this.$refs.form.validate()){
            return
        }

           





            var data = {
                username:this.username,
                email:this.email,
                first_name:this.first_name,
                middle_name:this.middle_name,
                last_name:this.last_name,
                password:this.password,
                phone_number:this.phone,
                role:this.admin,
                profile_icon:this.profile_icon,
                team_selected:this.team_selected,
                vehicle_selected:this.vehicle_selected

            };
            var res = await this.$axios.post('/api/agent/edit/'+this.slug,data);
            console.log(res)
        }
    },
}
</script>