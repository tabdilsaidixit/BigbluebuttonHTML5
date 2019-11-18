import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { styles } from '/imports/ui/components/user-list/user-list-content/styles';
import _ from 'lodash';
import UserListItemContainer from './user-list-item/container';
import UserOptionsContainer from './user-options/container';

const propTypes = {
  compact: PropTypes.bool,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({}).isRequired,
  meeting: PropTypes.shape({}).isRequired,
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  waitingUsers:  PropTypes.arrayOf(PropTypes.string).isRequired,
  tutors:  PropTypes.arrayOf(PropTypes.string).isRequired,
  getGroupChatPrivate: PropTypes.func.isRequired,
  handleEmojiChange: PropTypes.func.isRequired,
  getUsersId: PropTypes.func.isRequired,
  getUsersInWaitingList:PropTypes.func.isRequired,
  getTutorsList: PropTypes.func.isRequired,
  isBreakoutRoom: PropTypes.bool,
  setEmojiStatus: PropTypes.func.isRequired,
  assignPresenter: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  toggleVoice: PropTypes.func.isRequired,
  muteAllUsers: PropTypes.func.isRequired,
  muteAllExceptPresenter: PropTypes.func.isRequired,
  changeRole: PropTypes.func.isRequired,
  getAvailableActions: PropTypes.func.isRequired,
  normalizeEmojiName: PropTypes.func.isRequired,
  isMeetingLocked: PropTypes.func.isRequired,
  roving: PropTypes.func.isRequired,
  toggleUserLock: PropTypes.func.isRequired,
  requestUserInformation: PropTypes.func.isRequired,
  isUserInWaitingList: PropTypes.func.isRequired,
  getUsersInWaitingListFull:  PropTypes.func.isRequired,
};

const defaultProps = {
  compact: false,
  isBreakoutRoom: false,
};

const listTransition = {
  enter: styles.enter,
  enterActive: styles.enterActive,
  appear: styles.appear,
  appearActive: styles.appearActive,
  leave: styles.leave,
  leaveActive: styles.leaveActive,
};

const intlMessages = defineMessages({
  usersTitle: {
    id: 'app.userList.usersTitle',
    description: 'Title for the Header',
  },
  waitingUsersTitle: {
    id: 'app.userList.waitingListUsersTitle',
    description: 'Title for the Waiting list Header',
  },
  tutorsTitle: {
    id: 'app.userList.turorsTitle',
    description: 'Title for the tutors list',
  },  
});

class UserParticipants extends Component {
  constructor() {
    super();

    this.state = {
      index: -1,
    };

    this.userRefs = [];
    this.selectedIndex = -1;

    this.getScrollContainerRef = this.getScrollContainerRef.bind(this);
    this.focusUserItem = this.focusUserItem.bind(this);
    this.changeState = this.changeState.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getWaitingListUsers = this.getWaitingListUsers.bind(this);
    this.getTutors = this.getTutors.bind(this);
  }

  componentDidMount() {
    const { compact, roving, users } = this.props;
    if (!compact) {
      this.refScrollContainer.addEventListener(
        'keydown',
        event => roving(
          event,
          users.length,
          this.changeState,
        ),
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const isPropsEqual = _.isEqual(this.props, nextProps);
    const isStateEqual = _.isEqual(this.state, nextState);
    return !isPropsEqual || !isStateEqual;
  }

  componentDidUpdate(prevProps, prevState) {
    const { index } = this.state;
    if (index === -1) {
      return;
    }

    if (index !== prevState.index) {
      this.focusUserItem(index);
    }
  }

  getScrollContainerRef() {
    return this.refScrollContainer;
  }

  getTutors() {
    const {
      compact,
      isBreakoutRoom,
      currentUser,
      meeting,
      getAvailableActions,
      normalizeEmojiName,
      isMeetingLocked,
      changeRole,
      assignPresenter,
      setEmojiStatus,
      removeUser,
      toggleVoice,
      getGroupChatPrivate,
      handleEmojiChange,
      getEmojiList,
      getEmoji,
      tutors,
      hasPrivateChatBetweenUsers,
      toggleUserLock,
      requestUserInformation,
    } = this.props;

    let index = -1;
    
    return tutors.map(u => (
      <CSSTransition
        classNames={listTransition}
        appear
        enter
        exit
        timeout={0}
        component="div"
        className={cx(styles.participantsList)}
        key={u}
      >
        <div ref={(node) => { this.userRefs[index += 1] = node; }}>
          <UserListItemContainer
            {...{
              currentUser,
              compact,
              isBreakoutRoom,
              meeting,
              getAvailableActions,
              normalizeEmojiName,
              isMeetingLocked,
              handleEmojiChange,
              getEmojiList,
              getEmoji,
              setEmojiStatus,
              assignPresenter,
              removeUser,
              toggleVoice,
              changeRole,
              getGroupChatPrivate,
              hasPrivateChatBetweenUsers,
              toggleUserLock,
              requestUserInformation,
            }}
            userId={u}
            getScrollContainerRef={this.getScrollContainerRef}
          />
        </div>
      </CSSTransition>
    ));
  }

  getWaitingListUsers() {
    const {
      compact,
      isBreakoutRoom,
      currentUser,
      meeting,
      getAvailableActions,
      normalizeEmojiName,
      isMeetingLocked,
      changeRole,
      assignPresenter,
      setEmojiStatus,
      removeUser,
      toggleVoice,
      getGroupChatPrivate,
      handleEmojiChange,
      getEmojiList,
      getEmoji,
      waitingUsers,
      hasPrivateChatBetweenUsers,
      toggleUserLock,
      requestUserInformation,
    } = this.props;

    let index = -1;
    
    return waitingUsers.map(u => (
      <CSSTransition
        classNames={listTransition}
        appear
        enter
        exit
        timeout={0}
        component="div"
        className={cx(styles.participantsList)}
        key={u}
      >
        <div ref={(node) => { this.userRefs[index += 1] = node; }}>
          <UserListItemContainer
            {...{
              currentUser,
              compact,
              isBreakoutRoom,
              meeting,
              getAvailableActions,
              normalizeEmojiName,
              isMeetingLocked,
              handleEmojiChange,
              getEmojiList,
              getEmoji,
              setEmojiStatus,
              assignPresenter,
              removeUser,
              toggleVoice,
              changeRole,
              getGroupChatPrivate,
              hasPrivateChatBetweenUsers,
              toggleUserLock,
              requestUserInformation,
            }}
            userId={u}
            getScrollContainerRef={this.getScrollContainerRef}
          />
        </div>
      </CSSTransition>
    ));
  }

  getUsers() {
    const {
      compact,
      isBreakoutRoom,
      currentUser,
      meeting,
      getAvailableActions,
      normalizeEmojiName,
      isMeetingLocked,
      changeRole,
      assignPresenter,
      setEmojiStatus,
      removeUser,
      toggleVoice,
      getGroupChatPrivate,
      handleEmojiChange,
      getEmojiList,
      getEmoji,
      users,
      hasPrivateChatBetweenUsers,
      toggleUserLock,
      requestUserInformation,
    } = this.props;

    let index = -1;

    return users.map(u => (
      <CSSTransition
        classNames={listTransition}
        appear
        enter
        exit
        timeout={0}
        component="div"
        className={cx(styles.participantsList)}
        key={u}
      >
        <div ref={(node) => { this.userRefs[index += 1] = node; }}>
          <UserListItemContainer
            {...{
              currentUser,
              compact,
              isBreakoutRoom,
              meeting,
              getAvailableActions,
              normalizeEmojiName,
              isMeetingLocked,
              handleEmojiChange,
              getEmojiList,
              getEmoji,
              setEmojiStatus,
              assignPresenter,
              removeUser,
              toggleVoice,
              changeRole,
              getGroupChatPrivate,
              hasPrivateChatBetweenUsers,
              toggleUserLock,
              requestUserInformation,
            }}
            userId={u}
            getScrollContainerRef={this.getScrollContainerRef}
          />
        </div>
      </CSSTransition>
    ));
  }

  focusUserItem(index) {
    if (!this.userRefs[index]) return;

    this.userRefs[index].firstChild.focus();
  }

  changeState(newIndex) {
    this.setState({ index: newIndex });
  }

  



  render() {
    const {
      intl,
      users,
      compact,
      setEmojiStatus,
      muteAllUsers,
      meeting,
      muteAllExceptPresenter,
      currentUser,
      waitingUsers,
      tutors,
    } = this.props;

    return (
      <div className={styles.userListColumn}>
        {
          !compact
            ? (
              <div className={styles.container}>
                <h2 className={styles.smallTitle}>
                  
                </h2>
                {currentUser.isModerator
                  ? (
                    <UserOptionsContainer {...{
                      users,
                      muteAllUsers,
                      muteAllExceptPresenter,
                      setEmojiStatus,
                      meeting,
                      currentUser,
                    }}
                    />
                  ) : null
                }

              </div>
            )
            : <hr className={styles.separator} />
        }
        <div
          className={styles.scrollableList}
          role="list"
          tabIndex={0}
          ref={(ref) => { this.refScrollContainer = ref; }}
        >
          <div className={styles.list}>
            <TransitionGroup ref={(ref) => { this.refScrollItems = ref; }}>
              <h2 className={styles.smallTitle}>
                {intl.formatMessage(intlMessages.tutorsTitle)}
                &nbsp;(
                { tutors.length}
                )
              </h2>

              {this.getTutors()}


              <h2 className={styles.smallTitle}>
                {intl.formatMessage(intlMessages.waitingUsersTitle)}
                &nbsp;(
                { waitingUsers.length}
                )
              </h2>

              {this.getWaitingListUsers()}

              <h2 className={styles.smallTitle}>
                {intl.formatMessage(intlMessages.usersTitle)}
                &nbsp;(
                {users.length}
                )
                </h2>
              {this.getUsers()}
              
            </TransitionGroup>
            <div className={styles.footer} />
          </div>
        </div>
      </div>
    );
  }
}

UserParticipants.propTypes = propTypes;
UserParticipants.defaultProps = defaultProps;

export default UserParticipants;
