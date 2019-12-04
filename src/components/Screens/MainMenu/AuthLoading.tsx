import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootReducerState } from '../../../redux/RootReducer';
import {
  prepareLevels,
  LevelInfo,
  LevelStars,
} from '../../../utils/levelMappings';
import { getToken } from '../../../networking/ServerConnector';
import { addLevelInfo, clearLevelInfo } from '../../../redux/LevelInfosActions';
import { addStarsToLevel, clearStars } from '../../../redux/LevelStarsActions';

interface OwnProps {
  navigation: Navigation;
}

type Props = OwnProps & ReduxProps;

class AuthLoadingScreen extends React.Component<Props> {
  async componentDidMount() {
    await this.tryLogin();
  }

  tryLogin = async () => {
    if (this.props.credentials.login && this.props.credentials.password) {
      const token = await getToken(this.props.credentials);
      if (!token) {
        this.props.navigation.navigate('Auth');
      }
      await prepareLevels(
        token,
        this.props.clearLevels,
        this.props.clearStars,
        this.props.addLevelInfo,
        this.props.addLevelStars,
      );
      this.props.navigation.navigate('Main');
    } else {
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <ImageBackground
        source={require('../../../static/backgroundImages/pianoMain.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <StatusBar barStyle="default" />
        </View>
      </ImageBackground>
    );
  }
}

type ReduxProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const mapStateToProps = (state: RootReducerState) => {
  return {
    credentials: state.credentials.credentials,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addLevelInfo: (levelInfo: LevelInfo) => dispatch(addLevelInfo(levelInfo)),
    addLevelStars: (levelStars: LevelStars) =>
      dispatch(addStarsToLevel(levelStars)),
    clearLevels: () => dispatch(clearLevelInfo()),
    clearStars: () => dispatch(clearStars()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoadingScreen);
