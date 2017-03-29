<template>
  <div class="panel">
       <div class="title">
           <slot name="title"></slot>
       </div>
       <div class="content">
            <slot name="content"></slot>
       </div>
  </div>
</template>

<script>
export default {
  name: 'panel'
}
</script>

<style scoped>

    .panel{
    }
    .panel .title{
        background-color: #9fa8da;
        color: white;
        font-size: 24px;
        font-weight: bold;
        padding: 5px 5px 5px 15px;
        height: 50px;
        line-height: 45px;
    }
    .panel .content{
        color: white;
        font-size: 20px;
        padding: 8px 8px 15px 8px;
        border: 1px solid grey;
        border-top: 0px;
        margin-bottom: 5px;
    }
</style>
