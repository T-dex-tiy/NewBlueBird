import React, { Component } from "react";
import mainLogo from "./styles/logos/mainlogo2.png";
import LogIn from "./routes/logIn";
import "./styles/app.css";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const newDate= new Date();
    const year= newDate.getFullYear();
    const month= newDate.getMonth()+1;
    const monthDisplay=month<10?"0"+month:month
    const day= newDate.getDate();
    const currentDate= year+"-"+monthDisplay+"-"+day;
    console.log(currentDate);
    
    
    const madeReservations = Object.keys(this.props.reservations).map(
      key => this.props.reservations[key]
    ).filter(key=>{
      if(key.reservationOne.groupUID==this.props.uid)
      {
        console.log("key",[key]); 
      return [key]}
    }
    )
    // const updatedReservations = madeReservations.map(key =>madeReservations[key]).map(key=>console.log(key)
    // )
   
    console.log(madeReservations.length);
    
    return (
      <div className="header font">
        <LogIn
          className="userName"
          user={this.props.user}
          uid={this.props.uid}
          resetPassword={this.props.resetPassword.bind(this)}
          renderLogin={this.props.renderLogin.bind(this)}
          logOut={this.props.logOut.bind(this)}
          remainingDays={this.props.remainingDays}
          lastReservation={madeReservations}
        />
        <div className="header_title">
          <h1 className="title font">Bluebird Heli</h1>
          <img className="mainLogo" src={mainLogo} />
        </div>
      </div>
    );
  }
}
export default Header;
