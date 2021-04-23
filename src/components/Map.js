import { Map as MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { fetchData } from '../store/actions/data';
import { connect } from 'react-redux';
import { useEffect, useRef } from 'react';
import virusMarker from '../assets/icons/marker-icon.png';
import markerShadow from '../assets/icons/marker-shadow.png';
import Country from './Country';
import { setCountry } from '../store/actions/country';
import FilterCountries from './FilterCountries';

const Map = (props) => {

  const mapRef = useRef();
  const { getData, data, setData } = props;

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
    }
  }

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if ( !map ) return;

    const parkIcon = new L.Icon({
      iconUrl: virusMarker,
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

        layer.bindPopup(`<p>${country}</p>`).on('click', () => setData(properties));
      }
    });

    parksGeojson.addTo(map);
  }, [data, geoJson, setData])

  useEffect(() => {
    getData();
  }, [getData])

  return (
    <div className="App-body relative z-0 bg-red-400">
      <Country />
      <FilterCountries />
      <MapContainer ref={mapRef} maxBounds={[[-85, -180.0],[85, 180.0]]} center={ [0, 0] } zoom={4} minZoom={2} maxZoom={8} scrollWheelZoom={false} >
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
  setData: (data) => dispatch(setCountry(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);