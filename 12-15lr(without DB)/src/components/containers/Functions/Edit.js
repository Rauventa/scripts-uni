import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import axios from 'axios';
import validator from 'validator';
import { withRouter } from "react-router-dom";

class Edit extends Component {

    state = {
        name: '',
        surName: '',
        patronymic: '',
        phone: '',
        email: '',
        born: '',
        department: '',
    };

    async componentDidMount() {
        try {
            const response  = await axios.get(`https://lr-10f95.firebaseio.com/persons/${this.props.match.params.id}.json`);
            const data = response.data;
            this.setState({
                name: data.name,
                surName: data.surName,
                patronymic: data.patronymic,
                phone: data.phone,
                email: data.email,
                born: data.born,
                department: data.department
            })
        } catch (e) {
            console.log(e)
        }
    }

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

    editPerson = async () => {
        try {
            await axios.put(`https://lr-10f95.firebaseio.com/persons/${this.props.match.params.id}.json`, {
                name: this.state.name,
                surName: this.state.surName,
                patronymic: this.state.patronymic,
                born: this.state.born,
                phone: this.state.phone,
                email: this.state.email,
                department: this.state.department
            })
            this.props.history.push('/')
        } catch (e) {
            console.log(e)
        }
    };

    deletePerson = async () => {
        try {
            await axios.delete(`https://lr-10f95.firebaseio.com/persons/${this.props.match.params.id}.json`);
            this.props.history.push('/')
        } catch (e) {
            console.log(e)
        }
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
                        Edit person
                    </div>
                    <div className="card-body">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" defaultValue={this.state.name} placeholder="Ivan" onChange={this.changeName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control type="text" defaultValue={this.state.surName} placeholder="Ivanov" onChange={this.changeSurname} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Patronymic</Form.Label>
                                    <Form.Control type="text" defaultValue={this.state.patronymic} placeholder="Ivanovich" onChange={this.changePatronymic} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        defaultValue={this.state.phone}
                                        pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                                        placeholder="+7(___)___-__-__"
                                        onChange={this.changePhone}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" defaultValue={this.state.email} placeholder="123@gmail.com" onChange={this.changeEmail} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Born Date</Form.Label>
                                    <Form.Control type="date" defaultValue={this.state.born} placeholder="Enter born date" onChange={this.changeBorn} />
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
                                    <Button variant={'primary'} onClick={this.editPerson}>Edit person</Button>
                                    <Button variant={'danger'} onClick={this.deletePerson} style={{marginLeft: '1rem'}}>Delete person</Button>
                                </div> :
                                <div className="edit-buttons">
                                    <Button variant={'primary'} onClick={this.editPerson} disabled>Edit person</Button>
                                    <Button variant={'danger'} style={{marginLeft: '1rem'}}>Delete person</Button>
                                </div>
                            }
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Edit);