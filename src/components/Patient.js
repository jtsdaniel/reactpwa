import React, {Component} from 'react';
import CDB from '../services/CDB';
import { LineChart, Line } from 'recharts';

const dummydata = [
    { name: 'Page A', uv: 4000, pv: 2400,amt: 2400},
    { name: 'Page B', uv: 3000, pv: 2400,amt: 2400},
    { name: 'Page C', uv: 2000, pv: 2400,amt: 2400},
    { name: 'Page D', uv: 1300, pv: 2400,amt: 2400},
    { name: 'Page E', uv: 6700, pv: 2400,amt: 2400},
    { name: 'Page F', uv: 4500, pv: 2400,amt: 2400},
    { name: 'Page G', uv: 1000, pv: 2400,amt: 2400},
]

export default class Educator extends Component {
    state = {
        PatientDocs: [],
        PatientDoc: [],
        selectedOption: null
    }

    componentDidMount() {
        this.getAllDocs();
    }
    
    getAllDocs() {
        CDB.get(`/iab330-02/_all_docs`, {
            responseType: 'json',
        })
            .then(response => {
                const PatientDocs = response.data.rows;
                this.setState({ PatientDocs })
            })
            .catch(error => console.error(`Error: ${error}`))
    }

    getOneDoc(docid) {
        CDB.get(`/iab330-02/${docid}`, {
            responseType: 'json',
        })
            .then(response => {
                const PatientDoc = response.data.rows;
                this.setState({ PatientDoc })
                console.log(PatientDoc)
            })
            .catch(error => console.error(`Error: ${error}`))

    const d = Object.entries(this.state.PatientDoc).map(([key, value]) => (
        <option key={key}>{key} - {value}</option>
        ));

    return (<div>{d}</div>)
    }


    render() {
        const mydoc = this.getOneDoc();

        const renderLineChart = (
            <LineChart width={400} height={400} data={dummydata}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                </LineChart>
        );
        
        return(
            <div> 
                <ul id="docs">
                    {this.state.PatientDocs.map((item) =>
                    <li key={item.id}>{item.id}
                        <button onClick = {() => this.getOneDoc(item.id)}> Get Document </button>
                    </li>
                    )}
                </ul>
                
                <select onChange={(selectedOption) => this.getOneDoc(selectedOption.target.value)}>
                    {this.state.PatientDocs.map((option) => (
                        <option key={option.id}>{option.id}</option>
                    ))}
                    </select>

                    {mydoc}
                    {renderLineChart}

            </div>
        )
            
    }
}

