<template>
  <div>
    <v-toolbar dark>
      <v-toolbar-title>Developer Test: Order Viewer</v-toolbar-title>
    </v-toolbar>
    <v-row class="px-10">
      <v-col lg="12">
        <h1>Orders</h1>
        <v-row>
          <v-col lg="6">
            <v-date-picker range></v-date-picker>
          </v-col>
          <v-col lg="6">
            <v-text-field
              dense
              solo
              prepend-inner-icon="search"
              placeholder="Search"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-data-table
          :headers="headers"
          :items="Orders"
          :footer-props="{
            itemsPerPageOptions: [5],
            showFirstLastPage: true
          }"
          :loading="loading"
          :options.sync="tableOptions"
          :server-items-length="totalOrders"
          calculate-widths
          dense
          hide-default-header
          item-key="Order.id"
        >
          <template v-slot:header="">
            <tr>
              <th>{{ headers[0].text }}</th>
              <th>{{ headers[1].text }}</th>
              <th>{{ headers[2].text }}</th>
              <th>{{ headers[3].text }}</th>
              <th>{{ headers[4].text }}</th>
              <th>{{ headers[5].text }}</th>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { mapFields } from 'vuex-map-fields'
  export default {
    name: 'Orders',
    data () {
      return {
        loading: false,
        tableOptions: {},
      }
    },
    computed: {
      ...mapFields('orders', {
        Orders: 'Orders',
        totalOrders: 'totalOrders',
      }),
      headers () {
        const headers = [
          {
            id: 0,
            text: 'orderName',
            value: 'Order',
          },
          {
            id: 1,
            text: 'customerCompany',
            value: 'Order',
          },
          {
            id: 2,
            text: 'customerName',
            value: 'Order',
          },
          {
            id: 3,
            text: 'orderDate',
            value: 'Order',
          },
          {
            id: 4,
            text: 'deliveredAmount',
            value: 'Order',
          },
          {
            id: 5,
            text: 'totalAmount',
            value: 'Order',
          },
        ]
        return headers
      },
    },
    methods: {
      ...mapActions('orders',{
        getAllOrders: 'getAllOrders',
      }),
      loadOrders(){
        this.loading = true
        let payload = {
          tableOptions: this.tableOptions
        }
        this.getAllOrders(payload)
        .then()
      }
    },
    watch: {
      tableOptions: {
        handler() {
          this.loadOrders()
        },
        deep: true
      }
    },
    created () {
      this.loadOrders()
    },
  }
</script>

<style scoped>

</style>
