<template>
  <div>
    <suppliers></suppliers>


    <q-separator/>

        <div class="text-h6">Orders</div>
        <price-volume
          v-if="charts.price_volume.loaded"
          :data="charts.price_volume.data"
          :options="charts.price_volume.options"
        >
        </price-volume>


    <q-separator/>
  </div>
</template>

<script>
  import {defaultMixin} from '../../mixins/mixins'
  import Suppliers from "./suppliers/Suppliers";
  import {colors} from "quasar";
  import PriceVolume from "./charts/PriceVolume";

  export default {
    name: 'OverView',
    components: {
      'suppliers': Suppliers,
      PriceVolume
    },
    mixins: [defaultMixin],

    data(){
      return{
        charts: {
          price_volume: {
            loaded: false,
            data: {
              labels: [],
              datasets: [
                {
                  label: 'Orders',
                  fill: true,
                  borderColor: colors.getBrand('primary'),
                  backgroundColor: "rgb(28, 117, 188, 0.5)",
                  lineTension: 0.3,
                  pointBorderColor: "#fff",
                  pointBackgroundColor: "rgba(219,141,13, 0.8)",
                  pointRadius: 5,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(219,141,13, 0.8)",
                  pointHitRadius: 20,
                  pointBorderWidth: 2,
                  data: []
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          }
        },
      }
    },
    created() {
      this.getOrdersChart()
    },
    methods:{
      getOrdersChart() {
        this.$axios.get('/orders-chart/')
          .then(resp => {
            console.log(resp)
            this.charts.price_volume.loaded = true
            this.charts.price_volume.data.datasets[0].data = resp.data.order_count_data // [38, 18, 38, 11, 8, 88, 138, 31, 1, 0, 42, 52, 97, 89];
            this.charts.price_volume.data.labels = resp.data.month //['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
          })
          .finally(() => {
            this.loading = false
          })
      },
    }
  }
</script>
