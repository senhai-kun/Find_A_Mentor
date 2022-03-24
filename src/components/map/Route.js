import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props) => {
  const instance = L.Routing.control({
    // waypoints: [
    //   L.latLng(33.52001088075479, 36.26829385757446),
    //   L.latLng(33.50546582848033, 36.29547681726967)
    // ],
    waypoints: [props.start, props.end],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 4 }]
    },
    show: true,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: true,
    
  });

  console.log(instance)
  console.log(instance?._selectedRoute?.summary?.totalTime)
  instance.on('routesfound', e => {
    console.log(e.routes[0].summary);
  })

  return instance;
};

const Route = createControlComponent(createRoutineMachineLayer);

export default Route;
