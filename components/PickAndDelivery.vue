<template>
    <div>
      <v-container>
        <v-row no-gutters>
            <v-col>
                <h3>Create a Pick and Delivery Task</h3>
            </v-col>
            <v-col>
                <v-select dense
                style="padding-left:2%; padding-right:2%;"
                label="Assign Type"
                :items="task_assign_type"
                v-model="task_assign_type_selected"
                return-object
                item-text="name"
                ></v-select>
            </v-col>
            <v-col>
                <v-btn color="red" class="white--text" @click="create_task">Create Task</v-btn>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-radio-group
            v-model="mode"
            @change="mode_change"
            row
            >
            <v-radio
                label="1 pick up - many delivery"
                value="pickup"
            ></v-radio>
            <v-radio
                label="Many pickup - 1 delivery"
                value="delivery"
            ></v-radio>
            </v-radio-group>
        </v-row>
        <v-row style="" no-gutters>
            <v-col>
                        <v-btn v-if="enable_pick_up_add" type="button" small color="green" class="white--text" style=""  @click="add_pickup">Add Pickup</v-btn>
                        <v-btn v-if="enable_pick_up_add" type="button" small color="red" class="white--text" style=""  @click="remove_pickup">Remove Pickup</v-btn>
            <!--
            <component
                v-for="(c, index) in pick_up_component"
                :key="index"
                ref="pick_up_component"
                :is="c"
             
                style="padding:1%;"
                @remove_pick_up="remove_pickup_item(index)"
              
            />
            -->
             <v-expansion-panels class="mb-6" focusable accordion v-model="pick_up_open">
               <component
                v-for="(c, index) in  pick_up_component "
                :key="index"
                ref="pick_up_component"
                :is="c"
                :index="index"
                style="padding:1%;"
                @remove_pick_up="remove_pickup_item(index)"
              
            />
        
             </v-expansion-panels>

            </v-col>
        </v-row>
        <v-row style="" no-gutters>
            <v-col>
            <v-btn v-if="enable_delivery_add" type="button" color="green" class="white--text"  style="width:25%; margin-bottom:2%;" @click="add_delivery">Add Delivery</v-btn>
            <v-btn v-if="enable_delivery_add" type="button" color="red" class="white--text" style="width:25%; margin-bottom:2%;"  @click="remove_delivery">Remove Delivery</v-btn>
              <v-expansion-panels class="mb-6" focusable accordion v-model="delivery_open">
            <component
                v-for="(c, index) in  delivery_component"
                :key="index"
                :is="c"
                ref="delivery_component"
                style="padding:1%;"
                :index="index"
                @remove_delivery="remove_delivery_item(index)" 
            />
          
             </v-expansion-panels>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-select dense
                style="padding-left:2%; padding-right:2%;"
                label="Templates"
                ></v-select>
            </v-col>
      
        </v-row>
      </v-container>
       
      

    </div>
</template>

<script>
import pickup from './PickUp';
import delivery from './Delivery';
import {mapState,mapMutations,mapGetters} from 'vuex'
export default {
    props: ['team','vehicle_type'],
    data() {
        return {
            task_assign_type:[
              {
                name:"Manual",
                type:"manual"
              },
              {
                name:"Auto",
                type:"auto"
              }
            ],
            task_assign_type_selected:  {
                name:"Manual",
                type:"manual"
              },
            pick_up_open:-1,
            delivery_open:-1,
            create_task_dialog:false,
            enable_pick_up_add:false,
            enable_delivery_add:false,
            mode:null,
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
  

    async create_task(){

      //  this.create_task_dialog = true

        
       // this.$store.commit("show_alert","example","test")
        //console.log(this.$refs.pick_up_component)
        var pick_up_task = []
        var pick_err = false;
        if(typeof this.$refs.pick_up_component == 'undefined'){
          alert("Please add atleast one pick up point");
          return;
        }
        if(this.$refs.pick_up_component.length == 0){
          alert("Please add atleast one pick up point");
          return;
        }
        for(var pick_up in this.$refs.pick_up_component){
          /*
            pick_up_task.push(
                {
                    name:this.$refs.pick_up_component[pick_up].name,
                    phone:this.$refs.pick_up_component[pick_up].phone,
                    email:this.$refs.pick_up_component[pick_up].email,
                    order_id:this.$refs.pick_up_component[pick_up].order_id,
                    datetime:this.$refs.pick_up_component[pick_up].datetime,
                    description:this.$refs.pick_up_component[pick_up].description,
                }
            )*/

            var pickup_temp = this.$refs.pick_up_component[pick_up].get_pickup();
            console.log(pickup_temp)
            if(pickup_temp == null){
              pick_err = true;
              break;
            }else{
              pick_up_task.push(pickup_temp)
            }

            //console.log()
            
            
        }
        //console.log(pick_up_task);
        var del_tasks = []
        var del_err = false;
        if(typeof this.$refs.delivery_component.length == 'undefined'){
          alert("Please add atleast one delivery item");
          return;
        }
        if(this.$refs.delivery_component.length == 0){
          alert("Please add atleast one delivery item");
          return;
        }
        for(var del_task in this.$refs.delivery_component){
          /*
            pick_up_task.push(
                {
                    name:this.$refs.pick_up_component[pick_up].name,
                    phone:this.$refs.pick_up_component[pick_up].phone,
                    email:this.$refs.pick_up_component[pick_up].email,
                    order_id:this.$refs.pick_up_component[pick_up].order_id,
                    datetime:this.$refs.pick_up_component[pick_up].datetime,
                    description:this.$refs.pick_up_component[pick_up].description,
                }
            )*/

            var del_temp = this.$refs.delivery_component[del_task].get_delivery();
            console.log(del_temp)
            if(del_temp == null){
              del_err = true;
              break;
            }else{
              del_tasks.push(del_temp)
            }

            //console.log()
            
            
        }
        if(this.team == null || this.vehicle_type == null){
          this.clearPickUpOpen();
          this.clearDeliveryOpen()
          this.setDeliveryOpen(-1)
          this.setPickUpOpen(-1)
          return;
        }
        if(del_err || pick_err){
          this.clearPickUpOpen();
          this.clearDeliveryOpen()
          this.setDeliveryOpen(-1)
          this.setPickUpOpen(-1)
          return;
        }

        var data = {
          pick_up : pick_up_task,
          delivery:del_tasks,
          task_type:'pickup_delievry',
          task_subtype:'pickup',
          team:this.team._id,
          task_assign_type:this.task_assign_type_selected.type,
          vehicle_type:this.vehicle_type._id
        }
        console.log(data)
        var res_d = await this.$axios.post('/api/task/create',data)
        console.log(res_d.data);
        if(res_d.data.status){
          this.$emit('task_created', res_d.data.data)
        }else{
          alert("task creation failed");
        }
        
    },

    


  	add_pickup () {
       this.addPickup(pickup)
    },
    add_delivery () {
        this.addDelivery(delivery)
    },
    remove_pickup(){
        this.removeLastPickUp();
    },
    remove_delivery(){
       this.removeLastDelivery();
    },
    remove_pickup_item(val){
      this.removePickUp(val)
      /*
      if(this.pick_up_component.length > 1){
        this.pick_up_component.splice(val, 1);
      }*/
    },

    remove_delivery_item(val){
      this.removeDelivery(val)
      /*
      if(this.delivery_component.length > 1){
        this.delivery_component.splice(val, 1);
        }*/
    },
    mode_change(event){

      /*
      if(event == "pickup"){
            this.clearPickUp();
            this.clearDelivery();
             this.add_pickup()
            this.add_delivery()
            this.clearPickUpOpen();
            this.clearDeliveryOpen()
            this.local_pickup = -1;
            this.local_delivery = -1;
            this.enable_pick_up_add = false;
            this.enable_delivery_add = true;
      }
      */

     	//this.add_pickup ()
    }


    },
    computed:{
      ...mapState({
        pick_up_component : state => state.pick_up_component,
        delivery_component : state => state.delivery_component,
        open_pickup_item:state=>state.open_pickup_item,
        open_delivery_item:state=>state.open_delivery_item,
        focus_lat_lng:state=>state.focus_lat_lng
      }),
      ...mapGetters({
        getPickupComponent:"getPickupComponent",
        getDeliveryComponent:"getDeliveryComponent",
        getAllPickupComponent:"getAllPickupComponent",
        getAllDeliveryComponent:"getAllDeliveryComponent"
      })
    },
    watch: {
/*
      pick_up_component(n,o){
        this.local_pickup_comp = this.pick_up_component
      },
      delivery_component(n,o){
        this.local_delivery_comp = this.delivery_component
      },*/
    
      pick_up_open(n,o){
    
        if(n != undefined){
         // this.open_pickup_item = n
         // this.open_delivery_item = -1
          this.clearDeliveryOpen()
          this.setPickUpOpen(n)
          this.delivery_open = undefined;
        }else{
          this.open_pickup_item = -1
          // this.setDeliveryOpen(-1)
          this.clearPickUpOpen()
          this.pick_up_open = undefined;
        }
      },
      delivery_open(n,o){
        
        if(n != -1){
        //this.open_pickup_item = -1
         // this.open_delivery_item = n
          this.setDeliveryOpen(n)
           this.clearPickUpOpen()
         this.pick_up_open = undefined;
        }else{
          this.open_delivery_item = -1
          this.clearDeliveryOpen()
          this.delivery_open = undefined;
           // this.setPickUpOpen(-1)
          
           
        }
      },
      
      mode(newval,oldval){
        if(newval == null) return ;
          if(newval == "pickup"){
            
            this.clearPickUp();
            this.clearDelivery();
            this.clearPickUpOpen();
            this.clearDeliveryOpen()
            this.setDeliveryOpen(-1)
            this.setPickUpOpen(-1)
            this.add_pickup()
            this.add_delivery()
            this.enable_pick_up_add = false;
            this.enable_delivery_add = true;
          }
          else{
            this.clearPickUp();
            this.clearDelivery();
            this.clearPickUpOpen();
            this.clearDeliveryOpen()
            this.setDeliveryOpen(-1)
            this.setPickUpOpen(-1)
            this.add_pickup()
            this.add_delivery()
            this.enable_delivery_add = false;
            this.enable_pick_up_add = true;
          }
      }
    },
}
</script>

<style>

</style>