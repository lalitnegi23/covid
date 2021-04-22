import { useEffect, useState } from "react";
import {fetchDataForChart} from '../api';
import { Line } from 'react-chartjs-2';

const IndiaChart =()=>{
    const [dailyDate, setDailyDate] = useState([]);
    const [dailyTotal, setDailyTotal] = useState([]);
    const [dailyDeath, setDailyDeath] = useState([]);
    const [dailyRecovered, setDailyRecovered] = useState([]);
    
    useEffect(()=>{
        const fetchAPI = async ()=>{
            const res = await fetchDataForChart();
            const date = [];
            const infected=[];
            const death =[];
            const recovered =[];
            for (let index = 0; index < res.data.data.length; index++) {
                const element = res.data.data[index];
                date.push(element.day);
                infected.push(element.summary.total);
                death.push(element.summary.deaths);
                recovered.push(element.summary.discharged);
            }
            setDailyDate(date);
            setDailyTotal(infected);
            setDailyDeath(death);
            setDailyRecovered(recovered);
        }
        fetchAPI();
    },[])

    const lineChartForIndia=(
    
        (<Line
            width={100}
            height={400}
        data={{
            labels: dailyDate,
            datasets:[{label:"Infected",
        data:dailyTotal,
        borderColor:'#3333ff',
        fill:true
    },
    {label:"Deaths",
    data:dailyDeath,
    borderColor:'red',
    fill:true},
    {
        label:"Recovered",
        data:dailyRecovered,
    }],
        }}
        options={{ maintainAspectRatio: false }}
        />) );
    return(
        <div>
        <h2>India Coronavirus Cases</h2>
        <div>{lineChartForIndia}</div>

        </div>
    )
}

export default IndiaChart;