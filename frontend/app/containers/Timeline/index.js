/**
 *
 * Timeline
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectTimeline from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {TIMELINE_FETCH_PROCESS} from './constants';
import NotesView from "components/NotesView";


/* eslint-disable react/prefer-stateless-function */
export class Timeline extends React.Component {

  componentDidMount(){
  //  fetch notes
    if(this.props.timeline.notes === undefined || this.props.timeline.notes.length == 0){
      this.props.fetchTimeline();
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Timeline</title>
          <meta name="description" content="Description of Timeline" />
        </Helmet>
        <h2>Notes Timeline</h2>
        <p>Users can make any of their notes public, and it will be shown in the home page to all visitors.</p>
        <NotesView notes={this.props.timeline.notes} />
      </div>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  timeline: makeSelectTimeline(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTimeline: () => dispatch({
      type: TIMELINE_FETCH_PROCESS,
    }),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'timeline', reducer });
const withSaga = injectSaga({ key: 'timeline', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Timeline);
