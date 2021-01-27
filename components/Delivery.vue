<template>
    <!--v-container>
      <v-row no-gutters>
        <v-col cols="11">
        <v-expansion-panels class="mb-6"-->
            <v-expansion-panel dense>
                
            <v-expansion-panel-header>
                <v-row no-gutters>
                <v-col cols="4">
                    Delivery
                </v-col>
                <v-col cols="4">
                    {{name}}<div v-if="name && datetime">--</div><div v-if="datetime">{{new Date(datetime).toLocaleString()}}</div>
                </v-col>
                </v-row>  
                 <v-row no-gutters>
                    <v-col>
                     <span v-if="input_error" class="red--text" >
                            Error: Missing Data {{input_error_msg}}
                    </span>   
                </v-col>
                </v-row>            
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-row>
                    <v-col>
                        <v-text-field
                        v-model="name"
                        prepend-icon="mdi-account"
                        label="Name"
                        aria-autocomplete="off"
                        >
                        </v-text-field>
                    </v-col>
                    </v-row>
                    <v-row>
                    <v-col>
                        <v-text-field
                         v-model="email"
                        prepend-icon="mdi-email"
                        
                        label="Email"
                        >
                        </v-text-field>
                    </v-col>
                    </v-row>
                    <v-row>
                    <v-col>
                      
                    <vue-tel-input v-model="phone" required></vue-tel-input>
                        
                    </v-col>
                </v-row>
                <v-row>
                    
                      <v-col>
                        <!--datetime format="MM-DD-YYYY h:i:s" width="100%" v-model="datetime"></!--datetime-->
                        <v-datetime-picker :datePickerProps='{color:"primary"}' label="Deliver before" v-model="datetime" >
                            <template slot="dateIcon">
                                <v-icon>mdi-calendar-range</v-icon>
                            </template>
                            <template slot="timeIcon">
                                <v-icon>mdi-clock-outline</v-icon>
                            </template>
                        </v-datetime-picker>
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
                       <gmap-autocomplete class="introInput" v-model="address"   @place_changed="setPlace">
                        <template   template v-slot:input="slotProps">
                        <v-text-field 
                                      prepend-inner-icon="mdi-map-marker"
                                      label="Address Map"
                                      ref="input"
                                      v-model="address"
                                      v-on:listeners="slotProps.listeners"
                                      v-on:attrs="slotProps.attrs">
                        </v-text-field>
                        </template>
                        </gmap-autocomplete>




                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-row>
                        
                            <v-col>
                        <v-text-field
                        v-model="lat"
                        prepend-icon="mdi-numeric"
                        label="Latitude"
                        >
                        </v-text-field>
                            </v-col>
                            <v-col>
                        <v-text-field
                        v-model="lng"
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
                        <v-textarea
                        v-model="real_address"
                        prepend-icon="mdi-comment-text"
                        label="Address"
                        clearable
                        clear-icon="mdi-close-circle"
                        rows="1"
                        >
                        </v-textarea>
                    </v-col>
                </v-row>
                <!--v-row>
                    <v-col>
                        <v-datetime-picker prepend-icon="mdi-phone"  :dialogWidth=640 timeIcon="mdi-phone" label="Pick up before" v-model="datetime"> 
                            <template v-slot:dateIcon>
                                <v-icon>mdi-map-legend</v-icon>
                            </template>
                            <template v-slot:timeIcon>
                                <v-icon>mdi-map-legend</v-icon>
                            </template>
                        </v-datetime-picker>
                    </v-col>
                </!--v-row-->
                 <v-row>
                    <v-col>
                    <div id="my-strictly-unique-vue-upload-multiple-image">
                      <vue-upload-multiple-image
                        @upload-success="uploadImageSuccess"
                        @before-remove="beforeRemove"
                        @edit-image="editImage"
                        @data-change="dataChange"
                        :data-images="images"
                        :dragText="'Drag Image'"
                        :browseText="'Image Browser'"
                        :primaryText="'Image'"
                        :markIsPrimaryText="'First Image'"
                        :popupText="'Select Image'"
                        :dropText="'Drag and Drop Image'"
                        ></vue-upload-multiple-image>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-row>
                        <v-col>
                        <v-simple-table style="overflow-y:auto;">
                            <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                        Field Name
                                        </th>
                                        <th class="text-left">
                                        Field Data
                                        </th>
                                        <th class="text-right">
                                        Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                    v-for="(item, index) in key_pairs"
                                    :key="index"
                                    >
                                    <td class="text-left">{{ item.name }}</td>
                                    <td class="text-left">{{ item.value }}</td>                                  
                                    <td class="text-right"><v-btn
                                        icon
                                        x-small
                                        @click="remove_key(index)"
                                    >
                                        <v-icon>mdi-trash-can</v-icon>
                                    </v-btn>
                                    </td>
                                    </tr>
                                </tbody>
                                </template>
                        </v-simple-table>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                            <v-text-field
                            v-model="key_name"
                            label="Name"
                            :rules="rules"
                            hide-details="auto"
                            ></v-text-field>
                            </v-col>
                            <v-col>
                            <v-text-field
                            v-model="key_val"
                            label="Value"
                            :rules="rules"
                            hide-details="auto"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                            <v-btn class="white--text" color="green" @click="addkey">ADD</v-btn>
                            </v-col>
                        </v-row>
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
                           <v-dialog
      v-model="geo_dialog"
      persistent
      max-width="600"
    >
      
      <v-card>
        <v-card-title class="headline">
          Error delivery place out side geofence !
        </v-card-title>
        <v-card-text>The area is out side geofence please correct by dragging the marker to a new location inside the geofence</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn
            color="green darken-1"
            text
            @click="geo_dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
            </v-expansion-panel-content>
            </v-expansion-panel>
        <!--/v-expansion-panels>
        </v-col>
        <v-col cols="1"><v-btn icon @click="remove_this"><v-icon>mdi-delete</v-icon></v-btn></v-col>
        </v-row>
    </v-container-->
</template>

<script>
import * as geolib from 'geolib';
import {mapState,mapMutations,mapGetters} from 'vuex'
import datetime from 'vuejs-datetimepicker';
import VueUploadMultipleImage from 'vue-upload-multiple-image';
export default {
    props: ['index'],
    components:{
     datetime,
     VueUploadMultipleImage, 
    },
    data() {
        return {
           geo_dialog:false,
           real_address:"",
           key_pairs:[],
           key_val:"",
           key_name:"",
           images: [],
           name:"",
           phone:"",
           email:"",
           order_id:"",
           datetime:new Date(),
           description:"",
           name_error:false,
           datetime_error:false,
           phone_error:false,
           input_error:false,
           input_error_msg:"Error Missing ",
           address:"",
            lat:"",
           lng:"",



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
      computed:{
      ...mapState({
        pick_up_component : state => state.pick_up_component,
        delivery_component : state => state.delivery_component,
        open_pickup_item:state=>state.open_pickup_item,
        open_delivery_item:state=>state.open_delivery_item,
        focus_lat_lng:state=>state.focus_lat_lng,
        task_team:state=>state.task_team
      }),
      ...mapGetters({
        getPickupComponent:"getPickupComponent",
        getDeliveryComponent:"getDeliveryComponent",
        getFocusLatLng:"getFocusLatLng"
      }),
        getError(){
            this.input_error_msg = "";
           if(this.name == ""){
                 this.input_error_msg = this.input_error_msg + " [Name] ";
                 this.input_error = true;
                 
             }
             if(this.phone == ""){
                 this.input_error_msg = this.input_error_msg + " [Phone] ";
                 this.input_error = true;
              
             }
              if(this.lat == "" || this.lng == ""){
                 this.input_error_msg = this.input_error_msg + " [Address] ";
                 this.input_error = true;
                 
             }
      }
    },
    watch: {
        focus_lat_lng(n,o){
        if(n == null ){ return; }
        if(this.open_delivery_item == this.index){
         var lat_lng = this.getFocusLatLng;
         if(lat_lng == null) return
         this.lat = lat_lng.lat;
         this.lng = lat_lng.lng;
         if(this.task_team != null){
            var is_in_geofence = false;
            is_in_geofence =  geolib.isPointWithinRadius(
                { latitude:lat_lng.lat, longitude: lat_lng.lng },
                { latitude: this.task_team.team_geofence.center.lat, longitude:this.task_team.team_geofence.center.lng},
                this.task_team.team_geofence.radius
            );
            if(!is_in_geofence){
                //alert("Out of Assigned Area !")
                this.geo_dialog = true;
            }
         }
        }
        
      },
      open_delivery_item(n,o){
          console.log(n)
        if(n == null ){ return; }
        if(n == this.index){
         this.setFocusLatLng({
             lat:this.lat,
             lng:this.lng
         })

        }
      }
    },
    methods: {
        ...mapMutations({
      addPickup:"addPickup",
      removePickUp:"removePickUp",
      addDelivery:"addDelivery",
      removeDelivery:"removeDelivery",
      clearPickUp:"clearPickUp",
      clearDelivery:"clearDelivery",
      removeLastPickUp:"removeLastPickUp",
      removeLastDelivery:"removeLastDelivery",
      setPickUpOpen:"setPickUpOpen",
      setDeliveryOpen:"setDeliveryOpen",
      clearPickUpOpen:"clearPickUpOpen",
      clearDeliveryOpen:"clearDeliveryOpen",
      setFocusPlace:"setFocusPlace",
      setFocusLatLng:"setFocusLatLng"
    }),
      addkey(){
        if(this.key_val == "" && this.key_name == "")return;
        var t_key = this.key_name;
        var t_val = this.key_val;
        this.key_pairs.push({name:t_key,value:t_val});
        this.key_name = "";
        this.key_val = "";
    },
    remove_key(index){
         this.key_pairs.splice(index, 1);
    },
  uploadImageSuccess(formData, index, fileList) {
      console.log('data', formData, index, fileList)
      // Upload image api
      // axios.post('http://your-url-upload', { data: formData }).then(response => {
      //   console.log(response)
      // })
      this.images = fileList;
    },
    beforeRemove (index, done, fileList) {
      console.log('index', index, fileList)
      var r = confirm("remove image")
      if (r == true) {
          this.images = fileList;
        done()
      } else {
      }
    },
    editImage (formData, index, fileList) {
      console.log('edit data', formData, index, fileList)
      this.images = fileList;
    },
    dataChange (data) {
      console.log(data)
    },
       get_delivery(){
           this.input_error_msg = "";
            this.input_error = false;
             if(this.name == ""){
                 this.input_error_msg = this.input_error_msg + " [Name] ";
                 this.input_error = true;
                 
             }
             if(this.phone == ""){
                 this.input_error_msg = this.input_error_msg + " [Phone] ";
                 this.input_error = true;
              
             }
             if(this.lat == "" || this.lng == ""){
                 this.input_error_msg = this.input_error_msg + " [Address] ";
                 this.input_error = true;
                 
             }
              if(this.address == "" ){
                 this.input_error_msg = this.input_error_msg + " [Address] ";
                 this.input_error = true;
                 
             }
             if(this.input_error){
                 return null
             }
             
           return{
               name:this.name,
               phone:this.phone,
               email:this.email,
               order_id:this.order_id,
               datetime:this.datetime,
               description:this.description,
               lat:this.lat,
               lng:this.lng,
               address:this.address,
               images:this.images,
               key_pairs:this.key_pairs

           }
       },
        setLatLng(location){
           this.lat = location.latLng.lat()
           this.lng = location.latLng.lng()
       },
       setPlace(place){
           //this.$emit("setPlace", place);
            if(place == undefined)return
            if(place == null)return
            this.setFocusLatLng({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                })
            this.setFocusPlace(place)
       },
        remove_this(){
           this.$emit("remove_delivery",this);
       }
    },
}

</script>

<style>

.pac-container{
  font-size:18px !important;
}
.pac-item {
    padding:1%;
    font-size: 18px;
}
.pac-matched{
       font-size: 18px;
}
.pac-item-query{
     font-size: 18px;
}

#my-strictly-unique-vue-upload-multiple-image {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
 
h1, h2 {
  font-weight: normal;
}
 
ul {
  list-style-type: none;
  padding: 0;
}
 
li {
  display: inline-block;
  margin: 0 10px;
}
 
a {
  color: #42b983;
}  
</style>

