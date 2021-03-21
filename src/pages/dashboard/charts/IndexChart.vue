<script>
  import { Line } from 'vue-chartjs'

  export default {
    name: 'IndexChart',
    extends: Line,
    props: {
      data: {
        type: Object,
        default: null
      },
      options: {
        type: Object,
        default: null
      }
    },
    computed: {
      chartData: function () {
        return this.data
      }

    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style scoped>

</style>
