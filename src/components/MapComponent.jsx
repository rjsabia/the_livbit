import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { API_Maps_KEY } from './secrets';
import MapStyleDark from './MapStyleDark.json';

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_Maps_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    // defaultCenter={{ lat: 37.774929, lng: -122.419416 }}
    center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
    defaultOptions={{ styles: MapStyleDark }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 37.774929, lng: -122.419416 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
);

class MapComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    currentLocation: {
      lat: 37.774929,
      lng: -122.419416
    }
  }

  componentDidMount() {
    // this.geoFindMe()
    // this.delayedShowMarker()
   console.log('this.state', this.state);

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log('pos.coords', pos.coords);
            console.log('pos.coords.latitude', pos.coords.latitude);
            // const coords = pos.coords;
            this.setState({
                currentLocation: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
            })
            console.log('current lat and lng', this.state.currentLocation);
        })
    }
    // this.delayedShowMarker()

  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    console.log('this.state.currentLocation in render', this.state.currentLocation);
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={this.state.currentLocation}
      />
    )
  }
}

export default MapComponent;