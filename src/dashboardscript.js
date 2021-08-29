import {GoalContainer} from "/dashboardscriptcollection/homescript.js";
import {AddGoalContainer} from "/dashboardscriptcollection/addgoalscript.js";

class NavigationLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: 0
        };
        this.changeNavigation = this.changeNavigation.bind(this);
    }
    changeNavigation(e){
        this.setState({navigation: e.target.value}, () => {
            this.props.navigation(this.state.navigation);
        });
    }
    render() {
        return(
            <div>
                <ul>
                    <li onClick={this.changeNavigation} value={0}>Home</li>
                    <li onClick={this.changeNavigation} value={1}>Add Goal</li>
                    <li onClick={this.changeNavigation} value={2}>Delete Goal</li>
                    <li>Sign Out</li>
                </ul>
            </div>
        )
    }
}

class DashboardRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: ""
            },
            navigation: 0
        };
        this.changeNavigation = this.changeNavigation.bind(this);
    }
    componentDidMount(){
        console.log("Dashboard DidMount");

        fetch("https://localhost:5001/api/User/FindUser")
            .then(response => response.json())
            .then(info => {
                console.log(info);
                this.setState({data: info});
            });
    }
    componentDidUpdate(){
        console.log("Dashboard DidUpdate");
    }
    changeNavigation(e){
        this.setState({navigation: e});
    }
    render(){
        let navigation = this.state.navigation;
        
        switch(navigation){
            case 0:
                return(
                    <div>
                        You are in Home
                        <NavigationLinks navigation={this.changeNavigation} />
                        {this.state.data.username}
                        <GoalContainer isdeletegoal={false} />
                    </div>
                )
                break;
            case 1:
                return(
                    <div>
                        You are in AddGoal
                        <NavigationLinks navigation={this.changeNavigation} />
                        {this.state.data.username}
                        <AddGoalContainer />
                    </div>
                )
                break;
            case 2:
                return(
                    <div>
                        You are in DeleteGoal
                        <NavigationLinks navigation={this.changeNavigation} />
                        {this.state.data.username}
                        <GoalContainer isdeletegoal={true} />
                    </div>
                )   
                break;
            default:
                return(
                    <div>
                        Wrong Navigation!
                        <NavigationLinks navigation={this.changeNavigation} />
                        {this.state.data.username}
                        <AddGoalContainer />
                    </div>
                )
                break;  
        }
    }
}

ReactDOM.render(
    <DashboardRoot />,
    document.getElementById("root")
)