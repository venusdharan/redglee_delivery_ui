<template lang="">
    <div>
       <v-container>
           <v-row> 
               <v-col cols="4">
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
                </v-col>
           </v-row>
            <v-row>
                <v-col>
                    
                    <v-card style="height:50vh;">
                        <Plotly :data="gdata" :layout="layout" :display-mode-bar="true"></Plotly>
                    </v-card>
                </v-col>
           
                <v-col>
                    
                    <v-card style="height:50vh;">
                        <Plotly :data="gdata1" :layout="layout" :display-mode-bar="true"></Plotly>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    
                    <v-card style="height:50vh;">
                        <Plotly :data="gdata2" :layout="layout" :display-mode-bar="true"></Plotly>
                    </v-card>
                </v-col>
           
                <v-col>
                    
                    <v-card style="height:50vh;">
                        <Plotly :data="gdata3" :layout="layout" :display-mode-bar="true"></Plotly>
                    </v-card>
                </v-col>
            </v-row>
       </v-container> 

    </div>
</template>

<script>
import { Plotly } from 'vue-plotly'
export default {
  components: {
    Plotly
  },
  async mounted(){
       var teams_all = await this.$axios.get('/api/team/all');
    this.task_teams = teams_all.data
  },
  data() {
      return {
    task_teams:[],
          gdata:[{
      x: [1,2,3,4],
      y: [10,15,13,17],
      type:"scattergl"
    }],
     gdata1:[{
      x: [1,2,3,4],
      y: [10,15,13,17],
      type:"bar"
    }],
    gdata2:[{
      values: [19, 26, 55],
  labels: ['Residential', 'Non-Residential', 'Utility'],
  type: 'pie'
    }],
    gdata3:[{
      x: [1,2,3,4],
      y: [10,15,13,17],
      type:"table"
    }],
    layout:{
      title: "Task in Numbers"
    }
      }
  },
  
}
</script>