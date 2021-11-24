import { siteRoot } from "/js/script.js";

class GoalTitle extends React.Component {
    constructor(props) {
        super(props);
        this.changeTitle = this.changeTitle.bind(this);
    }
    changeTitle(e) {
        this.props.title(e.target.value);
    }
    render(){
        return(
            <div className="add-goal-title-container">
                <input className="add-goal-title" type="text" placeholder="Enter Title" onChange={this.changeTitle}></input>
            </div>
        )
    }
}

class GoalContent extends React.Component {
    constructor(props){
        super(props);
        this.changeDescription = this.changeDescription.bind(this);
    }
    changeDescription(e){
        this.props.description(e.target.value);
    }
    render(){
        return(
            <div className="add-goal-content-container">
                <textarea className="add-goal-content" row="5" column="150" placeholder="Enter Description" onChange={this.changeDescription}></textarea>
            </div>
        )
    }
}

export class AddGoalContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            status: 0 
        };
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);4
        this.submit = this.submit.bind(this);
    }
    updateTitle(e){
        this.setState({title: e, status: 0});
    }
    updateDescription(e){
        this.setState({description: e, status: 0});
    }
    submit(e){
        fetch(siteRoot + "/api/RoadMapItem/AddRoadMapItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description
            })
        })
            .then(response => response.json())
            .then(data => {
                this.setState({status: data});
            });
    }
    render(){
        let status = this.state.status == 200 ?
                        <div className="status">
                            {"Goal Added" + " " + this.state.title}
                        </div>
                        :
                        <div className="placeholder-margin">
                            {" "}
                        </div>

        return(
            <div className="add-goal-container">
                <GoalTitle title={this.updateTitle} />
                <div className="add-goal-content-outline"></div>
                <GoalContent description={this.updateDescription} />
                {status}
                <button className="add-goal-submit" type="submit" onClick={this.submit}>Submit</button>
            </div>
    )
    }
}

