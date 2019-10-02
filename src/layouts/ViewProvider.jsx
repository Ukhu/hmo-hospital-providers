import React from 'react';
import ProviderCard from '../components/ProviderCard';
import ApiService from '../utils/apiService';

class ViewProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      provider: {},
    };
  }

  componentDidMount() {
    ApiService.get(`${ApiService.ENDPOINTS.providers}/${this.props.match.providerId}`)
    .then(({data}) => {
      const newProvider = {...this.state.provider, data}
      this.setState({
        provider: newProvider
      })
    });
  }

  render() {
    // TASK 5:
  // Render Single Provider View Here
  // Feel free to using existing styles,
  // or add new ones if you want to :)
  const { id, imageUrl, location, name, rating, type} = this.state.provider;
      return <ProviderCard
        key={id}
        imageUrl={imageUrl}
        address={location.address}
        name={name}
        rating={rating}
        providerType={type}
        cardType="bg"
      />
  }
};

export default ViewProvider;