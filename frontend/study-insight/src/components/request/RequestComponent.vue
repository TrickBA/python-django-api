<template>
        <div>
            <slot></slot>
        </div>
</template>

<script>


    export default {
        name: "RequestComponent",
        props: {
            student: Object
        }
    }
</script>

<style scoped>

</style>
