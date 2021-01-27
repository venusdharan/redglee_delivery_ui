<template>
  <div>
    <v-container>
    <v-row>
         <v-col>
      <v-tabs v-model="tab">
        <v-tab>View ALL</v-tab>
        <v-tab>Add New</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
     
        <v-card>
          <v-card-title>
              <h2 class="grey--text">Vehicle Types</h2>
              <v-spacer></v-spacer>
              <!--v-text-field-- label="Vehicle Type" v-model="new_vehicle"></!--v-text-field-->
              <v-spacer></v-spacer>
             
          </v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                   Vehicle Type
                  </th>
                  <th class="text-left">
                   Vehicle Type description
                  </th>
                  <th class="text-left">
                   Vehicle Type Icon
                  </th>
                  <th class="text-right">
                   Edit
                  </th>
                  <th class="text-right">
                   Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in api_keys"
                  :key="index"
                >
                  <td class="text-left">{{ item.vehicle_type }}</td>
                  <td class="text-left">{{ item.vehicle_description }}</td>
                  <td class="text-left">
                    <img  :src='item.vehicle_icon'/>
                  </td>
                   <td class="text-right"><v-btn
                        icon
                        x-small
                        @click=" edit_vehicle(index)"
                    >
                        <v-icon>mdi-border-color</v-icon>
                    </v-btn>
                  </td>
                  <td class="text-right"><v-btn
                        icon
                        x-small
                        @click="remove(index)"
                    >
                        <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-card-actions>

          </v-card-actions>
        </v-card>
      
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <v-row>
            <v-col style="padding:2%;">
              <v-text-field label="Vehicle Type" v-model="vehicle_type"></v-text-field>
            </v-col>
            <v-col style="padding:2%;">
              <v-text-field label="Vehicle Type Description" v-model="vehicle_des"></v-text-field>
            </v-col>
            <v-col style="padding:2%;">
               <v-image-input
                                    v-model="vehicle_icon"
                                    clearable
                                    :imageHeight=64
                                    :imageWidth=64
                                    :imageBackgroundColor="white"
                                    image-format="png"
                                    />
            </v-col>
            </v-row>
            <v-card-actions>
              <v-btn @click="add_new">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
     </v-col>
    </v-row>
    </v-container>
       <v-dialog
            v-model="edit_dialog"
            persistent
           
          >
            <v-card>
              <v-card-title class="headline">
                Edit Vehicle Details
              </v-card-title>
              <v-card-text>Edit vehicle data</v-card-text>
              <v-container>
                <v-row>
                  <v-row>
                      <v-col style="padding:2%;">
                        <v-text-field label="Vehicle Type" v-model="vehicle_type"></v-text-field>
                      </v-col>
                      <v-col style="padding:2%;">
                        <v-text-field label="Vehicle Type Description" v-model="vehicle_des"></v-text-field>
                      </v-col>
                      <v-col style="padding:2%;">
                        <v-image-input
                                              v-model="vehicle_icon"
                                              clearable
                                              :imageHeight=64
                                              :imageWidth=64
                                              :imageBackgroundColor="white"
                                              image-format="png"
                                              />
                      </v-col>
                      </v-row>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="cancel_update"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  @click="update_vehicle"
                >
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        tab:null,
        vehicle_type:null,
        vehicle_des:null,
        vehicle_icon:null,
        edit_dialog:false,
        edit_id:null,
        api_keys: [
          /*
          {
            name: 'Frozen Yogurt',
          },
          {
            name: 'Ice cream sandwich',
          },
          {
            name: 'Eclair',
          },
          {
            name: 'Cupcake',
          }*/
        ],
        new_vehicle:""
      }
    },
    async mounted() {
      
      const apis = await this.$axios.get('/api/vehicle/all');
      console.log(apis.data);
      this.api_keys = apis.data;
      
    },
    methods: {
      async edit_vehicle(id){
        this.edit_id = id;
        this.edit_dialog = true;
        this.vehicle_type = this.api_keys[id].vehicle_type
        this.vehicle_des = this.api_keys[id].vehicle_description
        this.vehicle_icon = this.api_keys[id].vehicle_icon
      },
      async cancel_update(){
        this.edit_id = null;
        this.edit_dialog = false;
        this.vehicle_type = null;
        this.vehicle_des = null;
        this.vehicle_icon = null;
      },
      async update_vehicle(){
        if(this.vehicle_type == null || this.vehicle_icon == null || this.edit_id == null){return}
        const db_id = this.api_keys[this.edit_id]._id
        const api = await this.$axios.post('/api/vehicle/edit/'+db_id ,{
          vehicle_type:this.vehicle_type,
          vehicle_description:this.vehicle_des,
          vehicle_icon:this.vehicle_icon
        });
        console.log(api.data)
        if(api.data.status != false){
        this.api_keys[this.edit_id].vehicle_type = this.vehicle_type;
        this.api_keys[this.edit_id].vehicle_description = this.vehicle_des;
        this.api_keys[this.edit_id].vehicle_icon = this.vehicle_icon;
        this.vehicle_type= null;
        this.$toast.success("Vehicle Type Updated");
        }else{
          this.$toast.error("Vehicle Type Updation Error !");
        }
        this.edit_id = null;
        this.edit_dialog = false;
        this.vehicle_type = null;
        this.vehicle_des = null;
        this.vehicle_icon = null;
      },
     async remove(id){
        //this.api_keys.splice(id, 1);
        var res = await this.$axios.post('/api/vehicle/delete/'+ this.api_keys[id]._id)
        this.$toast.info("Vehicle Type Removed");
        const apis = await this.$axios.get('/api/vehicle/all');
        console.log(apis.data)
        this.api_keys = apis.data;
      },
      copy_api(){
        this.$toast.info("API Copied");
      },
      async add_new(){
        //if(this.vehicle_type != ""){
        if(this.vehicle_type == null || this.vehicle_icon == null){return}
        const api = await this.$axios.post('/api/vehicle/',{
          vehicle_type:this.vehicle_type,
          vehicle_description:this.vehicle_des,
          vehicle_icon:this.vehicle_icon
        });
        if(api.data.status != false){
        this.api_keys.push( {_id:api.data.id,vehicle_type:this.vehicle_type,vehicle_description:this.vehicle_des,vehicle_icon:this.vehicle_icon});
        this.vehicle_type= null;
        this.$toast.success("Vehicle Type Created");
        }else{
          this.$toast.error("Vehicle Type Creation Error !");
        }
        this.vehicle_type = null;
        this.vehicle_des = null;
        this.vehicle_icon = null;
        this.tab = 0;
        //}
       

      }
    },
  }
</script>