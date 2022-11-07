import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

var redIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const createRoutineMachineLayer = (props) => {
  console.log("props: ", props)
  const instance = L.Routing.control({
    // waypoints: [
    //   L.latLng(33.52001088075479, 36.26829385757446),
    //   L.latLng(33.50546582848033, 36.29547681726967)
    // ],
    waypoints: [props.start, props.end],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: false,
    waypointMode: "snap",
    createMarker: function (i, start, n){
      var marker_icon = null
      if (i == 0) {
          // start marker icon
          var marker = L.marker(start.latLng, {icon: blueIcon }).bindPopup("Your Location").openPopup()
          return marker
      } else if (i == n -1) {
          // end marker icon
          marker_icon = redIcon
          var marker = L.marker(start.latLng, {icon: redIcon }).bindPopup("Mentor's Location").openPopup()
          return marker
      }
      
    }
    // summaryTemplate: false

  });

  console.log("instance: ",instance)

  instance.on('routesfound', e => {
    // console.log(e.routes[0].summary);
    // console.log("routes: ", e)
    props.summary(e.routes[0].summary)
  })

  instance.on('routeserror', e => {
    console.log("routingstart: ", e);
  })


  return instance;
};

const Route = createControlComponent(createRoutineMachineLayer);

export default Route;
