export class GoalContainer extends React.Component {
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
            }],
            isdeletegoal: false
        };
    }
    deleteGoal(id, e) {
        fetch("https://localhost:5001/api/RoadMapItem/DeleteRoadMapItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
                .then(() => {
                    fetch("https://localhost:5001/api/RoadMapItem/GetRoadMapItems")
                        .then(response => response.json())
                        .then(data => {
                            console.log("Data:");
                            console.log(data);
                            this.setState({list: data}, () => console.log(this.state.list));
                        });
                });
    }
    componentDidMount(){
        console.log("DidMount");

        fetch("https://localhost:5001/api/RoadMapItem/GetRoadMapItems")
            .then(response => response.json())
            .then(data => this.setState({list: data}));

        console.log(this.state.list);
    }
    componentWillUnmount(){
        console.log("WillUnmount");
        console.log(this.state.list);
    }
    componentDidUpdate() {
        console.log("DidUpdate");
    }
    render() {
        let object = "";
        
        console.log("Render:");
        console.log(this.state.list);

        if (this.props.isdeletegoal){
            object = this.state.list.map( (list) =>  
                        <div key={list.id}>
                            {list.id} <div onClick={this.deleteGoal.bind(this, list.id)}>Delete</div>
                            <br />
                            {list.title} 
                            <br />
                            {list.content}
                            <br />
                            <br />
                        </div>
            )    
        }
        else{
            object = this.state.list.map( (list) =>  
                        <div key={list.id}>
                            {list.id}
                            <br />
                            {list.title} 
                            <br />
                            {list.content}
                            <br />
                            <br />
                        </div>
            )
        }

        return(
            <div>
                Objects: 
                {object}
            </div>
        )
    }
}