import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Button, Card, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import axios from 'axios';

class Person extends Component {

    state = {
        show: false
    };

    showModal = event => {
        event.preventDefault();
      this.setState({show: true})
    };

    hideModal = () => {
      this.setState({show: false})
    };

    deletePerson = async () => {
        try {
            await axios.delete(`https://starikova-scripts.firebaseio.com/persons/${this.props.id}.json`);
            this.setState({show: false});
            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const name = `${this.props.personData.name} ${this.props.personData.surName} ${this.props.personData.patronymic}`;
        const data = this.props.personData;
        const getAge = require('get-age');
        return (
            <div className={'card Person'}>
                <Modal show={this.state.show} onHide={this.hideModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove person</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you really want to remove <b>{name}</b>?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.deletePerson}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Card>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>{this.props.id}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><span>Phone:</span> {data.phone}</ListGroupItem>
                        <ListGroupItem><span>Email:</span> {data.email}</ListGroupItem>
                        <ListGroupItem><span>Age:</span> {getAge(data.born)}</ListGroupItem>
                        <ListGroupItem><span>Department:</span> {data.department}</ListGroupItem>
                    </ListGroup>
                    <div className="buttons">
                        <NavLink to={`/edit/${this.props.id}`}><Button variant={'primary'}>Edit</Button></NavLink>
                        <a href={'/'} onClick={this.showModal}><Button variant={'primary'}>Delete</Button></a>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Person;