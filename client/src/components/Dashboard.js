import React, { Component } from "react";
import { connect } from "react-redux";
import imgActions from "../actions/image.action";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(imgActions.getImage());
  }

  render() {
    const { images } = this.props;
    return (
      <div className="image-wrapper">
        {images ? (
          images.map((image, index) => <img src={image} key={index} alt="" />)
        ) : (
          <Link to="/upload" />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    images: state.imgReducer.images || []
  };
};

export default connect(mapStateToProps)(Dashboard);
