import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";

const NotFound = () => {
    const [data, setData] = useState([]);

    useEffect( () => {

        axios.get(`${baseUrl}/find`).then( res => {
            console.log(res.data);
            setData(res.data.schedule)
        })

    }, [])

    return data.length !== 0 && (
        <div style={{ marginTop: "10vh", padding: "50px" }}>
            <style>
                
            </style>
            <h1>SCHEDULE</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FROM</th>
                        <th>TO</th>
                        <th>APPROVED</th>
                        <th>DONE</th>
                        <th>RATE</th>
                        <th>RATED</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( i => (
                        <React.Fragment key={i._id}>
                            <tr>
                                <td>{i._id}</td>
                                <td>{i.from}</td>
                                <td>{i.to}</td>
                                <td>{i.approved ? "true" : "false"}</td>
                                <td>{i.done ? "true" : "false"}</td>
                                <td>{i.rating.rate}</td>
                                <td>{i.rating.rated ? "true" : "false"}</td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default NotFound;