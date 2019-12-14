class Content extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }

    
    render() {
      return <div>
                <div id="sticky">
                    <div id="title">
                        <div style={{textAlign: 'right'}}>
                            <a href="/saved">Saved Articles</a>
                        </div>
                        <h1>MERN News Scraper</h1>
                        <h2>From NewsInLevels.com</h2>
                    </div>
                    <p id="about">This MERN app scrapes news articles from another website using jQuery load function and Axios, then displays the results below.</p>
                    <hr/>
                </div>
                <div id="content">
                    <div id="demo"></div>
                    <h2 id="info">Retrieving Content...</h2>
                    <div id="loader"></div>
                </div>
            </div>;
    }
}

ReactDOM.render(<Content/>, document.getElementById('root'));