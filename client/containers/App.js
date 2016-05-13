"use strict"

import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Survey from "../components/Survey";
import * as Actions from "../actions";
import {answerQuestion, tryAgain} from "../actions";

import Header from "../components/Header";
import "babel-polyfill";
class App extends Component {

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(Actions.fetchQuestion());

    }

    render() {
        const {question} = this.props;
        const {dispatch, surveyResults} = this.props
        var onAnswerSubmitted=bindActionCreators (answerQuestion, dispatch)
         
        return (

            <div>

                <Header/>
                <Survey question={question} surveyResults={surveyResults}   onAnswerSubmitted={onAnswerSubmitted}/>

            </div>

        )
    }
}

App.propTypes = {
    question: PropTypes.object.isRequired,
    surveyResults: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired


}

function mapStateToProps(state) {
    return {
        question: state.question,
        surveyResults: state.surveyResults
    }
}


export default connect(mapStateToProps)(App)
