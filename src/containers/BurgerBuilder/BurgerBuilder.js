import React, { Component } from 'react';

import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    // constructor (props){
    //     super(props);
    //     this.state ={...}
    // }

    state={
        ingredients:null,
        totalPrice: 15,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount = () => {
        axios.get('https://burger-app-8d243.firebaseio.com/ingredients.json')
        .then( response => {
            this.setState({ingredients: response.data});
        }).catch(error => {
            this.setState({error: true});
        });
    }

    updatePurchaseState ( ingredients ){
        // const ingredients ={
        //     ...this.state.ingredients
        // };
        const sum1 = Object.keys( ingredients )
        .map( igKey => {
            return ingredients[igKey];
        })
        .reduce((sum1, el) => {
            return sum1 + el;
        }, 0);

        this.setState( { purchaseable: sum1 > 0 } );
        console.log(sum1);

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
       // alert('You continued!');
      // this.setState({loading: true});
       //const order = {
         //  ingredients: this.state.ingredients,
           //price: this.state.totalPrice,
           //customer: {
             //  name: 'Udeh Obeya',
               //address:{
               //zipCode: '234',
               //street: 'Test street',
               //country: 'Nigeria'
            //},
            ///email: 'sundayudehobeya@gmail.com',
            //mobile: '07036105900'
           //},
           //deliveryMethod: 'fastest'
       //}

       //axios.post('/orders.json', order)
       //.then(response => {
         //  this.setState({ loading: false, purchasing: false });
       //})
       //.catch(error => {
        //this.setState({ loading: false });
        //});
        const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&'); 
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p><strong>Ingredients can't be loaded!</strong></p>:<Spinner />;
        if (this.state.ingredients){
                burger = (
                <Auxilliary>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls 
                        ingredientsAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disableInfo}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchasingHandler}/>
                    </Auxilliary>);

                orderSummary = <OrderSummary ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;

        }

        if(this.state.loading){
            orderSummary = <Spinner />;
        }
       
        return(
            <Auxilliary>
                <Modal  show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilliary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);