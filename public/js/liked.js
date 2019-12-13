class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb = () => {
        fetch('/find')
        .then(data => data.json())
        .then(res => this.setState({ data: res }));
        // .then(r =>  r.json().then(data => ({status: r.status, body: data})))
        // .then(function(obj) {
        // console.log(obj.body)
        // this.setState({data: [obj.body] })
        // });
    };

  render() {
    // function getDataFromDb() {
    //     fetch('/find')
    //     .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    //     .then(function(obj) {
    //     console.log(obj.body)
    //     setState({data: obj.body })
    //     });
    // };

    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
      }
    console.log(this.state.data)
    console.log(this.state.data.map((number) => number._id))
    // getDataFromDb()

    return (
        this.state.data.map((number) =>
        <div key={number._id}>
            <h4><a href={number.article.link}>{number.article.title}</a><button style={{float: 'right'}} onClick={handleClick}>Remove</button></h4>
            <hr/>
        </div>
          )
    );

  }
}

      ReactDOM.render(
        <App />,
        document.getElementById('root')
      );