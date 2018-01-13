import path from 'path';
import configDev from './webpack.dev.js';
import configProd from './webpack.prod.js';
//import configTest from './configTest';
import _ from 'lodash';
let config = {
    //默认生产环境
    "env": "dev",//prod,test
    //端口号配置
    "port": 3000,
    //模板所在的目录
    "webpackConf": path.join(__dirname, "../..", "config/webpack.dev.js"),
     "viewDir": path.join(__dirname, '..', 'views'),
    // //log所在的目录
    "logDir": path.join(__dirname, '..', 'logs'),
    // //静态文件所在的目录
    "staticDir": path.join(__dirname, '..')
    // //获取考试信息数据
    // "getUnitCourseList": "StudyCenterService/CurriculumREST/getUnitCourseList",
    // //获取学员分数已遍通关
    // "getStudentScoreList": "StudyCenterService/ExaminationREST/getStudentScoreList",
    // //获取实战要求和视频
    // "getTaskDetail": "StudyCenterService/ActualMissionREST/getMissionInfo",
    // //获取公告接口信息那天
    // "getTgetLastNotice": "StudyCenterService/NoticeREST/getLastNotice",
    // //高端班课程图标
    // advancedClassIcon: ["js", "node", "engineering", "performance", "css", "mvvm", "circuit", "algorithm", "graphics", "safe", "bat"],
    // //基础班课程图标
    // basicsClassIcon: ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13", "a14", "a15", "a16"],
    // //基础班考试paperids
    // basicsPaperids: [""],
    // //高端班考试paperids
    // advancedPaperids: ["QDE4SW", "62SZ1T", "UKVGGX", "QXDB2Y", "2BD8KX", "USGPUQ", "2RWKHT", "", "2R1OJX", ""],
    // //xi班课程总数
    // basicsNumber: 16,
    // //高端班课程总数
    // advancedNumber: 10,
    // alphaNumeric: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen"],
    // aliberDigital: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
    // //技能
    // "LearningSkills": "/StudyCenterService/basic/skills",
    // //城市
    // "forwardCity": "/StudyCenterService/basic/place",
    // //薪资
    // "salary": "/StudyCenterService/basic/salary",
    // //hr
    // "hrjob": "/StudyCenterService/hr/getJobList",
    // //设置学员求职意向数据详情
    // "studentDetails": "/StudyCenterService/student/setIntention",
    // //获取学员求职意向数据详情
    // "getStudentsInterested": "/StudyCenterService/student/getIntention",


};

//本地调试环境
const NODE_ENV = config.env; 
switch(NODE_ENV){
    case "dev":
        config = _.extend(config, configDev);
    break;
    case "prod":
        config = _.extend(config,configProd);
    break;
    case "test":
        config = _.extend(config,configTest);
    break;
    default:
    config = _.extend(config, configDev);
    break;
}

export default config;