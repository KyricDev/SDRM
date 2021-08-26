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
                    <li>Delete Goal</li>
                    <li>Sign Out</li>
                </ul>
            </div>
        )
    }
}
/*
class GoalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[{
                content: "",
                id: "",
                isComplete: "",
                title: "",
                user: "",
                userID: ""
            }]
        };
    }
    componentDidMount(){
            fetch("https://localhost:5001/api/RoadMapItem/GetRoadMapItems")
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({list: data});
                })
    }
    render() {
        let object = this.state.list.map( (list) =>  
            <div key={list.id}>
                {list.id}
                <br />
                {list.title} 
                <br />
                {list.content}
                <br />
                <br />
            </div>
        );

        return(
            <div>
                Object: 
                {object}
            </div>
        )
    }
}
*/
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
        fetch("https://localhost:5001/api/User/FindUser")
            .then(response => response.json())
            .then(info => {
                console.log(info);
                this.setState({data: info});
            })
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
                        <GoalContainer />
                    </div>
                )
                break;  
            default:
                return(
                    <div>
                        You are in AddGoal
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