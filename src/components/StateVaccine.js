import {fetchParticularState,fetchVaccineDataState} from '../api';
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';

const StateVaccine=()=>{
    const [stateDate, setStateDate] = useState([]);
    const [stateTotal, setStateTotal] = useState([]);
    const [stateData,setStateData]= useState([]);
    useEffect(()=>{
    const fetchState= async()=>{
        const res = await fetchVaccineDataState();
        const arr= [];
        for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            arr.push({state:element.state,
            stateCode:element.state_code})
        }
        setStateData(arr);
    }
    fetchState();
    },[])
    
    const handleStateChange=  async (val)=>{
        let sCode='';
        let res=[];
        const dates=[];
        const totalv=[];
        stateData.forEach((el)=>{
            if(val===el.state){
                sCode = el.stateCode;
            }
            })
    res= await fetchParticularState(sCode);
    
    for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        dates.push(element.date);
        totalv.push(element.total_vaccinated);
        
    }
    
    setStateDate(dates);
    setStateTotal(totalv);
    
    }
    const lineChartForParticularState=(
    
        (<Line
        width={100}
        height={400}
        data={{
            labels: stateDate,
            datasets:[{label:"Total Vaccines Administered",
        data:stateTotal,
        borderColor:'#3333ff',
        fill:true
    },
    ],
        }}
        options={{ maintainAspectRatio: false }}
        />) );
return(
    <div>
        <div style={{display: 'flex',
        margin:'50px',
        justifyContent : 'center',
        alignItems : 'center',
        }}>
        <select onChange={(e)=>handleStateChange(e.target.value)}>
        {stateData.map((el)=><option key={el.state}>{el.state}</option>)}
        </select>
        </div>
        <h2>Vaccine for Particular state in India</h2>
        <div>{lineChartForParticularState}</div>
    </div>
)
}

export default StateVaccine;