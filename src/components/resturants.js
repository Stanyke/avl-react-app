import React, { Component } from 'react';

import { Link } from "react-router-dom";

import axios from 'axios';

class AllOpenResturants extends Component{
    constructor(props){
        super(props);
        this.state = {
            resturant:[],
            erroMsg:""
       }
      }

      componentDidMount()
      {
        axios.get('https://avl-app.herokuapp.com/')
        .then(response =>
          {
            console.log(response)
            this.setState({resturant: response.data.resturants_open_today})
          })
          .catch(error =>
            {
              console.log(error)
              this.setState({erroMsg: 'Error Getting Users'})
            })
      }

      render(){

        const { resturant, erroMsg } = this.state
        return (
          <div class="container">

              <h2>Resturant</h2>
            <div class="row">

              

              <br/>
              <br/>
          
              
                  
              {
                  Array.isArray(resturant) && resturant.length > 0 && resturant.map(resturantDetails => <div key={resturantDetails.resturant_id} class="card col-sm-4 col-12">
                      

                      <div class="table-responsive">
                        <table class="table">

                        <thead>
                        <tr>
                        <th>Name</th>
                        <th>Type Of Food</th>
                        <th>Michelin Star</th>
                        <th>Parking?</th>
                        <th>Delivery?</th>
                        <th>Pay Deposit</th>
                        <th>Evauation</th>
                        </tr>
                    </thead>
                  <tbody class="thead-dark">
                    <tr>
                      <td class="col-4">{resturantDetails.resturant_name}</td>
                      <td class="col-3">{resturantDetails.type_of_food}</td>
                      <td class="col-1">{resturantDetails.michelin_star}</td>
                      <td class="col-1">{resturantDetails.parking}</td>
                      <td class="col-1">{resturantDetails.delivery}</td>
                      <td class="col-1">{resturantDetails.pay_deposit}</td>
                      <td class="col-1">{resturantDetails.evaluation}</td>
                    </tr>
                  </tbody>
                  </table>
                  </div>
                  </div>)
                }
                {
                  erroMsg ? <div col="12">{erroMsg}</div> : null
                }
                
           

               <div class="col-12">
                <div id="reply"></div>
              </div>

            </div>
          </div>
        );
      }
    }

export default AllOpenResturants;