<template>
    <div style=" display: flex;  flex-direction: row-reverse; margin:auto; padding: 8px;">
    <div><v-btn @click="$emit('drawingmode_changed', 'circle')">Draw</v-btn>
    <v-btn @click="$emit('delete_selection')">Delete</v-btn>
    <v-btn @click="$emit('save')">Save</v-btn></div>
    </div>

</template>

<script>
export default {
    name:'drawing-toolbar'
}
</script>
