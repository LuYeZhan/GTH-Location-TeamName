import React, {useEffect, useState} from 'react'
import withAuth from '../../hoc/withAuth';
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import apiService from '../../services/api-service'
import moment from 'moment';
const socket = io(process.env.REACT_APP_BACKEND_DOMAIN)
moment.locale('es')

const Me = (props) => {

  const [trips, setTrips] = useState([]);
  useEffect(()=>{
    socket.emit('me');
    apiService.getAllMyTrips()
    .then(res =>{
      setTrips(res.data.listOfMyTrips)
    })
  },[]);

  useEffect(()=>{
    if(props.user.userType !== 'traveller'){
      props.history.push('/em');
    }
  },[props.history, props.user.userType])
  
  useEffect(()=>{
    socket.on('me', tripsfrom => {
        setTrips(tripsfrom)
    })
  },[trips])

  return (
    <section className="traveller-trips">
      <div className="traveller-bg-header"></div>
      <div className="user-img-container" style={{backgroundImage:`url(${props.user.profilePic})` }}></div>
    <button className="trip-tab">TRIPS</button>
    <article className="trip-card-container" >
      {trips.length > 0 ?
        trips.map((el,i)=>{
          return (
          <div className="trip-card-bg" key={i}>
            <img src={el.img} alt='city'/>
            <div className="trip-card">
              <Link to={`/request/${el._id}`} className="trip-request">{el.requests.length}</Link>
              <p className="trip-card-from">{el.from}</p>
              <p className="trip-card-to">{el.to}</p>
              <hr></hr>
              <p className="trip-card-date">{moment(el.startDate).format('ll')} <br/> {moment(el.endDate).format('ll')}</p>
              <ul>
              { el.needs.length > 0 ?
              el.needs.map((need,i)=>{
                return (
                  <li key={i}>{need}</li>)
                })
                :<li>No special needs</li>}
              </ul>
            </div>
          </div>)
        })
      : <h1>No trips created yet</h1>}
    </article>
        <Link to="/trip/add" className="trip-addnew"></Link>
    </section>
  )
}

export default withAuth(Me)
