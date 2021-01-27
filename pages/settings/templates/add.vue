<template>
    <div>
        <v-container>
            <v-row>
                <v-col>
                    <v-card>
                        <v-card-title>
                            <h2 class="grey--text">Templates - Create New</h2>
                        </v-card-title>
                        <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                        v-model="template_name"
                                            label="Temaplate Name"
                                            required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                 <v-form v-model="valid">
                                    <v-container>
                                    <v-row>
                                        <v-col
                                        cols="12"
                                        md="2"
                                        >
                                        <v-text-field
                                        v-model="template_temp_field_name"
                                            label="Field name"
                                            required
                                        ></v-text-field>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="2"
                                        >
                                        <v-select
                                         v-model="template_temp_field_type"
                                        :items="template_types"
                                        label="Field Type"
                                        ></v-select>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="2"
                                        >
                                        <v-text-field
                                            v-model="template_temp_field_default"
                                            label="Default"
                                        ></v-text-field>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="2"
                                        >
                                        <v-switch
                                        v-model="template_temp_field_required"
                                        label="Required"
                                        ></v-switch>
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        md="2"
                                        >
                                        <v-switch
                                        v-model="template_temp_field_edit_start_before"
                                        label="Edit Before Start"
                                        ></v-switch>
                                        </v-col>
                                    </v-row>
                                    </v-container>
                                </v-form>
                            </v-col>   
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-btn class="white--text" color="green" @click="addRow">ADD</v-btn>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-simple-table>
                                <template v-slot:default>
                                <thead>
                                    <tr>
                                        <th class="text-left">
                                        Field Name
                                        </th>
                                        <th class="text-left">
                                        Field Type
                                        </th>
                                        <th class="text-left">
                                        Field Default
                                        </th>
                                        <th class="text-left">
                                        Field required
                                        </th>
                                        <th class="text-left">
                                        Field Start Before
                                        </th>
                                        <th class="text-right">
                                        Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                    v-for="(item, index) in template_items"
                                    :key="index"
                                    >
                                    <td class="text-left">{{ item.name }}</td>
                                    <td class="text-left">{{ item.type }}</td>
                                    <td class="text-left">{{ item.default }}</td>
                                    <td class="text-left">{{ item.required }}</td>
                                    <td class="text-left">{{ item.edit_before_start }}</td>


                                   
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
                        <v-btn color="green" class="white--text" v-if="template_items.length > 0">Save Template</v-btn>
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
            template_items:[],
            template_name:"",
            template_temp_field_name:"",
            template_temp_field_type:"",
            template_temp_field_default:"",
            template_temp_field_required:false,
            template_temp_field_edit_start_before:false,
            template_types:[
                "TextField",
                "Barcode",
                "Date",
                "Image"
            ],
        }
    },
    methods: {
        addRow(){
            var row = {};
            row.name = this.template_temp_field_name;
            row.type = this.template_temp_field_type;
            row.default = this.template_temp_field_default;
            row.required = this.template_temp_field_required;
            row.edit_before_start = this.template_temp_field_edit_start_before;

            this.template_items.push(row);

        },
        remove_key(index){
            this.template_items.splice(index,1);
        }
    },
}
</script>