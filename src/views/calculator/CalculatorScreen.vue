<template>
  <div class="viewscreen">
      <p class="expressionarea">{{ printExp }}</p>
      <p class="inputarea">{{ printResult }}</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapGetters(['printExp']),
        ...mapGetters(['printResult']),
    },
}
</script>

<style>
.viewscreen
{
    margin : 0 5px;
    padding : 0px;
    height : 120px;
    width : 270px;
    text-align:right;
    background-color : #ccc;
}
.expressionarea
{
    height: 60px;
    font-size:12px;
    padding:5px 10px;
    margin :0;
}
.inputarea
{
    height : 60px;
    font-size:30px;
    padding-right: 15px;
    margin:0;
}
</style>