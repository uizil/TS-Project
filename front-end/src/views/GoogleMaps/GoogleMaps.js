import React, { Component } from "react";
import { Card, CardHeader, CardBody, NavLink } from "reactstrap";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

// To use the Google Maps JavaScript API, you must register your app project on the Google API Console and get a Google API key which you can add to your app
const apiKey = "AIzaSyASyYRBZmULmrmw_P9kgr7_266OhFNinPA";

const defaultZoom = 11;
const defaultCenter = { lat: 36.894214, lng: 10.187056 };
const locations = [
  {
    lat: 36.894214,
    lng: 10.187056,
    label: "RBK",
    draggable: false,
    title: "RBK",
    www:
      "https://www.rebootkamp.net/?gclid=Cj0KCQiApt_xBRDxARIsAAMUMu8j06-_SdQoXw1Vd7d8E0ym97pBbPaAFVgNjqE9dMt4j-WCYSdfWycaAup-EALw_wcB/"
  }
  // {
  //   lat: 37.394694,
  //   lng: -122.150333,
  //   label: "T",
  //   draggable: false,
  //   title: "Tesla",
  //   www: "https://www.tesla.com/"
  // },
  // {
  //   lat: 37.331681,
  //   lng: -122.0301,
  //   label: "A",
  //   draggable: false,
  //   title: "Apple",
  //   www: "https://www.apple.com/"
  // },
  // {
  //   lat: 37.484722,
  //   lng: -122.148333,
  //   label: "F",
  //   draggable: false,
  //   title: "Facebook",
  //   www: "https://www.facebook.com/"
  // }
];

class MarkerList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return locations.map((location, index) => {
      return (
        <MarkerWithInfoWindow key={index.toString()} location={location} />
      );
    });
  }
}

class MarkerWithInfoWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { location } = this.props;

    return (
      <Marker
        onClick={this.toggle}
        position={location}
        title={location.title}
        label={location.label}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.toggle}>
            <NavLink href={location.www} target="_blank">
              {location.title}
            </NavLink>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

const GoogleMapsComponent = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
        {<MarkerList locations={locations} />}
      </GoogleMap>
    );
  })
);

class ReactGoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <CardBody>
          <GoogleMapsComponent
            key="map"
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${apiKey}`}
            loadingElement={<div style={{ height: `80%` }} />}
            containerElement={<div style={{ height: `60vh` }} />}
            mapElement={<div style={{ height: `80%` }} />}
          />
        </CardBody>
      </div>
    );
  }
}

export default ReactGoogleMaps;
