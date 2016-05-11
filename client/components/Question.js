import React, {Component, PropTypes} from "react";

class Question extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleChange=this.handleChange.bind(this)
    }


    handleChange(e) {

        this.props.onAnswerSelected(e.target.value)
    }


    render() {
        return (
            <div>
                <div className="question">
                    {this.props.text}
                </div>
                {this.props.answers.map(answer =>
                    <div className="answer" key={answer.value}><input type="radio" onClick={this.handleChange} name="answer"
                                                   value={answer.value}/><span>{answer.text}</span></div>
                )}
            </div>
        )
    }
}

Question.propTypes = {
    text: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    onAnswerSelected: PropTypes.func.isRequired


}

export default Question