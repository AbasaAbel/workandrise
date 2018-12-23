import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import  { ListGroup, ListGroupItem } from 'react-bootstrap';


export default class ReviewsModal extends Component {

    renderReviews = (reviews) => {
        return reviews.map((val, i) => {
            const a = Number(new Date(val.CreatedAt))
            let date = new Date(a)

            let month = '';
            let day = '';
            date.getMonth() < 10 ? month = `0${date.getMonth()}` : month = date.getMonth();
            date.getDay() < 10 ?  day = `0${date.getDay()}` : day = date.getDay();
            return (
                <div key={i}>
                    <ListGroupItem >
                        Rating: { val.Rating } <br />
                        Review: { val.Content }<br />
                        Created At: { `${month}, ${day}, ${date.getFullYear()}` }
                    </ListGroupItem>
                </div>
            )
        })
    };


render() {
        return(
            <React.Fragment>
                <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Reviews
                            </Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <ListGroup>
                                    { this.renderReviews(this.props.reviews) }
                                </ListGroup>
                            </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.props.closeModal}>Close</Button>
                        </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}
