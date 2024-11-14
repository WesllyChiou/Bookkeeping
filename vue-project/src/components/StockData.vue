<template>
    <div>
      <h1>Stock Data</h1>
      <pre>{{ stockData }}</pre>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const stockData = ref('Waiting for data...');
  
  function initializeWebSocket() {
    const ws = new WebSocket('ws://localhost:8080');
  
    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };
  
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        stockData.value = JSON.stringify(data, null, 2);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }
  
  onMounted(() => {
    initializeWebSocket();
  });
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  