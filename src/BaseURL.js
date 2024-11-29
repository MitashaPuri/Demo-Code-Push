import axios from 'axios'

// -------------------------UAT BASEURL-------------------
export default axios.create({
    // *******************local*******
    baseURL4:"http://152.67.8.120:7272",

    // **********uat****************
    baseURL1:"https://uatajnaapi.omfysgroup.com/",
    baseURL2:"https://uatajnaapi1.omfysgroup.com",
    baseURL3:"https://uatajna1.omfysgroup.com//api/messages",
    baseURL5:"https://uatajnaapi2.omfysgroup.com",
    baseURL6:"https://uatajnaapi3.omfysgroup.com",

     // **********prod****************

});

// -------------------------PROD BASEURL----------------------
// export default axios.create({
//     baseURL1:"",
//     baseURL2:"",
//     baseURL3:"",
// });