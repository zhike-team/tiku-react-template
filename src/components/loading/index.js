import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from '@zhike/ti-ui';

import styles from './styles';

// 初始化
export default class Loading extends Component {
  // 参数
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    const { text } = this.props

    return (
      <View className={styles.loadingBox}>
        <Image
          className={styles.loading}
          src={require('components/assets/loading.gif')}
        />
        {
          <View className={styles.text}>{text}</View>
        }
      </View>
    )
  }
}
