import * as React from "react";

export default class Results extends React.Component {

    render() {
        const {surveyResults} = this.props;
        return <div  className="results">

            {surveyResults.map((r)=>
            <strong>{r.answer}</strong><span className="pull-right">{r.percentage}%</span><div className="progress progress-danger active"><div className="bar" style="width: 30%;"></div></div>}}
        </div>


}
Results.propTypes = {
    surveyResults: React.PropTypes.array.isRequired
}
