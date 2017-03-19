<template>
  <section id="list-item" :style="style" @mouseover="hover()" @mouseout="hover()">
    <router-link id="label" :to="to"><p>{{title}}</p><p :style="detailStyle">{{detail}}</p></router-link>
  </section>
</template>

<script>
  export default {
    name: 'SquareButton',
    props: ['title', 'detail', 'color', 'to'],
    data () {
      return {
        hovering: false
      }
    },
    computed: {
      style () {
        return 'background-color: ' + (this.hovering ? this.color.replace(/,(\d+)%\)$/, ($0, $1) => { return ',' + ($1 - 35) + '%)' }) : this.color)
      },
      detailStyle () {
        return {
          width: '100%',
          textAlign: 'center',
          height: this.hovering ? '22px' : '0',
          display: 'block',
          letterSpacing: '0',
          fontWeight: '300',
          margin: '0 20px',
          color: this.hovering ? 'white' : 'transparent',
          transition: 'all 0.5s ease'
        }
      }
    },
    methods: {
      hover () {
        this.hovering = !this.hovering
      }
    }
  }
</script>

<style scoped>
  #list-item {
    width: calc(33.3333% - 2.5em);
    margin: 1.25em;
    height: 0;
    padding-bottom: calc(33.3333% - 2.5em);

    position: relative;
    border-radius: 5px;
    transition: all 0.5s ease;
  }

  #list-item:hover {
    width: 33.3333%;
    padding-bottom: 33.3333%;
    margin: 0;
  }

  #label {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    position: absolute;
    left: 0;
    right: 0;

    text-decoration: none;
    width: 100%;
    height: 100%;

    transition: all 0.5s ease;
  }

  p {
    margin: 0;
    text-align: center;
    color: white;
    letter-spacing: 0.25em;
    font-weight: 700;
  }
</style>
