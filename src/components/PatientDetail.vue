<template>
  <h1>Patient {{$route.params.id}} Details</h1>
</template>

<script>
  export default {
    name: 'PatientDetail'
  }
</script>

<style scoped>
  h1 {
    font-weight: 900;
    font-size: 2.75em;
    line-height: 1.75em;
    margin-bottom: 1em;
    letter-spacing: -0.035em;
  }
</style>
