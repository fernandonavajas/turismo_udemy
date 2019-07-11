import React, { Component } from 'react';
import { Rating, Text } from 'react-native-elements';
import * as firebase from 'firebase';
import { View } from 'react-native';


export default class TurRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        };

        const { turId } = props;
        this.commentsref = firebase.database().ref(`comments/${turId}`);
    }

    componentDidMount() {
        this.commentsref.on("child_added", snapshot => {
            this.commentsref.on("value", snap => {
                let comments = [];
                comments.forEach(row => {
                    comments.push(parseInt(row.val().rating));
                });

                this.setState({
                    rating: comments.reduce((previous, current) => previous + current, 0) / comments.length
                });

                this.refs.rating.setCurrentRating(
                    comments.reduce((previous, current) => previous + current, 0) / comments.length
                );
            })
        });


    }

    render() {
        const { rating } = this.state;
        if (rating) {
            return (
                <Rating
                    ref="rating"
                    imageSize={20}
                    readonly
                    startingValue={rating}
                />
            );

        } else {
            return (
                <View>
                    <Text>No hay Puntuaciones</Text>
                </View>
            )
        }

    }
}


