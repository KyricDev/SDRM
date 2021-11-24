import { siteRoot } from "/js/script.js";

export class DeleteGoalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[{
                content: "",
                id: "",
                isComplete: false,
                title: "",
                user: "",
                userID: "",
                reveal: false,
                initialState: true,
                deleteState: false
            }]
        };
        this.setDelete = this.setDelete.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
    }
    componentDidMount(){
        fetch(siteRoot + "/api/RoadMapItem/GetRoadMapItems")
            .then(response => response.json())
            .then(data => this.setState({list: data }));
    }
    setDelete(id, e){
        let list = this.state.list;

        list.map( list => {
            if (list.id == id){
                list.deleteState = !list.deleteState;
            }
        })

        this.setState({list: list});
    }
    confirmDelete(e){
        let list = this.state.list;
        let deleteList = [];

        list.forEach( list => {
            if (list.deleteState){
                deleteList.push(list.id);
            }
        })

        fetch(siteRoot + "/api/RoadMapItem/DeleteMultipleRoadMapItems", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                itemIDs: deleteList
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data == 200){
                    console.log("Successfully Deleted Items");

                    fetch (siteRoot + "/api/RoadMapItem/GetRoadMapItems")
                        .then(response => response.json())
                        .then(data => this.setState({list: data}));
                }
                else{
                    console.log("Items Failed to be Deleted");
                }
            })
    }
    cancelDelete(e){
        let list = this.state.list;

        list.map( list => {
            list.deleteState = false;
        })

        this.setState({list: list});
    }
    render() {
        let object = this.state.list.map( (list) => { 
            let isFaded = list.deleteState ?
                          "fade" : 
                          "" ;

            return(
            <div className="goal-container" key={list.id}>
                <div className={"goal-title-container" + " " + isFaded}>
                    <div className="goal-title remove-hover">{list.title}</div>
                    <div className="goal-complete-status" onClick={this.setDelete.bind(this, list.id)}>
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.01996 35.9637C6.24908 35.8635 5.49007 35.4953 4.90047 34.9354C4.28969 34.3555 3.90894 33.668 3.7377 32.8359L3.65987 32.4577L3.68641 21.2894C3.70101 15.1469 3.70059 9.54719 3.68548 8.84567L3.65799 7.57018L2.12495 7.55985L0.591908 7.54952L0.412065 7.43833C-0.0655379 7.14307 -0.14138 6.49692 0.255051 6.10063C0.532258 5.82352 0.113587 5.84121 6.3927 5.84121H12.0089V4.4111C12.0089 3.60969 12.026 2.85465 12.0478 2.69361C12.0967 2.33289 12.29 1.75741 12.4536 1.48562C12.9734 0.622112 13.8817 0.133324 15.1459 0.0369198C15.4115 0.0166632 16.8298 4.98028e-05 18.2976 6.44011e-07C21.0935 -9.28357e-05 21.297 0.00977856 21.7739 0.168618C22.8461 0.525726 23.5912 1.43713 23.8585 2.7185C23.944 3.1284 24.0075 4.31592 23.9544 4.51289C23.8626 4.85364 23.5 5.11895 23.126 5.11895C22.8547 5.11895 22.6543 5.02427 22.47 4.80904C22.3078 4.61959 22.2732 4.46317 22.2269 3.71042C22.2077 3.39723 22.1656 3.0418 22.1335 2.92056C21.9912 2.38345 21.7296 2.0335 21.3338 1.85074L21.1047 1.74495H18.0911C14.9311 1.74495 14.9413 1.74448 14.4948 1.91147C14.2135 2.01667 13.9579 2.26889 13.8429 2.55457C13.7555 2.77174 13.7547 2.7867 13.7436 4.30741L13.7324 5.84121H24.4772C36.4779 5.84121 35.4585 5.81723 35.7448 6.10629C35.9838 6.34761 36.0605 6.67275 35.9513 6.98212C35.8687 7.21596 35.7386 7.36491 35.5232 7.47224L35.3312 7.56789H20.3415H5.35179L5.3717 7.90771C5.41247 8.60343 5.43257 19.7388 5.40401 25.8082C5.38775 29.2634 5.38682 32.197 5.40198 32.3273C5.46246 32.8486 5.74643 33.3973 6.13193 33.7376C6.37357 33.9509 6.84024 34.183 7.13945 34.2386C7.29927 34.2682 10.3283 34.2765 18.1463 34.2687L28.9326 34.2579L29.1577 34.1734C29.7956 33.934 30.2795 33.435 30.5247 32.7639L30.6232 32.4944L30.6416 21.6172L30.6599 10.7399L30.7712 10.5601C30.8401 10.4486 30.9508 10.338 31.0623 10.2691C31.2186 10.1724 31.2766 10.1579 31.5052 10.1579C31.7338 10.1579 31.7917 10.1724 31.9481 10.2691C32.0596 10.338 32.1703 10.4486 32.2392 10.5601L32.3505 10.7399L32.3615 21.4519C32.3696 29.369 32.3614 32.2548 32.3301 32.5126C32.1473 34.0188 31.1595 35.2732 29.7635 35.772C29.0779 36.017 29.8105 36.0029 17.9809 35.998C12.0787 35.9956 7.1463 35.9801 7.01996 35.9637ZM13.4973 29.0632C13.2412 28.9977 13.038 28.8328 12.9043 28.5819C12.8382 28.4577 12.8358 28.2163 12.8358 21.5988V14.7444L12.947 14.5645C13.3107 13.9765 14.1689 14.0184 14.4577 14.6384L14.544 14.8236L14.5441 21.5833C14.5442 26.2366 14.5321 28.3868 14.5053 28.4834C14.4582 28.6529 14.2492 28.893 14.0686 28.9852C13.9097 29.0662 13.6484 29.1019 13.4973 29.0632ZM22.0423 29.0242C21.9105 28.9787 21.7936 28.9042 21.7045 28.8087C21.4343 28.5192 21.4517 29.0429 21.4625 21.5263C21.4719 14.9927 21.4743 14.7826 21.5419 14.6465C21.8692 13.9878 22.788 13.98 23.1044 14.6332L23.1811 14.7917V21.6061V28.4205L23.0874 28.6084C22.9744 28.8352 22.7898 28.9839 22.5414 29.0483C22.3067 29.1091 22.2854 29.1081 22.0423 29.0242Z" fill="#FF2A2A"/>
                        </svg>
                    </div>
                </div>
            </div>
            )
        })
        return(
            <div className="goals">
                <div className="goal-list-container">
                    {object}
                </div>
                <div className="button-container">
                    <button onClick={this.confirmDelete} className="button">Confirm</button>
                    <button onClick={this.cancelDelete} className="button">Cancel</button>
                </div>
                <div className="space">
                </div>
            </div>
        )
    }
}