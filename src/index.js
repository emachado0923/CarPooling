import React, { Component } from 'react';
import { Loading } from './Components/common';
import { connect } from 'react-redux';
import { loadJWT } from './redux/actions/services';
import AppNavigation from '../src/routes/index';

class Inicio extends Component {

  constructor() {
    super();
    this.state = {}
  }

  componentDidMount() {
    this.props.getJWT();
  }

  render() {
    if (this.props.loading) {
      return (
        <Loading size={'large'} />
      );
    } else if (!this.props.jwt) {
      return (
        <AppNavigation View='Auth' />
      );
    } else if (this.props.pass) {
      return <AppNavigation View='MyTabs' />
    } else if (this.props.jwt) {
      if (this.props.user.profile == "ninguno") {
        return <AppNavigation View='Auth' />
      } else {
        return <AppNavigation View='MyTabs' />
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    jwt: state.services.jwt,
    user: state.services.user,
    loading: state.services.stateLoading,
    pass: state.configRegister.pass
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getJWT: () => dispatch(loadJWT()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);