import React from 'react';
import ApiService from '../../utils/apiService';

const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dahlia-ah-frontend/image/upload';

class NewProviderForm extends React.Component {

  // TASK 4: Add New Provider
  // Add Functionality to the form below
  // On submission it should make a POST request to 
  // the server to create a new provider.
  // Refer to the API documentation for details.

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      fields: {
        name: '',
        state: '',
        address: '',
        type: '',
        imageUrl: 'https://via.placeholder.com/400x200',
        rating: 1
      }
    };
  }

  handleInputChange = (event, field) => {
    const fields = {...this.state.fields}
    fields[`${field}`] = event.target.value;

    this.setState({
      fields
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let prevFields = {...this.state.fields};

    prevFields = {
      name: '',
      state: '',
      address: '',
      type: '',
      imageUrl: 'https://via.placeholder.com/400x200',
      rating: 1
    }

    ApiService.post(ApiService.ENDPOINTS.providers, this.state.fields)
      .then(() => {
        this.setState({
          fields: prevFields
        })
      })
  };

  handleFileCapture = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nrq01lqx');

    const prevFields = {...this.state.fields};

    ApiService.post(cloudinaryUrl, formData).then((response) => {
      prevFields.imageUrl = response.secure_url;
      this.setState({
        fields: prevFields
      })
    })
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Provider Name:</label>
          <input className="input__style_1" type="text" name="name" value={this.state.fields.name} onChange={(e) => this.handleInputChange(e, 'name')} />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider Address:</label>
          <input className="input__style_1" type="text" name="address" value={this.state.fields.address} onChange={(e) => this.handleInputChange(e, 'address')}/>
        </div>
        <div className="form-group">
          <label htmlFor="state">Provider State:</label>
          <input className="input__style_1" type="text" name="state" value={this.state.fields.state} onChange={(e) => this.handleInputChange(e, 'state')}/>
        </div>
        <div className="form-group">
          <label htmlFor="rating">Provider Rating:</label>
          <select className="select input__style_1" type="number" name="rating" defaultValue={this.state.fields.rating} onChange={(e) => this.handleInputChange(e, 'rating')}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Provider type:</label>
          <select className="select input__style_1" type="text" name="type" value={this.state.fields.type} onChange={(e) => this.handleInputChange(e, 'type')}>
            <option value="hospital">Hospital</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>        
        <div className="form-group">
          <label htmlFor="image">Provider Image</label>
          <img src={this.state.fields.imageUrl} alt="new provider"/>
          <input type="file" name="file" onChange={this.handleFileCapture} />
        </div>
        <div className="form-group button-row">
          <button
            type="submit"
            className="btn btn-primary no-margin"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default NewProviderForm;
