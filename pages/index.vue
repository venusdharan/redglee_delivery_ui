<template>
<div>
  <v-row justify="center" align="start" no-gutters style="padding:0 !important;">


<v-col v-if="left_side > 0" id="left_side_bar" v-bind:cols="left_side" style="z-index:25;" fill-height>
  <h3 style="font-size:2rem; text-align:center !important;" class="grey--text">Tasks</h3>
  <div style="overflow-y:auto !important;">
<!--transition name="slide-fade"-->
    
  
 <!-- v-if="!task_detail"-->    
  <v-tabs  centered style="">
  <v-tab>Assigned</v-tab>
  <v-tab>Unassigned</v-tab>
  <v-tab>Successful</v-tab>
  <v-tab-item style=" max-height:80vh;">
  <v-list three-line style="padding:3%;">

    <v-divider></v-divider>
    <!--
      <v-select dense
      style="padding-left:2%; padding-right:2%;"
      :items="agent_teams"
      item-text="team_name"
      return-object
      label="Teams"
      v-model="task_team_select"
    ></v-select>
     -->
    <v-divider></v-divider>
    <!-- task panels-->
    <v-expansion-panels>
      <v-expansion-panel
        v-for="(item,i) in assigned_task_list"
        :key="i"
      >
         <v-expansion-panel-header class="blue--text">
       Task ID {{item.task_number}} 
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card
          class="mx-auto">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
            <div class="overline mb-4">
             <div v-if="item.task_type == 'pickup_delievry'">
               PICKUP-DELIVERY {{item.task_status }}
             </div>
            </div>
            </v-list-item-title>
            <v-list-item-subtitle>
             <div v-if="item.task_status == 'AS'">
               TASK Assigned : Not Accepted
             </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Created Date-Time : {{new Date(item.task_created).toLocaleString()}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-icon>
            <v-img
              max-height="150"
              max-width="250"
              :src=item.task_vehicle.vehicle_icon
            ></v-img>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Vehcile Type</v-list-item-title>
            <v-list-item-subtitle>
              {{item.task_vehicle.vehicle_type}}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{item.task_vehicle.vehicle_description}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        <v-card-actions>
          <!--v-btn
           class="white--text"
            color="orange"
            @click="show_task_details(item)"
          >
            Assign
          </v-btn-->
          <!--v-btn
            class="white--text"
            color="green"
          >
            Assign Task
          </v-btn-->
          <v-btn
            class="white--text"
            color="red"
          >
            Delete Task
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-expansion-panels>
    <!-- end task panels -->
    </v-list>
    </v-tab-item>
    <v-tab-item>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="(item,i) in un_assigned_task"
      :key="i"
      @click="unassigned_task_show_marker(i)"
    >
      <v-expansion-panel-header class="blue--text">
       Task ID {{item.task_number}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card
          class="mx-auto">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
            <div class="overline mb-4">
             <div v-if="item.task_type == 'pickup_delievry'">
               PICKUP-DELIVERY {{item.task_status }}
             </div>
            </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle>Created Date-Time : {{new Date(item.task_created).toLocaleString()}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item two-line>
          <v-list-item-icon>
            <v-img
              max-height="150"
              max-width="250"
              :src=item.task_vehicle.vehicle_icon
            ></v-img>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>VehicleType</v-list-item-title>
            <v-list-item-subtitle>
              {{item.task_vehicle.vehicle_type}}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{item.task_vehicle.vehicle_description}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        <v-card-actions>
          <v-btn
           class="white--text"
            color="orange"
            @click="show_task_details(item)"
          >
            Assign
          </v-btn>
          <!--v-btn
            class="white--text"
            color="green"
          >
            Assign Task
          </v-btn-->
          <v-btn
            class="white--text"
            color="red"
          >
            Delete Task
          </v-btn>
        </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
    </v-tab-item>
  	</v-tabs>
    <!--/transition-->
    </div>
</v-col>

    <v-col  v-bind:cols="12 - (left_side + right_side)"  color="grey">
       <v-row justify="end" align="end" dense style="margin-top:4% !important;"><!-- margin-top:2% !important; -->
         <v-col cols="1" >
           <v-btn icon  text left @click="toggle_left" style=" z-index:25; ">
              <v-icon color="white"  style="font-size:4rem; background-color:grey;  ">
                  mdi-chevron-left-box
            </v-icon>
       </v-btn>
      
         </v-col>
         <v-spacer/>
         <v-col>
           <v-menu offset-y style="z-index:25; height:50%;">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                   fab
                  v-bind="attrs"
                  v-on="on"
                  style="z-index:25; "
                >
                  <v-icon>mdi-cogs</v-icon>
                </v-btn>
              </template>
              <v-list style="height:50%;"> 
                <v-list-item>
                    <v-checkbox                   
                    v-model="map_settings.show_pick_up"
                    ></v-checkbox>
                  <v-list-item-title>Show Only Pickups</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-checkbox                   
                    v-model="map_settings.show_delivery"
                    ></v-checkbox>
                  <v-list-item-title>Show Only Devlivery</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-checkbox                   
                    v-model="map_settings.show_active"
                    ></v-checkbox>
                  <v-list-item-title>Show Only active Agents</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-checkbox                   
                    v-model="map_settings.show_geofence"
                    ></v-checkbox>
                  <v-list-item-title>Show Map Geo Fence</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
         </v-col>
                  <v-col>
                    <!--
             <v-select
              :items="all_team"
              label="Teams"
              item-text="team_name"
              single-line
              return-object
              dense
              solo
              :color="red"
              style="z-index:25;  margin-bottom:-1%;"
              v-model="selected_team"
              >
            </v-select>
            -->
         </v-col>
         <v-spacer/>
         <v-col cols="1" class="ml-auto">
           <v-btn icon text left  class="pl-0" @click="toggle_right" style=" margin-left:85%; padding-right:3vw;  z-index:25; ">
          <v-icon color="white" style="font-size:4rem; background-color:grey;  ">  
            mdi-chevron-right-box
          </v-icon>
       </v-btn >
     
         </v-col>
       </v-row>
       
       
             <gmap-map
              :center="map_center"
              :zoom="15"
              map-type-id="roadmap"
              style="width: 100%; height: 90vh; position: absolute; top:0px;"
             ref="map"
            >

              
   <div v-if="getMasterTeam != null">
     <div v-if="map_settings.show_geofence">
        <gmap-circle :center="getMasterTeam.team_geofence.center"
        :radius="getMasterTeam.team_geofence.radius"
        :editable="false" 
          ref="polygon">
        </gmap-circle>
        </div>
  </div>


      
            <gmap-cluster>
               <div v-if="agent_locations.length > 0">
            
            
                <gmap-marker v-for="(m, index) in agent_locations"
                  :position="{lat : m.agent_locations.location.coordinates[1],lng : m.agent_locations.location.coordinates[0]}"
                  :clickable="true" 
                  :icon="m.agent_locations.online == true ? { url: require('~/static/markers/green_dot_sm.png')} : { url: require('~/static/markers/grey_dot_sm.png')}"
                  @click="center={lat : m.agent_locations.location.coordinates[1],lng : m.agent_locations.location.coordinates[0]}"
                  :key="index"
                  >  
                  </gmap-marker>
             </div>
                <div v-if="selected_route_markers">
               <gmap-marker  v-for="(m, index) in selected_route_markers.task_info_start"
                  :position="{lat : m.lat,lng : m.lng}"
                  :clickable="true" 
                  :icon="{ url: require('~/static/markers/pick_up.png')}"
                  @click="center={lat : m.lat,lng : m.lng}"
                  :key="index"
                  >    
              </gmap-marker>

              <gmap-marker  v-for="(m, index) in selected_route_markers.task_info_stop"
                  :position="{lat : m.lat,lng : m.lng}"
                  :clickable="true" 
                  :icon="{ url: require('~/static/markers/delivery.png')}"
                  @click="center={lat : m.lat,lng : m.lng}"
                  :key="index"
                  >    
              </gmap-marker>

              </div>
                 
                  
            </gmap-cluster>
            
            </gmap-map>
<!--
<MglMap :accessToken="accessToken" :mapStyle="mapStyle" style="width: 100%; height: 90vh; position: absolute; top:0px;" :attributionControl="false">
  <MglAttributionControl />
      <MglNavigationControl position="bottom-center" />
      <MglGeolocateControl position="bottom-right" />
      <MglNavigationControl position="bottom-left" />
      <MglGeolocateControl position="bottom-right" />
      <MglScaleControl />
</MglMap>
 -->
    </v-col>

  <v-col v-if="right_side > 0" id="right_side_bar" class="fill-height grow"  v-bind:cols="right_side" style="z-index:25;  !important; height:100% !important;" >
    <transition name="slide-fade">
     
    <v-list three-line style="min-height:90vh;  padding-left:2%;" class="fill-height" >
       <h3 style="font-size:2rem; text-align:center !important;" class="grey--text">Agents</h3>

       <v-divider></v-divider>
      <v-list-item
        v-for="item in agent_teams"
        :key="item.username"
      >
      
        <v-list-item-avatar size="56">
          <!--
          <v-badge
       overlap
        bordered

        color="deep-purple accent-4"

      
      >
   
         <v-avatar  color="indigo" size="48">
            <v-img v-if="item.profile_icon" :src="item.profile_icon" ></v-img>
            <span v-else class="white--text headline">{{item.username[0].toUpperCase()+item.username[item.username.length-1].toUpperCase()}}</span>
        </v-avatar>
     
          </v-badge>
          -->
          <v-badge
      bordered
        overlap
        bottom
        :color="item.online ? 'green' : 'grey'"
    dot
        
 
      >
        <v-avatar  color="indigo" size="40">
            <v-img v-if="item.profile_icon" :src="item.profile_icon" ></v-img>
            <span v-else class="white--text headline">{{item.username[0].toUpperCase()+item.username[item.username.length-1].toUpperCase()}}</span>
        </v-avatar>
      </v-badge>
        </v-list-item-avatar>
      

        <v-list-item-content>
          <v-list-item-title v-text="item.username"></v-list-item-title>
          <v-list-item-subtitle v-text="item.phone_number"></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn icon>
          <v-icon>
            mdi-message-outline
          </v-icon>
          </v-btn>
        </v-list-item-icon>
      
      </v-list-item>
    </v-list>
    
      </transition>
  </v-col>
  <div v-if="task_to_assign != null ">
<v-bottom-sheet 
      v-model="task_assign_sheet"
      persistent>
      <v-sheet
      style="height:50vh; overflow-y:auto;"
        class="text-center"
        
      >
       <v-card style="height:100%;">
    
         <v-card-title>
           Assign task # {{task_to_assign.task_number}} <v-spacer></v-spacer><v-btn icon @click="close_task_assign_sheet"><v-icon>mdi-close-octagon</v-icon></v-btn>
         </v-card-title>
         <v-card-actions>
           <v-btn color="green" class="white--text" @click="assign_task_manually">Assign</v-btn>
         </v-card-actions>
         <v-container>
          <v-row>
            <v-col><v-select label="Select Team"   :items="all_team"  item-text="team_name"></v-select></v-col>
            <v-col></v-col>
          </v-row>
          </v-container>   
          
       </v-card>
      </v-sheet>
    </v-bottom-sheet>
    </div>
  </v-row>
  <!--v-navigation-drawer--
      v-model="left_side"
      :right="true"
      temporary
      fixed 
    >
      <v-list>
        
      </v-list>
    </!--v-navigation-drawer-->


  

<v-dialog
      v-model="task_detail"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
    
      <v-card>
<div v-if="task_detail">
            

        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="task_detail = false; task_selected_details = null;"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Task Details :# {{task_selected_details.task_number}} </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
          
          </v-toolbar-items>
        </v-toolbar>
            
                <v-card-title>
                <span class="grey--text" v-if="task_selected_details.task_type == 'pickup_delievry'">Task Type : Pickup and Delievry </span><v-spacer></v-spacer>
                <span class="grey--text" v-if="task_selected_details.task_type == 'appointment'">Task Type : Appointment </span><v-spacer></v-spacer>
                <span class="grey--text" v-if="task_selected_details.task_type == 'workforce'">Task Type : Workforce </span><v-spacer></v-spacer>
                <!--v-btn icon class="white--text" color="red" @click="task_detail = false; task_selected_details = null;"><v-icon>mdi-close-circle</v-icon></v-btn-->
                
                </v-card-title>
              <v-row>
             
                <v-col cols="6" >
                  <v-row>
                    <v-col cols="6" v-if="task_selected_details.task_type == 'pickup_delievry'">
                      <v-card-title>
                      <h5 class="grey--text">Pickup</h5>
                      </v-card-title>
                      <v-expansion-panels v-model="task_detail_panel_pickup_model">
                        <v-expansion-panel
                          v-for="(item,i) in task_full_details.task_info_start"
                          :key="i"
                        >
                          <v-expansion-panel-header>
                            {{item.name}}
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6"><v-text-field label="Name" :value="item.name" readonly></v-text-field></v-col>
                              <v-col cols="6"><v-text-field label="Order #" :value="item.order_id" readonly></v-text-field></v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="6"><v-text-field label="Phone" :value="item.phone" readonly></v-text-field></v-col>
                              <v-col cols="6"><v-text-field label="Email" :value="item.email" readonly></v-text-field></v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="6"><v-text-field label="Date & Time" :value="new Date(item.datetime).toISOString()" readonly></v-text-field></v-col>
                              <v-col cols="6"><v-textarea label="Address" :value="item.email" readonly rows="1"></v-textarea></v-col>
                            </v-row>
                            <!--v-row>
                              <v-col cols="6"><v-text-field label="Phone" :value="item.phone" readonly></v-text-field></v-col>
                              <v-col cols="6"><v-text-field label="Email" :value="item.email" readonly></v-text-field></v-col>
                            </v-row-->
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-col>
                      <v-col cols="6" v-if="task_selected_details.task_type == 'pickup_delievry'">
                      <v-card-title>
                      <h5 class="grey--text">Delivery</h5>
                      </v-card-title>
                      <v-expansion-panels v-model="task_detail_panel_delivery_model">
                        <v-expansion-panel
                          v-for="(item,i) in task_full_details.task_info_stop"
                          :key="i"
                        >
                          <v-expansion-panel-header>
                            {{item.name}}
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-row>
                              <v-col cols="6"><v-text-field label="Name" :value="item.name" readonly></v-text-field></v-col>
                              <v-col cols="6"><v-text-field label="Order #" :value="item.order_id" readonly></v-text-field></v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="6"><v-text-field label="Phone" :value="item.phone" readonly></v-text-field></v-col>
                              <v-col cols="6"><v-text-field label="Email" :value="item.email" readonly></v-text-field></v-col>
                            </v-row>
                            <v-row>
                              <v-col cols="6"><v-text-field label="Date & Time" :value="new Date(item.datetime).toISOString()" readonly></v-text-field></v-col>
                              <v-col cols="6"><v-textarea label="Address" :value="item.email" readonly rows="1"></v-textarea></v-col>
                            </v-row>
                            <!--v-row>
                              <v-col cols="6"><v-text-field label="Phone" :value="item.phone" readonly></v-text-field></v-col>
                              <v-col cols="6"><v-text-field label="Email" :value="item.email" readonly></v-text-field></v-col>
                            </v-row-->
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                    <v-card
                      style="padding:2%;"
                      >

                      <v-card-actions>
                        <v-btn color="green" class="white--text" @click="assign_task_manually">Assign</v-btn>
                      </v-card-actions>

        <v-select
        dense
          v-model="assign_teams_check"
          :items="agent_teams"
          :menu-props="{ maxHeight: '400' }"
          label="Select"
          multiple
          clearable
          return-object
          chips
          hint="Select agents"
          persistent-hint
        >
        <template slot="item" slot-scope="data">
            <!-- HTML that describe how select should render items when the select is open -->
            <v-avatar  color="indigo" size="56" left>
            <v-img v-if="data.item.profile_icon" :src="data.item.profile_icon" ></v-img>
            <span v-else class="white--text headline">{{data.item.username[0].toUpperCase()+data.item.username[data.item.username.length-1].toUpperCase()}}</span>
            </v-avatar>
            <strong>{{ data.item.username }}</strong>&nbsp;
        </template>


        <template v-slot:selection="data">
          
        <v-chip :input-value="data.selected"
                close
                large
                @click:close="remove_selected_assign(data.item)">
            <v-avatar  color="indigo" size="56" left>
            <v-img v-if="data.item.profile_icon" :src="data.item.profile_icon" ></v-img>
            <span v-else class="white--text headline">{{data.item.username[0].toUpperCase()+data.item.username[data.item.username.length-1].toUpperCase()}}</span>
            </v-avatar>
            <strong>{{ data.item.username }}</strong>&nbsp;
        </v-chip>
        </template>
        
        </v-select>
             

                      </v-card>
                </v-col>
                  </v-row>
                </v-col>
           
                <v-col cols="4">
                  <gmap-map
              :center="map_center"
              :zoom="15"
              map-type-id="roadmap"
              style="width: 100%; height: 70vh;  "
             ref="task_map"
            >

              
   <div v-if="getMasterTeam != null">
     <div v-if="map_settings.show_geofence">
                  <gmap-circle :center="getMasterTeam.team_geofence.center"
                  :radius="getMasterTeam.team_geofence.radius"
                  :editable="false" 
                    ref="polygon">
                  </gmap-circle>
                  </div>
            </div>   
                     <div v-if="task_selected_details.task_type == 'pickup_delievry'">
                       <div v-if="task_detail_marker.length > 0">
                         <gmap-marker v-for="m in task_detail_marker" :key="m" :position="m.position" :icon="m.icon == 'pickup' ? { url: require('~/static/markers/pick_up.png')} : { url: require('~/static/markers/delivery.png')}" :clickable="true" :draggable="false" @click="center=m.position"></gmap-marker>
                        <!--gmap-marker  v-if="task_detail_marker != null"
                            :position="{lat:task_detail_marker.lat,lng:task_detail_marker.lng}"
                            :clickable="false" 
                            
                            >    
                        </gmap-marker-->
                        <!--:icon="task_detail_marker.icon == 'pickup' ? { url: require('~/static/markers/pick_up.png')} : { url: require('~/static/markers/delivery.png')}" -->
                        </div>
                      </div>
                      </gmap-map>
                </v-col>
              </v-row>
              <v-row>
                
              </v-row>
              
           </div>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

import {mapGetters,mapState,mapMutations} from 'vuex'
export default {
  //middleware: [ 'auth' ],



  methods: {
    ...mapMutations({
      setFocusLatLng:"setFocusLatLng",
      setTeamTask:"setTeamTask",
      clearPickUp:"clearPickUp",
      clearDelivery:"clearDelivery",
      set_master_date:"set_master_date",
      setMasterTeam:"setMasterTeam",
      set_left_open:"set_left_open",
    }),
    remove_selected_assign(item){
      console.log(item)
      var index = this.assign_teams_check.indexOf(item);
      if (index !== -1) {
        this.assign_teams_check.splice(index, 1);
      }
    },
    async assign_task_manually(){
      if(this.assign_teams_check.length == 0){
        alert("please select atleast one agent");
        return;
      }

      var agent_id = [];
      for(var agent in this.assign_teams_check){
        agent_id.push(this.assign_teams_check[agent]._id);
      }
      var assign_data = {};
      assign_data.agents = agent_id;
      assign_data.task = this.task_selected_details._id;
      //try{
      var assign = await this.$axios.post("/api/task/assign/task/agents",assign_data);
      console.log(assign.data)
      if(assign.data.status){
        if(assign.data.data.task_status == "AS"){

          this.assigned_task_list.push(assign.data.data);
          var item = assign.data.data;
          //item.task_status = "UN";
          this.un_assigned_task = this.un_assigned_task.filter(function( obj ) {
              return obj._id !== assign.data.data._id;
          });
         
          this.task_detail = false; 
          this.task_selected_details = null;


        }
      }

      //}
      //catch(err){
      //  console.log("err")
      //}
    },
    open_task_assign_sheet(i){
      this.task_to_assign = this.un_assigned_task[i];
      this.task_assign_sheet = true
    },
    close_task_assign_sheet(){
      this.task_to_assign = null;
      this.task_assign_sheet = false;
    },
  
    toggle_left(){
      if(this.left_side == 0){this.left_side = 4;this.set_left_open(true)}else{this.left_side = 0;this.set_left_open(false);}
    },
    toggle_right(){
      if(this.right_side == 0){this.right_side = 2}else{this.right_side = 0}
    },
    savePolygon(paths) {
				this.polygons.push(paths);
    },
    unassigned_task_show_marker(i){
      var selected_task = this.un_assigned_task[i];
      if(selected_task == null){return;}

      this.selected_route_markers = selected_task
      this.panToBounds();
       
    },
    async panToBounds() {
      if(this.selected_route_markers == null)return
      var b = new google.maps.LatLngBounds();
      /*
      b.extend({
        lat: 33.972,
        lng: 35.4054
      });
      b.extend({
        lat: 33.7606,
        lng: 35.64592
      });*/
      

      for(var i in this.selected_route_markers.task_info_start){
        b.extend({
        lat: this.selected_route_markers.task_info_start[i].lat,
        lng: this.selected_route_markers.task_info_start[i].lng
        });
      }

      for(var i in this.selected_route_markers.task_info_stop){
        b.extend({
        lat: this.selected_route_markers.task_info_stop[i].lat,
        lng: this.selected_route_markers.task_info_stop[i].lng
        });
      }
       this.$refs.map.$mapPromise.then((map) => {
        map.fitBounds(b)
      })
     
    },
    async show_task_details(item){
      this.task_selected_details = item;
      this.task_selected_details_sub = null;
      await this.load_full_task_details(item._id);

      this.task_detail = true;

    },
    async get_latest_geolocation(){
      try{
      var team = this.master_team_store;
     var geo_lo = await this.$axios.get('/api/agent/geolocation/team/'+team._id);
     console.log(geo_lo.data.data);
     this.agent_teams.forEach(function(item, index){
      
      var obj = geo_lo.data.data.find(o => o.agent_locations.agent_id === item._id);
      console.log(geo_lo.data.data.indexOf(obj));
      
      if(item.online == true){
        geo_lo.data.data[geo_lo.data.data.indexOf(obj)].agent_locations.online = true;
      }else{
        geo_lo.data.data[geo_lo.data.data.indexOf(obj)].agent_locations.online = false;
      }

      console.log(geo_lo.data.data);
      
    });
     this.agent_locations = geo_lo.data.data;
     //this.agent_locations = geo_lo.data.data;
      }
      catch(ex){
        console.log("GEO:ERR")
      }
    },
    async load_unassigned_task_team_date(team,date){
        var unassigned_task = await this.$axios.post("/api/task/get_unassigned/"+team+"/date/"+date);
        console.log(unassigned_task.data)
        if(unassigned_task.data.status){
          this.un_assigned_task = unassigned_task.data.data
        }
        
    },
     async load_assigned_task_team_date(team,date){
        var unassigned_task = await this.$axios.post("/api/task/get_assigned/"+team+"/date/"+date);
        console.log(unassigned_task.data)
        if(unassigned_task.data.status){
          this.assigned_task_list = unassigned_task.data.data
        }
        
    },
    async load_full_task_details(id){
      var get_full_task = await this.$axios.post("/api/task/id/"+id);
      if(get_full_task.data.status){
        this.task_full_details = get_full_task.data.data[0];
        console.log("task-details")
        console.log(this.task_full_details);
      }
    },
    async change_online_status(agent){
       var obj = this.agent_teams.find(o => o._id === agent.user);
       var agent_index = this.agent_teams.indexOf(obj);
       obj.online = agent.data;
       this.agent_teams[agent_index] = obj;
       var geo = this.agent_locations.find(o => o.agent_locations.agent_id == agent.user);
       var geo_index = this.agent_locations.indexOf(geo);
       this.agent_locations[agent_index] = geo;
    }
			
  },
  created() {
    this.toggle_left();
    this.toggle_right();
    
    this.task_detail = false;
    //this.interval = setInterval(() => this.getBitcoins(), 1000);
    this.timer = setInterval(() => {
        this.get_latest_geolocation()
     }, 5000)


  },
   sockets: {
        connect: function () {
            console.log('socket connected')
        },
        online: function (data) {
          //console.log(data)
          this.change_online_status(data)
        },
        
    },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  async mounted() {
    /*
    this.socket = this.$nuxtSocket({
      channel: '/websocket'
    })
    
    this.socket
    .on('someEvent', (msg, cb) => {
     
    })*/
  await this.$gmapApiPromiseLazy();
  console.log('map ready '+this.$refs.map);
  
   //var geo = await this.$axios.post('/api/agent/geolocation');
   //this.agent_locations = geo.data.data;

   //console.log(this.un_assigned_task);

   //console.log(this.getMasterTeam);
   try{
        var team_temp = await this.$axios.get('/api/team/all');
   this.all_team = team_temp.data;
  var res = await this.$axios.get('/api/agent/team/'+this.all_team[0]._id);
       // console.log(res.data.data);
        if(res.data.status){
          this.agent_teams = res.data.data;
        }
    var team = this.master_team_store;
     var geo_lo = await this.$axios.get('/api/agent/geolocation/team/'+team._id);
     await this.load_unassigned_task_team_date(team._id,this.master_date_store)
     await this.load_assigned_task_team_date(team._id,this.master_date_store)

     //console.log(geo_lo.data.data);
    this.agent_teams.forEach(function(item, index){
      
      var obj = geo_lo.data.data.find(o => o.agent_locations.agent_id === item._id);
      console.log(geo_lo.data.data.indexOf(obj));
      
      if(item.online == true){
        geo_lo.data.data[geo_lo.data.data.indexOf(obj)].agent_locations.online = true;
      }else{
        geo_lo.data.data[geo_lo.data.data.indexOf(obj)].agent_locations.online = false;
      }

      console.log(geo_lo.data.data);
      
    });
     this.agent_locations = geo_lo.data.data;
   }catch(err){

   }
 
   
  },
  watch:{
    assign_teams_check(n,o){
console.log(n);
    },
    task_selected_details(n,o){
      if(typeof n == undefined)return;
      if(n == null)return;
      if(typeof n._id == undefined) return;
      if(n._id == null)return;


    },
    task_detail_panel_pickup_model(n,o){
       
      if(this.task_detail_panel_delivery_model != -1 && this.task_detail_panel_pickup_model != -1){
        this.task_detail_panel_delivery_model = -1;
        this.task_detail_marker = [];
      }
      
      if(this.task_detail_panel_pickup_model == -1){
        //this.task_detail_marker = [];
      }else {
        //extracting the lat lng from the task details model
        try{
          //if(typeof this.task_full_details.task_info_start[n].lat == 'undefined' && typeof this.task_full_details.task_info_start[n].lng == 'undefined')return;
          this.task_detail_marker = [];
        this.task_detail_marker.push({
          position:{lat: parseFloat(this.task_full_details.task_info_start[this.task_detail_panel_pickup_model].lat),
          lng: parseFloat(this.task_full_details.task_info_start[this.task_detail_panel_pickup_model].lng)},
          icon:"pickup"
        });
        console.log(this.task_detail_marker)
        }catch(err){
          console.log(err)
            this.task_detail_marker = [];
        }
               
      }
     
    },
    task_detail_panel_delivery_model(n,o){
       //if(typeof n == 'undefined')return;
      //closig the opposite panel expansion for more accurate marker respresnetaion
      if(this.task_detail_panel_pickup_model != -1 && this.task_detail_panel_delivery_model != -1){
        this.task_detail_panel_pickup_model = -1;
        this.task_detail_marker = [];
      }
      
      if(this.task_detail_panel_delivery_model == -1){
        //this.task_detail_marker = [];
      }else{
        try{
        //extracting the lat lng from the task details model
        //if(typeof this.task_full_details.task_info_stop[n].lat == 'undefined' && typeof this.task_full_details.task_info_stop[n].lng == 'undefined')return;
        this.task_detail_marker=[];
        this.task_detail_marker.push({
         position:{ lat: parseFloat(this.task_full_details.task_info_stop[this.task_detail_panel_delivery_model].lat),
                    lng: parseFloat(this.task_full_details.task_info_stop[this.task_detail_panel_delivery_model].lng)
                  },
         icon:"delivery"
        })
        console.log(this.task_detail_marker)
        }
        catch(err){
          console.log(err)
            //this.task_detail_marker = [];
        }
      }
    },
      shapes(n,o){
        //console.log(n)
      },
      task_team_select(n,o){
        if(n == null) return;
        this.geo_circle = n.team_geofence;
        
      },
      async master_date_store(n,o){
        if(n == null )return;
        if(typeof n == undefined)return;
        console.log(n+"date");
        console.log(+this.getMasterTeam+"team")
        if(this.getMasterTeam != null){
          try{
            await this.load_unassigned_task_team_date(this.getMasterTeam._id,n);
          }catch(err){
            console.log("EX-master_date_store")
          }

        }
      },
      
      async selected_team(n,o){
        if(n == null || n == "")return;
        console.log(n._id);
        var res = await this.$axios.get('/api/agent/team/'+n._id);
        console.log(res.data.data);
        if(res.data.status){
          this.agent_teams = res.data.data;
        }
        
      },
      async master_team_store(n,o){
        if(n == null) return;
        if(typeof n == undefined)return;
        
        if(n.team_geofence){
        this.map_center = n.team_geofence.center;
        this.geo_circle = n.team_geofence;
        }
        console.log(n);
        if(this.getMasterDate != null){
          try{
            await this.load_unassigned_task_team_date(n._id,this.getMasterDate)
          }catch(err){
            console.log("EX-master_team_store")
          }
        
        }
   

      },
  },
  computed:{
    ...mapGetters({
      getMasterDate:"getMasterDate",
      getMasterTeam:"getMasterTeam"

    }),
    ...mapState({
      master_date_store:state => state.master_date,
      master_team_store:state => state.master_team
    }),
  },
  components: {
    //MglMap

   
  },data() {
    return {
      assigned_task_list:[],
      assign_teams_check:[],
//map drawing 
task_detail_marker:[],
task_detail_panel_pickup_model:-1,
task_detail_panel_delivery_model:-1,
timer: null,
task_team_select:"",
selected_team:"",
task_to_assign:null,
task_assign_sheet:false,
task_full_details:null,
mapMode:null,
agent_locations:[],
map_center:{lat:11.683169, lng:75.564198},
selected_route_markers:null,
geo_circle:null,
shapes: [],
         
          circleOptions: {
            fillColor: '#777',
            fillOpacity: 0.4,
            strokeWeight: 2,
            strokeColor: '#999',
            draggable: false,
            editable: false,
            clickable: true
          },
         

//map draw end

      task_detail:false,
      task_selected_details:null,
      task_selected_details_sub:null,
      left_side:0,
      right_side:0,
      selected: [2],
      all_team:[],

      agent_teams:[
        
      ],
      un_assigned_task:[],
      vehicle_types:[],
      map_settings:{
        show_geofence:true,
        show_pick_up:true,
        show_delivery:true,
        show_active:true,
      },
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
          title: 'Ali Connors',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        }/*,
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
          title: 'me, Scrott, Jennifer',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
          title: 'Trevor Hansen',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        },*/
      ],



     
    }
  },
}
</script>
<style scoped>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.gmnoprint{
  width:100px !important;
  height:100px !important;
}
.v-list{
  height:80vh;/* or any height you want */
  overflow-y:auto
}
</style>
