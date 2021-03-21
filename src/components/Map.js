import { Map as MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { fetchData } from '../store/actions/data';
import { connect } from 'react-redux';
import { useEffect, useRef } from 'react';
import treeMarker from '../assets/icons/marker-icon.png';
import markerShadow from '../assets/icons/marker-shadow.png';
import Country from './Country';

const Map = (props) => {

  const mapRef = useRef();
  const { getData, data } = props;

  let geoJson;

  if(data) {
    const hasData = Array.isArray(data) && data.length > 0;

    if ( hasData ) {

    geoJson = {
      type: 'FeatureCollection',
      features: data.map((country = {}) => {
        const { countryInfo = {} } = country;
        const { lat, long: lng } = countryInfo;
        return {
          type: 'Feature',
          properties: {
          ...country,
          },
          geometry: {
            type: 'Point',
            coordinates: [ lng, lat ]
          }
        };
      })};
      console.log(geoJson);
    }
  }

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if ( !map ) return;

    const parkIcon = new L.Icon({
      iconUrl: treeMarker,
      iconSize: [26, 26],
      popupAnchor: [0, -15],
      shadowUrl: markerShadow,
      shadowAnchor: [13, 28]
    });

    const parksGeojson = new L.GeoJSON(geoJson, {
      pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
          icon: parkIcon
        });
      },
      onEachFeature: (feature = {}, layer) => {
        const { properties = {} } = feature;
        const { country } = properties;

        if ( !country ) return;

        layer.bindPopup(`<p>${country}</p>`);
      }
    });

    parksGeojson.addTo(map);
  }, [data, geoJson])

  useEffect(() => {
    getData();
  }, [getData])

  return (
    <div className="App-body relative z-0 bg-red-400">
      <Country />
      <MapContainer ref={mapRef} center={[39.50, -98.35]} zoom={4}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
      </MapContainer>
    </div>
  );
};


const mapStateToProps = (state) => ({
  loading: state.covidData.loading,
  error: state.covidData.error,
  data: state.covidData.data
})

const mapDispatchToProps = (dispatch) => ({
  getData: (firstName, lastName, email, password) => 
  dispatch(fetchData(firstName, lastName, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);