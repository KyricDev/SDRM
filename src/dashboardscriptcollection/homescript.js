export class GoalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[/*{
                content: "",
                id: "",
                isComplete: "",
                title: "",
                user: "",
                userID: ""
            }*/
            ]
            ,
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
            .then(data => console.log(data));
    }
    componentDidMount(){
        console.log("DidMount");        
        fetch("https://localhost:5001/api/RoadMapItem/GetRoadMapItems")
            .then(response => response.json())
            .then(data => {
                this.setState({list: data}, () => console.log(this.state.list));
        });
    }
    componentWillUnmount(){
        console.log("WillUnmount");
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("DidUpdate");
        console.log(this.state.list);
        console.log("props: " + this.props.isdeletegoal);
        console.log("state: " + this.state.isdeletegoal);
        console.log("prevProps :");
        console.log(prevProps)
        console.log("prevState :"); 
        console.log(prevState)
/*
        let newlist;

        fetch("https://localhost:5001/api/RoadMapItem/GetRoadMapItems")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(this.state.list);
                newlist = data;
            });
        
        if (this.state.list != newlist) {
            this.setState({list: newlist}, () => console.log(this.state.list) );
        }
/*
        if (this.state.isdeletegoal != this.props.isdeletegoal){
            this.setState({isdeletegoal: this.props.isdeletegoal}, () => console.log(this.state.isdeletegoal));
        }
*/
    }
    render() {
        let object = "";

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