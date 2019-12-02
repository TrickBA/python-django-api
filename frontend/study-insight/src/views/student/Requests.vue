<template>
    <div style="margin-left: 15%">
        <h1>Requests</h1>
        <RequestContainerStudentComponent/>
    </div>

</template>

<script>

    import RequestContainerStudentComponent from "../../components/request/RequestContainerStudentComponent";

    export default {
        name: "Requests",
        components: {
            RequestContainerStudentComponent
        }
    }
</script>
