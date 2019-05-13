import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Button } from '@zhike/ti-ui';
import { Modal } from '@zhike/ti-component';
import styles from './styles';

// 页面头部
export default class Header extends Component {
  static instance;
  // 参数
  static defaultProps = {
    duration: '24m35s',
    showButtons: [],
    unavailableButtons: [],
    getUploadSignature: undefined,
    postCorrectionImage: undefined,
    postCorrection: undefined,
    step: {},
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    showButtons: PropTypes.array,
    unavailableButtons: PropTypes.array,
    duration: PropTypes.string,
    getUploadSignature: PropTypes.func,
    postCorrectionImage: PropTypes.func,
    postCorrection: PropTypes.func,
    step: PropTypes.object,
  };

  // 构造函数
  constructor(props) {
    super(props);
    this.timeInterval = undefined;
  }

  // 模块加载
  componentDidMount() {
    const { title } = this.props;
    global.document.title = `${title || ''} - 智课`;
  }


  // 渲染
  render() {
    const { title, showButtons, unavailableButtons, duration, getUploadSignature,
      postCorrectionImage, postCorrection, step } = this.props;
    const search = global.location.search; // eslint-disable-line
    return (
      <View className={styles.container}>
        <View className={styles.title}>
          <Image className={styles.titleLogo} src={require('./assets/logo.png')} />
          <View className={styles.titleSplit} />
          <View className={styles.titleText}>
            {title}
          </View>
        </View>

        <View className={styles.buttons}>
          <View className={styles.normalButtons}>
            {
              duration && <View className={styles.duration}>总耗时：{duration}</View>
            }
            {
              showButtons.indexOf('correct') !== -1 &&
              <Button
                className={styles.button}
                leftIcon={require('./assets/correct.png')}
                isAvailable={unavailableButtons.indexOf('correct') === -1}
                text="我要纠错"
                onClick={() => Modal.show('ModalCorrect', {
                  title: '我要纠错',
                  width: 700,
                  getUploadSignature,
                  postCorrectionImage,
                  postCorrection,
                  step,
                  isReport: true,
                  option: {
                    version: '1.0.0',
                    source: 'ti-gre',
                  },
                })}
              />
            }
          </View>
          <Modal ref={modal => { Modal.instance = modal; }} />
        </View>
      </View>
    );
  }
}
