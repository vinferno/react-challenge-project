import React, { Component } from 'react';
import { Template } from '../../components';
import { connect } from 'react-redux';
import { SERVER_IP } from '../../private';
import './orderForm.css';
import store from "../../redux/store";
import {editOrder, selectOrder, selectOrderClear} from "../../redux/actions/selectActions";

const ADD_ORDER_URL = `${SERVER_IP}/api/add-order`;
const mapStateToProps = (state) => ({
    auth: state.auth,
});
const mapActionsToProps = dispatch => ({
    commenceSelectClear: () => dispatch(selectOrderClear()),
    commenceSelectEdit: (order) => dispatch(editOrder(order)),
});

class OrderForm extends Component {
    subscriptions = [];
    constructor(props) {
        super(props);
        this.state = {
            order_item: "",
            quantity: "1",
            ...store.getState(),
        };
    }
    componentDidMount() {
        if (this.state.selected.order) {
            this.setState({
                order_item: this.state.selected.order.order_item,
                quantity: this.state.selected.order.quantity,
            });
        }

        this.subscriptions.push(
            store.subscribe( () => {
                this.props.history.push('/view-orders')
            })
        )
    }

    unsubscribe() {
        this.subscriptions.forEach( sub => sub())
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.props.commenceSelectClear();
    }

    menuItemChosen(event) {
        this.setState({ order_item: event.target.value });
    }

    menuQuantityChosen(event) {
        this.setState({ quantity: event.target.value });
    }

    submit(e) {
        this.state.selected.order ?
            this.editOrderSubmit(e) :
            this.submitOrder(e);
    }

    submitOrder(event) {
        event.preventDefault();
        if (this.state.order_item === "") return;
        fetch(ADD_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                order_item: this.state.order_item,
                quantity: this.state.quantity,
                ordered_by: this.props.auth.email || 'Unknown!',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Success", JSON.stringify(response)))
        .catch(error => console.error(error));
    }

    editOrderSubmit(event) {
        event.preventDefault();
        if (this.state.order_item === "") return;
        this.props.commenceSelectEdit({
            id: this.state.selected.order._id,
            order_item: this.state.order_item,
            quantity: this.state.quantity,
        });
    }

    render() {
        return (
            <Template>
                <div className="form-wrapper">
                    <form>
                        <label className="form-label">{!this.state.selected.order ? "I'd like to order..." : "On second thought..."}</label><br />
                        <select 
                            value={this.state.order_item} 
                            onChange={(event) => this.menuItemChosen(event)}
                            className="menu-select"
                        >
                            <option value="" defaultValue disabled hidden>Lunch menu</option>
                            <option value="Soup of the Day">Soup of the Day</option>
                            <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                            <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                            <option value="Chili Con Carne">Chili Con Carne</option>
                        </select><br />
                        <label className="qty-label">Qty:</label>
                        <select value={this.state.quantity} onChange={(event) => this.menuQuantityChosen(event)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                        <button type="button" className="order-btn" onClick={(event) => this.submit(event)}>{!this.state.selected.order ? 'Order It!' : 'Edit It!'}</button>
                    </form>
                </div>
            </Template>
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(OrderForm);
