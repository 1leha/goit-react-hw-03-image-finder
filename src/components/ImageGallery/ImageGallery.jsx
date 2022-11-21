// import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const mashineStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESSFULLY: 'successfully',
  ERROR: 'error',
};
export default class ImageGallery extends PureComponent {
  // static propTypes = {second: third}
  state = {
    searchRequest: '',
    searchData: '[]',
    page: 1,
    status: mashineStatus.IDLE,
  };

  nextPage = () => {
    console.log('Load next');
  };

  // componentDidMount() {
  //   // this.setState({ status: mashineStatus.IDLE });
  //   console.log('mount');
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log('Update');

    // console.log('prevProps :>> ', prevProps);

    if (prevProps.searchString !== this.props.searchString) {
      console.log('set state');

      this.setState({
        status: mashineStatus.LOADING,
        searchRequest: this.props.searchString,
      });

      setTimeout(() => {
        this.setState({
          status: mashineStatus.SUCCESSFULLY,
          searchData: '[ some data ]',
        });
      }, 2000);
    }

    // console.log(`galery updated ${this.props.searchString}`);
  }

  render() {
    const { searchString } = this.props;
    const { status, searchData, searchRequest } = this.state;

    //----------------------------------------------
    // Render mashine
    //----------------------------------------------

    if (status === mashineStatus.IDLE) {
      return <div>Input search param</div>;
    }

    if (status === mashineStatus.LOADING) {
      return <div>Loading...</div>;
    }

    if (status === mashineStatus.SUCCESSFULLY) {
      return (
        <div>
          I find: {searchData} by request: {searchString}
        </div>
      );
    }

    if (status === mashineStatus.ERROR) {
      return <div>ERROR</div>;
    }
  }
}
