import React, {Component} from 'react';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Col, Container, Row, Form, Button} from "react-bootstrap";
import Card from './Components/Card/Card';

class App extends Component {
    state = {
        cards: [
            {
                id: 0,
                name: 'первая',
                status: Math.floor(Math.random() * 2)
            },
            {
                id: 1,
                name: 'вторая',
                status: Math.floor(Math.random() * 2)
            },
            {
                id: 2,
                name: 'третья',
                status: Math.floor(Math.random() * 2)
            },
            {
                id: 3,
                name: 'четвертая',
                status: Math.floor(Math.random() * 2)
            },
            {
                id: 4,
                name: 'пятая',
                status: Math.floor(Math.random() * 2)
            },
            {
                id: 5,
                name: 'шестая',
                status: Math.floor(Math.random() * 2)
            },
            {
                id: 6,
                name: 'седьмая',
                status: Math.floor(Math.random() * 2)
            },
            {
                id: 7,
                name: 'восьмая',
                status: Math.floor(Math.random() * 2)
            },
            {
                id: 8,
                name: 'девятая',
                status: Math.floor(Math.random() * 2)
            },
            {
                id: 9,
                name: 'ten',
                status: Math.floor(Math.random() * 2)
            }
        ],
        value: ''
    };

    onInput = (event) => {
        const newName = event.target.value;
        this.setState({
            value: newName
        })
    };


    addNew = (event) => {
      event.preventDefault();
        const random = Math.floor(Math.random() * 2);
        this.setState(prevState =>({
            cards: [...prevState.cards, {id: (prevState.cards.length !== 0 ? prevState.cards[prevState.cards.length - 1].id + 1 : 0), name: prevState.value, status: random}],
            value: ''
        }))
    };

    deleteCard = (deleteIndex) => {
        const cards = this.state.cards.filter(card => card.id !== deleteIndex);
        this.setState({
            cards
        })

    };

    render() {
        return (
            <div className="App">
                <Container fluid>
                    <Row>
                        <h1 style={{padding: '2rem 2rem 0 2rem'}}>Лабараторная работа №2, Мария Беда</h1>
                        <Form>
                            <Form.Group controlId="newCard">
                                <Form.Label>Добавить новую карточку</Form.Label>
                                <Form.Control type="text" placeholder="Название карточки" onChange={this.onInput} value={this.state.value}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={this.addNew}>
                                Добавить
                            </Button>
                        </Form>
                    </Row>
                    <hr/>
                    <Row>
                            {  this.state.cards.map((card, index) => {
                                return(
                                    <Col key={index} lg={3} md={6} xs={12}>
                                        <Card
                                            id={card.id}
                                            name={card.name}
                                            status={card.status}
                                            deleteCard={() => this.deleteCard(card.id)}
                                        />
                                    </Col>
                                )
                            }) }
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;