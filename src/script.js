/*
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
            <div>
                <h1>Title: {this.state.content.title}</h1> 
                <h2>
                    Content: {this.state.content.content}
                </h2>
            </div>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById("root")
)
*/

export class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {field: "Default Field", value: ""};
        this.updateField = this.updateField.bind(this);
    }
    componentDidMount(){
        this.setState({field: this.props.field});
    }
    updateField(e){
        this.setState({value: e.target.value}, () => this.props.updateField(this.state.value));
    }
    render() {
        let field;

        if (this.state.field == "username"){
            field = "Username";
        }
        else if (this.state.field == "password"){
            field = "Password";
        }
        else if (this.state.field == "confirmpassword"){
            field = "Confirm Password";
        }

        return (
            <div>
                <label>{field}</label>
                <input type="text" name={field} onChange={this.updateField}></input>
                <p>{this.state.value}</p>
            </div>
        )
    }
}