import { Switch, Route } from 'react-router-dom'
import { Clients } from './pages/Clients'
import { Home } from './pages/Home'

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Clients" component={Clients} />
    </Switch>
  )
}