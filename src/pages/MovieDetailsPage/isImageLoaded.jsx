import React, { Component } from 'react';
import styles from './MovieDetailsPage.module.scss';

class ImageWithLoading extends Component {
  state = { isLoaded: false };

  componentDidMount() {
    const image = new Image();
    image.onload = () => this.setState({ isLoaded: true });
    image.src = this.props.src;
  }

  render() {
    const { src, alt } = this.props;
    const { isLoaded } = this.state;

    return isLoaded ? (
      <img className={styles.image} src={src} width="360" alt={alt} />
    ) : (
      <div className={styles.preloader}>Loading image...</div>
    );
  }
}
export default ImageWithLoading;
