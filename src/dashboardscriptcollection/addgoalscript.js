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
            <input type="text" placeholder="Enter Title" onChange={this.changeTitle}></input>
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
            <textarea row="5" column="150" placeholder="Enter Description" onChange={this.changeDescription}></textarea>
        )
    }
}

export class AddGoalContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
        };
        this.updateTitle = this.updateTitle.bind(this);
        this.updateDescription = this.updateDescription.bind(this);4
        this.submit = this.submit.bind(this);
    }
    updateTitle(e){
        this.setState({title: e});
    }
    updateDescription(e){
        this.setState({description: e});
    }
    submit(e){
        fetch("https://localhost:5001/api/User/AddRoadMapItem", {
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
            .then(data => console.log(data));
    }
    render(){
        return(
            <div>
                <GoalTitle title={this.updateTitle} />
                <br />
                <br />
                <GoalContent description={this.updateDescription} />
                <br />
                <button type="submit" onClick={this.submit}>Submit</button>
            </div>
    )
    }
}

