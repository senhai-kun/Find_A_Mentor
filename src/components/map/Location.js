import React, { useEffect, useRef, useState } from 'react'
import { Button, Typography, Box } from '@mui/material'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import Route from './Route'
import formatTime from "humanize-duration"
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const containerStyle = {
  width: '100%',
  height: '600px'
};

const center = {
  lat: 15.1449853,
  lng: 120.5887029
};

const libraries = ['places'];

const Location = () => {
  // const { isLoaded, loadError } = useJsApiLoader({
  //   googleMapsApiKey: '',
  //   libraries
  // })

  

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  const [map, setMap] = useState(null)
  const [route, setRoute] = useState(null)
  const ref = useRef(null)

  // Start-End points for the routing machine:
  const [start, setStart] = useState([38.9072, -77.0369])
  const [end, setEnd] = useState([15.46677395480803, 121.01492637492784])
  const [ summary, setSummary ] = useState({})

  const [ position, setPosition ] = useState([14.5995, 120.9842])

  const getUserLocation = () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( pos => {
          setPosition([pos.coords.latitude, pos.coords.longitude])
          // setPosition([15.33839054911948,120.91691941022874])
          // ref.current = L.Routing.control({
          //   waypoints: [[pos.coords.latitude, pos.coords.longitude], end],
          //   position: 'topleft', // Where to position control on map
          //   lineOptions: { // Options for the routing line
          //     styles: [
          //       {
          //         color: '#757de8',
          //       },
          //     ],
          //   },
          //   show: false,
          //   addWaypoints: false,
          //   routeWhileDragging: true,
          //   draggableWaypoints: true,
          //   fitSelectedRoutes: false,
          //   showAlternatives: true
          // })
          
          // ref.current.addTo(map)
          // console.log(ref.current)
        } )
    } 
  }
  const [time, setTime] = useState(null)


  const MyMap = () => {
    const mape = useMap()

    useMapEvents({
      click: e => {
        console.log(e);
        console.log(time);
        
      },
      locationfound: (locationfound) => {
        console.log("location found: ",locationfound);
      },
      // layeradd: e => {
      //   console.log(e.layer?._route?.summary?.totalTime)
      //   console.log("layeradd: ",e)
      // },
      
    })
    
    mape.on('locationfound', (e) => {
      console.log(e);
    } )
    // map.setView({ distanceTo: 120.5887029 })
    // map.flyToBounds(position,{ duration: 1.5}})

    // mape.flyTo(position, 13, { duration: 1.5 })
    console.log("calculated distance: ",mape.distance([15.291548895526345, 121.01492637492784], position).toFixed(0)/1000,'km');
    // console.log(map);
   
    // map.latLngToLayerPoint
    return null
  }

  // const position = [15.1449853, 120.5887029]

  // if( !isLoaded ) return "Loading maps"
  const [check, setCheck] = useState(true)

  const handleCheck = () => {
    setCheck(true)
    console.log(map)
  }

  return (
    <Box sx={{ width: "100%", height: "100%"}} >
      <Typography variant='body' fontWeight='bold'   >{formatTime(summary.totalTime * 1000)}</Typography>
      
      {/* <Typography variant='h5' fontWeight='bold' mt={5} mb={2}  >Find A Mentor Near You</Typography>
      <Button variant='contained' sx={{ mb: 5 }} onClick={getUserLocation} >Get Location</Button>
      <Button variant='contained' color='info' sx={{ mb: 5 }} onClick={handleCheck} >Check Route</Button> */}
      {/* <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
     
      </GoogleMap> */}
      <MapContainer 
        whenCreated={map => setMap(map)} 
        center={end} 
        zoom={12} 
        zoomAnimationThreshold={1000} 
        scrollWheelZoom={false}   
        dragging={true}
        doubleClickZoom={false}
        zoomSnap={true}
        zoomDelta={true}
        
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          eventHandlers={{
            locationfound: (e) => {
              console.log("loc: ", e)
            }
          }}
        />
        <MyMap />
        <Marker position={position} >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        { check && <Route start={position} end={end} summary={setSummary} />}
      </MapContainer>
      

    </Box>
  )
}

export default Location;