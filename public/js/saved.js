class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getDataFromDb();
    }

    getDataFromDb = () => {
        fetch('/find')
        .then(data => data.json())
        .then(res => this.setState({ data: res }));
        
    };

    handleClick(e, info) {
        // e.preventDefault();
        console.log(info);
        fetch('/remove', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                href: info.link,
                title: info.title,
            })
        }).then((res) => {
            console.log("removed")
            this.getDataFromDb()
        })
      }

  render() {

    return (
        <div>
            <h1 style={{textAlign: 'left'}}>Saved Articles
                    <a className="pageLink" style={{float: 'right'}} href="/">Articles</a>

            </h1>
            <br/>
            {this.state.data.map((number) =>
            <div key={number._id}>
                <h4><a href={number.article.link}>{number.article.title}</a><button style={{float: 'right'}} onClick={(e) => this.handleClick(e, number.article)}>Remove</button></h4>
                <hr/>
            </div>
            )}
        </div>
    );
    }
}


      ReactDOM.render(
        <App />,
        document.getElementById('root')
      );