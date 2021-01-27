<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                     <!--v-simple-table>
                        v-on:update:page="update_data"
                        v-on:update:options="update_options"
                      </v-simple-table-->
                        <v-data-table
                        :headers="headers"
                        :items="TableData"
                        :options.sync="options"
                        :server-items-length="totalCount"
                        :loading="loading"
                        :search="search"
                        :pagination.sync="pagination"
                        class="elevation-1"
                        show-expand
                        item-key="task_number"
               
                          :single-expand="true"
                        disable-sort
                      >


                      <template v-slot:top>
                      <v-toolbar
                        flat
                      >
                        <v-toolbar-title>TASK</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-datetime-picker class="white--text" dark label="Task Date" v-model="datetime" >
                            <template slot="dateIcon">
                                <v-icon>mdi-calendar-range</v-icon>
                            </template>
                            <template slot="timeIcon">
                                <v-icon>mdi-clock-outline</v-icon>
                            </template>
                        </v-datetime-picker>
                        <v-spacer></v-spacer>
                        <v-select
                        :items="teams"
                        label="Select Teams"
                        item-text="team_name"
                        v-model="team_selected"
                        dense
                        > 
                        </v-select>
                        <v-btn v-if="team_selected != ''" icon @click="team_selected = '' ">
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-select
                        :items="vehicle_types"
                        item-text="vehicle_type"
                        label="Select Vehicle Type"
                        v-model="vehicle_selected"
                        dense
                        > 
                        </v-select>
                         <v-btn v-if="vehicle_selected != ''" icon @click="vehicle_selected = '' ">
                          <v-icon>mdi-close-circle</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                       <v-spacer></v-spacer><v-btn icon color="red" @click="load_data"><v-icon>mdi-refresh-circle</v-icon></v-btn>
                        </v-toolbar>
                        </template>


                      <template v-slot:item.task_created="{ item }">
                          <td>
                            {{new Date(item.task_created).toLocaleDateString("en-US")}}
                          </td>
                      </template>
                      

                      <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                          <v-card>
                          
                            <v-container>
                            <v-row>
                              
                              <v-col>
                                <v-card-text>PickUp details</v-card-text>
                                
                                <v-simple-table>
                                  <template v-slot:default>
                                    <thead>
                                      <tr>
                                        <th>PickUp</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Order ID</th>
                                        <th>Date and Time</th>
                                        <th>Address</th>
                                        <th>Details</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr  v-for="(subitem,i) in item.task_info_start" :key="i">
                                        <td>{{ subitem.name }}</td>
                                        <td>{{ subitem.phone }}</td>
                                        <td>{{ subitem.email }}</td>
                                        <td>{{ subitem.order_id }}</td>
                                        <td>{{ new Date(subitem.datetime).toLocaleDateString("en-US") }}</td>
                                        <td><v-btn x-small color="blue" class="white--text" @click="open_task_pickup_details(item,i)">Address</v-btn></td>
                                        <td>{{ subitem.details }}</td>
                                      </tr>
                                    </tbody>
                                  </template>
                                </v-simple-table>
                              </v-col>

                              <v-col>
                                <v-card-text>Delivery details</v-card-text>
                                <v-simple-table>
                                  <template v-slot:default>
                                    <thead>
                                      <tr>
                                        <th>Delivery</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Order ID</th>
                                        <th>Date and Time</th>
                                        <th>Address</th>
                                        <th>Details</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr  v-for="(subitem,i) in item.task_info_stop" :key="i">
                                        <td>{{ subitem.name }}</td>
                                        <td>{{ subitem.phone }}</td>
                                        <td>{{ subitem.email }}</td>
                                        <td>{{ subitem.order_id }}</td>
                                        <td>{{ new Date(subitem.datetime).toLocaleDateString("en-US") }}</td>
                                        <td><v-btn x-small color="blue" class="white--text" @click="open_task_delivery_details(item,i)">Address</v-btn></td>
                                        <td>{{ subitem.details }}</td>
                                      </tr>
                                    </tbody>
                                  </template>
                                </v-simple-table>
                              </v-col>
                              <!--v-col v-if="item.team"><v-card-text>Vehicle Type : {{item.team}}</v-card-text></!--v-col>
                              <v-col v-if="item.vehicle_type"><v-card-text>Vehicle Type : {{item.vehicle_type}}</v-card-text></v-col>
                              <v-col v-if="item.vehicle_number"><v-card-text>Vehicle Number : {{item.vehicle_number}}</v-card-text></v-col>
                              <v-col v-if="item.license_number"><v-card-text>License Number : {{item.license_number}}</v-card-text></v-col>
                              <v-col v-if="item.aadhar_number"><v-card-text>Aadhar Number : {{item.aadhar_number}}</v-card-text></v-col>
                              <v-col v-if="item.device_type"><v-card-text>Device Type : {{item.device_type}}</v-card-text></v-col>


                              <v-col v-if="item.device_battery_level"><v-card-text>Device Battery Level : {{item.device_battery_level}}</v-card-text></v-col>
                              
                              <v-col v-if="item.created_at"><v-card-text>Created Date : {{new Date(item.created_at).toLocaleDateString("en-US")}}</v-card-text></v-col>
                              <v-col>
                                <div v-if="item.teams">
                                <v-card-text v-if="item.teams.length > 0">Teams : {{item.teams}}</v-card-text>
                                <v-card-text v-else>Teams : 0</v-card-text>
                                </div>
                              </v-col-->
                            </v-row>
                            </v-container>
                          </v-card>
                        </td>
                      </template>

                      <template v-slot:no-data>
                      <v-btn
                        color="primary"
                        @click="update_options"
                      >
                        Reset
                      </v-btn>
                    </template>
                      </v-data-table>
                </v-col>
            </v-row>
            <v-row>
             
            </v-row>
        </v-container>
        <v-dialog
          v-model="dialog"
          persistent
          style="height:75vh;"
        >
     
      <v-card>
        <v-card-title class="headline">
         TASK Details
        </v-card-title>
        <v-card-text></v-card-text>
        
          <v-spacer></v-spacer>
          <v-container>
            <v-row>
              <v-col>
                <h4>Pick Up Details</h4>
                <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>PickUp</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Order ID</th>
                      <th>Date and Time</th>
                      <th>Address</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!--tr--  v-for="(subitem,i) in selected_item.task_info_start" :key="i">
                      <td>{{ subitem.name }}</td>
                      <td>{{ subitem.phone }}</td>
                      <td>{{ subitem.email }}</td>
                      <td>{{ subitem.order_id }}</td>
                      <td>{{ new Date(subitem.datetime).toLocaleDateString("en-US") }}</td>
                      <td><v-btn x-small color="blue" class="white--text" @click="open_task_pickup_details(item,index)">Address</v-btn></td>
                      <td>{{ subitem.details }}</td>
                    </!--tr-->
                  </tbody>
                </template>
              </v-simple-table>
              </v-col>
            
              <v-col>
                <div v-if="details_pick">
                  <div v-if="selected_item_index != null">
                 <gmap-map
                    :center="{lat:Number(selected_item.task_info_start[selected_item_index].lat), lng:Number(selected_item.task_info_start[selected_item_index].lng)}"
                    :zoom="15"
                    :map-type-control=false
                    :street-view-control=false
                    :full-screen-control=false
                    map-type-id="roadmap"
                    :options="{
                      zoomControl: true,
                      mapTypeControl: false,
                      scaleControl: true,
                      streetViewControl: false,
                      rotateControl: false,
                      fullscreenControl: false,
                      disableDefaultUi: false
                    }"
                    style="width: 100%; height:50vh;  top:0px;"
                    ref="map"
                  >
                  <gmap-marker
                  :position="{lat:Number(selected_item.task_info_start[selected_item_index].lat), lng:Number(selected_item.task_info_start[selected_item_index].lng)}"
                  :clickable="true" 
                  :icon="{ url: require('~/static/markers/pick_up.png')}"
                  >    
                  </gmap-marker>
                  </gmap-map>
                  </div>
                </div>
                <div v-else>
                  <div v-if="selected_item_index != null">
                  <gmap-map
                    :center="{ lat:Number(selected_item.task_info_stop[selected_item_index].lat), lng:Number(selected_item.task_info_stop[selected_item_index].lng)}"
                    :zoom="15"
                    :map-type-control=false
                    :street-view-control=false
                    :full-screen-control=false
                    map-type-id="roadmap"
                    :options="{
                      zoomControl: true,
                      mapTypeControl: false,
                      scaleControl: true,
                      streetViewControl: false,
                      rotateControl: false,
                      fullscreenControl: false,
                      disableDefaultUi: false
                    }"
                    style="width: 100%; height:50vh;  top:0px;"
                  ref="map"
                  >
                  <gmap-marker
                  :position="{ lat:Number(selected_item.task_info_stop[selected_item_index].lat), lng:Number(selected_item.task_info_stop[selected_item_index].lng) }"
                  :clickable="true" 
                  :icon="{ url: require('~/static/markers/delivery.png')}"
                  >    
                  </gmap-marker>
                  </gmap-map>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false;selected_item_index = null"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
  export default {
    data: () => ({
      search:"",
      dialog: false,
      dialogDelete: false,
      selected_item:null,
      selected_item_index:null,
      details_pick:false,
      headers: [
      { text: '', value: 'data-table-expand' },
      {
        text: 'TASK ID',
        align: 'start',
        sortable: false,
        value: 'task_number',
      },
      {
        text: 'Task Type',
        align: 'start',
        sortable: false,
        value: 'task_type',
      },
      { 
        text: 'Status',
        align: 'start',
        sortable: false, 
        value: 'task_status' 
      },
      { text: 'Created Date',
        align: 'start',
        sortable: false, 
        value: 'task_created' 
      },
      

    ],
    TableData: [],
    totalCount:0,
    loading: true,
    options: {},

    teams:[],
    team_selected:"",
    vehicle_types:[],
    vehicle_selected:"",

        
     







    }),

    computed: {
      
    },
    methods: {
      async open_task_pickup_details(item,index){
        this.dialog = true
        this.details_pick = true;
        this.selected_item = item;
        this.selected_item_index = index;
        console.log(this.selected_item.task_info_start[this.selected_item_index])
      },
      async open_task_delivery_details(item,index){
        this.dialog = true
        this.details_pick = false;
        this.selected_item = item;
        this.selected_item_index = index;
      },
      async load_data(){
        try{
        this.loading = true;
        var teams_all = await this.$axios.get('/api/team/all');
        this.teams = teams_all.data;
        //this.team_selected = teams_all.data[0].team_name;
        var vehicle_all = await this.$axios.get('/api/vehicle/all');
        this.vehicle_types = vehicle_all.data;
        //this.vehicle_selected = vehicle_all.data[0].vehicle_type
        var res = await this.$axios.get("/api/task/datatable");
        res = res.data;
        console.log(res.data)
        if(res.status == false) return;
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
        }
      },
      async pagination(val){
        console.log(val);
      },
      async update_data(val){
       //console.log(val);
      },
      async update_options(val){
       // console.log(val)
        var table_options = {
          items_perpage : val.itemsPerPage,
          page:val.page
        }
        if(this.team_selected != ""){
          table_options.team = this.team_selected
        }
        if(this.vehicle_selected != ""){
          table_options.vehicle= this.vehicle_selected
        }
        try{
        this.loading = true;
        var res = await this.$axios.get("/api/task/datatable",{ params:table_options});
        res = res.data;
        if(res.status == false) return;
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
          this.loading = false;
        }
      }
    },
    watch: {
    async team_selected(newVal,oldVal){
      if (oldVal == newVal){return}
      var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        team:newVal
      }
      if(this.vehicle_selected != "")
      {
        table_options.vehicle = this.vehicle_selected
      }
      try{
      this.loading = true;
      var res = await this.$axios.get("/api/task/datatable",{ params:table_options});
      res = res.data;
      if(res.status == false) return;
      this.TableData = res.data.docs;
      this.totalCount = res.data.totalDocs;
      this.loading = false;
      }catch(err){
        console.log("E::A")
        this.loading = false;
      }
    },
    async vehicle_selected(newVal,oldVal){
      if (oldVal == newVal){return}
      var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        vehicle:newVal
      }
      if(this.team_selected!= "")
      {
        table_options.team= this.team_selected
      }
      try{
      this.loading = true;
      var res = await this.$axios.get("/api/task/datatable",{ params:table_options});
      res = res.data;
      if(res.status == false) return;
      this.TableData = res.data.docs;
      this.totalCount = res.data.totalDocs;
      this.loading = false;
      }catch(err){
        console.log("E::A")
        this.loading = false;
      }
    },
    async search(val){
      var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        search:val
      }
      if(this.team_selected != ""){
        table_options.team = this.team_selected
      }
      if(this.vehicle_selected != ""){
        table_options.vehicle= this.vehicle_selected
      }
      try{
      this.loading = true;
      var res = await this.$axios.get("/api/task/datatable",{ params:table_options});
      res = res.data;
      if(res.status == false) return;
      this.TableData = res.data.docs;
      this.totalCount = res.data.totalDocs;
      this.loading = false;
      }catch(err){
        console.log("E::A")
        this.loading = false;
      }
      
    },
     options: {
        async handler (val) {
         console.log(val)
        var table_options = {
          items_perpage : val.itemsPerPage,
          page:val.page
        }
        try{
        this.loading = true;
        var res = await this.$axios.get("/api/task/datatable",{ params:table_options});
        res = res.data;
        if(res.status == false) return;
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
          this.loading = false;
        }  
        },
        deep: true,
      },
    },

    async mounted () {
        //var res = await this.$axios.get('/api/manager/all');
        //console.log(res.data);
        await this.$gmapApiPromiseLazy();
        this.load_data()
        
    },

  }
</script>

<style>
.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
  box-shadow: inset 0px 0px 0px -0px rgba(50, 50, 50, 0.75), inset 0px 0px 0px 0px rgba(50, 50, 50, 0.75) !important;
}
</style>