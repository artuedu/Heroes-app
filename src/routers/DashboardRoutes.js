import React from 'react';
import { Navbar } from '../Components/ui/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";
import { MarvelScreen } from '../Components/marvel/MarvelScreen';
import { HeroScreen } from '../Components/heroes/HeroScreen';
import { DcScreen } from '../Components/dc/DcScreen';
import { SearchScreen } from '../Components/search/SearchScreen';

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div className="container mt-2">
                <Switch>
                    <Route exact path="/search" component={SearchScreen} />
                    <Route exact path="/marvel" component={MarvelScreen} />
                    <Route exact path="/hero/:heroId" component={HeroScreen} />
                    <Route exact path="/dc" component={DcScreen} />
                    <Redirect to="/marvel" />
                </Switch>
            </div>

        </>
    )
}
