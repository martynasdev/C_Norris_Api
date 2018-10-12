import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class MainPage extends React.Component {

    render() {
        return (
            <div><OneWordQuery /> <BigButton /> <PickJoke /></div>
        )
    }
}

class PickJoke extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            selectJokeCategory: ''
        }

        this.selectJokeCategory();
    }

    selectJokeCategory = async () => {
        const kvieciuApi = await fetch(`https://api.chucknorris.io/jokes/categories`);
        const Response = await kvieciuApi.json();

        let data = [];
        for (let index = 0; index < Response.length; index++) {
            data.push(<option key={index}>{Response[index]}</option>);
        }

        this.setState({ categories: data });

    }

    handleChange(event) {
        this.setState({ category: event.target.value })
        console.log(this.state.category)

    }

    getJokeApi = async () => {
        const apiCall = await fetch(`https://api.chucknorris.io/jokes/random?category=${this.state.category}`);
        const Response = await apiCall.json();
        console.log(Response);
        this.setState({ joke: Response.value })
    }
    render() {
        return (
            <div className="PickJoke">
                <select onChange={event => this.handleChange(event)}>
                    {this.state.categories}>
                    {this.state.categories}
                </select>
                <button type="button" onClick={() => this.getJokeApi()}>select category</button>
                <div className="catJoke">{this.state.joke}</div>
            </div>
        )
    }
}

class BigButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            randomJoke: ''
        }
    }
    randomJoke = async () => {
        const kvieciuApi = await fetch(`https://api.chucknorris.io/jokes/random`);
        const Response = await kvieciuApi.json();
        this.setState({ randomJoke: Response.value })
    }
    render() {
        return (
            <div className="BigButton">
                <button type="button" onClick={() => this.randomJoke()}>random</button>
                <div className="randomJoke">{this.state.randomJoke}</div>
            </div>
        )
    }
}

class OneWordQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zodis: '',
            juokeliai: []
        };
    }

    keiciuState(event) {
        this.setState({ zodis: event.target.value })
        console.log(this.state.zodis)
    }

    gautiJuokeliaiIsApi = async () => {
        const kvieciuApi = await fetch(`https://api.chucknorris.io/jokes/search?query=${this.state.zodis}`);

        const Response = await kvieciuApi.json();
        console.log(Response)
        let juokeliaiFormuojami = [];
        for (let i = 0; i < Response.result.length; i++) {
            juokeliaiFormuojami.push(<li>{Response.result[i].value}</li>);
        }

        this.setState({ juokeliai: juokeliaiFormuojami })

    }

    render() {
        return (
            <div className="chuckNorris">
                <div className="title">
                    PLease enter a word
                </div>
                <div className="inputs">
                    <input type="text" value={this.state.zodis} placeholder="Exp.: Ocean" name="joke" onChange={event => this.keiciuState(event)} />
                    <button type="button" onClick={() => this.gautiJuokeliaiIsApi()}>search</button>
                </div>
                <div>{this.state.juokeliai}</div>
            </div>
        )
    }
}



ReactDOM.render(<MainPage />, document.getElementById('root'));
