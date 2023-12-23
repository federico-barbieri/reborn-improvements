<template>
    <div>

        <Bar
        class="barchart"
        id=""
        :options="chartOptions"
        :data="chartData"
  />

    </div>
</template>

<script setup>

import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


 let chartData = {
        labels: [ '2017', '2018', '2019', '2020', '2021', '2022' ],
        
        datasets: [ 
            { 
                label: "Number of children in private daycares 0 to 2",
                data: [64995, 69855, 70817, 69793, 70988, 75297],
                backgroundColor: '#7DCC7F'
            } 
    ]
      }

let chartOptions = {
        responsive: true
      }




</script>

<style scoped>

.barchart{
    height: 30vh;
}

@media only screen and (max-width: 500px){
    .barchart{
    height: 20vh;
    width: 80vw;
    margin: 2rem auto;

    }
}

@media only screen and (max-width: 400px){
    .barchart{
    height: 15vh;
    width: 80vw;
    margin: 2rem auto;

    }
}



</style>