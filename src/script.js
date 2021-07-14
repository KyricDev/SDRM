class Root extends React.Component{
    render(){
        let content = fetch('https://localhost:5001/RoadMap/1').then(response => response.json());

        return(
            <h1>
                Title: {content.title}
            </h1>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById("root")
)