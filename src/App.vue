<template>
  <div id="app">
    <span @click="showSide()" id="side-toggle" class="fa fa-bars"/>
    <div @click="showSide()" :style="maskShown" id="mask"></div>
    <aside :style="sidebarStyle">
      <span @click="showSide()" :style="closeButton" class="fa fa-close close-button"></span>
      <h1 :style="menuShowing" id="sidebar-title">Menu</h1>
      <ul id="sidebar-list">
        <li @click="showSide()" class="sidebar-item"><router-link class="linker" to="/">Home</router-link></li>
        <li @click="showSide()" class="sidebar-item"><router-link class="linker" to="/list">Patient List</router-link></li>
        <li @click="showSide()" class="sidebar-item"><router-link class="linker" to="/input">Data Input</router-link></li>
        <li @click="showSide()" class="sidebar-item"><router-link class="linker" to="/about">About</router-link></li>
      </ul>
    </aside>
    <div id="lab-header">
      <router-link id="logo" to="/">WANG LAB @ HKUST</router-link>
    </div>
    <router-view></router-view>
    <footer id="footer">
      <p>© 2017 Technical Supported By <a style="color: black" href="https://github.com/Earthsplitter">Ming Wen</a></p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        sidebarShowing: false
      }
    },
    computed: {
      menuShowing () {
        return {
          display: this.sidebarShowing ? 'block' : 'none'
        }
      },
      sidebarStyle () {
        return {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'fixed',
          right: '0',
          top: '0',
          height: '100%',
          width: this.sidebarShowing ? '300px' : '0',
          backgroundColor: '#555',
          color: 'white',
          zIndex: '3',
          transition: 'width 0.5s ease'
        }
      },
      maskShown () {
        return {
          zIndex: this.sidebarShowing ? '2' : '-1',
          backgroundColor: this.sidebarShowing ? 'rgba(255,255,255,0.6)' : 'transparent'
        }
      },
      closeButton () {
        return {
          display: this.sidebarShowing ? 'block' : 'none'
        }
      }
    },
    methods: {
      showSide () {
        this.sidebarShowing = !this.sidebarShowing
      }
    }
  }
</script>

<style>
  @import "../node_modules/font-awesome/css/font-awesome.min.css";

  body {
    display: flex;
    justify-content: center;
  }

  #app {
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;

    width: 100%;
    max-width: 1080px;
    margin: 120px 100px auto;
  }

  #logo {
    letter-spacing: 0.35em;
    text-decoration: none;
    color: inherit;
    font-weight: 900;
    transition: color 0.2s ease;

    display: block;
    margin-bottom: 2em;
  }

  #logo:hover {
    color: #f2849e;
  }

  #side-toggle {
    position: absolute;
    right: -50px;
    top: -50px;

    font-size: 42px;
    text-align: center;

    cursor: pointer;
  }

  #mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: background-color 0.5s ease;
  }

  .close-button {
    position: absolute;
    left: 0;
    font-size: 30px;
    color: black;
    margin-left: -50px;
    margin-top: 20px;
    cursor: pointer;
  }
  #sidebar-title {
    margin-top: 50px;
    letter-spacing: 0.35em;
    margin-bottom: 50px;
  }
  #sidebar-list {
    list-style: none;
    width: 100%;
  }
  .sidebar-item {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: dashed 1px white;
    letter-spacing: 0.1em;
    font-size: 22px;
    font-weight: 300;
  }
  .linker {
    color: inherit;
    text-decoration: none;
  }
  #lab-header {
    width: 270px;
  }
  #footer {
    margin-top: 40px;
    text-align: center;
    font-size: 12px;
  }
</style>
