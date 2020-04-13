import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';
import {selectedOrderDelete, selectOrder, selectOrderClear} from "../../redux/actions/selectActions";
import {connect} from "react-redux";
import store from "../../redux/store";

const mapActionsToProps = dispatch => ({
    commenceSelectOrder: (order) => dispatch(selectOrder(order)),
    commenceSelectClear: () => dispatch(selectOrderClear()),
    commenceSelectDelete: (order) => dispatch(selectedOrderDelete(order)),
});



class ViewOrders extends Component {
    state = {
        orders: []
    };

    subscriptions = [];
    componentDidMount() {

        this.getOrders();
        this.subscriptions.push(
            store.subscribe( () => {
                const state = store.getState();
                if (state && state.selected.success) {
                    this.props.commenceSelectClear();
                    this.getOrders();
                }
            })
        )
    }

    getOrders() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    unsubscribe() {
        this.subscriptions.forEach( sub => sub())
    }


    goToEdit(order) {
        this.props.commenceSelectOrder({order});
        this.props.history.push("/edit-order");
    }

    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button onClick={ e => this.goToEdit(order)} className="btn btn-success">Edit</button>
                                     <button onClick={ e => this.props.commenceSelectDelete(order)} className="btn btn-danger">Delete</button>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default connect(null, mapActionsToProps)(ViewOrders);
