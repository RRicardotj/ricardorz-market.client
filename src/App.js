import React, { Component } from 'react';

// Custom Components
import Scenes from 'scenes';
import Toolkit from 'utils/Toolkit';
import Loading from 'components/Loading';

// Services
import CostumerService from 'services/CustomerService';

// Styles
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasToken: localStorage.getItem('token') ? undefined : false,
    };
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  componentDidMount() {
    document.addEventListener('httpError', e => Toolkit.showNotification('error', 'Error', e.detail));
    document.addEventListener('httpSuccess', e => Toolkit.showNotification('success', 'Information', e.detail));
    document.addEventListener('apiOffline', e => Toolkit.showNotification('info', 'Desconected API', e.detail));
    document.addEventListener('httpInfo', e => Toolkit.showNotification('info', 'Information', e.detail));
    document.addEventListener('tokenError', () => {
      if (localStorage.token) {
        delete localStorage.token;
        Toolkit.showNotification('error', 'Finished session', 'Please, sign in again to continue.');
        this.setState({
          hasToken: false,
        });
      }
    });

    if (this.state.hasToken === undefined) {
      CostumerService.check()
        .then((response) => {
          this.setState({ hasToken: response.data.isValid });
          Toolkit.registerDialog(this.alertDialog);
        });
    }
  }

  isAuthenticated(isAuthenticated) {
    this.setState({ hasToken: isAuthenticated });
  }

  render() {
    if (this.state.hasToken === undefined) {
      return (
        <div className="App">
          <div className="App-loading">
            <Loading />
          </div>
        </div>
      );
    }
    return (
      <Scenes isAuthenticated={this.state.isAuthenticated} />
    );
  }
}

export default App;
