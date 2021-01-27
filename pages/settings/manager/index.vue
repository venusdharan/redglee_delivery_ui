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
                        item-key="username"
                        dense
                        disable-sort
                      >


                      <template v-slot:top>
                      <v-toolbar
                        flat
                      >
                        <v-toolbar-title>Managers and Users</v-toolbar-title>
                        <v-divider
                          class="mx-4"
                          inset
                          vertical
                        ></v-divider>
                        <v-btn color="red" to="./manager/add" class="white--text">ADD</v-btn>
                        <v-spacer></v-spacer>
                        <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                       
                        </v-toolbar>
                        </template>



                      <template v-slot:item.profile_icon="{ item }">
                          <v-avatar  color="indigo" size="86">
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
                              :to="'./manager/edit/'+item._id"
                            >
                              <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn
                              small
                              icon
                              color="error"
                              class="mr-2"
                              @click="show_delete_dialog(item)"
                              
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

                      <template v-slot:expanded-item="{ headers, item }">
                        <td :colspan="headers.length">
                          <v-card>
                            <v-card-title>{{item.username}}</v-card-title>
                            <v-container>
                            <v-row>
                       
                              <v-col><v-card-text>Email : {{item.email}}</v-card-text></v-col>
                              <v-col><v-card-text>First Name : {{item.first_name}}</v-card-text></v-col>
                              <v-col><v-card-text>Middle Name : {{item.middle_name}}</v-card-text></v-col>
                              <v-col><v-card-text>Last Name : {{item.last_name}}</v-card-text></v-col>
                              <v-col><v-card-text>Created Date : {{new Date(item.created_at).toLocaleDateString("en-US")}}</v-card-text></v-col>
                              <v-col>
                                <v-card-text v-if="item.role == 'A'">Role : Admin</v-card-text>
                                <v-card-text v-else>Role : Manager</v-card-text>
                              </v-col>
                              <v-col>
                                <v-card-text v-if="item.teams.length > 0">Teams : {{item.teams}}</v-card-text>
                                <v-card-text v-else>Teams : 0</v-card-text>
                              </v-col>
                              <v-col><v-card-text>Phone : {{item.phone}}</v-card-text></v-col>
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
                        Refresh Data
                      </v-btn>
                    </template>
                      </v-data-table>
                </v-col>
            </v-row>
            <v-dialog
                  v-model="delete_dialog"
                  persistent
                  max-width="800"
                >
                  <v-card>
                    <v-card-title class="headline">
                      Delete this manager with following data?
                    </v-card-title>
                    <v-card-text><strong>Username : {{delete_dialog_data.username}}</strong></v-card-text>
                    <v-card-text><strong>Email:     {{delete_dialog_data.email}}</strong></v-card-text>
                    <v-card-text v-if="delete_confirm_loader">
                    Please stand by
                    <v-progress-linear
                      indeterminate
                     
                      class="mb-0"
                    ></v-progress-linear>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="delete_dialog_data = {} ; delete_dialog = false"
                      >
                        No
                      </v-btn>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="confirm_delete"
                      >
                        yes
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
        </v-container>
    </div>
</template>

<script>
  export default {
    data: () => ({
      search:"",
      delete_dialog:false,
      delete_dialog_data:{
        
      },
      delete_confirm_loader:false,
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
    TableData: [],
    totalCount:0,
    loading: true,
    options: {},
        
     







    }),

    computed: {
      
    },
    methods: {
      async show_delete_dialog(item){
        this.delete_dialog_data = item;
        this.delete_dialog = true;
        console.log(item)

      },
      async confirm_delete(){
        this.delete_confirm_loader = true;
        if(!this.delete_dialog_data) {
          this.delete_dialog_data = {};
          this.delete_dialog = false;
          this.delete_confirm_loader = false;
          return ;
        }
        const id = this.delete_dialog_data._id;
        try{
          var res = await this.$axios.post('/api/manager/delete',{id:id});
        }catch(err){
          this.delete_dialog_data = {};
          this.delete_dialog = false;
          this.delete_confirm_loader = false;
          return ;
        }
        const delete_id = this.TableData.indexOf(this.delete_dialog_data)
        this.TableData.splice(delete_id,1);
        this.delete_dialog = false;

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
        try{
        this.loading = true;
        var res = await this.$axios.get('/api/manager/datatable',{ params:table_options});
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
    async search(val){
     
      var table_options = {
        items_perpage : this.options.itemsPerPage,
        page:this.options.page,
        search:val
      }
      try{
      this.loading = true;
      var res = await this.$axios.get('/api/manager/datatable',{ params:table_options});
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
        var res = await this.$axios.get('/api/manager/datatable',{ params:table_options});
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
        try{
        this.loading = true;
        var res = await this.$axios.get('/api/manager/datatable');
        this.TableData = res.data.docs;
        this.totalCount = res.data.totalDocs;
        console.log(res.data);
        this.loading = false;
        }catch(err){
          console.log("E::A")
        }
        
    },

  }
</script>

<style>
.v-data-table > .v-data-table__wrapper tbody tr.v-data-table__expanded__content {
  box-shadow: inset 0px 0px 0px -0px rgba(50, 50, 50, 0.75), inset 0px 0px 0px 0px rgba(50, 50, 50, 0.75) !important;
}
</style>