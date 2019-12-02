<template>
    <div>
        <h4>Requested subjects</h4>
        <div>
            {{subjects}}
        </div>
    </div>
</template>

<script>
  export default {
    name: "RequestedSubject",
    props: {
      subjects: {
        type: String,
        required: true
      }
    },
  }
</script>

<style scoped>

</style>
