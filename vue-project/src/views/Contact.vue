<template>
    <div>
      <h2>Contact Us</h2>
      <form @submit.prevent="submitForm">
        <label>Name</label>
        <input v-model="name" type="text" required />
        
        <label>Email</label>
        <input v-model="email" type="email" required />
        
        <label>Message</label>
        <textarea v-model="message" required></textarea>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "Contact",
    data() {
      return {
        name: "",
        email: "",
        message: "",
      };
    },
    methods: {
      submitForm() {
        alert(`Thank you, ${this.name}. We will get back to you soon!`);
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
  }
  input, textarea {
    margin-bottom: 10px;
    padding: 8px;
  }
  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
  }
  </style>
  