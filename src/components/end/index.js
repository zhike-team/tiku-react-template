import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { history } from 'routers';
import { View, Image } from '@zhike/ti-ui';
import { getToken, redirectToLoginPage } from 'utils/action';
import { postComplete } from 'common/apis';
import Header from 'components/header';
import styles from './styles';

const search = global.location.search; // eslint-disable-line

// 结束
export default class End extends Component {
  // 参数
  static propTypes = {
    params: PropTypes.object.isRequired,
    stepList: PropTypes.array.isRequired,
  };

  // 模块即将加载
  async componentWillMount() {
    const { stepList } = this.props;
    const { exerciseId, mode } = this.props.params;
    const { questionId } = stepList[0];
    Header.config({});
    setTimeout(async () => {
      await this.submit();
      setTimeout(async () => {
        history.push(`/report/${mode}/${exerciseId}/${questionId}${search}`);
      }, 300);
    }, 100);
  }

  /**
   * 通知后端完成练习
   * */
  // 提交测试
  async submit() {
    const { exerciseId } = this.props.params;
    const search = global.location.search; // eslint-disable-line
    const source = decodeURIComponent(search.match(new RegExp('[?#&]source=([^?#&]+)', 'i')) ? RegExp.$1 : '');
    const taskId = decodeURIComponent(search.match(new RegExp('[?#&]task_id=([^?#&]+)', 'i')) ? RegExp.$1 : '');
    const pid = decodeURIComponent(search.match(new RegExp('[?#&]pid=([^?#&]+)', 'i')) ? RegExp.$1 : '');
    if (!getToken()) {
      redirectToLoginPage();
      return;
    }
    await axios({
      url: postComplete[1],
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        From: 1,
      },
      data: {
        duration: parseInt(Header.getTime() / 1000, 10),
        exerciseId: parseInt(exerciseId, 10),
        token: getToken(),
        source,
        taskId: taskId || null,
        pid,
      },
    });
  }

  // 渲染
  render() {
    return (
      <View className={styles.container}>
        <Image
          className={styles.loading}
          src={require('./assets/save.png')}
        />
        <View className={styles.text}>正在上传答案，请稍候...</View>
      </View>
    );
  }
}
