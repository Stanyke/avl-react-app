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
              this.setState({erroMsg: 'Error Getting Restaurants, Possibly Because Of Low Internet Connection, Reload This Page'})
            })
      }

      render(){

        const { resturant, erroMsg } = this.state
        return (
          <div class="container">

              <h2>Restaurant</h2>

              <div class="row">
                <Link class="btn btn-outline-info" to="/filter-restaurant">Filter Restaurant</Link>
              </div>

            <div class="row">
          
            <div class="table-responsive col-12">
                    <table class="table col-12">
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
                        {
                            Array.isArray(resturant) && resturant.length > 0 && resturant.map(resturantDetails => <tbody key={resturantDetails.resturant_id} class="thead-dark">
                                <tr>
                                    <td>{resturantDetails.resturant_name}</td>
                                    <td>{resturantDetails.type_of_food}</td>
                                    <td>{resturantDetails.michelin_star}</td>
                                    <td>{resturantDetails.parking}</td>
                                    <td>{resturantDetails.delivery}</td>
                                    <td>{resturantDetails.pay_deposit}</td>
                                    <td>{resturantDetails.evaluation}</td>
                                </tr>
                            </tbody>)
                        }
                    </table>
                </div>
            </div>
                {
                  erroMsg ? <div col="12"><br/>
                    <div class='alert alert-danger fade show'>{erroMsg}</div>
                    </div> : null
                }

            </div>
        );
      }
    }

export default AllOpenResturants;