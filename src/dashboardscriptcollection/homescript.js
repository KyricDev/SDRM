import { siteRoot } from "/js/script.js";

export class GoalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[{
                content: "",
                newContent: "",
                id: "",
                isComplete: false,
                title: "",
                newTitle: "",
                user: "",
                userID: "",
                reveal: false,
                initialState: true,
                editState: false
            }]
        };
    }
    changeCompletedState(id, e){
        console.log("Change Completed State Id: " + id);

        fetch(siteRoot + "/api/RoadMapItem/ChangeRoadMapItemCompletedStatus", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                title: "",
                description: "",
                isComplete: false
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data == 200){
                    console.log("Successfully Modified Item");

                    let list = this.state.list;

                    list.map( l => {
                        if (l.id == id){
                            l.isComplete = !l.isComplete;
                        }
                    })

                    this.setState({list: list});
                }
                else{
                    console.log("Item Failed to be Modified");
                    console.log(data);
                }
            })
    }
    updateTitle(id, e){
        let list = this.state.list;

        list.map( l => {
            if (l.id == id){
                l.newTitle = e.target.value;
            }
        })

        this.setState({list: list});
    }
    updateContent(id, e){
        let list = this.state.list;

        list.map( l => {
            if (l.id == id){
                l.newContent = e.target.value;
            }
        })

        this.setState({list: list});
    }
    confirmEdit(id, e){
        console.log("Confirm Edit Id: " + id);

        let list = this.state.list;
        let goal = {};

        list.every( item => {
            if (item.id == id){
                goal = item;
                console.log("Logging Goal . . .");
                console.log(goal);
                return false;
            }
            return true;
        })

        fetch(siteRoot + "/api/RoadMapItem/UpdateRoadMapItem", {
            method: "Post", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: goal.id,
                title: goal.newTitle,
                description: goal.newContent,
                isComplete: goal.isComplete
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data == 200){
                list.map( l => {
                    if (l.id == id){
                        l.content = l.newContent;
                        l.title = l.newTitle;
                        l.editState = false;
                    }
                });

                this.setState({list: list});
            }
        });
    }
    editGoal(id, e){
        let list = this.state.list;

        list.map( l => {
            if (l.id == id){
                l.editState = !l.editState;
            }
        })

        this.setState({list: list});
    }
    revealGoal(id, e) {
        console.log(e.target.value);
        console.log(e);
        console.log(id);

        let list = this.state.list;

        list.map( l => {
            if (l.id == id) {
                l.reveal = !l.reveal;
                l.initialState = false;
            }
            else{
                l.reveal = false;
                l.editState = false;
            }
        })

        this.setState({list: list});
    }
    componentDidMount(){
        console.log("DidMount");
        
        fetch(siteRoot + "/api/RoadMapItem/GetRoadMapItems")
            .then(response => response.json())
            .then(data => {

                var goals = [];

                data.forEach( element => {
                    var goal = new Object();

                    goal.content = element.content;
                    goal.newContent = element.content;
                    goal.id = element.id;
                    goal.isComplete = element.isComplete;
                    goal.title = element.title;
                    goal.newTitle = element.title;
                    goal.user = element.user;
                    goal.userID = element.userID;
                    goal.reveal = false;
                    goal.initialState = true;
                    goal.editState = false;

                    goals.push(goal);
                })

                this.setState({list: goals});
            });
    }
    componentWillUnmount(){
    }
    componentDidUpdate(){
    }
    render() {
        let object = "";
        
        console.log("Render:");
        console.log(this.state.list);

            object = this.state.list.map( (list) => { 
                        let goalState = list.isComplete ? 
                                        <div className="goal-complete-status" key={list.id} onClick={this.changeCompletedState.bind(this, list.id)}>
                                            <svg width="33" height="33" viewBox="0 0 33 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="8.80005" y="30.7999" width="31.1128" height="3.11128" transform="rotate(-45 8.80005 30.7999)" fill="#2BA700"/>
                                                <rect x="0.000610352" y="21.9994" width="3.11128" height="15.5564" transform="rotate(-45 0.000610352 21.9994)" fill="#2BA700"/>
                                            </svg>
                                        </div>  : 
                                        <div className="goal-complete-status" key={list.id} onClick={this.changeCompletedState.bind(this, list.id)}>
                                            <svg width="32" height="7" viewBox="0 0 32 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.7003 3.20004C18.7003 4.69124 17.4914 5.90009 16.0002 5.90009C14.509 5.90009 13.3002 4.69124 13.3002 3.20004C13.3002 1.70885 14.509 0.5 16.0002 0.5C17.4914 0.5 18.7003 1.70885 18.7003 3.20004Z" fill="white" stroke="black"/>
                                                <path d="M31.5002 3.20004C31.5002 4.69124 30.2913 5.90009 28.8001 5.90009C27.3089 5.90009 26.1001 4.69124 26.1001 3.20004C26.1001 1.70885 27.3089 0.5 28.8001 0.5C30.2913 0.5 31.5002 1.70885 31.5002 3.20004Z" fill="white" stroke="black"/>
                                                <path d="M5.90009 3.20004C5.90009 4.69124 4.69124 5.90009 3.20004 5.90009C1.70885 5.90009 0.5 4.69124 0.5 3.20004C0.5 1.70885 1.70885 0.5 3.20004 0.5C4.69124 0.5 5.90009 1.70885 5.90009 3.20004Z" fill="white" stroke="black"/>
                                            </svg>
                                        </div>;
                        
                        let goalContent = list.reveal ? 
                                          list.editState ?
                                          <div className="goal-container" key={list.id}>
                                                <div className="goal-title-container remove-margin">
                                                    <input type="text" className="edit-goal-title" onChange={this.updateTitle.bind(this, list.id)} value={list.newTitle} ></input>
                                                    {goalState}
                                                </div>
                                                <div className="add-goal-content-outline outline-animate-in"></div> 
                                                <div className="add-goal-content outline-animate-in">
                                                    <textarea value={list.newContent} row="5" column="150" className="edit-goal-content" onChange={this.updateContent.bind(this, list.id)}></textarea>
                                                    <div className="button-container-edit">
                                                        <button onClick={this.confirmEdit.bind(this, list.id)} className="button">Confirm</button>
                                                        <button onClick={this.editGoal.bind(this, list.id)} className="button">Cancel</button>
                                                    </div>
                                                </div>
                                          </div>  : 
                                          <div className="goal-container" key={list.id}>
                                                <div className="goal-title-container remove-margin">
                                                    <div className="goal-title" onClick={this.revealGoal.bind(this, list.id)}>{list.title}</div>
                                                    {goalState}
                                                </div>
                                                <div className="add-goal-content-outline outline-animate-in"></div> 
                                                <div className="add-goal-content outline-animate-in">
                                                    <p className="content">{list.content}</p>
                                                    <div className="button-container-edit">
                                                        <button onClick={this.editGoal.bind(this, list.id)} className="button">Edit</button>
                                                    </div>
                                                </div>
                                          </div>  : 
                                          list.initialState ?
                                          <div className="goal-container" key={list.id}>
                                                <div className="goal-title-container">
                                                    <div className="goal-title" onClick={this.revealGoal.bind(this, list.id)}>{list.title}</div>
                                                    {goalState}
                                                </div>
                                          </div>    :  
                                          <div className="goal-container" key={list.id}>
                                                <div className="goal-title-container">
                                                    <div className="goal-title" onClick={this.revealGoal.bind(this, list.id)}>{list.title}</div>
                                                    {goalState}
                                                </div>
                                                <div className="add-goal-content-outline outline-animate-out"></div> 
                                                <div className="add-goal-content content-animate-out"></div>
                                          </div>
                                          ;
                        return(
                            <div>
                                {goalContent}
                            </div>
                        )
            })
        

        return(
            <div className="goals">
                <div className="goal-list-container">
                    {object}
                </div>
            </div>
        )
    }
}