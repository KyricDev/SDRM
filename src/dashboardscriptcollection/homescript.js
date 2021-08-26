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