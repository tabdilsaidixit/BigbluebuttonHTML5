import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Meetings from '/imports/api/meetings';
import UserParticipants from './component';
import Service from '/imports/ui/components/actions-bar/service';

const UserParticipantsContainer = props => <UserParticipants {...props} />;

export default withTracker(({ getUsersId, getUsersInWaitingList, getTutorsList }) => ({
  isUserInWaitingList: Service.isUserInWaitingList,
  getUsersInWaitingList: Service.getUsersInWaitingList,
  getUsersInWaitingListFull: Service.getUsersInWaitingListFull,
  meeting: Meetings.findOne({}),
  users: getUsersId(),
  waitingUsers: getUsersInWaitingList(), 
  tutors: getTutorsList(),
}))(UserParticipantsContainer);
