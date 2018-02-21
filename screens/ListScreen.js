import React, { Component } from 'react';
import { LocationList } from '../components/ListView';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'firebase';
import firestore from 'firebase/firestore';

export default class ListScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            error: null
        };
    }

    componentWillMount() {
        firebase.firestore().collection('markers').get()
            .then(querySnapshot => {
                let markers = [];

                querySnapshot.forEach(marker => {
                    const m = marker.data();
                    m.id = marker.id;

                    markers.push(m);
                });

                this.setState({ markers });
            })
            .catch((error) => {
                this.setState({ error });
            });
    }

    render() {
        return (
            <LocationList
                markers={this.state.markers}
            />
        );
    }

}
