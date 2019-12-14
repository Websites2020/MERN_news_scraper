'use strict';

const e = React.createElement;

class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = { check: true, text: "Save", color: "btn btn-primary"};
    // this.updateCheck = this.updateCheck.bind(this)
  }

  render() {
    if (this.state.check) {
      this.state.text = "Save"
      this.state.color = "btn btn-primary"
      markSaved(this)
    } else if (!this.state.check) {
      this.state.text = "Saved"
      this.state.color = "btn btn-danger"
    }

    function updateCheck(btn) {
      this.setState(state => ({
        check: false
      }));
    }

    function markSaved(btn) {
      fetch('/find', {
        method: 'GET'
    })
    .then(r =>  r.json().then(data => ({status: r.status, body: data})))
    .then(function(obj) {
      console.log(obj.body)
    console.log(Object.keys(obj.body).length)
        for (var i=0; i<=Object.keys(obj.body).length; i++) {
            console.log("Saved: " + obj.body[i].article.link)
            console.log(ReactDOM.findDOMNode(btn).parentNode.parentNode.children[0].href)
            if (ReactDOM.findDOMNode(btn).parentNode.parentNode.children[0].href == obj.body[i].article.link) {
              btn.setState(state => ({
                check: false
              }));
              console.log(btn)
            }
          }
        })
    }

    function updateBtn(info) {
      info.setState(prevState => ({
        check: !prevState.check
      })
      )
    }

    function updateDB(btn, info) {
      if (btn.state.check) {
        console.log("ADDED")
        fetch('/update', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              href: info[0].href,
              title: info[0].innerText,
          })
      })
      } else if (!btn.state.check) {
        console.log("DELETED")
        fetch('/remove', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              href: info[0].href,
              title: info[0].innerText,
          })
      })
      }
      
    }

    return e(
      'button',
      { className: this.state.color, ref: this.myRef, onClick: () => {
        updateBtn(this)
        updateDB(this, ReactDOM.findDOMNode(this).parentNode.parentNode.children)
      } },
      this.state.text
    );
  }
}

const domContainer = document.querySelectorAll('.save_button_container').forEach(domContainer => {
ReactDOM.render(e(SaveButton), domContainer)
})

