<template>
    <div>
        <StatusBar/>  
        <MainContent/>    
    </div>   
</template>

<script>
import MainContent from "./MainContent.vue"
import StatusBar from "./StatusBar.vue"

export default {

    components:{
        MainContent,
        StatusBar
    },
}
</script>

<style>

</style>