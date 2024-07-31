<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card shadow="hover">
                    <totalsale></totalsale>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <totalcount></totalcount>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <todayuser></todayuser>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card shadow="hover">
                    <totaluser></totaluser>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import totalsale from './TotalSale.vue'
import totalcount from './TotalCount.vue'
import todayuser from './TodayUser.vue'
import totaluser from './TotalUser.vue'
</script>

<style lang="scss" scoped></style>