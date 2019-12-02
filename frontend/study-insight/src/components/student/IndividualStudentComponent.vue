<template>
    <div class="single-request -shadow">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "IndividualStudentComponent",
        props: {
            student: Object
        }
    }
</script>

<style scoped>

</style>
