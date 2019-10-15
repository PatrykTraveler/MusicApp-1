import React, { Component } from 'react';
import { Button, Text } from 'react-native';
import Modal, {
  ModalTitle,
  ModalContent,
  ScaleAnimation,
  // @ts-ignore
} from 'react-native-modals';

import { Sequence } from '../../../utils/midiConverter';

interface Props {
  navigation: Navigation;
  visible: boolean;
  levelStars: number;
  levelNumber: number;
  song: Sequence;
  isTraining: boolean;
  startAgain: any;
}

interface State {
  visible: boolean;
}

export default class EndGamePopup extends Component<Props, State> {
  state: State = {
    visible: true,
  };
  render() {
    return (
      <Modal
        width={0.9}
        visible={this.state.visible}
        modalAnimation={new ScaleAnimation()}
        modalTitle={
          <ModalTitle
            title="You finished level! Well done!"
            hasTitleBar={true}
          />
        }
      >
        <ModalContent style={{ paddingTop: 10 }}>
          {!this.props.isTraining && (
            <Text style={{ alignSelf: 'center' }}>
              Stars gained: {this.props.levelStars}
            </Text>
          )}
          <Button
            title="Go back to menu"
            onPress={() => {
              this.props.navigation.goBack();
              this.setState({ visible: false });
            }}
          />
          <Button
            title="Restart level"
            onPress={() => {
              this.setState({ visible: false });
              this.props.startAgain();
            }}
          />
          <Button
            title="Train weak elements with different notes"
            onPress={() => {
              this.setState({ visible: false });
              this.props.navigation.navigate('Level', {
                levelStars: this.props.levelStars,
                levelNumber: this.props.levelNumber,
                noteSequence: this.props.song,
              });
            }}
          />
        </ModalContent>
      </Modal>
    );
  }
}