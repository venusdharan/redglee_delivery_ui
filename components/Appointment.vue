<template>
    <div>
        <!--v-expansion-panels class="mb-6">
            <v-expansion-panel dense>
            <v-expansion-panel-header-->
                <v-container>
               <v-row>
                   <v-col><span>Appointment</span></v-col>
               </v-row>
            <!--/v-expansion-panel-header>
            <v-expansion-panel-content-->
                <v-row>
                    <v-col>
                        <v-text-field
                        v-model="name"
                        prepend-icon="mdi-account"
                        label="Name"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                    <vue-tel-input v-model="phone" required></vue-tel-input>  
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                        v-model="email"
                        prepend-icon="mdi-email"
                        :rules="email_rule"
                        label="Email"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                        v-model="order_id"
                        prepend-icon="mdi-numeric"
                        label="Order ID"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                         v-model="email"
                        prepend-icon="mdi-email"
                        :rules="email_rule"
                        label="Address"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-col>
                                <v-text-field
                                v-model="order_id"
                                prepend-icon="mdi-numeric"
                                label="Latitude"
                                >
                        </v-text-field>
                            </v-col>
                            <v-col>
                        <v-text-field
                        v-model="order_id"
                        prepend-icon="mdi-numeric"
                        label="Logntitude"
                        >
                        </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-datetime-picker prepend-icon="mdi-phone"  :dialogWidth=640 timeIcon="mdi-phone" label="Appointment Time" v-model="datetime"> 
                            <template v-slot:dateIcon>
                                <v-icon>mdi-map-legend</v-icon>
                            </template>
                            <template v-slot:timeIcon>
                                <v-icon>mdi-map-legend</v-icon>
                            </template>
                        </v-datetime-picker>
                        <!--datetime format="DD/MM/YYYY  h:i:s" style="border-width: 2px; border-style: solid; z-index:100;" width="100%" v-model="datetime"></!--datetime-->
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-textarea
                        v-model="description"
                        prepend-icon="mdi-comment-text"
                        label="Description"
                        clearable
                        clear-icon="mdi-close-circle"
                        rows="1"
                        >
                        </v-textarea>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-btn class="white--text" color="red">Create Tast</v-btn>
                    </v-col>
                </v-row>
                </v-container>
            <!--/v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels-->
    </div>
</template>

<script>
import datetime from 'vuejs-datetimepicker';
export default {
    components:{
     datetime 
    },
    data() {
        return {
           name:null,
           phone:"",
           email:null,
           order_id:null,
           datetime:null,
           description:null,



            email_rule: [
                value => !!value || 'Required.',
                value => (value || '').length <= 20 || 'Max 20 characters',
                value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Invalid e-mail.'
                },
            ],
            min_length_5: [
                value => !!value || 'Required.',
                value => (value && value.length >= 5) || 'Min 5 characters',
            ],
        }
    },
    methods: {
         get_pickup(){
           return{
               name:this.name,
               phone:this.phone,
               email:this.email,
               order_id:this.order_id,
               datetime:this.datetime,
               description:this.description
           }
       }
    },

       


   

}
</script>

<style lang="">
    
</style>

