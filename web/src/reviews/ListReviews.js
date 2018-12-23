import React, { Component } from "react";
import { API } from "aws-amplify";
import ReviewsModal from './ReviewsModal'
import StarRatings from 'react-star-ratings';
import { Button, Col } from 'react-bootstrap';

export default class AddReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviews: [],
            showModal: false
        };
    }

    getReviews() {
        return API.get('wr-messaging', `/list-reviews/${this.props.user}`)
    }

    openModal = () => {
        this.setState({ showModal: true });
    }

    closeModal = () => {
        this.setState({ showModal: false });
    }

    async fetchReviews() {
        try {
            const results = await this.getReviews();
            this.setState({ reviews: results })
        } catch (e) {
            console.log(e);
            alert(e);
        }
    }

    componentDidMount() {
        this.fetchReviews()
    }

    getAverageRating = (reviews) => {
        let total = 0;

        for ( let i = 0; i < reviews.length; i++ ) {
            total += parseInt(10, reviews[i].Rating);
        }
        return total/this.state.reviews.length
    };
    render() {
      const btn ={backgroundColor: '#fd6360', color: 'white'};

        return (
        <React.Fragment>
          <Col xs={12} md={12} lg={12}>
                <StarRatings
                    rating={ this.state.reviews.length > 0 ? this.getAverageRating(this.state.reviews) : 0}
                    starRatedColor="#fdd835"
                    numberOfStars={5}
                    name='rating'
                    starDimension="17px"
                    starSpacing="2px"

                  /><br/>
                    <Button
                      bsStyle="danger"
                      onClick={ this.openModal }
                      style={btn}
                      >Read Reviews
                    </Button>
                  </Col>

            <ReviewsModal
                openModal={this.openModal}
                closeModal={this.closeModal}
                showModal={this.state.showModal}
                reviews={this.state.reviews}
                modalFunction={this.handleSubmit}
            />
        </React.Fragment>
        )
    };
};
