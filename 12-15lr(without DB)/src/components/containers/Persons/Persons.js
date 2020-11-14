import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import Person from "./Person";
import {NavLink} from "react-router-dom";
import axios from 'axios'

class Persons extends Component {

    state = {
      persons: [],
        term: ''
    };

    async componentDidMount() {
        try {
            const response  = await axios.get('https://starikova-scripts.firebaseio.com/persons.json');
            const persons = Object.entries(response.data).map((person) => {
                return {
                    personId: person[0],
                    personData: person[1]
                }
            });
            this.setState({persons})
        } catch (e) {
            console.log(e)
        }
    }

    searchHandler = event => {
      this.setState({term: event.target.value})
    };

    searchingFor = term => {
        return function(x) {
            return (x.personData.name.toLowerCase().includes(term.toLowerCase())) || (x.personData.surName.toLowerCase().includes(term.toLowerCase())) || !term
        }
    };

    sortByIdPlus = (event) => {
        const getAge = require('get-age');
        if (event.target.value === 'Sort ascending by id') {
            const sorting = this.state.persons;
            sorting.sort(function (a,b) {
                return a.personId - b.personId
            });
            this.setState({persons: sorting})
        }
        else if (event.target.value === 'Sort descending by id') {
            const sorting = this.state.persons;
            sorting.sort(function (a,b) {
                return a.personId - b.personId
            });
            sorting.reverse();
            this.setState({persons: sorting})
        }
        else if (event.target.value === 'Sort ascending by age') {
            const sorting = this.state.persons;
            sorting.sort(function (a,b) {
                return getAge(a.personData.born) - getAge(b.personData.born)
            });
            this.setState({persons: sorting})
        }
        else if (event.target.value === 'Sort descending by age') {
            const sorting = this.state.persons;
            sorting.sort(function (a,b) {
                return getAge(a.personData.born) - getAge(b.personData.born)
            });
            sorting.reverse();
            this.setState({persons: sorting})
        }
    };

    render() {
        return (
            <div className={'Persons'}>
                <div className="card filters">
                    <div className="card-body">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Control as="select" onClick={this.sortByIdPlus}>
                                        <option>Sort ascending by id</option>
                                        <option>Sort descending by id</option>
                                        <option>Sort ascending by age</option>
                                        <option>Sort descending by age</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} controlId="search">
                                    <Form.Control type="text" placeholder="Enter Name or Surname" onChange={this.searchHandler} />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </div>
                </div>
                <div className="persons-list">
                    <div className={'card'}>
                        <div className={'card-header'}>
                            Persons List
                            <NavLink to={'/add'}><Button variant={'primary'}>Add new</Button></NavLink>
                        </div>
                        <div className={'card-body container-fluid'}>
                            <div className="row">
                                {this.state.persons.filter(this.searchingFor(this.state.term)).map((person, index) => {
                                    return (
                                        <Person
                                            className={'col-lg-3'}
                                            key={index+person}
                                            id={person.personId}
                                            personData={person.personData}
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Persons;