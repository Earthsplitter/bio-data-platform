<template>
  <article id="menu">
    <square-button to="/list" title="PATIENT LIST" detail="List of patients in our research" color="hsl(345,78%,73%)"></square-button>
    <square-button to="/input" title="DATA INPUT" detail="Input new patient data and store in this database" color="hsl(202,87%,73%)"></square-button>
    <square-button to="/about" title="ABOUT" detail="About this system" color="hsl(167,47%,65%)"></square-button>
  </article>
</template>

<script>
  import SquareButton from './SquareButton.vue'
  export default {
    name: 'Menu',
    components: {
      'square-button': SquareButton
    }
  }
</script>

<style scoped>
  #menu {
    display: flex;
  }
</style>
