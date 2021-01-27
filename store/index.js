import Vue from 'vue'
export const strict = false
export const state = () => ({

    pick_up_component:[],
    delivery_component:[],
    open_pickup_item:-1,
    open_delivery_item:-1,
    focus_lat_lng:null,
    focus_place:null,
    task_team:null,
    master_date:null,
    master_team:null,
    remote_task_assigned:[],
    remote_task_unassigned:[],
    remote_task_unsuccessful:[],
    left_pane_open:true



});

export const mutations = {
    // remote task assigned
    add_remote_task_assigned(state,task){
        state.remote_task_assigned.push(task);
    },
    edit_remote_task_assigned(state,index,task){
        state.remote_task_assigned[index] = task;
    },
    remove_remote_task_assigned(state,index){
        state.remote_task_assigned.splice(index,1);
    },
    clear_remote_task_assigned(state){
        state.remote_task_assigned.splice(0,state.remote_task_assigned.length);
    },
    // remote task assigned
    // remote task unassigned
    add_remote_task_unassigned(state,task){
        state.remote_task_unassigned.push(task);
    },
    edit_remote_task_unassigned(state,index,task){
        state.remote_task_unassigned[index] = task;
    },
    remove_remote_task_unassigned(state,index){
        state.remote_task_unassigned.splice(index,1);
    },
    clear_remote_task_unassigned(state){
        state.remote_task_unassigned.splice(0,state.remote_task_unassigned.length);
    },
    // remote task unassigned
    // remote task unsuccessful
    add_remote_task_unsuccessful(state,task){
        state.remote_task_unassigned.push(task);
    },
    edit_remote_task_unsuccessful(state,index,task){
        state.remote_task_unsuccessful[index] = task;
    },
    remove_remote_task_unsuccessful(state,index){
        state.remote_task_unsuccessful.splice(index,1);
    },
    clear_remote_task_unsuccessful(state){
        state.remote_task_unsuccessful.splice(0,state.remote_task_unsuccessful.length);
    },
    // remote task unsuccessful
    set_master_date(state,date){
        state.master_date = date;
    },
    set_master_team(state,team){
        state.master_team = team;
    },

    addPickup(state,pickup){
       // state.pick_up_component= [...state.pick_up_component, {pickup}]
        state.pick_up_component.push(pickup) // = pickup //
    },
    removePickUp(state,index){
        if(state.pick_up_component.length > 1){
            state.pick_up_component.splice(index, 1);
        }
    },
    removeLastPickUp(state){
        if(state.pick_up_component.length > 1){
            state.pick_up_component.pop()
        }
    },
    clearPickUp(state){
        //Vue.set(state, 'pick_up_component', [])
        //state.pick_up_component = []
        
            state.pick_up_component.splice(0,state.pick_up_component.length);
        
    },
    addDelivery(state,delivery){
        state.delivery_component.push(delivery)
        //state.delivery_component= [...state.delivery_component, {delivery}]
    },
    removeDelivery(state,index){
        if(state.delivery_component.length > 1){
            state.delivery_component.splice(index, 1);
        }
    },
    removeLastDelivery(state){
        if(state.delivery_component.length > 1){
           state.delivery_component.pop() 
        } 
    },
    clearDelivery(state){
        //state.delivery_component = []
        //Vue.set(state, 'delivery_component', [])
        
            state.delivery_component.splice(0,state.delivery_component.length);
        
    },
    set_left_open(state,open){
        state.left_pane_open = open;
    },

    setPickUpOpen(state,num){
        state.open_pickup_item = num
    },
    setDeliveryOpen(state,num){
        state.open_delivery_item = num
    },
    clearPickUpOpen(state){
        state.open_pickup_item = -1
    },
    clearDeliveryOpen(state){
        state.open_delivery_item = -1
    },
    setFocusPlace(state,place){
        //state.focus_lat_lng = 
        state.focus_place = place;
    },
    setFocusLatLng(state,latlng){
        state.focus_lat_lng = latlng;
    },
    setTeamTask(state,task_team){
        state.task_team = task_team;
    },
    setMasterTeam(state,task_team){
        state.master_team = task_team;
    }





}


export const getters = {
    getMasterDate:(state)=>{
        return state.master_date
    },
    getMasterTeam:(state)=>{
        return state.master_team
    },
    getFocusTeam:(state)=>{
        return state.task_team 
    },
    getFocusPlace:(state)=>{
        return state.focus_place
    },
    getLeftPaneOpen:(state)=>{
        return state.left_pane_open
    },
    getFocusLatLng:(state)=>{
        if(state.open_delivery_item == -1 && state.open_pickup_item == -1){
            return null
        }else{
            return state.focus_lat_lng
        }    
    },
    getFakeCenter:(state)=>{
        if(state.focus_lat_lng == null){
            if( state.focus_place == null ){
                return {lat:10, lng:10}
            }else{
             return{
                 lat: state.focus_place.geometry.location.lat(),
                 lng: state.focus_place.geometry.location.lng(),
               }
            }
        }else{
            return state.focus_lat_lng
        }
       
    },
    getTaskMarkerDrag:(state)=>{
        if(state.open_delivery_item == -1 && state.open_pickup_item == -1){
            return false
        }else{
            return true
        }
    },
    getTaskMapPosition:(state)=>{
        if(state.focus_lat_lng == null){
            return{
                lat: state.focus_place.geometry.location.lat(),
                lng: state.focus_place.geometry.location.lng(),
              }
        }else{
            return state.focus_lat_lng
        }
    },

    getPickupComponent:(state)=>(index)=>{
        return state.pick_up_component[index];
    },
    getDeliveryComponent:(state)=>(index)=>{
        return state.delivery_component[index];
    },

    getAllPickupComponent:(state)=>{
        return state.pick_up_component;
    },
    getAllDeliveryComponent:(state)=>{
        return state.delivery_component;
    }
}