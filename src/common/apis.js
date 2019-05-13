import { apiUrl } from 'common/config';

// 保存答案
export const postAnswer = ['post', `${apiUrl}/answer`];
// 获取上传签名
export const getUploadSignature = ['get', 'https://api.smartstudy.com/file/upload/signature'];
// 上传纠错图片
export const postCorrectionImage = ['post', 'https://api.smartstudy.com/api/v2/correction'];
// 上传纠错信息
export const postCorrection = ['post', `${apiUrl}/correction`];
// 创建练习
export const postExercise = ['post', `${apiUrl}/exercise`];
// 获取报告页
export const getReport = ['get', `${apiUrl}/report/@mode`];
// 完成练习
export const postComplete = ['post', `${apiUrl}/exercises/complete`];
// 保存做题时间
export const postDuration = ['post', `${apiUrl}/exercises/duration`];
// 获取练习信息
export const getPractice = ['get', `${apiUrl}/exercises/practice-detail`];
// 提交外教批改
export const postManualPigai = ['post', `${apiUrl}/manual-pigai/submit-answer`];
// 获取外教批改的状态
export const getAnswerOnly = ['get', `${apiUrl}/answers/only`];
