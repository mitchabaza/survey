"use strict"

import React, {Component, PropTypes} from "react";
import Question from "./Question";
import Results from "./Results";
export default class Survey extends Component {
    constructor(props, context) {
        super(props, context)

    }

    handleAnswerSelected = (answer) => {
        this.props.onAnswerSelected(answer);
    }

    handleSubmitAnswer = ()=> {

        this.props.onAnswerSubmitted(this.props.question.id, this.props.question.selectedAnswer)
    }


    _allowSubmit = ()=> {
        return this.props.pageState.allowSubmit && !this.props.pageState.questionSubmitted
    }

    render() {
        var self = this;
        const {question, surveyResults} = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3">
                        <Question disabled={this.props.pageState.questionSubmitted} key={question.id}
                                  text={question.text}
                                  answers={question.answers} onAnswerSelected={this.handleAnswerSelected}/>
                        <div className="p-a-1">

                            {!this.props.pageState.questionSubmitted ?
                                <button type="button" ref="button" onClick={this.handleSubmitAnswer}
                                        disabled={!this._allowSubmit()} className="btn btn-primary">Submit
                                    Answer</button> : null}

                            { this.props.pageState.questionSubmitted ? <button className="btn btn-secondary"
                                                                               onClick={this.props.onNextQuestion.bind(self, this.props.question.id)}>
                                Next Question</button> : null }

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
    pageState: PropTypes.object.isRequired,
    onAnswerSubmitted: PropTypes.func.isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    surveyResults: PropTypes.array.isRequired,
    onNextQuestion: PropTypes.func.isRequired
}


