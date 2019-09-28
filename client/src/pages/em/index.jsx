
import React, {useState, useEffect} from 'react'
import withAuth from '../../hoc/withAuth'
import apiService from '../../services/api-service'
import { ReactComponent as Ok } from '../../svg/check.svg'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_BACKEND_DOMAIN)

const Em = (props) => {
  const [trips, setTrips] = useState([]);
  const [selectedTab,setSelectedTab] = useState(true)
  useEffect(()=>{
    socket.emit('me');
    apiService.getAllTrips()
    .then(res =>{
      setTrips(res.data.listOfTrips)
    })
  },[]);
  useEffect(()=>{
    socket.on('me', tripsfrom => {
      setTrips(tripsfrom)
    })
  })
  useEffect(()=>{
    if(props.user.userType !== 'volunteer'){
      props.history.push('/private');
    }
  },[props.history, props.user.userType])

  const handleRequest = (idTrip) => {
    const toSend = {idTrip, user:props.user._id}
    apiService.pullRequest(toSend)
    .then(res => {
      if(res.status === 200){
        setTrips()
      }
    })
  }

 const HandleTabToogle =()=>{
  setSelectedTab(!setSelectedTab)
 } 
 const renderAlltrips = () =>{
  return(
  <article className="trip-card-container" >
  {trips.length >0 
  ?
  (trips.map(trip => {
    return(
      <div className="trip-card-bg" key={trip._id}>
        <img src={trip.img} alt='city image'/>
        <div className="trip-card">
          <button className="trip-request">{trip.requests.length}</button>
          <p className="trip-card-from">{trip.from}</p>
          <p className="trip-card-to">{trip.to}</p>
          <hr></hr>
          <p className="trip-card-date">{trip.startDate} to {trip.endDate}</p>
          <ul>
          { trip.needs.length >0 ?
          trip.needs.map((need,i)=>{
            return (
              <li key={i}>{need}</li>)
            })
            :<li>No special needs</li>
            }
          </ul>
        </div>
      </div>
    )
  }))
  :
  (<div>No trips available</div>)}
  </article>
  )}
  return (
    <>
    <section className="traveller-trips">
      <div className="traveller-bg-header"></div>
      <div className="user-img-container" style={{backgroundImage:`url(${props.user.profilePic})` }}></div>
<<<<<<< HEAD
    <button className="trip-tab">TRIPS</button>
    <article className="trip-card-container" ></article>
      {trips.length >0 
      ?
      (trips.map(trip => {
        return(
          <div className="trip-card-bg" key={trip._id}>
            <img src={trip.img} alt='city image'/>
            <div className="trip-card">
              <button className="trip-request">{trip.requests.length}</button>
              <p className="trip-card-from">{trip.from}</p>
              <p className="trip-card-to">{trip.to}</p>
              <hr></hr>
              <p className="trip-card-date">{trip.startDate} to {trip.endDate}</p>
              <ul>
              { trip.needs.length >0 ?
              trip.needs.map((need,i)=>{
                return (
                  <li key={i}>{need}</li>)
                })
                :<li>No special needs</li>
                }
              </ul>

              <button className="request" onClick={()=> handleRequest(trip._id)}><Ok/></button>

            </div>
          </div>
        )
      }))
      :
      (<div>no hay </div>)}
=======
      <div className="trip-tab-volunteer-container">
        <button className={`trip-tab-volunteer ${selectedTab ? '' : "selected-tab" }`} onClick={HandleTabToogle}>ALL TRIPS</button>
        <button className={`trip-tab-volunteer ${selectedTab ? "selected-tab" :'' }`} onClick={HandleTabToogle}>MY TRIPS</button>
      </div>
      {renderAlltrips()}
      {renderAlltrips()}
>>>>>>> 6a9fa5cf8dc5ef3fa9fe3498dd8293ea9f9a1970
      </section>
    </>
  )
}

export default withAuth(Em)