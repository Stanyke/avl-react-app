import React, { Component } from 'react';

import { Link } from "react-router-dom";

import axios from 'axios';

class FilterResturants extends Component{
    constructor(props){
        super(props);
        this.state = {
            filteredRestaurant:[],
            DayOfWeek:"",
            HourOfDay:"",
            erroMsg:""
       }
      }
      
    filterRestaurant()
    {
        const errorNotice = document.getElementById('popError');

        if (this.state.DayOfWeek === "")
        {
          errorNotice.innerHTML = "<div class='alert alert-danger alert-dismissible fade show'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Day Of The Week Not Selected</strong></div>";
        }
        else if (this.state.HourOfDay === "")
        {
          errorNotice.innerHTML = "<div class='alert alert-danger alert-dismissible fade show'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Hour Of The Day Not Selected</strong></div>";
        }
        else
        {
          const filterDetails = {
            day : this.state.DayOfWeek,
            time : this.state.HourOfDay
          }

          const routerUrl = "http://avl-app.herokuapp.com/"+filterDetails.day+"/"+filterDetails.time;

          axios.get(routerUrl,filterDetails)
          .then(response=>{

            if (response.status === 200)
            {
              console.log(response.data.resturants_open_such_date);
              this.setState({filteredRestaurant: response.data.resturants_open_such_date})
            }}).catch((err) =>
            {
            if (err.response)
            {
                errorNotice.innerHTML = "<div class='alert alert-danger alert-dismissible fade show'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+err.response.data+"</div>";
                console.log("Hello Error: "+err.response.data)
            }
            });
        }
    }

        
      render(){

        const { filteredRestaurant, erroMsg } = this.state
        return (
          <div class="container">

              <h2>Restaurant</h2>

            <div class="row">
                <Link class="btn btn-outline-info" to="/">All Open Restaurants Today</Link>
            </div>

            <div class="row" style={{marginTop: 1+'em'}}>
                
                <div class="col-12 col-sm-5">
                    <select id="DayOfWeek" class="form-control" onChange={(value)=> this.setState({DayOfWeek:value.target.value})}>
                    <option value="">Choose Day Of Week</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    </select>
                </div>
                
                <br/>
                <br/>

                <div class="col-12 col-sm-5">
                    <select id="HourOfDay" class="form-control" onChange={(value)=> this.setState({HourOfDay:value.target.value})}>
                    <option value="">Choose Hour Of The Day</option>
                    <option value="00">12-01 AM</option>
                    <option value="01">01-02 AM</option>
                    <option value="02">02-03 AM</option>
                    <option value="03">03-04 AM</option>
                    <option value="04">04-05 AM</option>
                    <option value="05">05-06 AM</option>
                    <option value="06">06-07 AM</option>
                    <option value="07">07-08 AM</option>
                    <option value="08">08-09 AM</option>
                    <option value="09">09-10 AM</option>
                    <option value="10">10-11 AM</option>
                    <option value="11">11-12 AM</option>
                    <option value="12">12-01 PM</option>
                    <option value="13">01-02 PM</option>
                    <option value="14">02-03 PM</option>
                    <option value="15">03-04 PM</option>
                    <option value="16">04-05 PM</option>
                    <option value="17">05-06 PM</option>
                    <option value="18">06-07 PM</option>
                    <option value="19">07-08 PM</option>
                    <option value="20">08-09 PM</option>
                    <option value="21">09-10 PM</option>
                    <option value="22">10-11 PM</option>
                    <option value="23">11-12 PM</option>
                    </select>
                </div>

                <br/>
                <br/>
                <div class="col-12 col-sm-2">
                    <button type="submit" class="form-control btn btn-success" onClick={()=>this.filterRestaurant()}>Search</button>
                </div>
              
                <div id="popError" class="col-12"></div>
            
                {
                  Array.isArray(filteredRestaurant) && filteredRestaurant.length > 0 && filteredRestaurant.map(resturantDetails => <div key={resturantDetails.resturant_id} class="card col-sm-4 col-12">
                      

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
                  erroMsg ? <div col="12"><br/>
                  <div class='alert alert-danger fade show'>{erroMsg}</div>
                  </div> : null
                }
            </div>
          </div>
        );
      }
    }

export default FilterResturants;