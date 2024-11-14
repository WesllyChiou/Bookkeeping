<template>
    <div id="app">
      <header>
        <h1>Welcome to Vue Beginner's Site</h1>
        <nav>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/tutorials">Tutorials</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </nav>
      </header>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: "App",
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
  }
  #app {
    text-align: center;
  }
  nav ul {
    display: flex;
    justify-content: center;
    list-style: none;
  }
  nav ul li {
    margin: 0 15px;
  }
  </style>
  