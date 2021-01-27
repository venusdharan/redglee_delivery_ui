<template>
    <div>
        <v-container>
            <v-row>
                <v-col >
                     <iframe width="100%" style="height:80vh" :src="compiledHtml"></iframe>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            compiledHtml:""
        }
    },
    async mounted() {
      this.compiledHtml ='http://192.168.0.103:4600'+  '/auth/status/monitor'+'?token=' +this.$auth.getToken('local');
     
    },
}
</script>