import React from 'react';
import NavBar from '../components/common/NavBar';
import ProviderGrid from '../components/ProviderGrid';
import NewProvider from '../components/NewProvider';
import ApiService from '../utils/apiService';
import jsonGet from '../utils/utils.js';
import LoadingScreen from '../components/common/LoadingScreen';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: [],
      data: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers)
      .then(({data}) => {
        this.setState({
          isLoading: false,
          data,
          initialData: data,
        });
      });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }

  filterProviders = (event) => {
    // TASK 2:
    // On input, filter Available Providers based on Name, Address and Type
    // P.s the JSON search function you created in utils
    // can come in handy here ;)
    // i.e jsonGet(json, 'location.address') to get the address
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    if (event.target.value === '') {
      return this.setState({
        data: this.state.initialData
      })
    }

    console.log(this.state.data);
    const newData = [...this.state.initialData];
    const value = event.target.value;
    const filteredResults = newData.filter((entry) => {
      return (jsonGet(entry, 'name').includes(value) || jsonGet(entry, 'location.address').includes(value) || jsonGet(entry, 'type').includes(value))
    })
    return this.setState({
      data: filteredResults
    })
  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <div className="container">
        <NavBar />
        <div className="content__main">
          <section className="main__top-providers">
            <h2 className="text-header">Our Providers</h2>
            <div className="flex-row">
              <div>
                <input
                  type="text"
                  className="input__style_1 input__search"
                  placeholder="&#xf002; Search with Provider Name, Address, or Type"
                  onChange={this.filterProviders}
                  onInput={this.filterProviders}
                />
              </div>
            </div>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <ProviderGrid
                providers={data}
              />
            )}
          </section>
          <section className="main__new-provider fixed">
            <NewProvider />
          </section>
        </div>
      </div>
    );
  }
}

export default ExplorePage;
