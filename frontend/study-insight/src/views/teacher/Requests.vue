<template>
    <div class="single-request-link" style="margin-left: 15%">
        <h1>Requests</h1>
        <div class="collapsible">
            <RequestContainerComponent isMentor/>
        </div>
    </div>
</template>

<script>
    import RequestContainerComponent from '@/components/request/RequestContainerComponent.vue';

    export default {
        name: "Requests",
        components: {
            RequestContainerComponent
        },
        methods: {

        }
    }
</script>
