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
        fetch("https://localhost:5001/User/FindUser")
            .then(response => response.json())
            .then(info => {
                console.log(info);
                this.setState({data: info});
            } 
            )
            .then(() =>{
                fetch("https://localhost:5001/User/AddRoadMapItem")
            })
    }
    render(){
        return(
            <div>
                {this.state.data.username}
            </div>
        )
    }
}

ReactDOM.render(
    <DashboardRoot />,
    document.getElementById("root")
)