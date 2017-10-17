import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import { connect } from 'react-redux';
import { onMapMarkerEnter, onMapMarkerLeave } from '../actions';
import { API_Maps_KEY } from './secrets';
import MapStyleDark from './MapStyleDark.json';

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_Maps_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, width: `50%`, float: `right` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={7}
    center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
    defaultOptions={{ styles: MapStyleDark }}
  >
    {props.isMarkerShown && <Marker position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }} 
    onClick={props.onMarkerClick} />}
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.myVenues.map((marker, index) => (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.lon }}
          onMouseOver={() => props.onMouseEnter(marker.id)}
          onMouseOut={() => props.onMouseLeave()}
        > 
          {
            props.myVenues.venueIdHovered === marker.id && props.myVenues.isInfoWindowOpen === true ?
              <InfoWindow>
              <h1>Hello</h1>
              </InfoWindow>
            :
              <InfoWindow>
              <h1>Goodbuy</h1>
              </InfoWindow>
          }
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class MapComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
    currentLocation: {
      lat: 37.774929,
      lng: -122.419416,
      markerClick: 'Users current location'
    }
  }

  componentDidMount() {

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log('pos.coords', pos.coords);
            console.log('pos.coords.latitude', pos.coords.latitude);
            this.setState({
                currentLocation: {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
            })
            console.log('current lat and lng', this.state.currentLocation);
        })
    }
    this.delayedShowMarker()
  }

  onMouseEnter = (id) => {
    this.props.onMapMarkerEnter(id);
  }

  onMouseLeave = () => {
    this.props.onMapMarkerLeave();
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

  mouseOnMarker = (mark) => {
    return <div><h2>{mark.name}</h2></div>
  }

  render() {
    console.log('this.state.currentLocation in render', this.state.currentLocation);
    console.log('this.props.myVenues in render map', this.props.myVenues);
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        currentLocation={this.state.currentLocation}
        myVenues={this.props.myVenues}
        mouseOnMarker={this.mouseOnMarker}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    myVenues: state.venue.venues
  }
}

export default connect(mapStateToProps, { onMapMarkerEnter, onMapMarkerLeave })(MapComponent);