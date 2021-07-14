import React from 'react';
import { Button, Progress, Alert } from 'reactstrap';
import io from 'socket.io-client';

import './SeatChooser.scss';

class SeatChooser extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {occupied : 0};
  }
    
  componentDidMount() {
    const { loadSeats, loadSeatsData, chosenDay } = this.props;    
    this.socket = io((process.env.NODE_ENV === 'production') ? 'localhost:3000' : '/');
    this.socket.on('seatsUpdated', (seats) => {      
      loadSeatsData(seats);
      this.seatsCounter(seats, chosenDay);
    });    
    loadSeats();     
  }

  componentDidUpdate(prevProps){
    const { seats, chosenDay } = this.props;
    if(prevProps.chosenDay !== chosenDay || prevProps.seats.length !== seats.length){   
      this.seatsCounter(seats, chosenDay);
    } 
  }

  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  seatsCounter(pickedSeats, day){
    const occupied = pickedSeats.filter(seat => seat.day === day).length;
    this.setState({ occupied: occupied});
  }

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;
    
    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  render() {

    const { prepareSeat } = this;
    const { requests } = this.props;
    
    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i+1) )}</div>}
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
        <div className="seats_counter">Free seats: {50 - this.state.occupied}/50</div>
      </div>
    )
  };
}

export default SeatChooser;