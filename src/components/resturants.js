import React, { Component } from 'react';

import { Link } from "react-router-dom";

import axios from 'axios';

class AllOpenResturants extends Component{
    constructor(props){
        super(props);
        this.state = {
            resturant:[],
            DayOfWeek:"",
            HourOfDay:"",
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

              <h2>Restaurant</h2>

            <div class="row">
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
                  <option value="00">12 AM</option>
                  <option value="01">01 AM</option>
                  <option value="02">02 AM</option>
                  <option value="03">03 AM</option>
                  <option value="04">04 AM</option>
                  <option value="05">05 AM</option>
                  <option value="06">06 AM</option>
                  <option value="07">07 AM</option>
                  <option value="08">08 AM</option>
                  <option value="09">09 AM</option>
                  <option value="10">10 AM</option>
                  <option value="11">11 AM</option>
                  <option value="12">12 PM</option>
                  <option value="13">01 PM</option>
                  <option value="14">02 PM</option>
                  <option value="15">03 PM</option>
                  <option value="16">04 PM</option>
                  <option value="17">05 PM</option>
                  <option value="18">06 PM</option>
                  <option value="19">07 PM</option>
                  <option value="20">08 PM</option>
                  <option value="21">09 PM</option>
                  <option value="22">10 PM</option>
                  <option value="23">11 PM</option>
                </select>
              </div>

              <br/>
              <br/>
              <div class="col-12 col-sm-2">
                <button type="submit" class="form-control btn btn-success" onClick={()=>this.filterRestaurant()}>Search</button>
              </div>

              <br/>
              <br/>

              <div id="popError" class="col-12"></div>

            </div>


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

          axios.post(routerUrl,filterDetails)
          .then(response=>{

            if (response.status === 200)
            {
              errorNotice.innerHTML = "<div class='alert alert-danger alert-dismissible fade show'><button type='button' class='close' data-dismiss='alert'>&times;</button>"+response.data.data.sunday+"</div>";
            }
          }).catch((err) =>
          {

          })
        }
      }
    }

export default AllOpenResturants;