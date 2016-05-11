import React, {Component, PropTypes} from "react";
import Question from "./Question";


class MainSection extends Component {
    constructor(props, context) {
        super(props, context)

        this.state =  {allowSubmit:false}
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this)
    }

    handleAnswerSelected() {

        this.setState({allowSubmit: true})

    }

    componentDidMount() {

        setTimeout(this.props.actions.displayQuestion, 1000)
    }

    render() {

        const {questions, actions} = this.props
        return (
            <div className="row">
                <div className="col-lg-4 col-lg-offset-4">

                    {questions.map(question =>
                        <Question key={question.id} text={question.text} answers={question.answers}
                                  onAnswerSelected={this.handleAnswerSelected}/>
                    )}
                   <button type="button" onClick={this.props.actions.answerQuestion} disabled={!this.state.allowSubmit}  className="btn btn-primary pull-lg-right">Submit Answer</button>

                </div>
            </div>

        )
    }
}

MainSection.propTypes = {
    questions: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

export default MainSection
