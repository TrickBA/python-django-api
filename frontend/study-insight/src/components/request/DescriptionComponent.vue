<template>
    <div>
        <h4>Description</h4>
        <div>
            {{description}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "DescriptionComponent",
        props: {
        description: {
          type: String,
          required: true
        }
      },
    }
</script>

<style scoped>

</style>
