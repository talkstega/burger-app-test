import React, {Component} from 'react';
import PropsTypes from 'prop-types';

import classes from './BurgerIngredient.css'

class BurgerIngredient extends Component {

    render () {
        let ingredient =null;

                switch(this.props.type){
                    case('bread-buttom'):
                        ingredient = <div className={classes.BreadBottom}></div>;
                        break;
                    case('bread-top'):
                        ingredient = (<div className={classes.BreadTop}>
                            <div className={classes.Seeds1}></div>
                            <div className={classes.Seeds2}></div>
                        </div>);
                        break;
                    case('meat'):
                        ingredient = <div className={classes.Meat}></div>;
                        break;
                    case('salad'):
                        ingredient = <div className={classes.Salad}></div>;
                        break;
                    case('bacon'):
                        ingredient = <div className={classes.Bacon}></div>;
                        break;
                    case('cheese'):
                        ingredient = <div className={classes.Cheese}></div>;
                        break;
                    
                    default:
                        ingredient = null;
                }
        return ingredient;
        }
}

BurgerIngredient.propsTypes = {
    type: PropsTypes.string.isRequired
};

export default BurgerIngredient;