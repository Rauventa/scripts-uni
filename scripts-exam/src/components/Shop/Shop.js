import React, {useState, useEffect} from 'react';
import {Button, Input, Switch, Table} from "antd";
import axios from 'axios';
import {connect} from "react-redux";
import {renderShop} from "../../store/actions/shopActions";

const Shop = (props) => {

    const [addCheck, setAddCheck] = useState(false);
    const [name, setName] = useState('');
    const [count, setCount] = useState(null);
    const [styles, setStyles] = useState([]);

    // Осталось - редактирование, изменение цета карточки при статусе, свитчер статуса и рассположение купленых вверху таблицы (1.5 часа)

    useEffect(() => {
        props.renderShop()
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <Switch checkedChildren="Yes" unCheckedChildren="No " defaultChecked={record.status} onChange={() => changeStatusHandler(record.id, record.status, record.name, record.count)} />
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record) => (
                <div className={'column-actions'}>
                    <i className="far fa-edit"/>
                    <i className="fas fa-trash-alt" onClick={() => deleteShop(record.id)}/>
                </div>
            ),
        },
    ];

    const switchAddCheck = () => {
      setAddCheck(!addCheck)
    };

    const addNewShop = async () => {
        try {
            await axios.post('https://rauventa-scripts-exam.firebaseio.com/shop.json', {
                name: name,
                count: count,
                status: false
            })
        } catch (e) {
            console.log(e)
        }

        props.renderShop();

        setName('');
        setCount(null)
    };

    const deleteShop = async (id) => {
        try {
            await axios.delete(`https://rauventa-scripts-exam.firebaseio.com/shop/${id}.json`);

            props.renderShop();
        } catch (e) {
            console.log(e)
        }
    };

    const changeStatusHandler = async (id, status, name, count) => {
        try {

            const newStatus = !status;

            await axios.put(`https://rauventa-scripts-exam.firebaseio.com/shop/${id}.json`, {
                count,
                name,
                status: newStatus
            })
        } catch (e) {
            console.log(e)
        }
    };

  return (
      <div className={'Shop'}>

          <div className="Shop__header">
              <Button type={'primary'} onClick={switchAddCheck}>Add new item</Button>
          </div>

          {addCheck ?
              <div className="Shop__add">
                  <h2>Add new items in you shop</h2>
                  <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                  <Input placeholder="Count" value={count} type={'number'} onChange={e => setCount(e.target.value)} />

                  {(name === '') || (count === null) || (count === '') ?
                      <Button type={'primary'} disabled>Confirm</Button>
                      :
                      <Button type={'primary'} onClick={addNewShop}>Confirm</Button>
                  }
              </div> : null
          }

          <div className="Shop__content">
              {props.shop.length !== 0 ?
                  <Table
                      dataSource={props.shop}
                      columns={columns}
                  /> :
                  <h3>Your file is empty now</h3>
              }
          </div>
      </div>
  )
};

function mapStateToProps(state) {
    return {
        shop: state.shopReducer.shop
    }
}

function mapDispatchToProps(dispatch) {
    return {
        renderShop: () => dispatch(renderShop())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);