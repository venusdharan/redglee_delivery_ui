<template>
    <div>
        <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        <h2 class="grey--text">Templates</h2>
                    </v-card-title>
                    <v-container>
                    <v-row>
                        <v-col>
                            <v-simple-table>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                    <th class="text-left">
                                    Template Name
                                    </th>
                                    <th class="text-right">
                                    Edit
                                    </th>
                                    <th class="text-right">
                                    Delete
                                    </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                    v-for="(item, index) in templates"
                                    :key="index"
                                    >
                                    <td class="text-left">{{ item.name }}</td>
                                    <td class="text-right">
                                        <v-btn
                                            icon
                                            x-small
                                            v-clipboard:copy="item.name"
                                            v-clipboard:success="copy_api"
                                        >
                                            <v-icon>mdi-grease-pencil</v-icon>
                                        </v-btn>
                                        
                                        </td>
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
                    </v-container>
                    <v-card-actions>
                        <v-btn to="./templates/add" color="green" class="white--text">ADD</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            templates:[
                {
                    name:"hello"
                }
            ]
        }
    },
}
</script>

<style>

</style>