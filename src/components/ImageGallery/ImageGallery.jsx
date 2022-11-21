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
    searchData: '[]',
    page: 1,
    status: mashineStatus.IDLE,
  };

  nextPage = () => {
    console.log('Load next');
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchString !== this.props.searchString) {
      // console.log('Update');

      this.setState({
        status: mashineStatus.LOADING,
        page: 1,
      });
    }

    setTimeout(async () => {
      this.setState({
        status: mashineStatus.SUCCESSFULLY,
        searchData: await fetchData(this.props.searchString, this.state.page),
      });
    }, 1500);

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
