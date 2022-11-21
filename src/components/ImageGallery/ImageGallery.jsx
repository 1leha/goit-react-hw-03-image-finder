// import PropTypes from 'prop-types';
import Button from 'components/Button';
import React, { PureComponent } from 'react';
import { fetchData } from '../../services';

const mashineStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESSFULLY: 'successfully',
  ERROR: 'error',
};
export default class ImageGallery extends PureComponent {
  // static propTypes = {second: third}
  state = {
    query: '',
    page: 1,
    searchData: '[]',
    status: mashineStatus.IDLE,
    error: null,
  };

  nextPage = () => {
    console.log('Load next');
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchString !== this.props.searchString) {
      this.setState({
        query: this.props.searchString,
        page: 1,
        searchData: '[]',
      });
    }

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({
        status: mashineStatus.LOADING,
      });

      setTimeout(async () => {
        await fetchData(this.props.searchString, this.state.page)
          .then(data => {
            this.setState({
              status: mashineStatus.SUCCESSFULLY,
              searchData: data,
            });
          })
          .catch(error => {
            this.setState({
              status: mashineStatus.ERROR,
              error: error,
            });
          });
      }, 500);
    }
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
      return <div>Loading {searchRequest}...</div>;
    }

    if (status === mashineStatus.SUCCESSFULLY) {
      return (
        <>
          <div>
            I find: {searchData.totalHits} items by request: {searchString}
          </div>
          <Button onClick={this.nextPage} />
        </>
      );
    }

    if (status === mashineStatus.ERROR) {
      return <div>ERROR</div>;
    }
  }
}
