import React from 'react'
import {Route, Switch} from 'react-router-dom' // Switch делает так, что только один роут срабатывает

import {HomePage, CardPage} from '../pages'
import ShopHeader from "../ShopHeader";

import './app.css'

const App = () => {
    return (
        <main role='main' className='container'>
            <ShopHeader numItem={5} total={210}/>
            <Switch>
                <Route
                    path="/"
                    component={HomePage}
                    exact
                />

                <Route
                    path="/card"
                    component={CardPage}
                />
            </Switch>
        </main>
    )
};

export default App