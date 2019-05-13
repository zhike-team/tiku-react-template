import { values, concat } from 'lodash';
import * as practice from './practice';
import * as record from './record';
import * as step from './step';
import * as report from './report';

export default concat(
  values(practice),
  values(record),
  values(step),
  values(report),
);
