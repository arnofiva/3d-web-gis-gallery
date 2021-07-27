import "./style.scss";

import Portal from "esri/portal/Portal";
import PortalGroup from "esri/portal/PortalGroup";

import * as calcite from 'calcite-web/es6';
import Gallery from "./Gallery";
calcite.init();


const portal = new Portal({ url: "https://zurich.maps.arcgis.com/" });
portal.load().then(async () => {

  const query = await portal.queryGroups({
    query: "id:eb3d53d465364b76b62f0f77cfbc437a"
  });

  new Gallery({
    group: query.results[0],
    container: "app"
  });

});


// import WebScene from "esri/WebScene";
// import SceneView from "esri/views/SceneView";

// const map = new WebScene({
//   ground: "world-elevation",
//   basemap: "satellite",
// });

// new SceneView({
//   container: "viewDiv",
//   qualityProfile: "high",
//   map: map,
// });
