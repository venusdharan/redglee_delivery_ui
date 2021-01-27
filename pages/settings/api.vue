<template>
  <div>
    <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
              <h2 class="grey--text">API keys</h2>
          </v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    keys
                  </th>
                  <th class="text-right">
                   Operations
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
                  <td class="text-left">{{ item.api }}</td>
                  <td class="text-right"><v-btn
                        icon
                        x-small
                        v-clipboard:copy="item.api"
                        v-clipboard:success="copy_api"
                    >
                        <v-icon>mdi-content-copy</v-icon>
                    </v-btn></td>
                  <td class="text-right"><v-btn
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
          <v-card-actions>
            <v-btn color="green" class="white--text" @click="add_api">
              Add New
            </v-btn>
          </v-card-actions>
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
      }
    },
    async mounted() {
      const apis = await this.$axios.get('/api/key/all');
      console.log(apis.data);
      this.api_keys = apis.data;
    },
    methods: {
     async remove_key(id){
        //this.api_keys.splice(id, 1);
        var res = await this.$axios.post('/api/key/delete/'+ this.api_keys[id].api)
        this.$toast.info("API Removed");
        const apis = await this.$axios.get('/api/key/all');
        this.api_keys = apis.data;
      },
      copy_api(){
        this.$toast.info("API Copied");
      },
      async add_api(){
        const api = await this.$axios.post('/api/key/');
        if(api.data.status){
        this.api_keys.push({ 'api' : api.data.key});
        this.$toast.success("API Created");
        }else{
          this.$toast.error("API Creation Error !");
        }
       

      }
    },
  }
</script>