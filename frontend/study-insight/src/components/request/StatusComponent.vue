<template>
    <div>
        <h4>Status:</h4>
        <div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" :checked="approvedMentor===1" id="defaultCheck">
                <label class="form-check-label" for="defaultCheck">
                    Approved by Mentor
                </label>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" :checked="approvedExamBoard===1" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                        Approved by Exam board
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "StatusComponent",
        props: {
        approvedMentor: {
          type: Number,
          required: true
        },
          approvedExamBoard: {
            type: Number,
            required: true
          },
        },
    }
</script>

<style scoped>

</style>
