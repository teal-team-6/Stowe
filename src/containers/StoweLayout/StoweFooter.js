import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class StoweFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="http://www.stowe.co.za/">Stowe Holdings</a> &copy; 2019</span>
        {/* <span className="ml-auto">Powered by <a href="https://coreui.io/react">CoreUI for React</a></span> */}
      </React.Fragment>
    );
  }
}

StoweFooter.propTypes = propTypes;
StoweFooter.defaultProps = defaultProps;

export default StoweFooter;
