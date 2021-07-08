<template>
  <div class="container">
    <span class="contact">
      <p class="itemName">{{ mock.first_name + ' ' + mock.last_name }}</p>
      <span class="itemDetails" v-for="(i, key) in mock.details">
        <p>{{ key }}:</p>
        <input type="text"  :value="i" />
        <button class="itemDetailsAdd" @click="deleteProp(key)">Delete</button>
      </span>
      <span class="itemAddings">
        <input type="text" v-model="propName" class="itemAddingsLabel" placeholder="Property name"/>
        <input type="text" v-model="propValue" class="itemAddingsValue" placeholder="Property value"/>
        <button class="itemAddingsAdd" @click="updateItem">Add</button>
      </span>
    </span>
  </div>
</template>

<script>
import {fetchAddress, fetchPort} from '../config.js'

export default {
  name: "Contact",
  data() {
    return {
      mock: {},
      propName: '',
      propValue: '',
      fetchLink: 'http://' + fetchAddress + ':' + fetchPort
    }
  },
  methods: {
    getItem() {
      fetch(this.fetchLink + '/users/' + this.$route.params.key, {
        method: "GET"
      }).then( async (res) => {
        this.mock = await res.json()
      })
    },
    updateItem() {
      fetch(this.fetchLink + '/users/update/' + this.$route.params.key, {
        method: "POST",
        body: JSON.stringify({
          'propName': this.propName,
          'propValue': this.propValue
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then( async (res) => {
        this.mock = await res.json()
        this.propName = ''
        this.propValue = ''
      })
    },
    deleteProp(key) {
      if (confirm(`delete ${key}?`)) {
        fetch(this.fetchLink + '/users/delete-prop/' + this.$route.params.key, {
          method: "POST",
          body: JSON.stringify({
            'propName': key
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        }).then( async (res) => {
          this.mock = await res.json()
        })
      }
    }
  },
  created() {
    this.getItem()
  }
}
</script>

<style scoped lang="scss">
.container {
  .contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    .itemName {
      width: max-content;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }
    .itemDetails {
      display: grid;
      grid-template-columns: 90px 220px 80px;
      gap: 0.5rem;
      margin-bottom: 0.5rem;

      p {
        font-weight: 300;
        font-size: 1rem;
        justify-self: center;
        align-self: end;
      }

      input {
        height: 1rem;
        font-size: 0.6rem;
        font-weight: 300;
        align-self: center;
      }
    }

    .itemAddings {
      display: grid;
      grid-template-columns: 90px 220px 80px;
      grid-column-gap: 0.5rem;

      input {
        padding: 0.25rem;
      }
    }
  }
}
</style>