import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import MainSection from "../components/MainSection";
import * as Actions from "../actions";
import Header from "../components/Header";
import "babel-polyfill";
class App extends Component {

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(Actions.fetchQuestion());

    }

    render() {
        const {actions, question} = this.props;
        return (
            <div>
                <Header/>
                <MainSection question={question} actions={Actions}/>

            </div>
        )
    }
}

App.propTypes = {
    question: PropTypes.object.isRequired,
    surveyResults: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired

}

function mapStateToProps(state) {
    return {
        question: state.question,
        surveyResults: state.surveyResults
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)

    }
}

export default connect(mapStateToProps)(App)
