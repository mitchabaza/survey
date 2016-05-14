"use strict"

import React, {Component, PropTypes} from "react";
import Question from "./Question";
import Results from "./Results";
class Survey extends Component {
    constructor(props, context) {
        super(props, context)

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this)
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
        this.handleTryAgain = this.handleTryAgain.bind(this);
        this._allowSubmit = this._allowSubmit.bind(this);
    }

    handleAnswerSelected(answerValue) {


        this.setState({answer: answerValue})
        this.props.onAnswerSelected();
    }

    handleSubmitAnswer() {

        this.props.onAnswerSubmitted(this.props.question.id, this.state.answer)
    }

    handleTryAgain() {
        this.props.onTryAgain()
    }

    _allowSubmit() {
        return this.props.pageState.allowSubmit && !this.props.pageState.questionSubmitted
    }

    render() {

        console.log(this.props.pageState)
        const {question, surveyResults} = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3">
                        <Question disabled={this.props.pageState.questionSubmitted} key={question.id} text={question.text}
                                  answers={question.answers} onAnswerSelected={this.handleAnswerSelected}/>
                        <div className="p-a-1">

                        {!this.props.pageState.questionSubmitted ? <button type="button" ref="button" onClick={this.handleSubmitAnswer} disabled={!this._allowSubmit()}className="btn btn-primary">Submit Answer</button> : null}

                        { this.props.pageState.questionSubmitted ? <button className="btn btn-secondary" onClick={this.props.onTryAgain}>Try Again?</button> : null }

                        </div>

                        <Results surveyResults={surveyResults}/>

                    </div>
                </div>
            </div>
        )
    }
}

Survey.propTypes = {
    question: PropTypes.object.isRequired,
    pageState:PropTypes.object.isRequired,
    onAnswerSubmitted: PropTypes.func.isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    surveyResults: PropTypes.array.isRequired
}

export default Survey
