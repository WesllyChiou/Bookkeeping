<template>
    <div id="app">
      <h1 class="title">記帳應用</h1>
  
      <div class="container">
        <!-- 左邊新增資料表單 -->
        <div class="form-container">
          <h2 class="form-title">新增花費</h2>
          <form @submit.prevent="addExpense">
            <div class="form-group">
              <label for="amount">花費金額：</label>
              <input v-model="amount" type="number" required placeholder="輸入金額" />
            </div>
  
            <div class="form-group">
              <label for="description">描述：</label>
              <input v-model="description" type="text" placeholder="輸入描述" />
            </div>
  
            <div class="form-group">
              <label for="category">分類：</label>
              <select v-model="category">
                <option value="飲食">飲食</option>
                <option value="購物">購物</option>
                <option value="交通">交通</option>
              </select>
            </div>
  
            <!-- 將按鈕放在下拉清單下面 -->
            <button type="submit">添加花費</button>
          </form>
        </div>
  
        <!-- 右邊統計區（今日統計 + 本月統計）-->
        <div class="statistics-container">
          <div class="statistics">
            <h2>今日統計</h2>
  
            <!-- 今日總計按鈕和顯示 -->
            <button @click="fetchDailyTotal">今日總計</button>
            <p>今日總花費：{{ dailyTotal }}</p>
  
            <!-- 今日清單按鈕和顯示 -->
            <button @click="fetchDailyExpenses">今日清單</button>
            <ul v-if="dailyExpenses.length > 0" class="expense-list">
              <li v-for="expense in dailyExpenses" :key="expense._id">
                {{ expense.amount }} - {{ expense.description }} - {{ expense.category }}
              </li>
            </ul>
          </div>
  
          <div class="statistics">
            <h2>本月統計</h2>
  
            <!-- 本月總計按鈕和顯示 -->
            <button @click="fetchMonthlyTotal">本月總計</button>
            <p>本月總花費：{{ monthlyTotal }}</p>
  
            <!-- 本月清單按鈕和顯示 -->
            <button @click="fetchMonthlyExpenses">本月清單</button>
            <ul v-if="monthlyExpenses.length > 0" class="expense-list">
              <li v-for="expense in monthlyExpenses" :key="expense._id">
                {{ expense.amount }} - {{ expense.description }} - {{ expense.category }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        amount: '',
        description: '',
        category: '飲食', // 默認為飲食
        dailyTotal: 0,
        dailyExpenses: [],
        monthlyTotal: 0,
        monthlyExpenses: [],
      };
    },
    methods: {
      // 新增花費
      async addExpense() {
        try {
          await axios.post('https://bookkeeping-zcvf.onrender.com/expenses', {
            amount: this.amount,
            description: this.description,
            category: this.category,
          });
          // 新增花費後自動更新清單和統計
          this.fetchDailyTotal();
          this.fetchDailyExpenses();
          this.fetchMonthlyTotal();
          this.fetchMonthlyExpenses();
        } catch (error) {
          console.error('新增花費失敗', error);
        }
      },
  
      // 獲取今日花費統計
      async fetchDailyTotal() {
        try {
          const response = await axios.get('https://bookkeeping-zcvf.onrender.com/daily');
          this.dailyTotal = response.data.dailyTotal;
        } catch (error) {
          console.error('獲取今日花費資料失敗', error);
        }
      },
  
      // 獲取今日花費清單
      async fetchDailyExpenses() {
        try {
          const response = await axios.get('https://bookkeeping-zcvf.onrender.com/daily-list');
          if (response.data && response.data.expenses) {
            this.dailyExpenses = response.data.expenses;
          } else {
            console.error('今日花費清單格式錯誤', response.data);
          }
        } catch (error) {
          console.error('獲取今日花費清單失敗', error);
        }
      },
  
      // 獲取本月花費統計
      async fetchMonthlyTotal() {
        try {
          const response = await axios.get('https://bookkeeping-zcvf.onrender.com/monthly');
          this.monthlyTotal = response.data.monthlyTotal;
        } catch (error) {
          console.error('獲取本月花費資料失敗', error);
        }
      },
  
      // 獲取本月花費清單
      async fetchMonthlyExpenses() {
        try {
          const response = await axios.get('https://bookkeeping-zcvf.onrender.com/expenses/monthly-list');
          if (response.data && response.data.expenses) {
            this.monthlyExpenses = response.data.expenses;
          } else {
            console.error('本月花費清單格式錯誤', response.data);
          }
        } catch (error) {
          console.error('獲取本月花費清單失敗', error);
        }
      },
    },
    mounted() {
      // 頁面加載時獲取今日和本月的花費資料
      this.fetchDailyTotal();
      this.fetchDailyExpenses();
      this.fetchMonthlyTotal();
      this.fetchMonthlyExpenses();
    },
  };
  </script>
  
  <style scoped>
  #app {
    text-align: center;
    margin-top: 20px;
  }
  
  .title {
    font-weight: bold;
    text-align: center;
    margin: 0;
    padding: 20px;
    font-size: 2rem;
  }
  
  .container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  
  .form-container {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-width: 350px; /* 增加容器寬度 */
  }
  
  .form-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 0 20px;
  }
  
  .statistics-container {
    display: flex;
    gap: 20px;
    flex: 2;
    padding: 10px;
    box-sizing: border-box;
  }
  
  .statistics {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  form label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    margin-top: 10px;
    background-color: #4CAF50;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  h2 {
    margin-top: 20px;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    box-sizing: border-box;
  }
  
  ul li {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    background-color: #f1f1f1;
    border-radius: 4px;
    white-space: nowrap;
    flex-basis: calc(33% - 10px);
    box-sizing: border-box;
  }
  
  p {
    white-space: nowrap;
  }
  
  button {
    white-space: nowrap;
  }
  </style>
  