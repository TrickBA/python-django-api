<template>

    <div class="form-group">
        <label for="message">Message:</label>
        <textarea class="form-control" rows="5" id="message"></textarea>
        <div class="btn-group" style="margin-top: 5%">
            <button type="button" class="btn btn-success" style="margin-right: 5%">Approve</button>
            <button type="button" class="btn btn-danger">Deny</button>
        </div>
    </div>

</template>

<script>
    export default {
        name: "MessageComponent"
    }
</script>

<style scoped>

</style>
