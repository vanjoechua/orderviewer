<template>
	<div>
		<v-toolbar dark>
			<v-toolbar-title>Developer Test: Order Viewer</v-toolbar-title>
		</v-toolbar>
		<v-row class="px-10">
			<v-col lg="12">
				<h1>Orders</h1>
				<v-row>
					<v-col lg="8">
					</v-col>
					<v-col lg="4" class="d-flex flex-row align-center">
						<v-text-field
							dense
							hide-details
							solo
							:placeholder="$t('searchTerm')"
							v-model="searchTerm"
						/>
						<v-btn small class="ml-5" @click="searchOrders()">{{ $t('search') }}</v-btn>
						<v-btn small @click="resetSearch()">{{ $t('resetSearch') }}</v-btn>
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
					:server-items-length="TotalOrders"
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
					<template v-slot:item.OrderName="{ item }">
						<div class="font-weight-bold text-center">{{ item.OrderName }}</div>
					</template>
					<template v-slot:item.CompanyName="{ item }">
						<div class="text-center">{{ item.CompanyName }}</div>
					</template>
					<template v-slot:item.CustomerName="{ item }">
						<div class="text-center">{{ item.CustomerName }}</div>
					</template>
					<template v-slot:item.OrderDate="{ item }">
						<div class="text-center">{{ item.OrderDate }}</div>
					</template>
					<template v-slot:item.DeliveredAmount="{ item }">
						<div class="text-right">{{ '$ ' + item.DeliveredAmount }}</div>
					</template>
					<template v-slot:item.TotalAmount="{ item }">
						<div class="text-right">{{ '$ ' + item.TotalAmount }}</div>
					</template>
				</v-data-table>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import {mapFields, mapMultiRowFields} from 'vuex-map-fields'
	import {mapActions} from 'vuex'

	export default {
		name: 'Orders',
		data() {
			return {
				loading: false,
				tableOptions: {},
				filterOptions: {},
				searchTerm: null
			}
		},
		computed: {
			...mapMultiRowFields('orders', {
				Orders: 'Orders',
			}),
			...mapFields('orders', {
				TotalOrders: 'TotalOrders',
			}),
			headers() {
				const headers = [
					{
						id: 0,
						text: this.$t('orderName'),
						value: 'OrderName',
					},
					{
						id: 1,
						text: this.$t('customerCompany'),
						value: 'CompanyName',
					},
					{
						id: 2,
						text: this.$t('customerName'),
						value: 'CustomerName',
					},
					{
						id: 3,
						text: this.$t('orderDate'),
						value: 'OrderDate',
					},
					{
						id: 4,
						text: this.$t('deliveredAmount'),
						value: 'DeliveredAmount',
					},
					{
						id: 5,
						text: this.$t('totalAmount'),
						value: 'TotalAmount',
					},
				]
				return headers
			},
		},
		watch: {
			tableOptions: {
				handler() {
					this.loadOrders()
				},
				deep: true,
			},
		},
		created() {
			this.loadOrders()
		},
		methods: {
			...mapActions('orders', {
				getAllOrders: 'getAllOrders',
			}),
			loadOrders() {
				this.loading = true
				const payload = {
					tableOptions: this.tableOptions,
					filterOptions: this.filterOptions
				}
				this.getAllOrders(payload)
					.then(() => {
						this.loading = false
					})
					.catch(() => {
						this.loading = false
					})
					.finally(() => {
						this.loading = false
					})
			},
			resetSearch () {
				this.searchTerm = null
				this.tableOptions.page = 1
				const payload = {
					tableOptions: this.tableOptions,
					filterOptions: this.filterOptions
				}
				this.getAllOrders(payload)
					.then(() => {
						this.loading = false
					})
					.catch(() => {
						this.loading = false
					})
					.finally(() => {
						this.loading = false
					})
			},
			searchOrders () {
				if(this.searchTerm == null){
					alert('No term to search provided!')
				} else {
					const payload = {
						tableOptions: this.tableOptions,
						searchTerm: this.searchTerm
					}
					this.getAllOrders(payload)
						.then(() => {
							this.loading = false
						})
						.catch(() => {
							this.loading = false
						})
						.finally(() => {
							this.loading = false
						})
				}
			}
		},
	}
</script>

<style scoped>

</style>
