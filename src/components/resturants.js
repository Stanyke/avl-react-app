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
          <div class="container-fluid">
            <div class="row">

              <div class="newT">
                <Link class="btn btn-outline-success" to="/">New Todo</Link>
              </div>

              <br/>
              <table class="table">
                  
                  
              {
                resturant.length ?
                resturant.map(resturantDetails => <div key={resturantDetails.resturant_id}>
                <tbody class="thead-dark">
                    <tr>
                      <td class="col-4">{resturantDetails.resturant_name}</td>
                      <td class="col-4">{resturantDetails.type_of_food}</td>
                      <td class="col-4">{resturantDetails.michelin_star}</td>
                      <td class="col-4">{resturantDetails.parking}</td>
                      <td class="col-4">{resturantDetails.delivery}</td>
                      <td class="col-4">{resturantDetails.pay_deposit}</td>
                      <td class="col-4">{resturantDetails.evaluation}</td>
                    </tr>
                  </tbody>
                  </div>) : null
                }
                {
                  erroMsg ? <div col="12">{erroMsg}</div> : null
                }
                
               </table>

               <div class="col-12">
                <div id="reply"></div>
              </div>

            </div>
          </div>
        );
      }
    }

export default AllOpenResturants;