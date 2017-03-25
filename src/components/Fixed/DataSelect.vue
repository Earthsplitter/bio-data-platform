<template>
  <nav @mouseleave="showTag = false" :style="left">
    <ul id="list">
      <li v-for="tag in tags"><router-link active-class="active-link" class="link" :to="tag.address">{{tag.name}}</router-link></li>
      <li>Cancer A</li>
      <li>Cancer B</li>
      <hr id="blocker"/>
      <li><router-link exact active-class="active-link" class="link" to="/">Home</router-link></li>
      <li><router-link active-class="active-link" class="link" to="/input">Input</router-link></li>
    </ul>
    <span id="tag" @mouseover="showTag = true">Type</span>
  </nav>
</template>

<script>
  export default {
    name: 'DataSelect',
    data () {
      return {
        showTag: false
      }
    },
    props: ['tags'],
    computed: {
      left () {
        return {
          left: this.showTag ? '0' : '-100px'
        }
      }
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  nav {
    display: flex;
    align-items: flex-start;
    position: fixed;
    top: 20%;

    transition: left 0.2s linear;
  }
  #list {
    border: solid 2px #00bc9b;
    color: black;

    padding: 5px;
    width: 100px;
    list-style: none;
  }
  #tag {
    background-color: darkgray;
    color: white;
    line-height: 2.5;
    margin-top: 16px;
    width: 45px;
    text-align: center;
  }
  #blocker {
    border: solid 1px #00bc9b;
  }
  .link {
    text-decoration: none;
    color: black;
  }
  li {
    margin: 5px 0;
    border-bottom: dotted 1px rgba(88,88,88,.5);
  }
  .active-link {
    color: #00bc9b;
  }
</style>
