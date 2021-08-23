class NavigationLinks extends React.Component {
    render() {
        return(
            <div>
                <ul>
                    <li>Home</li>
                    <li>Add Goal</li>
                    <li>Delete Goal</li>
                    <li>Sign Out</li>
                </ul>
            </div>
        )
    }
}

class GoalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:{
            }
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
        return(
            <div>

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
            }
        };
    }
    componentDidMount(){
        fetch("https://localhost:5001/api/User/FindUser")
            .then(response => response.json())
            .then(info => {
                console.log(info);
                this.setState({data: info});
            })
    }
    render(){
        return(
            <div>
                <NavigationLinks />
                {this.state.data.username}
                <GoalContainer />
            </div>
        )
    }
}

ReactDOM.render(
    <DashboardRoot />,
    document.getElementById("root")
)