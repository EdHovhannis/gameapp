import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Nav from './includes/Nav/Nav';
import Admin from './includes/Admin/Admin';
import Participant from './includes/Participant/Participant';
import Create from './includes/Create/Create';
import Details from './includes/Details/Details';
import GameTeams from './includes/GameTeams/GameTeams';
import Gaming from './includes/Gaming/Gaming';

function App() {

  return (
    <>
     <Switch>
        <Route exact path="/" component={Nav} />
        <Route path="/admin/create" component={Create} />
        <Route path="/admin" component={Admin} />
        <Route path="/participant" component={Participant} />
        <Route path="/admin_gamedetails/:key?" component={Details} />
        <Route path="/participant_gamedetails/:key?" component={GameTeams} />
        <Route path="/team_game/:key?" component={Gaming} />
        <Redirect to="/" />
     </Switch> 
    </>
  );

}

export default App;
