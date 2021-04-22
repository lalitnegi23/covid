import axios from "axios";

export const fetchDataForChart =async()=>{
    try {
        const { data } = await axios.get(`https://api.rootnet.in/covid19-in/stats/history`);
        return { data };
    } catch (error) {
        console.log('error in fetching fetchDataForChart');
    }
}

export const fetchVaccineDataIndiaDaily =async()=>{
    try {
        const { data } = await axios.get(`https://india-covid19vaccine.github.io/api/national_timeline.json`);
        return { data };
    } catch (error) {
        console.log('error in fetching fetchGlobalDataForChart');
    }
}

export const fetchVaccineDataState =async()=>{
    try {
        const { data } = await axios.get(`https://india-covid19vaccine.github.io/api/state_latest.json`);
        return { data };
    } catch (error) {
        console.log('error in fetching fetchGlobalDataForChart');
    }
}

export const fetchParticularState =async(code)=>{
    try {
        const { data } = await axios.get(`https://india-covid19vaccine.github.io/api/${code}.json`);
        return { data };
    } catch (error) {
        console.log('error in fetching fetchParticularState');
    }
}


