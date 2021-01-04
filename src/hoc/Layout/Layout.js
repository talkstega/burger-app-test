import React, { Component } from 'react';

import Auxilliary from '../Auxilliary/Auxilliary';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false}); 
    }

    sideDrawerTogglenHandler = () => {
        this.setState(( prevState ) =>
        {
            return { showSideDrawer: !this.state.showSideDrawer };
        });
    }

    render() {
        return (
            <Auxilliary>
                <Toolbar drawerTogglerClicked={this.sideDrawerTogglenHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerCloseHandler}
                    />
                <main className={classes.Content}> 
                    {this.props.children}
                </main>
            </Auxilliary>
        )
    }
}
    
export default Layout;