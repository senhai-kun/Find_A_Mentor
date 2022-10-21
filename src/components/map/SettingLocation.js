import React, { useState } from 'react'
import {
    MapContainer,
    TileLayer,
    useMapEvents,
    Marker,
    Popup
} from "react-leaflet";
import L from "leaflet";
import { Box } from '@mui/material';
import axios from "axios";

const SettingLocation = ({ location, setLocation }) => {
    const [map, setMap] = useState(null);
    const [address, setAddress] = useState("");

    const MyMap = () => {

        useMapEvents({
            click: (e) => {
                console.log(e);
                // if ( location.lat.toFixed(0) <= 0 ) {
                    console.log("asdsd", e.latlng)
                    const options = {
                        method: 'GET',
                        url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
                        params: {location: `${e.latlng.lat},${e.latlng.lng}`, language: 'en'},
                        headers: {
                          'X-RapidAPI-Key': '4d09394864msh7a2f85be8385857p1b7638jsn6043c72e0dd5',
                          'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
                        }
                      };
                      
                      axios.request(options).then(function (response) {
                        console.log("address: ",response.data);
                          console.log(response.data.results[0].locality, response.data.results[0].area, response.data.results[0].country);
                          let add = response.data.results[0]
                        setLocation({
                            lng: e.latlng.lng,
                            lat: e.latlng.lat,
                            address: `${add?.locality}, ${add?.area}, ${add?.country}`
                        });
                        setAddress(`${add?.locality}, ${add?.area}, ${add?.country}`);

                      }).catch(function (error) {
                          console.error(error);
                      });
                // }
                // console.log(location.lat.toFixed(0))
            },
            locationfound: (locationfound) => {
                console.log("location found: ", locationfound);
            }

            // layeradd: e => {
            //   console.log(e.layer?._route?.summary?.totalTime)
            //   console.log("layeradd: ",e)
            // },
        });

        return null;
    };

    return (
        <Box>
            <Box sx={{ width: "100%", height: 400, p: 2 }}>
                <MapContainer
                    whenCreated={(map) => setMap(map)}
                    center={[location?.lat, location?.lng]}
                    zoom={16}
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
                                console.log("loc: ", e);
                            },
                        }}
                    />
                    <MyMap />
                    <Marker position={location}>
                        <Popup  >
                         {address}
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
        </Box>
    )}

export default SettingLocation;