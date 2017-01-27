import React, { Component } from 'react';
import axios from 'axios';

export default class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      recentSorted: false,
      alltimeSorted: false,
      userSorted: false
    }
  }
  componentDidMount() {
    const url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    axios.get(url)
      .then(res => {
        this.setState({
          data: res.data
        })
      });
  }
  sortRecent() {
    var arr = this.state.data;
    this.setState({recentSorted: !this.state.recentSorted})
    if (!this.state.recentSorted) {
      arr.sort(function(a, b) {
        return a.recent - b.recent;
      });
    } else {
      arr.sort(function(a, b) {
        return b.recent - a.recent;
      });
    }
  }
  sortAlltime() {
    var arr = this.state.data;
    this.setState({alltimeSorted: !this.state.alltimeSorted})
    if (!this.state.alltimeSorted) {
      arr.sort(function(a, b) {
        return b.alltime - a.alltime;
      });
    } else {
      arr.sort(function(a, b) {
        return a.alltime - b.alltime;
      });
    }

  }
  userSort() {
    var arr = this.state.data;
    this.setState({userSorted: !this.state.userSorted})
    if (this.state.userSorted) {
      arr.sort(function(a, b) {
        var textA = a.username.toUpperCase();
        var textB = b.username.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    } else {
      arr.sort(function(a, b) {
        var textA = a.username.toUpperCase();
        var textB = b.username.toUpperCase();
        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
      });
    }
  }
  eachUser(user, i) {
      return (
          <tr key={i} index={i}>
            <td>{user.username}</td>
            <td>{user.alltime}</td>
            <td>{user.recent}</td>
          </tr>
      )
  }
  render() {
    if (this.state.data[0] === undefined) {
      return <div>loading</div>
    } else {
      return (
        <div>
        <table className="table">
          <thead>
            <tr>
              <th onClick={this.userSort.bind(this)}>Username</th>
              <th onClick={this.sortAlltime.bind(this)}>Alltime Score</th>
              <th onClick={this.sortRecent.bind(this)}>Recent Score</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(this.eachUser.bind(this))}
          </tbody>
        </table>

        </div>
      )
    }
  }
}
