import React, { Component } from 'react';
import Search from './Search'
import Card from './Card'

// this is the entire App
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage:null,
      spinner: 'Loading...',
      value: '',
      selected: [],
      all: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteCountry = this.deleteCountry.bind(this);
  }

  render() {
      return (
          <div>
            <header>
              <h1>Corona Tracker</h1>
              <h3>Search for a country below to see the latest COVID-19 statistics.</h3>
              <h3>Try adding more than one country and scroll to compare!</h3>
          </header>
          <Search find={{findCountry: this.findCountry, 
            handleChange: this.handleChange, 
            handleSubmit: this.handleSubmit,
            value: this.state.value,
            }} />
          <Card selected={this.state.selected} err={this.state.errorMessage} delete={this.deleteCountry}/>
          </div>
      )
  }

  deleteCountry(event){

      const newSelected = this.state.selected.filter(el => el.Country !== event.target.id);
      this.setState({selected: newSelected});
  }
  
  findCountry(countryName){
    const pre = countryName.toLowerCase();
    const capitalizedCountry = pre.charAt(0).toUpperCase() + pre.slice(1)

    const country = this.state.all.find(e => capitalizedCountry === e.Country);
    
    if(capitalizedCountry==='Scotland'){
      this.setState({errorMessage: 'Unfortunately, Scotland could not be found as the WHO does not count it as a country. Try United Kingdom!'})

      return;
    }

    this.setState({errorMessage: null})

    if(country===undefined){
      this.setState({errorMessage: 'Selected country could not be found. Please check your spelling!'})

      return;
    }
    const selectedCountry = { 
      Country: country.Country, 
      Confirmed: country.TotalConfirmed, 
      Deaths: country.TotalDeaths,
      Recovered: country.TotalRecovered,
      Date: country.Date
    
    }
    
    if(!this.state.selected.find(el=>el.Country===selectedCountry.Country)){
      this.setState({selected: [...this.state.selected, selectedCountry]});
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.findCountry(this.state.value);
    this.setState({value: ''})
  }
  
  componentDidMount() {
    fetch('https://api.covid19api.com/summary')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            all: result.Countries
          })
        }, (err)=>{
          console.log(err)
          return 1
        }
      );
  }
}

export default App;
