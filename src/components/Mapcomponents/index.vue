<template>
    <div class="map-comp">
        <div class="left">
            <AmapScatter/>
        </div>
        <div class="right">
            <el-card shadow="hover">
                <template #header>
                    <h2>订单同比增长</h2>
                </template>
                <LiquidFill/>
            </el-card>
            <el-card shadow="hover">
                <template #header>
                    <h2>热门搜索</h2>
                </template>
                <WordCloud/>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import AmapScatter from './AmapScatter.vue';
import LiquidFill from './LiquidFill.vue'
import WordCloud from './WordCloud.vue'
</script>

<style lang="scss" scoped>
.map-comp {
    display: flex;
    margin-top: 20px;
    gap: 20px;
    justify-content: space-between;

    .left {
        width: 78%;
        height: 600px;
        position: relative;
    }

    .right {
        width: 20%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .el-card {
            h2{
                font-size: 16px;
                font-weight: 600;
            }
        }

        .el-card ::v-deep .el-card_header {
            padding: 18px 20px;
            border-bottom: 1px solid #ebeef5;
        }
        .el-card ::v-deep .el-card__body{
            height: 227px;
        }
    }
}</style>