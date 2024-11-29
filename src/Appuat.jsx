import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';
import { useState,useEffect } from "react";
import Hcmanalysis from "./Hcmanalysis"
// import Dashboard from "./Dashboard";
import Websiteanalysis from "./Websiteanalysis";
import Demoselect from "./Demoselect";
import Kracreation from "./kracreation";
import Kramanagement from "./Kramanagement";
import Kpicreation from "./Kpicreation";
import Pm from "./Pm";
import  ForgetPassword  from "./ForgetPassword";
import GetOTP from "./GetOTP";
import ResetPassword from "./ResetPassword";
// import Pmtable from "./Pmtable";
import Cards from "./Cards";
import Demotable from "./Demotable";
import Pendingdata from "./Pendingdata"
import HoldData from "./HoldData";
import ApprovedData from './Approveddata';
import ClosedData from "./Closeddata";
import RealTimeAvail from "./RealTimeAvail";
import Change_Password from "./Change_password";
import New_user from "./New_user";
import User_table from "./User_table";
import User_table2 from "./User_table2";
import Dashboard2 from "./Dashboard2";
import Profile from "./Profile";
import Pmo2 from "./Pmo2";
import ARHCM2 from "./Arhcm2";

import Dashboard3 from "./Dashboard3";
import Dashboard5 from "./dashboard5";
import Arhcm_data from "./Arhcm_data";

// import DoubleColorGraph from "./sample";
export default function App() {
 
  return (
    <BrowserRouter>
        

        
     
        <Routes> 
        {/* <Route path="/arhcm2" element={<ARHCM/>} /> */}
        {/* <Route path="/pmo2" element={<Pmtable />} /> */}
        {/* <Route path="/dash2" element={<Dashboard/>} /> */}
         <Route path="/" element={<Login/>} />
          <Route path="/newuser" element=
           {<New_user></New_user> }></Route>
          <Route path="/usertable" element={
           <User_table></User_table>}></Route>
          <Route path="/usertable2" element={
           <User_table2></User_table2> }></Route>
          <Route path="/profile" element={
           <Profile></Profile>}></Route>
          <Route path="/dashboard" element={<Dashboard5/>}> </Route>
          <Route path="/dash2" element={
           <Dashboard2/>} ></Route>
         
          <Route path="/dash5" element={<Dashboard5/>}></Route>
           
          
          <Route path="/demotable" element={<Demotable/>}></Route>
            
          <Route path="/Pendingdata" element={<Pendingdata/>}></Route>
            
          <Route path="/HoldData" element={<HoldData/>}></Route>
            
          <Route path="/ApprovedData" element={<ApprovedData/>}></Route>
            
          <Route path="/ClosedData" element={<ClosedData/>}></Route>
            
          <Route path="/websiteanalysis" element={<Websiteanalysis/>}></Route>
            
          <Route path="/resetpassword" element={<ResetPassword/>}></Route>
            
          <Route path="/getotp" element={<GetOTP/>}></Route>
            
          <Route path="/hcm" element={<Hcmanalysis/>}></Route>
            
           <Route path="/demo" element={<Demoselect/>}></Route>
            
           <Route path="/kramang" element={<Kramanagement/>}></Route>
            
           <Route path="/kracreation" element={ <Kracreation />}></Route>
                       
           <Route path="/kpicreation" element={<Kpicreation />}></Route>
            
           <Route path="/pm" element={<Pm />}></Route>
            
           <Route path="/arhcm" element={<ARHCM2/>}></Route>
            
           <Route path="/arhcm_data" element={<Arhcm_data/>}></Route>
            
           <Route path="/pmo" element={<Pmo2 />}></Route>
            
           <Route path="/cards" element={<Cards />}></Route>
            
           <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
            
           <Route path="/realtime" element={<RealTimeAvail/>}></Route>
            
           <Route path="/change_password" element={<Change_Password/>}></Route>
            
           {/* <Route path="/sampledata" element={<DoubleColorGraph></DoubleColorGraph>} />
          */}
        </Routes>
      
    </BrowserRouter>
  );
}