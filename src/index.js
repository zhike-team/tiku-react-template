import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import axios from 'axios';
import { history, AppRouter } from 'routers';
import Raven from 'raven-js';
import configStore from 'common/store';
// import { postExercise } from 'common/apis';
// import { getToken } from 'utils/action';
import Loading from 'components/loading';

// 入口页
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      store: undefined,
    };
  }

  async componentDidMount() {
    this.importSentry();

    const storeKey = await this.getStoreKey();
    const store = await configStore(storeKey);
    await this.detectIsMultipleTab();

    this.setState({
      store,
      isLoaded: true,
    });
  }

  importSentry() {
    /**
     * 在生产环境配置sentry
     * 错误边界无法捕获最外层组件：即当前组件的报错，除非再嵌套一层<ErrorBoundary />
     */
    if (process.env.NODE_ENV === 'production') {
      const sentryUrl = 'https://bc2403a2fd4b4d6db4949ba9e15eea0b@sentry.smartstudy.com/30';
      Raven.config(sentryUrl, {
        tags: {
          project: 'ti-gre',
        },
      }).install();
    }
  }

  async getStoreKey() {
    const pathname = global.location.pathname; // eslint-disable-line
    const search = global.location.search; // eslint-disable-line
    let match = pathname.match(/\/init\/.*?\/\d+\/(\d+)/);
    let params = pathname.match(/\/init\/(.*?)\/(\d+)/);
    params = params || pathname.match(/\/(.*?)\/\d+\/\d+/);
    match = match || pathname.match(/\/report\/.*?\/\d+\/(\d+)/);
    match = match || pathname.match(/\/.*?\/\d+\/(\d+)/);
    const mode = params && params[1];
    // const token = getToken();
    // 新建exercise
    if (!match && pathname.indexOf('/init/') !== -1) {
      try {
        const id = parseInt(params[2], 10);
        // const source = decodeURIComponent(search.match(new RegExp('[?#&]source=([^?#&]+)', 'i')) ? RegExp.$1 : '');
        // const taskId = decodeURIComponent(search.match(new RegExp('[?#&]task_id=([^?#&]+)', 'i')) ? RegExp.$1 : '');

        // let data;
        // if (mode === 'practice') {
        //   data = {
        //     practiceId: id,
        //     type: 'Practice',
        //     source,
        //     taskId: taskId || null,
        //     token,
        //   };
        // } else {
        //   data = {
        //     questionId: id,
        //     type: 'Question',
        //     source,
        //     taskId: taskId || null,
        //     token,
        //   };
        // }
        // const exercise = await axios({
        //   url: postExercise[1],
        //   method: 'post',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     From: 1,
        //   },
        //   data,
        //   timeout: 20000,
        // });
        // if (exercise.data.code === 'BadGateway') redirectToLoginPage();
        // history.push(`/init/${mode}/${id}/${exercise.data.data.id}/new${search}`);

        // return `exercise${exercise.data.data.id}`;
        history.push(`/init/${mode}/${id}/12312/new${search}`);

        return 'exercise12312';
      } catch (e) {
        history.push('/error/loading');
        return 'common';
      }
    }

    return match ? `exercise${match[1]}` : 'common';
  }

  // 检测并阻止用户打开多个标签页
  detectIsMultipleTab() {
    return new Promise(resolve => {
      const pathname = global.location.pathname;  // eslint-disable-line

      if (
        pathname.indexOf('/report/') !== -1 ||
        pathname.indexOf('/error/') !== -1
      ) {
        resolve();
        return;
      }

      let match = pathname.match(/\/init\/.*?\/\d+\/(\d+)/);
      match = match || pathname.match(/\/.*?\/\d+\/(\d+)/);

      if (match) {
        const exerciseId = match[1];
        const key = `ti:toefl:exercise${exerciseId}`;

        global.addEventListener('storage', event => {
          if (event.key === key) {
            global.location.href = '/error/multiple';
          }
        });

        setTimeout(() => {
          setInterval(() => {
            global.localStorage.setItem(key, Math.random());
          }, 300);
          resolve();
        }, 650);
      } else {
        resolve();
      }
    });
  }

  render() {
    const { isLoaded, store } = this.state;
    return (
      isLoaded ? (
        <Provider store={store}>
          <AppRouter />
        </Provider>
      ) : (
        <Loading text="正在加载，请稍候..." />
      )
    );
  }
}

// 渲染
ReactDOM.render(
  <App />,
  global.document.getElementById('app'),
);
