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

const SettingLocation = ({ location, setLocation }) => {
    const [map, setMap] = useState(null);


    const MyMap = () => {

        useMapEvents({
            click: (e) => {
                console.log(e);
                // if ( location.lat.toFixed(0) <= 0 ) {
                    // console.log("asdsd")
                    setLocation(e.latlng)
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
                    center={[location.lat, location.lng]}
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
                                console.log("loc: ", e);
                            },
                        }}
                    />
                    <MyMap />
                    <Marker position={location}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </Box>
        </Box>
    )}

export default SettingLocation;