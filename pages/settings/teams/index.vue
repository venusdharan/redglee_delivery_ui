<template>
  <div>
    <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
              <h2 class="grey--text">Teams</h2> <v-spacer></v-spacer><v-btn icon color="red"><v-icon>mdi-refresh-circle</v-icon></v-btn>
          </v-card-title>
          <v-tabs v-model="tab">
            <v-tab>View All</v-tab>
            <v-tab>Add Members</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item>
                        <v-row>
          <v-col cols="6">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                   Team Name
                  </th>
                  <th class="text-left">
                   Description
                  </th>
                  <th class="text-right">
                   Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in teams"
                  :key="index"
                  @click="team_row_click(index)"
                 
                >
               
                  <td class="text-left"  >{{ item.team_name }}</td>
                  <td class="text-left"  >{{ item.team_description }}</td>
                  <td class="text-right " ><v-btn
                        icon
                        x-small
                        @click="remove_key(index)"
                    >
                        <v-icon>mdi-trash-can</v-icon>
                    </v-btn></td>
                    
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          </v-col>
          <v-col cols="6">
            <h4 v-if="row_clicked > -1">Selected::{{teams[row_clicked].team_name}}</h4>
            <gmap-map
              :center="{lat:11.683169, lng:75.564198}"
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
              style="width: 100%; height: 60vh; "
             ref="map"
            >

        <div v-if="edit_mode == false">
          <div v-if="typeof(geo_circle.center) != undefined">
        <gmap-circle :center="geo_circle.center"
        :radius="geo_circle.radius"
        :editable="false" 
          ref="polygon">
        </gmap-circle>
        </div>
        </div>
        <!-- 
          shapes[0].overlay.radius
          -->
      

      <template #visible>
        <gmap-drawing-manager
          v-if="edit_mode == true"
          :position="'TOP_CENTER'"
          :setDrawingMode="'circle'"
          :circle-options="circleOptions"
          :shapes="shapes" 
        >
          <template v-slot="on">
              <!--div-- style=" display: flex;  flex-direction: row-reverse; margin:auto; padding: 8px;">
              <v-btn @click="$emit('delete_selection')">Delete</v-btn>
              <v-btn @click="$emit('save')">Save</v-btn>
              </!--div-->
              <drawing-toolbar
              @drawingmode_changed="on.setDrawingMode($event)"
              @delete_selection="on.deleteSelection()"
              @save="save_geofence"
            />
          </template>
          
        </gmap-drawing-manager>
      </template>

                <!--gmap-drawing-manager
              :position="'TOP_CENTER'"
              :circle-options="circleOptions"
              :shapes="shapes"
            /-->
            
            </gmap-map>
            <v-row>
              <v-col>
                <div v-if="row_clicked > -1">
                <v-switch  class="" v-model="edit_mode" label="Edit Mode"></v-switch>
                </div>
              </v-col>
              <v-col>
                <v-btn color="green" class="white--text" >SAVE</v-btn>
              </v-col>
            </v-row>
          </v-col>
            
          </v-row>
          <v-row style="padding:1%;">
            <v-col cols="6">
              <v-row>
            <v-col cols="4">
              <v-text-field label="Team Name" v-model="team_name">

              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Description" v-model="team_description">
                
              </v-text-field>
            </v-col>
             <v-card-actions>
            <v-btn color="green" class="white--text" @click="add_api">
              Add New
            </v-btn>
              </v-card-actions>
              </v-row>
            </v-col>
          </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col cols="6">
                  <v-select style="padding-left:5%;" label="Select Team" :items="teams"  item-text="team_name" v-model="team_selected" return-object></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h4 class="grey--text text-center">Members</h4>
                   <v-data-table
                        :headers="headers"
                        :items="memberTableData"
                        :options.sync="memberoptions"
                        :server-items-length="membertotalCount"
                        :loading="member_loading"
                        :search="membersearch"
                        :pagination.sync="memberpagination"
                        class="elevation-1"
                        item-key="username"
                        :single-expand="true"
                        disable-sort
                        dense
                      >
                      <template v-slot:top>
                        <v-text-field
                          v-model="membersearch"
                          label="Search"
                          class="mx-4"
                        ></v-text-field>
                      </template>
                      <template v-slot:item.profile_icon="{ item }">
                          <v-avatar  color="indigo" size="48">
                            <v-img v-if="item.profile_icon" :src="item.profile_icon" ></v-img>
                            <span v-else class="white--text headline">{{item.username[0].toUpperCase()+item.username[item.username.length-1].toUpperCase()}}</span>
                          </v-avatar>
                      </template>

                      <template v-slot:item._id="{ item }">
                          
                            <v-btn
                              small
                              icon
                              color="error"
                              class="mr-2"
                              @click="remove_agent(item._id)"
                              
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            
                      </template>

                       <template v-slot:no-data>
                            <v-btn
                              color="primary"
                              @click="initialize"
                            >
                              Reset
                            </v-btn>
                          </template>
                    </v-data-table>
                </v-col>
                <v-col>
                  <h4 class="grey--text text-center" >All agents</h4>
                   <v-data-table
                        :headers="headers"
                        :items="allTableData"
                        :options.sync="alloptions"
                        :server-items-length="alltotalCount"
                        :loading="all_loading"
                        :search="allsearch"
                        :pagination.sync="allpagination"
                        class="elevation-1"
                    
                        item-key="username"
                        :single-expand="true"
                        disable-sort
                        dense
                      >
                      <template v-slot:top>
                        <v-text-field
                          v-model="allsearch"
                          label="Search"
                          class="mx-4"
                        ></v-text-field>
                      </template>
                      <template v-slot:item.profile_icon="{ item }">
                          <v-avatar  color="indigo" size="48">
                            <v-img v-if="item.profile_icon" :src="item.profile_icon" ></v-img>
                            <span v-else class="white--text headline">{{item.username[0].toUpperCase()+item.username[item.username.length-1].toUpperCase()}}</span>
                          </v-avatar>
                      </template>

                      <template v-slot:item._id="{ item }">
                            <v-btn
                              small
                              icon
                              color="info"
                              class="mr-2"
                              @click="add_agent(item._id)"
                            >
                              <v-icon>mdi-plus-circle</v-icon>
                            </v-btn>
                            
                            
                      </template>

                       <template v-slot:no-data>
                            <v-btn
                              color="primary"
                              @click="initialize"
                            >
                              Reset
                            </v-btn>
                          </template>
                    </v-data-table>
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>         
        </v-card>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>


<script>
  export default {
    data () {
      return {
      tab:null,
      edit_mode:false,
       team_name:"",
       team_description:"",
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


          //table options

         
      dialog: false,
      dialogDelete: false,
      headers: [
      { text: '', value: 'data-table-expand' },
      {
        text: '',
        align: 'start',
        sortable: false,
        value: 'profile_icon',
      },
      {
        text: ' Username',
        align: 'start',
        sortable: false,
        value: 'username',
      },
      { 
        text: 'Email',
        align: 'start',
        sortable: false, 
        value: 'email' 
      },
      { text: 'Phone',
        align: 'start',
        sortable: false, 
        value: 'phone_number' 
      },
      { text: 'Action',
        align: 'start',
        sortable: false, 
        value: '_id' 
      },
    ],
    memberTableData: [],
    membertotalCount:0,
    memberoptions: {},
    membersearch:"",

    member_loading: false,

    allTableData: [],
    alltotalCount:0,
    alloptions: {},
    allsearch:"",
    all_loading:false,

    teams:[],
    team_selected:"",
    vehicle_types:[],
    vehicle_selected:"",
    row_clicked:-1,
    geo_circle:{}


          // end table options
      }
    },
    async mounted() {
      
      var teams_all = await this.$axios.get('/api/team/all');
        
        this.teams = teams_all.data;

        /*
       try{
        this.loading = true;
        console.log(teams_all.data)
        //this.team_selected = teams_all.data[0].team_name;
        var vehicle_all = await this.$axios.get('/api/vehicle/all');
        this.vehicle_types = vehicle_all.data;
        //this.vehicle_selected = vehicle_all.data[0].vehicle_type

        var res = await this.$axios.get('/api/agent/datatable');
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        console.log(res.data);
        this.loading = false;
         var team_temp = await this.$axios.get('/api/team/all');

        this.teams= team_temp.data;
        }catch(err){
          console.log("E::A")
        }
        */
      
    },
    watch:{
      shapes(n,o){
        //console.log(n)
        if(n.length == 0) return;
        this.geo_circle.center = n[n.length - 1].overlay.center
        this.geo_circle.radius = n[n.length - 1].overlay.radius
      },
      async team_selected(val){
        //console.log(val);
        if(val == null) return;
        //member table
        var member_table_options = {
        items_perpage : this.memberoptions.itemsPerPage,
        page:this.memberoptions.page,
        search:this.membersearch
        }

        member_table_options.team = this.team_selected._id

        try{
        this.member_loading = true;
        var res = await this.$axios.get('/api/agent/by_team/datatable',{ params:member_table_options});
        //this.TableData = res.data.docs;
        //this.totalCount = res.data.totalDocs;

        this.memberTableData = res.data.docs;
        this.membertotalCount = res.data.totalDocs;
        this.member_loading = false;
       }catch(err){
          console.log("E::A")
          this.member_loading = false;
       }

        var all_table_options = {
        items_perpage : this.alloptions.itemsPerPage,
        page:this.alloptions.page,
        search:this.allsearch
        }

        all_table_options.team = this.team_selected._id

        try{
        this.all_loading = true;
        var allres = await this.$axios.get('/api/agent/not_team/datatable',{ params:all_table_options});
        //this.TableData = res.data.docs;
        //this.totalCount = res.data.totalDocs;

        this.allTableData = allres.data.docs;
        this.alltotalCount = allres.data.totalDocs;
        this.all_loading = false;
       }catch(err){
          console.log("E::A")
          this.all_loading = false;
       }



      },
      async membersearch(val){
     
       var member_table_options = {
        items_perpage : this.memberoptions.itemsPerPage,
        page:this.memberoptions.page,
        search:this.membersearch
        }

        member_table_options.team = this.team_selected._id

        try{
        this.member_loading = true;
        var res = await this.$axios.get('/api/agent/by_team/datatable',{ params:member_table_options});
        //this.TableData = res.data.docs;
        //this.totalCount = res.data.totalDocs;

        this.memberTableData = res.data.docs;
        this.membertotalCount = res.data.totalDocs;
        this.member_loading = false;
        }catch(err){
          console.log("E::A")
          this.member_loading = false;
        }
      
    },

     async allsearch(val){
     
       var member_table_options = {
        items_perpage : this.alloptions.itemsPerPage,
        page:this.alloptions.page,
        search:this.allsearch
        }

        member_table_options.team = this.team_selected._id

        try{
        this.all_loading = true;
        var res = await this.$axios.get('/api/agent/not_team/datatable',{ params:member_table_options});
        //this.TableData = res.data.docs;
        //this.totalCount = res.data.totalDocs;

        this.allTableData = res.data.docs;
        this.alltotalCount = res.data.totalDocs;
        this.all_loading = false;
        }catch(err){
          console.log("E::A")
         this.all_loading = false;
        }
      
    },
      memberoptions: {
          async handler (val) {
          if(this.team_selected == "")return ;
          var member_table_options = {
            items_perpage : val.itemsPerPage,
            page:val.page
          }
          member_table_options.team = this.team_selected._id
          try{
          this.member_loading = true;
          var res = await this.$axios.get('/api/agent/by_team/datatable',{ params:member_table_options});
          //this.TableData = res.data.docs;
          //this.totalCount = res.data.totalDocs;
          this.memeberTableData = res.data.docs;
          this.memebertotalCount = res.data.totalDocs;
          this.member_loading = false;
          }catch(err){
            console.log("E::A")
            this.member_loading = false;
          }
        
          
          },
          deep: true,
        },
        alloptions: {
          async handler (val) {
          if(this.team_selected == "")return ;
          var member_table_options = {
            items_perpage : val.itemsPerPage,
            page:val.page
          }
          member_table_options.team = this.team_selected._id
          try{
          this.all_loading = true;
          var res = await this.$axios.get('/api/agent/not_team/datatable',{ params:member_table_options});
          //this.TableData = res.data.docs;
          //this.totalCount = res.data.totalDocs;
          this.allTableData = res.data.docs;
          this.alltotalCount = res.data.totalDocs;
          this.all_loading = false;
          }catch(err){
            console.log("E::A")
            this.all_loading = false;
          }
        
          
          },
          deep: true,
        },
    },
    methods: {
      async save_geofence(){
        this.edit_mode = false;
        var index = this.row_clicked;
        if(this.shapes.length == 0) return;
        var geo = {
          center: this.shapes[this.shapes.length - 1].overlay.center,
          radius:this.shapes[this.shapes.length - 1].overlay.radius
          }
          this.geo_circle = geo;
        this.teams[index].team_geofence = geo
        if(typeof(this.geo_circle.center) == undefined) {}
          var geo = {
          center:this.geo_circle.center,
          radius:this.geo_circle.radius
          }
          var res = await this.$axios.post('/api/team/add_geofence/'+this.teams[index]._id,{
          geo_fence:geo
          });
          console.log(res.data)
        
        
      },
      async team_row_click(index){
        if(this.row_clicked == index){
          this.row_clicked = -1;
          return;
        }
        if(typeof(this.teams[index].team_geofence) != undefined)
        {
          this.geo_circle = this.teams[index].team_geofence;

        }
        this.row_clicked = index;
        
      },
      async add_agent(id){
        if(id == null || this.team_selected == "")return;
        var team = this.team_selected._id;
        var res = await this.$axios.post('/api/agent/team/add',{id:id,team:team});
        if(res.data.status){
        if(this.team_selected == "")return ;
        var member_table_options = {
        items_perpage : this.memberoptions.itemsPerPage,
        page:this.memberoptions.page,
        search:this.membersearch
        }

        member_table_options.team = this.team_selected._id

        try{
        this.member_loading = true;
        var res = await this.$axios.get('/api/agent/by_team/datatable',{ params:member_table_options});
        //this.TableData = res.data.docs;
        //this.totalCount = res.data.totalDocs;

        this.memberTableData = res.data.docs;
        this.membertotalCount = res.data.totalDocs;
        this.member_loading = false;
       }catch(err){
          console.log("E::A")
          this.member_loading = false;
       }

        var all_table_options = {
        items_perpage : this.alloptions.itemsPerPage,
        page:this.alloptions.page,
        search:this.allsearch
        }

        all_table_options.team = this.team_selected._id

        try{
        this.all_loading = true;
        var allres = await this.$axios.get('/api/agent/not_team/datatable',{ params:all_table_options});
        //this.TableData = res.data.docs;
        //this.totalCount = res.data.totalDocs;

        this.allTableData = allres.data.docs;
        this.alltotalCount = allres.data.totalDocs;
        this.all_loading = false;
       }catch(err){
          console.log("E::A")
          this.all_loading = false;
       }
       
       }
        
      },
      async remove_agent(id){
        if(id == null || this.team_selected == "")return;
        var team = this.team_selected._id;
        var res = await this.$axios.post('/api/agent/team/remove',{id:id,team:team});
        if(res.data.status){
        if(this.team_selected == "")return ;
        var member_table_options = {
        items_perpage : this.memberoptions.itemsPerPage,
        page:this.memberoptions.page,
        search:this.membersearch
        }

        member_table_options.team = this.team_selected._id

        try{
        this.member_loading = true;
        var res = await this.$axios.get('/api/agent/by_team/datatable',{ params:member_table_options});
        //this.TableData = res.data.docs;
        //this.totalCount = res.data.totalDocs;

        this.memberTableData = res.data.docs;
        this.membertotalCount = res.data.totalDocs;
        this.member_loading = false;
       }catch(err){
          console.log("E::A")
          this.member_loading = false;
       }

        var all_table_options = {
        items_perpage : this.alloptions.itemsPerPage,
        page:this.alloptions.page,
        search:this.allsearch
        }

        all_table_options.team = this.team_selected._id

        try{
        this.all_loading = true;
        var allres = await this.$axios.get('/api/agent/not_team/datatable',{ params:all_table_options});
        //this.TableData = res.data.docs;
        //this.totalCount = res.data.totalDocs;

        this.allTableData = allres.data.docs;
        this.alltotalCount = allres.data.totalDocs;
        this.all_loading = false;
       }catch(err){
          console.log("E::A")
          this.all_loading = false;
       }
      }
      },
      async load_data(){

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
        var res = await this.$axios.get('/api/agent/datatable',{ params:table_options});
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        this.loading = false;
        }catch(err){
          console.log("E::A")
          this.loading = false;
        }
      },
     async remove_key(id){
        //this.api_keys.splice(id, 1);
        console.log(this.teams[id]._id);
        var res = await this.$axios.post('/api/team/delete/'+ this.teams[id]._id)
        this.$toast.error("Team Removed");
        const apis = await this.$axios.get('/api/team/all');
        this.teams = apis.data;
      },
     
      async add_api(){
        var data = {
          team_name:this.team_name,
          team_description:this.team_description,
          team_geofence:this.shapes
        }
        const teams = await this.$axios.post('/api/team/',data);

        if(teams.data.status){
          this.$toast.success("Team Created");
                  const apis = await this.$axios.get('/api/team/all');
        this.teams = apis.data;
        }else{
          this.$toast.error("Team Creation Error");
        }

        /*
        if(api.data.status){
        this.api_keys.push({ 'api' : api.data.key});
        this.$toast.success("API Created");
        }else{
          this.$toast.error("API Creation Error !");
        }*/
       

      }
    },
  }
</script>