import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomeTab from './HomeTab';
import Navigation from './Navigation';
import Board from './Board';
import './App.css';
import DraggableBoard from './DraggedBoard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }
  renderShippingRequests() {
    return (<DraggableBoard />);
  }

  renderNavigation() {
    return (<Navigation
      onClick={(tabName) => this.changeTab(tabName)}
      selectedTab={this.state.selectedTab}
      />);
  }

  renderTabContent() {
    switch(this.state.selectedTab) {
      case 'home':
      default:
        return HomeTab();
      case 'shipping-requests':
        return this.renderShippingRequests();
    }
  }
  render() {
    return (
      <div className="App">
        {this.renderNavigation()}

        <div className="App-body">
          {this.renderTabContent()}
        </div>
      </div>
    );
  }

  changeTab(tabName) {
    this.setState({
      selectedTab: tabName,
    });
  }
}

export default App;