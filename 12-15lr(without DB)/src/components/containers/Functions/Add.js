import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import axios from 'axios';
import validator from 'validator';
import { withRouter } from "react-router-dom";

class Add extends Component {

    state = {
      name: '',
      surName: '',
      patronymic: '',
      phone: '',
      email: '',
      born: '',
      department: ''
    };

    changeName = event => {
        this.setState({name: event.target.value})
    };
    changeSurname = event => {
        this.setState({surName: event.target.value})
    };
    changePatronymic = event => {
        this.setState({patronymic: event.target.value})
    };
    changePhone = event => {
        const isValidPhoneNumber = validator.isMobilePhone(event.target.value);
        if (isValidPhoneNumber) {
            this.setState({phone: event.target.value})
        }
    };
    changeEmail = event => {
        const isValidEmail = validator.isEmail(event.target.value);
        if (isValidEmail) {
            this.setState({email: event.target.value})
        }
    };
    changeBorn = event => {
        this.setState({born: event.target.value})
    };
    changeDepartment = event => {
        this.setState({department: event.target.value})
    };

    addNewPerson = async () => {
        try {
            await axios.post('https://starikova-scripts.firebaseio.com/persons.json', this.state);
        } catch (e) {
            console.log(e)
        }
        this.props.history.push("/");
    };

    render() {
        const isValidEmail = validator.isEmail(this.state.email);
        const isValidPhoneNumber = validator.isMobilePhone(this.state.phone);
        const validate = (
            (this.state.name === '')||
            (this.state.surName === '')||
            (this.state.patronymic === '')||
            (this.state.born === null)||
            (this.state.email === '')||
            (this.state.phone === null)||
            (this.state.department === '')||
            (!isValidPhoneNumber)||
            (!isValidEmail)
        );

        return (
            <div className={'Add'}>
                <div className="card">
                    <div className="card-header">
                        Add new person
                    </div>
                    <div className="card-body">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Ivan" onChange={this.changeName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control type="text" placeholder="Ivanov" onChange={this.changeSurname} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Patronymic</Form.Label>
                                    <Form.Control type="text" placeholder="Ivanovich" onChange={this.changePatronymic} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                                        placeholder="+7(___)___-__-__"
                                        onChange={this.changePhone}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="123@gmail.com" onChange={this.changeEmail} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Born Date</Form.Label>
                                    <Form.Control type="date" placeholder="Enter born date" onChange={this.changeBorn} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control as="select" onChange={this.changeDepartment}>
                                        <option>IT</option>
                                        <option>Sales</option>
                                        <option>Delivery</option>
                                        <option>Legal</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            {!validate ?
                                <div className="edit-buttons">
                                    <Button variant={'primary'} onClick={this.addNewPerson}>Add new person</Button>
                                </div> :
                                <div className="edit-buttons">
                                    <Button variant={'primary'} onClick={this.addNewPerson} disabled>Add new person</Button>
                                </div>
                            }
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Add);