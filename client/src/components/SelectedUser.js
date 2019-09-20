import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../actions/user.action';

class SelectedUser extends Component {

  componentDidMount = () => {
    this.props.dispatch(actions.getImagesOfUser(this.props.match.params.id))
  }

  render() {
    const { images } = this.props;
		return (
			<div className="image-wrapper">
				{
					images ? images.map((image, index) => <img src={image} key={index} alt=""/>
					) : 'Loading...'
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    images: state.imgReducer.images
  }
}

export default connect(mapStateToProps)(SelectedUser);