<template>
  <div class="container">
    <span class="addContact">
      <input name="first_name" id="first_name" type="text" placeholder="first_name" v-model="newItem.first_name" autocomplete="off">
      <input name="last_name" id="last_name" type="text" placeholder="last_name" v-model="newItem.last_name" autocomplete="off">
      <input name="phone" id="phone" type="text" placeholder="phone" v-model="newItem.details.phone" autocomplete="off">
      <input name="email" id="email" type="text" placeholder="email" v-model="newItem.details.email" autocomplete="off">
      <input type="button" value="zxxczxc" @click="addItem">
    </span>
    


    <span v-for="i in mock" class="contact">
      <p>{{ i.first_name + ' ' + i.last_name }}</p>
      <button @click="deleteItem(i.id)">
        <img src="../../public/img/svg/delete_black_18dp.svg">
      </button>
      <router-link :to="`/contactinfo/${i.id}`">
        <img src="../../public/img/svg/east_black_18dp.svg">
      </router-link>
    </span>
  </div>

  
</template>

<script>
import {fetchAddress, fetchPort} from '../config.js'

export default {
  name: 'Home',
  methods: {
    async deleteItem(key) {
      if (confirm('1000-7?')) {
        await fetch(this.fetchLink + '/users/' + key, {
          method: 'DELETE'
        }).then(async (res) => {
          const idx = await res.json()
          this.mock = this.mock.filter(x => x.id != idx)  
        })
      }
    },
    getItems() {
      fetch(this.fetchLink + '/users', {
        method: "GET"
      }).then(async (res) => {
        this.mock = await res.json()
      })
    },
    async addItem() {
      await fetch(this.fetchLink + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newItem)
      }).then(async (res) => {
        this.mock.push(await res.json())
        this.newItem = { first_name: '', last_name: '', details: { phone: '', email: '' } }
      })
    },
  },

  data() {
    return {
      fetchLink: 'http://' + fetchAddress + ':' + fetchPort,
      newItem: {
        first_name: '',
        last_name: '',
        details: {
          phone: '',
          email: ''
        }
      },
      mock: null
    }
  },

  created() {
    this.getItems()
  }
}
</script>

<style scoped lang="scss">
.container {
  .addContact {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 0.5rem;
    grid-row-gap: 0.25rem;
    margin-bottom: 1.5rem;

    input {
      font-size: 0.6rem;
      font-weight: 300;
      padding: 0.25rem;
      border-radius: 5px;
      border: 1px solid gray;
    }

    input[type=button] {
      grid-column: 1 / 3;
      width: 80px;
      justify-self: center;
      cursor: pointer;
    }
  }

  .contact {
    border: 1px solid #222;
    border-radius: 7px;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0.5rem;

    button, a {
      background-color: transparent;
      border: 1px solid #222;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 0.5rem;
      height: 1rem;
      width: 1rem;
      cursor: pointer;
    }
  }
}
</style>
