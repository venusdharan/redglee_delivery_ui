<template>
  <v-app  style="z-index:50;">
    <v-navigation-drawer
    v-model="drawer"
    temporary
    fixed
    app
    v-if="this.$store.state.auth.loggedIn"
    style="z-index:100; min-width:20%;"
    >
    <!--  color="#F31212"-->
    <v-layout justify-center style="background-color:#F31212; min-height:15%;">
    <div class="text--center " justify-center>
      <!--v-avatar :tile="true" class="mx-auto" color="primary">
        <img src="/redgleeLogoText.png" alt="logo" style="height:64px !important;">
      </v-avatar>
      <h2-- justify-center   color="primary"  class="white--text">{{title}}</h2-->
      <v-list>
        <v-list-item justify-center>
          <v-avatar v-if="this.$store.state.auth.user.profile_icon" class="mx-auto" color="primary" size="128">
            <img :src="this.$store.state.auth.user.profile_icon" alt="logo" style="">
          </v-avatar>
          <v-avatar v-else class="mx-auto" justify-center color="indigo" size="128">
            <span class="white--text headline">{{this.$store.state.auth.user.username[0].toUpperCase()+this.$store.state.auth.user.username[this.$store.state.auth.user.username.length-1].toUpperCase()}}</span>
          </v-avatar>
        </v-list-item>
        <v-list-item justify-center>
          <v-list-item-title class="white--text mx-auto" style="text-align:justify;" text-center>
            <span class="white--text headline">{{this.$store.state.auth.user.username}}</span>
            </v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
    </v-layout>
      

      <v-list nav dense>
       <div v-for="(link, i) in links" :key="i">

        <v-list-item
            v-if="!link.subLinks"
            :to="link.to"
            :active-class="color"
            avatar
            class="v-list-item"
        >

            <v-list-item-icon>
                <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title v-text="link.text" />
        </v-list-item>
<!-- 
   <v-list-group
            v-else
            :key="link.text"
            no-action
            :prepend-icon="link.icon"
            :value="false"
            :class="sub_menu"
        >
-->
        <v-list-group
            v-else
            :key="link.text"
            no-action
            :prepend-icon="link.icon"
            :value="false"
           
        >
            <template v-slot:activator>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
             </template>

            <v-list-item
                v-for="sublink in link.subLinks"
                :to="sublink.to"
                :key="sublink.text"
            >
                <v-list-item-icon>
                  <v-icon>{{ sublink.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ sublink.text }}</v-list-item-title>

            </v-list-item>

        </v-list-group>

    </div>

      </v-list>


    </v-navigation-drawer>
    <v-app-bar
      v-if="this.$store.state.auth.loggedIn"
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      class="white--text"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"/>
      <!--v-btn

      v-if="$auth.loggedIn"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn--
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn-->
      <v-avatar :tile="true" >
        <img src="/redgleeLogoText.png" alt="logo" >
      </v-avatar>
      <v-toolbar-title  v-text="title" />
      <v-toolbar-items>

      </v-toolbar-items>
      <!--v-btn-toggle--  class="ml-4"
        v-model="view_type"
        dense
        tile
        group

        
      >
        <v-btn value="map" to="/" v-bind:style=" view_type == 'map' ?  'background-color:white !important; font-color:black; color:black;' : 'background-color:black!important; font-color:white; color:white;'">
         
          Maps
          <v-icon right>
            mdi-map
          </v-icon>
          
        </v-btn>

        <v-btn value="list" to="/list" v-bind:style=" view_type == 'map' ?  'background-color:black !important; font-color:white; color:white;' : 'background-color:white !important; font-color:black; color:black;'">
        
          List
          <v-icon right>
            mdi-format-list-bulleted
          </v-icon>

        </v-btn>
      </!--v-btn-toggle-->
      <v-spacer></v-spacer>

      <v-dialog
        ref="dialog"
        v-model="master_date_modal"
        :return-value.sync="date"
        persistent
        width="300px"
        
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            style="margin-top:1.2%;"
            v-model="master_date" 
            dense
            label="Master Date"
            solo
            light
            depressed
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="master_date"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="master_date_modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
      
 <v-select
                  v-model="master_team_selected"
                     style="margin-top:1.2%; margin-left:1%;"
                      :items="task_teams"
                      item-text="team_name"
                      dense
                      solo
                      return-object
                      label="Select Teams"
                    ></v-select>


      <v-spacer />
      <v-tooltip bottom>
         <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-3" depressed  v-bind="attrs"  @click="dialog = true"
          v-on="on">
            Create Task
          </v-btn>
         </template>
      <span>Create New Task</span>
      </v-tooltip>






      <!--v-menu-- offset-y>
      <template #activator="{ on: onMenu }">


        <v-tooltip bottom>
          <template #activator="{ on: onTooltip }">
            <v-btn v-on="{ ...onMenu, ...onTooltip }" icon color="white"> <v-icon>mdi-bell</v-icon></v-btn>
          </template>

          <span>Notifications</span>
        </v-tooltip>
      </template>
       <v-list>
        <v-list-item
          v-for="(item, index) in items_notification"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </!--v-menu-->





      <!--v-tooltip-- bottom>
         <template v-slot:activator="{ on, attrs }">
      <v-btn icon  v-bind="attrs"
          v-on="on" color="white">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
         </template>
      <span>Refresh</span>
      </!--v-tooltip-->

      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer" color="white"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main style="">  
      <v-container fluid style="margin:0px !important; padding:0px !important;">
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      v-if="this.$store.state.auth.loggedIn"
      :right="right"
      temporary
      fixed
      style="z-index:100; width:30%;"
    >
	
	<v-tabs
      grow
    >
      <v-tab>
        Member
      </v-tab>
	  <v-tab>
        Chat
    </v-tab>
  


      <v-tab-item>
      
	   <v-list three-line style="min-height:90vh;  padding-left:2%;" class="fill-height" >
      <template v-for="(item, index) in members">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
        >
			<v-badge
			color="green"
			dot
			offset-x="10"
			offset-y="10"
			bordered
			  >
          <v-list-item-avatar>
				<v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
		    </v-badge>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
      </template>
    </v-list>
      </v-tab-item>
	  
	  
	  <v-tab-item>
		   
 <v-container class="fill-height">
      <v-row class="fill-height pb-14" align="end">
        <v-col>
          <div v-for="(item, index) in chat" :key="index" 
              :class="['d-flex flex-row align-center my-2', item.from == 'user' ? 'justify-end': null]">
            <span v-if="item.from == 'user'" class="blue--text mr-3">{{ item.msg }}</span>
            <v-avatar color="item.from == 'user' ? 'indigo': 'red'" size="36">
               <span class="white--text">{{ item.from[0] }}</span>
            </v-avatar>
            <span v-if="item.from != 'user'" class="blue--text ml-3">{{ item.msg }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-footer fixed>
      <v-container class="ma-0 pa-0">
        <v-row no-gutters>
          <v-col>
            <div class="d-flex flex-row align-center">
              <v-text-field v-model="msg" placeholder="Type Something" @keypress.enter="send"></v-text-field>
              <v-btn icon class="ml-4" @click="send"><v-icon>mdi-send</v-icon></v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
       <!--beautiful-chat v-if="this.getLeftPaneOpen"
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="true"
      :close="closeChat"
      :showHeader="false"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showEdition="true"
      :showDeletion="true"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="false"
      :showCloseButton="false"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      @onType="handleOnType"
      @edit="editMessage" /-->

      </v-tab-item>

	  </v-tabs>
	
      <!--v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list-->
	  
	  
    </v-navigation-drawer>


<!--v-row justify="center" style="overflow-y:hidden !important; height:100vh !important;"-->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      style="max-width:100%; max-height:100vh !important; position:absolute; overflow-y:hidden !important;"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
        
            @click="task_close_prompt = true"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Create Task</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!--v-btn--
              dark
              text
              @click="dialog = false"
            >
              Save
            </!--v-btn-->
          </v-toolbar-items>
        </v-toolbar>
        <v-subheader><h1>Task Details</h1></v-subheader>
        <v-container>
        <v-row justify="center">

        <v-col style="" cols="6">
              <v-row>
                <v-col cols="4">
                  <v-select
                      v-model="task_selected"
                      class="ml-2"
                      :items="task_types"
                      label="Select Task Types"
                    ></v-select>
                </v-col>
                <v-col cols="4">
                    <v-select
                      v-model="task_vehicle_type"
                      return-object
                      class="ml-2"
                      :items="vehicle_types"
                      item-text="vehicle_type"
                      label="Select Vehicle Types"

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
                 <v-col cols="4">
                  <v-select
                  v-model="team_selected"
                      class="ml-2"
                      :items="task_teams"
                      item-text="team_name"
                      persistent-hint
                      return-object
                      label="Select Teams"
                    ></v-select>
                </v-col>
              </v-row>
     
          <v-divider></v-divider>

          <div v-if="team_selected != null && task_vehicle_type != null">
            <PickAndDelivery @setPlace="setTaskPlace" :team=team_selected :vehicle_type=task_vehicle_type @task_created="task_created"  v-if="task_selected == 0" style="max-height:65vh !important;  overflow-x:auto; overflow-y:scroll;"></PickAndDelivery>
            <Appointment  v-if="task_selected == 1"></Appointment>
            <Workforce v-if="task_selected == 2"></Workforce>
            </div>
           
          </v-col>
            <v-col style="">
              <Gmap-map
              :center="getFakeCenter"
              :zoom="20"
              map-type-id="roadmap"
              style="width: 100%; height: 75vh;"
              ref="mapRef1"
              
              >
            <div v-if="task_team">
            <gmap-circle :center="task_team.team_geofence.center"
            :radius="task_team.team_geofence.radius"
            :editable="false" 
              ref="polygon">
            </gmap-circle>
            </div>

           <Gmap-Marker
            v-if="focus_place"
            label=""
            :draggable="getTaskMarkerDrag"
            @dragend="updateCoordinates"
            :position="getTaskMapPosition"
            :icon="{ url: require('~/static/markers/pin.png')}"
            ></Gmap-Marker>
           
            </Gmap-map>
        </v-col>
        </v-row>
        </v-container>
         <v-dialog
      v-model="task_close_prompt"
      persistent
      max-width="290"
    >
      
      <v-card>
        <v-card-title class="headline">
         Close Task Creation ?
        </v-card-title>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="task_close_prompt = false"
          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="task_creation_close"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      </v-card>
    </v-dialog>
  <!--/v-row-->

<!-- create task end -->

    <v-footer
      :absolute="!fixed"
      app
    
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>    <!--v-btn
      icon
      dense
      :label="Theme"
      @click="theme_dark = !theme_dark"
    >
    <v-icon>mdi-brightness-6</v-icon>
    </!--v-btn-->
      <!--v-switch
      v-model="theme_dark"
     
      @click="change_theme"
    ></!--v-switch-->
     
    </v-footer>
  </v-app>
</template>

<script>
const io = require('socket.io-client');

import {mapGetters,mapState,mapMutations} from 'vuex'
export default {
   sockets: {
        connect: function () {
            console.log('socket connected')
        },
        example: function (data) {
            console.log(data)
        },
        get:function(data){ 
          console.log(data);
        }
    },
  data () {
    return {
      task_vehicle_type:null,
      master_team_selected:null,
      master_date:null,
      master_date_modal:false,
      task_close_prompt:false,
      theme_dark:true,
      logged:false,
      clipped: false,
      drawer: false,
      fixed: false,
      task_teams:[],
      task_create_markers: [],
      task_place: null,
      task_create_center:{lat:10, lng:10},
	  
	  members: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
          title: 'Ali Connors',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        },
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
        },
      ],
	  tab: null,
        items: [
          'Members', 'Chat'
        ],
        text: 'Lorem ipsum dolor sit amet, aliquip ex ea commodo consequat.',
      links: [
    {
        to     : '/',
        icon   : 'mdi-view-dashboard',
        text   : 'Home',
    },
    {
          icon: 'mdi-home',
          text: 'Task List',
          to: '/list'
    },
    {
        icon     : 'mdi-account-tie',
        text     : 'Agents',
        subLinks : [
            {
                text : 'View Agents',
                to    : '/agents',
                icon  : 'mdi-view-list'
            },
            {
                text : 'Add New Agent',
                to    : '/agents/add',
                icon  : 'mdi-plus'
            },
        ]
    },
    {
        icon     : 'mdi-account-key',
        text     : 'Super Users',
        subLinks : [
            {
                text : 'View Super Users',
                to    : '/agents',
                icon  : 'mdi-view-list'
            },
            {
                text : 'Add Super User',
                to    : '/agents/add',
                icon  : 'mdi-plus'
            },
            {
                text : 'View System Monitor',
                to    : 'settings/superuser/status',
                icon  : 'mdi-bug'
            },
        ]
    },
    {
        icon     : 'mdi-chart-bar',
        text     : 'Analytics',
        subLinks : [
            {
                text : 'Task Analysis',
                to    : '/analytics/task',
                icon  : 'mdi-view-list'
            },
            {
                text : 'Real Time Analysis',
                to    : '/apps',
                icon  : 'mdi-chart-multiple'
            },
            {
                text : 'Perfomance',
                to    : '/apps',
                icon  : 'mdi-chart-line-stacked'
            },
            {
                text : 'Effeciency',
                to    : '/apps',
                icon  : 'mdi-chart-pie'
            },
        ]
    },
        {
        icon     : 'mdi-file-chart',
        text     : 'Reports',
        to       : '/reports'
        /*
        subLinks : [
            {
                text : 'View Applications',
                to    : '/apps',
                icon  : 'mdi-view-list'
            },
            {
                text : 'New Application',
                to    : '/apps',
                icon  : 'mdi-plus'
            },
        ]*/
    },
    {
        icon     : 'mdi-cogs',
        text     : 'Settings',
        subLinks : [
            {
                text : 'Profile',
                to    : '/settings/profile',
                icon  : 'mdi-account'
            },
            {
                text : 'Prefrence',
                to    : '/settings/prefrence',
                icon  : 'mdi-adjust'
            },
            {
                text : 'Manager',
                to    : '/settings/manager',
                icon  : 'mdi-account-cog'
            },
            {
                text : 'Templates',
                to    : '/settings/templates',
                icon  : 'mdi-buffer'
            },
            {
                text : 'Geo Fence',
                to    : '/settings/geofence',
                icon  : 'mdi-map-legend'
            },
            {
                text : 'Teams',
                to    : '/settings/teams',
                icon  : 'mdi-account-multiple'
            },
            {
                text : 'Vehicle Types',
                to    : '/settings/vehicle',
                icon  : 'mdi-car-connected'
            },
            {
                text : 'Notifications',
                to    : '/settings/notifications',
                icon  : 'mdi-bell-ring'
            },
            {
                text : 'SMS',
                to    : '/settings/sms',
                icon  : 'mdi-android-messages'
            },
            {
                text : 'Email',
                to    : '/settings/email',
                icon  : 'mdi-email-newsletter'
            },
            {
                text : 'API',
                to    : '/settings/api',
                icon  : 'mdi-api'
            },
        ]
    },
    {
        to     : '/logout',
        icon   : 'mdi-logout-variant',
        text   : 'Logout',
    },
    ],
      right: true,
      rightDrawer: false,
      title: 'REDGLEE',

      items_notification: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      view_type:"map",
      //create dialog variable
      dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        // end dialog
      task_types: [
       {text : "Pickup & Delivery", value:0},
       {text:"Appointment", value:1},
       {text:"Workforce",value:2}
      ],
	    chat: [
		],
    msg: null,
    
    task_selected:0,
    vehicle_types :[],
    team_selected:null,

    pick_up_open:-1,
    delivery_open:-1,
     messageRxd: '',




//vue beautiful chat

      participants: [
        {
          id: 'user1',
          name: 'Matteo',
          imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        },
        {
          id: 'user2',
          name: 'Support',
          imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [
          { type: 'text', author: `me`, data: { text: `Say yes!` } },
          { type: 'text', author: `user1`, data: { text: `No.` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true 

//end beautiful chat
    }
  },
  created() {
 

      var token = localStorage.getItem("auth._token.local");
      /*
    if(token != undefined){
      if(token != null){
        if(token != ""){
          */
         console.log("mounted Default")

      const socket = io("http://192.168.0.104:4600/socket.io",{ query: {token}});
    socket.on('connect', function () {
   console.log("connected ws")

     
    });

 socket.on("example",function(data){
        alert(data);
      });

/*

        }
      }
    } 
   */
    
  },

  computed:{
    ...mapGetters({
      getFocusPlace:"getFocusPlace",
      getFocusLatLng:"getFocusLatLng",
      getTaskMarkerDrag:"getTaskMarkerDrag",
      getFakeCenter:"getFakeCenter",
      getTaskMapPosition:"getTaskMapPosition",
      getMasterDate:"getMasterDate",
      getLeftPaneOpen:"getLeftPaneOpen",

    }),
    ...mapState({
      focus_place:state => state.focus_place,
      focus_lat_lng:state=>state.focus_lat_lng,
      open_pickup_item:state=>state.open_pickup_item,
      open_delivery_item:state=>state.open_delivery_item,
      task_team:state=>state.task_team,
      master_date_store:state => state.master_date,
      master_team_store:state=>state.master_team,
    }),
    
  },
  async mounted () {
//console.log(this.$store.state.auth)
  //console.log(this.$config.components)
  //console.log(new Date().toISOString().substr(0, 10));

var date = new Date();
console.log(date.toJSON(), new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toJSON());
this.set_master_date(new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substr(0, 10));
this.master_date = this.getMasterDate

  
 
// Access using vuex

    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
  /*
    var theme = localStorage.getItem("theme_dark");
    if(theme){
      this.theme_dark = true;
      this.$vuetify.theme.dark = true
    }else{
      this.theme_dark = false;
    }*/
   


    /*
    this.socket = this.$nuxtSocket({ channel: '/' ,reconnection: true})
    this.socket.on('msg', (msg, cb) => {
    
      console.log(msg)
    })
    */
    
    
    
     
   if(this.$auth.loggedIn == true){
    var vehicle_type = await this.$axios.get('/api/vehicle/all');
    this.vehicle_types = vehicle_type.data;
    var teams_all = await this.$axios.get('/api/team/all');
    this.task_teams = teams_all.data
    this.set_master_team(this.task_teams[0]);
    //this.master_team_selected
    this.master_team_selected = this.task_teams[0]; 
    //console.log(this.task_teams)
   }


   
  },
  watch: {
    master_team_selected(n,o){
      if(n == null) return;
      if(typeof n == 'undefined')return;
      this.set_master_team(n);

    },
    master_date(n,o){
      if(n == null) return;
      if(typeof n == 'undefined')return;
     this.set_master_date(n);

   },
   team_selected(n,o){
     if(n == null)return
     this.setTeamTask(n);
   },
   getFocusPlace(n,o){
    //console.log(n)
   },
    task_selected(newVal,oldVal){
      //console.log(newVal)
    },
    logs() {
      setTimeout(() => {
        this.$refs.chat.$el.scrollTop = this.$refs.chat.$el.scrollHeight;
      }, 0);
    }
  },
  methods: {

    async load_task_by_date(){

    },
    task_created(){
         this.dialog = false
      this.task_close_prompt = false;
      this.clearDelivery();
      this.clearPickUp();
    },
    task_creation_close(){

      this.dialog = false
      this.task_close_prompt = false;
      this.clearDelivery();
      this.clearPickUp();
    },
    ...mapMutations({
      setFocusLatLng:"setFocusLatLng",
      setTeamTask:"setTeamTask",
      clearPickUp:"clearPickUp",
      clearDelivery:"clearDelivery",
      set_master_date:"set_master_date",
      set_master_team:"set_master_team"
    }),


    updateCoordinates(location){
      if(location == undefined) return
      if(location == null) return
      console.log({
        lat:location.latLng.lat(),
        lng:location.latLng.lng()
      })
      
      this.setFocusLatLng({
        lat:location.latLng.lat(),
        lng:location.latLng.lng()
      })
    },

    
  
    
    change_theme(){
    if(process.browser){
      console.log("the clk")
    if(this.theme_dark){
     this.$vuetify.theme.dark =false
     //this.theme_dark = false;
     localStorage.setItem("theme_dark", false)

    }else{
     this.$vuetify.theme.dark = true
     //this.theme_dark = true;
     localStorage.setItem("theme_dark",true)

    }
    }
   
    
    },
    send(){
      this.chat.push(
      {
        from: "user",
        msg: this.msg
      })
      this.msg = null
      this.addReply()
    },
    addReply(){
      this.chat.push({
        from: "sushant",
        msg: "Hmm"
      })
    },

    //beauftiful chat
sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
    //beautoful chat
  }
}
</script>
<style>
header{
  z-index: 50 !important;
}
.v-item-group > .v-btn--active {
  color: black;
  background-color: white;
}
#logs {
  height: 100px;
  overflow: auto;
}

.v-list-group__items > .v-list-item--link {
  padding-left: 10% !important;
}
.sc-chat-window{
  width:100% !important;
    height:100%  !important;
  max-height:100%  !important;

}
.sc-message-list > .sc-message{
  width:100%  !important;

}
.sc-chat-window:nth-child(2) {
  position:fixed !important;
}
</style>