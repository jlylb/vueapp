// const slideImgDir = 'hainan';
const slideImgDir = process.env.VUE_APP_HAINAN;

/* eslint-disable */
const TestJpg1 = require(`@/assets/${slideImgDir}/s1.jpg`);
const TestJpg2 = require(`@/assets/${slideImgDir}/s2.jpg`);
const TestJpg3 = require(`@/assets/${slideImgDir}/s3.jpg`);

export default {
  TestJpg1,
  TestJpg2,
  TestJpg3,
};
