import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import MainSection from "../components/MainSection"
import Header from "../components/Header"
class App extends Component {
  render() {
    const { questions, actions } = this.props
    return (
      <div>
        <Header/>
        <MainSection questions={questions}  actions={actions} />

      </div>
    )
  }
}

App.propTypes = {
  questions: PropTypes.array.isRequired

}

function mapStateToProps(state) {
  return {
      questions: state.questions

  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
