<template>
  <header class="header">
    <h1>An online platform for data management</h1>
    <p>This is a simple online platform for Prof. Jiguang Wang's lab at HKUST. <a id="lab-link"
                                                                                  href="http://wang-lab.ust.hk/">Click
      here to view the Lab website.</a></p>
    <menu-list></menu-list>
  </header>
</template>

<script>
  import Menu from './Menu.vue'

  export default {
    name: 'hello',
    components: {
      'menu-list': Menu
    }
  }
</script>

<style scoped>

  #lab-link {
    color: inherit;
    text-decoration: none;
    border-bottom: dotted 1px rgba(88, 88, 88, 0.5);
    transition: color 0.2s ease, border-bottom-color 0.2s ease;
  }

  #lab-link:hover {
    color: #f2849e;
    border-bottom-color: #fff;
  }

  h1 {
    font-weight: 900;
    font-size: 2.75em;
    line-height: 1.75em;
    margin-bottom: 1em;
    letter-spacing: -0.035em;
  }

  p {
    margin-bottom: 2em;
  }
</style>
