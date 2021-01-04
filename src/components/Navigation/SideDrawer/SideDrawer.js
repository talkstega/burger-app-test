import React from 'react';

import Logo from '../../Logo/Logo';
import Navigations from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxilliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}> 
                    <Logo />
                </div>
                <nav>
                    <Navigations />
                </nav>
            </div>
        </Auxilliary>
    );
};

export default sideDrawer;