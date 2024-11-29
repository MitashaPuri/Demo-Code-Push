import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Arhcm_data() {
    const navigate = useNavigate();

   
    const [fetchedData, setFetchedData] = useState(null);
    const [averagePercentage, setAveragePercentage] = useState('');

    
    const handleBack = () => {
        navigate("/arhcm");
    };

    // useEffect hook to fetch data and set up polling
    useEffect(() => {
        const fetchMessages2 = async () => {
            try {
                // Corrected the URL
                const response = await axios.get('https://uatajna1.omfysgroup.com/api/messages/topic10');
                const parse_data = response.data;

               
                const aaa = parse_data;

                
                if (aaa.length > 0) {
                    // Assuming the value is stored inside the first element in aaa
                    const bbb = JSON.parse(aaa[0].value);
                    const abcd = bbb.Average_Percentage;

                    
                    setFetchedData(bbb); // Set the entire object or specific values as needed
                    setAveragePercentage(abcd); // Set the specific average percentage
                } else {
                    console.error('Parsed data array is empty.');
                }
            } catch (error) {
                console.error('Error fetching messages for topic10:', error);
            }
        };

        
        fetchMessages2();
        const intervalId1 = setInterval(fetchMessages2, 2000);

    
        return () => clearInterval(intervalId1);
    }, []);

    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <Header />
                    <div className="container-fluid vh-100" style={{ backgroundColor: "#F3FFFD" }}>
                        <div className="card-body" style={{ marginTop: "10px" }}>
                            <div className="row">
                                <div className="col-lg-8 col-md-8 col-sm-12 arhcm-1">
                                    <div className="card shadow mb-2">
                                        <div className="card-header align-items-center justify-content-between">
                                            <h6 style={{ color: "black" }}>
                                                HCM Details
                                            </h6>
                                 
                            <div className="row">
                                <div className="col-12">
                                    <p>Average Percentage: {averagePercentage}</p>
                                    <pre>{JSON.stringify(fetchedData, null, 2)}</pre> 
                                   </div>
                            </div>

                            <div style={{ display: "grid", justifyContent: "center", marginBottom: "30px" }}>
                                                <button
                                                    className="btn"
                                                    type="button"
                                                    style={{ width: "130%", backgroundColor: "#00637C" }}
                                                    onClick={handleBack}
                                                >
                                                    <span style={{ textTransform: "capitalize !important", color: "white" }}>
                                                        Back
                                                    </span>
                                                </button>
                                            </div>
                        </div>
                    </div>
                </div>
            </div>
                 
            </div>
                                    </div>
                                </div>
                            </div>
        </>
    );
}

export default Arhcm_data;
