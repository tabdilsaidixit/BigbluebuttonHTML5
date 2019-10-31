import Auth from '/imports/ui/services/auth';
import Users from '/imports/api/users';
import { makeCall } from '/imports/ui/services/api';
import Meetings from '/imports/api/meetings';
import Breakouts from '/imports/api/breakouts';
import { getVideoId } from '/imports/ui/components/external-video-player/service';

const USER_CONFIG = Meteor.settings.public.user;
const ROLE_MODERATOR = USER_CONFIG.role_moderator;
const DIAL_IN_USER = 'dial-in-user';

const getBreakouts = () => Breakouts.find({ parentMeetingId: Auth.meetingID })
  .fetch()
  .sort((a, b) => a.sequence - b.sequence);

const currentBreakoutUsers = user => !Breakouts.findOne({
  'joinedUsers.userId': new RegExp(`^${user.userId}`),
});

const filterBreakoutUsers = filter => users => users.filter(filter);

const getUsersNotAssigned = filterBreakoutUsers(currentBreakoutUsers);

const takePresenterRole = () => makeCall('assignPresenter', Auth.userID);

export default {
  isUserPresenter: () => Users.findOne({ userId: Auth.userID }).presenter,
  isUserModerator: () => Users.findOne({ userId: Auth.userID }).role === ROLE_MODERATOR,
  isUserInWaitingList:  (id) => {
    console.log(id);
    const u = Users.findOne({ userId: id });
    console.log("====");
    console.log("object...");
    console.log(u);
    if(u){
      console.log(u.emoji);
     
        if(u.emoji == "raiseHand"){
          console.log("true");
          return true;
        }
        else{
          console.log("not raisehand false");
          return false;
        }
      
    }
    else{
      console.log("object not present false");
      return false;
    }
  }, 
  getUsersInWaitingList: () => {
    const allUsers = Users.find().fetch();
    var waitingUsers = [];
    console.log(allUsers);

    let len = allUsers.length;
    for(var i=0; i<len; i++){
      if(allUsers[i].emoji == "raiseHand"){
        waitingUsers.push(allUsers[i].userId);
      }
    }
    return waitingUsers;
  },
  getUsersInWaitingListFull: () => {
    const allUsers = Users.find().fetch();
    var waitingUsers = [];
    console.log(allUsers);

    let len = allUsers.length;
    for(var i=0; i<len; i++){
      if(allUsers[i].emoji == "raiseHand"){
        waitingUsers.push(allUsers[i]);
      }
    }
    return waitingUsers;
  },
  recordSettingsList: () => Meetings.findOne({ meetingId: Auth.meetingID }).recordProp,
  meetingIsBreakout: () => Meetings.findOne({ meetingId: Auth.meetingID }).meetingProp.isBreakout,
  meetingName: () => Meetings.findOne({ meetingId: Auth.meetingID }).meetingProp.name,
  users: () => Users.find({ connectionStatus: 'online', meetingId: Auth.meetingID, clientType: { $ne: DIAL_IN_USER } }).fetch(),
  hasBreakoutRoom: () => Breakouts.find({ parentMeetingId: Auth.meetingID }).fetch().length > 0,
  isBreakoutEnabled: () => Meetings.findOne({ meetingId: Auth.meetingID }).breakoutProps.enabled,
  isBreakoutRecordable: () => Meetings.findOne({ meetingId: Auth.meetingID }).breakoutProps.record,
  toggleRecording: () => makeCall('toggleRecording'),
  createBreakoutRoom: (numberOfRooms, durationInMinutes, record = false) => makeCall('createBreakoutRoom', numberOfRooms, durationInMinutes, record),
  sendInvitation: (breakoutId, userId) => makeCall('requestJoinURL', { breakoutId, userId }),
  getBreakouts,
  getUsersNotAssigned,
  takePresenterRole,
  isSharingVideo: () => getVideoId(),
};
