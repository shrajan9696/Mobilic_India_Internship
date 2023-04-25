import React from "react";
import BasicTable from "./BasicTable";
import './home.css';
import { useState } from "react";
import {COLUMNS} from './columns';
const Home = (props)=>{
    const query5 = [
        {
            Header:'City',
            accessor:'_id'
        },
        {
            Header:'Total Users',
            accessor:'totalUsers',
        },
        {
            Header:'avgIncome',
            accessor:'avgIncome'
        }

    ];
   const [details,setDetails] =  useState([]);
   const[isFetched,setIsFetched] = useState(false);
   const[queryNo, setQueryNo] = useState();
   const [header,setHeader] = useState();
   const [columns,setColumns] = useState([]);
   
    async function details1handler(event){
       
        let endPoint = '';
        let queryNo = event.target.value;
        if(queryNo == '1') endPoint ='query1';
        if(queryNo == '2') endPoint = 'query2';
        if(queryNo == '3') endPoint = 'query3';
        if(queryNo == '4') endPoint = 'query4';
        if(queryNo == '5') endPoint = 'query5';
         
           try
           {
              const response = await fetch(`https://mobilic-data-backend.onrender.com/${endPoint}`);
              if(!response.ok){
                        throw new Error('Something went wrong!');
                      }
                      const data = await response.json();
                   
                      setDetails(data);
                     
                    
                      setIsFetched(true);

                      if(queryNo == '1') {
                        setHeader("Users which have income lower than $5 USD and have a car of brand 'BMW' or 'Mercedes'.");
                        setColumns(COLUMNS);
                      }
                      if(queryNo == '2') {
                        setHeader("Male Users which have phone price greater than 10,000.");
                        setColumns(COLUMNS);
                      }
                      if(queryNo == '3') {
                        setHeader("Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.");
                        setColumns(COLUMNS);
                      }
                      if(queryNo == '4') {
                        setHeader("Users which have a car of brand 'BMW', 'Mercedes' or 'Audi' and whose email does not include any digit.");
                        setColumns(COLUMNS);
                      }
                      if(queryNo == '5') {
                        setHeader("Show the data of top 10 cities which have the highest number of users and their average income.");
                        setColumns(query5);
                      }
                      
              }
          
            catch(error)
            {
                          console.log(error.message);
            }
           
    }
   
   return <>
   <div>
    <h2>Details Generator</h2>
   </div>
    <div >
  <main className="grid">
    <article>

      <div className="text">
        <h3>Query 1</h3>
        <p>Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.</p>
        <button onClick={details1handler} value="1" className="button" >Fetch</button>
      </div>
    </article>
    <article>

      <div className="text">
        <h3>Query 2</h3>
        <p>Male Users which have phone price greater than 10,000.</p>
        <button onClick={details1handler} value="2" className="button">Fetch</button>
      </div>
    </article>
    <article>

      <div className="text">
        <h3>Query 3</h3>
        <p>Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.</p>
        <button onClick={details1handler} value="3" className="button">Fetch</button>
      </div>
    </article>
    <article>

      <div className="text">
        <h3>Query 4</h3>
        <p>Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.</p>
       <button onClick={details1handler} value="4" className="button">Fetch</button>
      </div>
    </article>
    <article>

      <div className="text">
        <h3>Query 5</h3>
        <p>Show the data of top 10 cities which have the highest number of users and their average income.</p>
        <button onClick={details1handler} value="5" className="button">Fetch</button>
      </div>
    </article>
   
  </main>
</div>
<br></br>
    {isFetched && <BasicTable data={details} header={header} col = {columns}/>}
   </>
}

export default Home;