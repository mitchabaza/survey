import React, {Component, PropTypes} from "react";
import Question from "./Question";
import Results from "./Results";

class Survey extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {allowSubmit: false, questionSubmitted: false}
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this)
        this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
        this._allowSubmit = this._allowSubmit.bind(this);
    }

    handleAnswerSelected(answerValue) {

        this.setState({allowSubmit: true})
        this.setState({answer: answerValue})

    }

    handleSubmitAnswer() {
        this.setState({questionSubmitted: true})
        this.props.onAnswerSubmitted(this.props.question.id, this.state.answer)
    }

    _allowSubmit() {
        return this.state.allowSubmit && !this.state.questionSubmitted
    }

    render() {
        const {question, actions, surveyResults} = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-lg-4 col-lg-offset-4">
                        <Question disabled={this.state.questionSubmitted} key={question.id} text={question.text}
                                  answers={question.answers} onAnswerSelected={this.handleAnswerSelected}/>
                        <div className="p-a-1">
                            <button type="button" ref="button" style={{display:"none"}}
                                    className="btn btn-primary pull-lg-right">Try Again!
                            </button>
                            <button type="button" ref="button" onClick={this.handleSubmitAnswer}
                                    disabled={!this._allowSubmit()}
                                    className="btn btn-primary pull-lg-right">Submit Answer
                            </button>

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
    onAnswerSubmitted: PropTypes.func.isRequired,
    surveyResults: PropTypes.array.isRequired
}

export default Survey
