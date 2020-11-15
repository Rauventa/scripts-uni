import React, {useState, useEffect} from 'react';
import {Button, Input, Modal, Switch, Table} from "antd";
import axios from 'axios';
import {connect} from "react-redux";
import {renderShop} from "../../store/actions/shopActions";

const Shop = (props) => {

    const [addCheck, setAddCheck] = useState(false);
    const [name, setName] = useState('');
    const [count, setCount] = useState(null);
    // const [checked, setChecked] = useState();
    const [changeName, setChangeName] = useState('');
    const [changeCount, setChangeCount] = useState(null);
    const [modal, setModal] = useState(false);
    const [currentModal, setCurrentModal] = useState({});
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
                    <i className="far fa-edit" onClick={() => editModal(record)}/>
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

            setModal(false);

            props.renderShop();
        } catch (e) {
            console.log(e)
        }
    };

    const changeStatusHandler = async (id, status, name, count) => {
        try {

            await axios.put(`https://rauventa-scripts-exam.firebaseio.com/shop/${id}.json`, {
                count,
                name,
                status: !status
            });

            props.renderShop();
        } catch (e) {
            console.log(e)
        }
    };

    const closeModal = () => {
        setModal(false)
    };

    const editModal = (record) => {
        setModal(true);

        setCurrentModal(record);

        setChangeCount(record.count);

        setChangeName(record.name);
    };

  return (
      <div className={'Shop'}>

          {Object.keys(currentModal).length !== 0 ?
              <Modal
                  visible={modal}
                  onOk={closeModal}
                  onCancel={closeModal}
                  footer={[
                      <Button disabled={(changeName === '' || changeCount === '')}>Save changes</Button>,
                      <Button onClick={() => deleteShop(currentModal.id)}>Delete</Button>,
                      <Button onClick={closeModal}>Cancel</Button>
                  ]}
              >
                  <div className="modal">
                      <h1>Hello</h1>

                      <Input placeholder="Name" value={changeName} onChange={(e) => setChangeName(e.target.value)} />
                      <Input placeholder="Count" value={changeCount} onChange={(e) => setChangeCount(e.target.value)} />
                  </div>
              </Modal> : null
          }


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
                      rowClassName={(record, index) => record.status ? 'disabled' : 'active'}
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