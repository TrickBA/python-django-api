<template>
    <div>
        <label>Failed Exams:</label>
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <IndividualSubjectComponent/>
                <span class="badge badge-primary badge-pill">5.4</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                PCN1
                <span class="badge badge-primary badge-pill">5</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                EDB1
                <span class="badge badge-primary badge-pill">5.2</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import IndividualSubjectComponent from "../subject/IndividualSubjectComponent";
    export default {
        name: "FailedExamComponent",
        components: {IndividualSubjectComponent}
    }
</script>

<style scoped>

</style>
