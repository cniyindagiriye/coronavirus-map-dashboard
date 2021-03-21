import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { fetchData } from '../store/actions/data';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Country from './Country';

const Map = (props) => {

  const { getData } = props;

  useEffect(() => {
    getData();
  }, [getData])

  const location = [51.509865, -0.118092]
  const zoom = 4;

  return (
    <div className="App-body relative z-0 w-full bg-red-400">
      <Country />
      <MapContainer center={location} zoom={zoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
      </MapContainer>
    </div>
  );
};


const mapStateToProps = (state) => ({
  loading: state.covidData.loading,
  error: state.covidData.error,
})

const mapDispatchToProps = (dispatch) => ({
  getData: (firstName, lastName, email, password) => 
  dispatch(fetchData(firstName, lastName, email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);