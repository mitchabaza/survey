"use strict"

import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Survey from "../components/Survey";
import * as Actions from "../actions";
import {answerQuestion, nextQuestion,answerSelected} from "../actions";
import Header from "../components/Header";
import "babel-polyfill";
class App extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(Actions.fetchQuestion());

    }

    handleNextQuestionClick() {

        this.props.dispatch(nextQuestion())

    }

    render() {
        const {question} = this.props;
        const {dispatch, surveyResults} = this.props
        return (

            <div>
                <Header/>
                <Survey question={question} surveyResults={surveyResults}
                        onNextQuestion={bindActionCreators(nextQuestion,this.props.dispatch)}
                        onAnswerSubmitted={bindActionCreators (answerQuestion, this.props.dispatch) }
                        onAnswerSelected={bindActionCreators (answerSelected, this.props.dispatch) }
                        pageState={this.props.pageState}/>

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
        surveyResults: state.surveyResults,
        pageState:state.pageState
    }
}


export default connect(mapStateToProps)(App)
