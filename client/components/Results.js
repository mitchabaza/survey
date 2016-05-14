"use strict"
import * as React from "react";


export default class Results extends React.Component {
    render() {
        const {surveyResults} = this.props;
        if (surveyResults.length == 0) {
            return null;
        }
        return <div className="results">
            <div className="question">Survey Results</div>
            {surveyResults.map(result => {
                    var width = result.percentage + "%";
                    return <div key={result.answer}>{result.answer}
                        <div className="progress progress-warning">
                            <div className="bar" aria-valuenow={result.percentage} aria-valuemin="0"
                                 aria-valuemax="100" style={{width: width}}>
                                <span>{width}</span>
                            </div>
                        </div>
                    </div>
                }
            )}
        </div>
    }
}
Results.propTypes = {
    surveyResults: React.PropTypes.array.isRequired
}
