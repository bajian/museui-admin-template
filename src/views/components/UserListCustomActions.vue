<template>
  <div class="custom-actions">
    <button class="ui basic button" @click="itemAction('view-item', rowData, rowIndex)"><i class="zoom icon" title="详细信息"></i></button>
    <!--<button class="ui basic button" @click="itemAction('edit-item', rowData, rowIndex)"><i class="edit icon" title="编辑"></i></button>
    <button class="ui basic button" @click="itemAction('delete-item', rowData, rowIndex)"><i class="delete icon"  title="删除"></i></button>-->
  </div>
</template>

<script>
export default {
    name: 'custom-actions',
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  methods: {
    itemAction (action, data, index) {
        this.$parent.$emit('itemclick',{
            action:action,
            data:data,
            index:index,
        });
    }
  }
}
</script>

<style>
.custom-actions button.ui.button {
  padding: 8px 8px;
}
.custom-actions button.ui.button > i.icon {
  margin: auto !important;
}
</style>