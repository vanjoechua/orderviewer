<template>
	<div>
		<v-toolbar dark>
			<v-toolbar-title>Developer Test: Order Viewer</v-toolbar-title>
		</v-toolbar>
		<v-row class="px-10">
			<v-col lg="12">
				<h1>Orders</h1>
				<v-row>
					<v-col lg="4" class="d-flex flex-row align-center">
						<v-menu
							ref="orderDateMenu"
							v-model="orderDateMenu"
							:close-on-content-click="false"
							:nudge-right="40"
							transition="scale-transition"
							max-width="290px"
							min-width="290px"
						>
							<template v-slot:activator="{ on }">
								<v-text-field
									:placeholder="$t('orderDateRange')"
									append-icon="fas fa-calendar"
									background-color="white"
									class="force-text-left"
									hide-details
									readonly
									solo
									v-model="computedOrderDates"
									v-on="on"
								></v-text-field>
							</template>
							<v-date-picker
								v-model="orderDates"
								@input="orderDateMenu = false"
								range
								locale-first-day-of-year="4"
								show-week
								first-day-of-week="1"
							></v-date-picker>
						</v-menu>
						<v-btn small @click="resetFilter()" class="ml-5">{{ $t('reset') }}</v-btn>
					</v-col>
					<v-col lg="4" offset="4" class="d-flex flex-row align-center">
						<v-text-field
							dense
							hide-details
							prepend-inner-icon="fas fa-search"
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
				orderDateMenu: false,
				orderDates: [],
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
			computedOrderDates () {
				let fromDate = ''
				let toDate = ''
				let elements = []
				if(this.orderDates[0] != null){
					fromDate = 'From: ' + this.orderDates[0]
					elements.push(fromDate)
				}
				if(this.orderDates[1] != null){
					toDate = 'To: ' + this.orderDates[1]
					elements.push(toDate)
				}
				return elements.join(' ~ ')
			},
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
			orderDates: {
				handler() {
					this.loadOrders()
				},
				deep: true,
			}
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
					orderDates: this.orderDates
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
			resetFilter () {
				this.tableOptions.page = 1
				this.orderDates = []
				const payload = {
					tableOptions: this.tableOptions,
					orderDates: this.orderDates
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
					orderDates: this.orderDates
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
						orderDates: this.orderDates,
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
