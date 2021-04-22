import { useEffect, useState } from "react";
import {fetchVaccineDataIndiaDaily} from '../api';
import { Line } from 'react-chartjs-2';

const IndiaVaccine=()=>{
const [vaccineIndiaTotal, setVaccineIndiaTotal]=useState([]);
const [vaccineIndiaDate, setVaccineIndiaDate]=useState([]);
const [vaccineFullyVaccinated,setVaccineFullyVaccinated]=useState([]);

useEffect(()=>{
    const fetchVaccineDaily = async ()=>{
        const res = await fetchVaccineDataIndiaDaily();
        const date = [];
        const totalDoses= [];
        const totalVaccinated = [];
        const totalFullyVaccinated=[];
        
        for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            date.push(element.date);
            totalDoses.push(element.total_doses);
            totalVaccinated.push(element.total_vaccinated);
            totalFullyVaccinated.push(element.total_fully_vaccinated);
        }
      setVaccineIndiaTotal(totalDoses);
      setVaccineIndiaDate(date);
      setVaccineFullyVaccinated(totalFullyVaccinated);  
    }
    fetchVaccineDaily();
    
    
},[]);

const lineChartForVaccineIndia=(

    (<Line
    width={100}
    height={400}
    data={{
        labels: vaccineIndiaDate,
        datasets:[{label:"Total Vaccines Administered",
    data:vaccineIndiaTotal,
    borderColor:'#3333ff',
    fill:true
},
{
    label:"Fully Vaccinated",
    data:vaccineFullyVaccinated,
    borderColor:''
}
],
    }}
    options={{ maintainAspectRatio: false }}
    />) );

    return(
        <div>
<h2>Vaccine Trend India</h2>
        <div>{lineChartForVaccineIndia}</div>
        </div>
    )
}

export default IndiaVaccine;