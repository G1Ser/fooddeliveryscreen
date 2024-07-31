<template>
    <div class="common-card">
        <div class="title">{{ title }}</div>
        <div class="value">{{ value }}</div>
        <div class="chart"><slot/></div>
        <div class="line"></div>
        <div class="footer"><slot name="footer"></slot></div>
    </div>
</template>

<script setup>
import {defineProps} from 'vue'
const props = defineProps(['title','value'])
</script>

<style lang="scss" scoped>
.title{
    font-size: 12px;
    color: #777;
    letter-spacing: 1px;
}
.value{
    font-size: 24px;
    font-weight: 600;
    margin-top: 10px;
}
.chart{
    margin-top: 10px;
    height: 50px;
}
.line{
    margin-top: 18px;
    border-top: 1px solid #ddd;
}
.footer{
    margin-top: 10px;
}
</style>