class Root extends React.Component{
    constructor(props){
        super(props);
        this.state = {content: ""};
    }

    componentDidMount(){
        fetch('https://localhost:5001/RoadMap/1')
        .then(response => response.json())
        .then(data => {
                this.setState({content: data});
                console.log("Starting log . . .");
                console.log(data);
                console.log(data.title);
                console.log("Ending log . . .");
            })
    }

    render(){
        return(
            <h1> 
                Title: {this.state.content.title}
            </h1>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById("root")
)