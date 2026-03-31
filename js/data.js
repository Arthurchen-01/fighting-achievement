// ========== MOCK DATA ==========
const FIGHTERS = [
  {id:1,name:"樊振东",nameEn:"Fan Zhendong",discipline:"拳击",level:"中量级",country:"中国",wins:18,losses:2,kos:12,medals:5,bio:"平台核心选手，多次获得全国冠军。打法稳健，重拳威力惊人。",highlight:"2025全国拳击锦标赛冠军",awards:[{year:2026,title:"全国拳击锦标赛冠军",icon:"🥇"},{year:2025,title:"国际拳击邀请赛冠军",icon:"🥇"},{year:2025,title:"全国拳击锦标赛冠军",icon:"🥇"},{year:2025,title:"国际拳击邀请赛KO奖",icon:"⚡"}]},
  {id:2,name:"刘晓慧",nameEn:"Liu Xiaohui",discipline:"泰拳",level:"48kg",country:"中国",wins:15,losses:1,kos:8,medals:4,bio:"女子泰拳新星，技术全面，以凌厉的膝法著称。",highlight:"2026世运会参赛选手",awards:[{year:2026,title:"世运会参赛资格",icon:"🏟️"},{year:2025,title:"全国泰拳锦标赛冠军",icon:"🥇"},{year:2025,title:"东亚泰拳锦标赛冠军",icon:"🥇"},{year:2025,title:"国际泰拳大奖赛冠军",icon:"🥇"}]},
  {id:3,name:"Doris",nameEn:"Doris",discipline:"自由搏击",level:"52kg",country:"中国",wins:12,losses:3,kos:6,medals:3,bio:"自由搏击主力，步伐灵活，组合拳连贯。",highlight:"2025东亚搏击联赛冠军",awards:[{year:2025,title:"东亚搏击联赛冠军",icon:"🥇"},{year:2025,title:"自由搏击国际赛首胜",icon:"⚔️"},{year:2025,title:"年终盛典获胜",icon:"🏆"}]},
  {id:4,name:"Louisa",nameEn:"Louisa",discipline:"泰拳",level:"56kg",country:"中国",wins:10,losses:2,kos:7,medals:3,bio:"泰拳攻击型选手，肘膝组合出色。",highlight:"2024全国泰拳锦标赛冠军",awards:[{year:2026,title:"世运会参赛资格",icon:"🏟️"},{year:2025,title:"全国泰拳锦标赛冠军",icon:"🥇"},{year:2025,title:"年终盛典获胜",icon:"🏆"}]},
  {id:5,name:"明晓",nameEn:"Ming Xiao",discipline:"拳击",level:"75kg",country:"中国",wins:8,losses:4,kos:5,medals:2,bio:"大级别拳手，力量型打法。",highlight:"2025全国拳击锦标赛季军",awards:[{year:2025,title:"全国拳击锦标赛季军",icon:"🥉"}]},
  {id:6,name:"张伟",nameEn:"Zhang Wei",discipline:"自由搏击",level:"71kg",country:"中国",wins:6,losses:3,kos:3,medals:1,bio:"新秀选手，成长迅速，潜力巨大。",highlight:"2026新秀赛冠军",awards:[{year:2026,title:"新秀赛冠军",icon:"🥇"}]},
];

const MATCHES = [
  {id:1,date:"2026-03-15",event:"世运会选拔赛",level:"国际",type:"泰拳",fighterId:2,opponent:"金智妍",opponentCountry:"韩国",result:"胜",method:"KO",round:2,isKey:true,significance:"世运会选拔赛决赛，争夺参赛资格",opponentRecord:"28胜5负"},
  {id:2,date:"2026-03-10",event:"世运会选拔赛",level:"国际",type:"泰拳",fighterId:4,opponent:"Sarah Johnson",opponentCountry:"美国",result:"胜",method:"判定",round:3,isKey:true,significance:"世运会选拔赛半决赛",opponentRecord:"22胜8负"},
  {id:3,date:"2026-02-28",event:"全国拳击锦标赛",level:"全国",type:"拳击",fighterId:1,opponent:"李强",opponentCountry:"中国",result:"胜",method:"KO",round:4,isKey:true,significance:"全国锦标赛决赛，连续三年卫冕",opponentRecord:"35胜6负"},
  {id:4,date:"2026-02-20",event:"东亚搏击联赛",level:"区域",type:"自由搏击",fighterId:3,opponent:"佐藤美咲",opponentCountry:"日本",result:"胜",method:"TKO",round:2,isKey:false,significance:"东亚联赛常规赛",opponentRecord:"14胜5负"},
  {id:5,date:"2026-02-15",event:"全国拳击锦标赛",level:"全国",type:"拳击",fighterId:5,opponent:"王浩",opponentCountry:"中国",result:"负",method:"判定",round:3,isKey:false,significance:"全国锦标赛首轮",opponentRecord:"20胜6负"},
  {id:6,date:"2026-02-10",event:"新秀挑战赛",level:"城市",type:"自由搏击",fighterId:6,opponent:"陈磊",opponentCountry:"中国",result:"胜",method:"TKO",round:1,isKey:false,significance:"新秀赛首秀",opponentRecord:"3胜2负"},
  {id:7,date:"2026-01-25",event:"国际泰拳邀请赛",level:"国际",type:"泰拳",fighterId:2,opponent:"Kwanjai",opponentCountry:"泰国",result:"胜",method:"判定",round:3,isKey:true,significance:"国际邀请赛决赛",opponentRecord:"31胜4负"},
  {id:8,date:"2026-01-18",event:"全国拳击公开赛",level:"全国",type:"拳击",fighterId:1,opponent:"周斌",opponentCountry:"中国",result:"胜",method:"TKO",round:3,isKey:false,significance:"全国公开赛八强赛",opponentRecord:"16胜4负"},
  {id:9,date:"2025-12-20",event:"年终搏击盛典",level:"全国",type:"自由搏击",fighterId:3,opponent:"朴恩智",opponentCountry:"韩国",result:"胜",method:"判定",round:3,isKey:true,significance:"年终盛典主赛",opponentRecord:"19胜6负"},
  {id:10,date:"2025-12-15",event:"年终搏击盛典",level:"全国",type:"泰拳",fighterId:4,opponent:"黄丽",opponentCountry:"中国",result:"胜",method:"KO",round:1,isKey:true,significance:"年终盛典联合主赛",opponentRecord:"15胜4负"},
  {id:11,date:"2025-11-28",event:"国际拳击邀请赛",level:"国际",type:"拳击",fighterId:1,opponent:"Mike Tyson Jr",opponentCountry:"美国",result:"胜",method:"判定",round:5,isKey:true,significance:"国际拳击邀请赛决赛，经典五回合大战",opponentRecord:"40胜3负"},
  {id:12,date:"2025-11-10",event:"东亚泰拳锦标赛",level:"区域",type:"泰拳",fighterId:2,opponent:"Nguyen Thi Mai",opponentCountry:"越南",result:"胜",method:"TKO",round:2,isKey:true,significance:"东亚锦标赛决赛",opponentRecord:"20胜7负"},
  {id:13,date:"2025-10-22",event:"全国自由搏击联赛",level:"全国",type:"自由搏击",fighterId:3,opponent:"赵雪",opponentCountry:"中国",result:"胜",method:"判定",round:3,isKey:false,significance:"全国联赛常规赛",opponentRecord:"11胜4负"},
  {id:14,date:"2025-10-05",event:"全国泰拳锦标赛",level:"全国",type:"泰拳",fighterId:4,opponent:"陈晓燕",opponentCountry:"中国",result:"胜",method:"KO",round:2,isKey:true,significance:"全国泰拳锦标赛决赛",opponentRecord:"18胜5负"},
  {id:15,date:"2025-09-18",event:"全国拳击锦标赛",level:"全国",type:"拳击",fighterId:1,opponent:"张强",opponentCountry:"中国",result:"胜",method:"KO",round:3,isKey:true,significance:"全国锦标赛半决赛",opponentRecord:"25胜8负"},
  {id:16,date:"2025-09-01",event:"东亚搏击联赛",level:"区域",type:"自由搏击",fighterId:6,opponent:"Tanaka Yuki",opponentCountry:"日本",result:"负",method:"TKO",round:2,isKey:false,significance:"东亚联赛常规赛",opponentRecord:"12胜4负"},
  {id:17,date:"2025-08-20",event:"国际泰拳大奖赛",level:"国际",type:"泰拳",fighterId:2,opponent:"Somrak",opponentCountry:"泰国",result:"胜",method:"判定",round:3,isKey:true,significance:"国际大奖赛半决赛",opponentRecord:"35胜9负"},
  {id:18,date:"2025-08-05",event:"全国拳击公开赛",level:"全国",type:"拳击",fighterId:5,opponent:"刘洋",opponentCountry:"中国",result:"胜",method:"判定",round:3,isKey:false,significance:"全国公开赛",opponentRecord:"12胜7负"},
  {id:19,date:"2025-07-15",event:"自由搏击国际赛",level:"国际",type:"自由搏击",fighterId:3,opponent:"Lisa Chen",opponentCountry:"澳大利亚",result:"胜",method:"TKO",round:2,isKey:true,significance:"国际赛首胜里程碑",opponentRecord:"24胜6负"},
  {id:20,date:"2025-06-28",event:"全国泰拳锦标赛",level:"全国",type:"泰拳",fighterId:4,opponent:"林小雨",opponentCountry:"中国",result:"胜",method:"判定",round:3,isKey:false,significance:"全国泰拳锦标赛小组赛",opponentRecord:"9胜3负"},
  {id:21,date:"2025-06-10",event:"国际拳击邀请赛",level:"国际",type:"拳击",fighterId:1,opponent:"Carlos Rodriguez",opponentCountry:"墨西哥",result:"胜",method:"KO",round:4,isKey:true,significance:"国际邀请赛半决赛",opponentRecord:"32胜5负"},
  {id:22,date:"2025-05-22",event:"东亚泰拳锦标赛",level:"区域",type:"泰拳",fighterId:2,opponent:"Park Jiyeon",opponentCountry:"韩国",result:"胜",method:"TKO",round:1,isKey:true,significance:"东亚锦标赛半决赛",opponentRecord:"17胜4负"},
  {id:23,date:"2025-05-05",event:"全国自由搏击联赛",level:"全国",type:"自由搏击",fighterId:3,opponent:"王芳",opponentCountry:"中国",result:"负",method:"判定",round:3,isKey:false,significance:"全国联赛常规赛",opponentRecord:"15胜6负"},
  {id:24,date:"2025-04-18",event:"拳击国际挑战赛",level:"国际",type:"拳击",fighterId:5,opponent:"Kim SungHo",opponentCountry:"韩国",result:"负",method:"TKO",round:2,isKey:true,significance:"国际挑战赛",opponentRecord:"29胜4负"},
  {id:25,date:"2025-03-30",event:"新秀赛",level:"城市",type:"自由搏击",fighterId:6,opponent:"吴明",opponentCountry:"中国",result:"胜",method:"判定",round:3,isKey:false,significance:"新秀赛常规赛",opponentRecord:"5胜3负"},
  {id:26,date:"2025-03-15",event:"国际泰拳邀请赛",level:"国际",type:"泰拳",fighterId:4,opponent:"Nong Benz",opponentCountry:"泰国",result:"胜",method:"判定",round:3,isKey:true,significance:"国际邀请赛决赛",opponentRecord:"26胜7负"},
  {id:27,date:"2025-02-20",event:"全国拳击锦标赛",level:"全国",type:"拳击",fighterId:1,opponent:"赵伟",opponentCountry:"中国",result:"胜",method:"KO",round:2,isKey:true,significance:"全国锦标赛决赛",opponentRecord:"30胜9负"},
  {id:28,date:"2025-02-05",event:"东亚搏击联赛",level:"区域",type:"自由搏击",fighterId:3,opponent:"Sato Yuki",opponentCountry:"日本",result:"胜",method:"TKO",round:3,isKey:false,significance:"东亚联赛常规赛",opponentRecord:"8胜5负"},
  {id:29,date:"2025-01-18",event:"泰拳国际大奖赛",level:"国际",type:"泰拳",fighterId:2,opponent:"Fah Chiangmai",opponentCountry:"泰国",result:"胜",method:"判定",round:3,isKey:true,significance:"国际大奖赛决赛",opponentRecord:"33胜6负"},
  {id:30,date:"2025-01-05",event:"全国拳击公开赛",level:"全国",type:"拳击",fighterId:1,opponent:"孙建国",opponentCountry:"中国",result:"胜",method:"TKO",round:4,isKey:false,significance:"全国公开赛八强赛",opponentRecord:"18胜8负"},
];

const TOURNAMENTS = [
  {id:1,name:"世界运动会",year:2026,level:"国际",location:"成都",type:"泰拳",fighters:[2,4],record:"参赛中",highlight:"平台首次征战世运会"},
  {id:2,name:"世运会选拔赛",year:2026,level:"国际",location:"北京",type:"泰拳",fighters:[2,4],record:"2胜0负",highlight:"刘晓慧、Louisa双双入选"},
  {id:3,name:"全国拳击锦标赛",year:2026,level:"全国",location:"北京",type:"拳击",fighters:[1,5],record:"1金1负",highlight:"樊振东TKO卫冕"},
  {id:4,name:"东亚搏击联赛",year:2026,level:"区域",location:"首尔",type:"自由搏击",fighters:[3,6],record:"1胜1负",highlight:"Doris TKO日本选手"},
  {id:5,name:"全国泰拳锦标赛",year:2025,level:"全国",location:"广州",type:"泰拳",fighters:[2,4],record:"2金",highlight:"双金横扫"},
  {id:6,name:"国际拳击邀请赛",year:2025,level:"国际",location:"上海",type:"拳击",fighters:[1],record:"KO胜",highlight:"樊振东KO美国选手"},
  {id:7,name:"东亚泰拳锦标赛",year:2025,level:"区域",location:"曼谷",type:"泰拳",fighters:[2],record:"2金",highlight:"刘晓慧TKO夺冠"},
  {id:8,name:"自由搏击国际赛",year:2025,level:"国际",location:"东京",type:"自由搏击",fighters:[3],record:"1胜",highlight:"Doris击败澳洲选手"},
  {id:9,name:"年终搏击盛典",year:2025,level:"全国",location:"上海",type:"综合",fighters:[3,4],record:"2胜",highlight:"双线告捷"},
  {id:10,name:"泰拳国际大奖赛",year:2025,level:"国际",location:"清迈",type:"泰拳",fighters:[2],record:"2金",highlight:"刘晓慧两轮KO"},
];

const HONORS = [
  {year:2026,icon:"🏟️",title:"世运会参赛资格",desc:"平台首次获得世界运动会参赛资格，刘晓慧和Louisa代表出战。"},
  {year:2026,icon:"🥇",title:"全国拳击锦标赛冠军",desc:"樊振东TKO卫冕全国冠军，连续三年登顶。"},
  {year:2026,icon:"🥇",title:"世运会选拔赛全胜",desc:"刘晓慧、Louisa在选拔赛中双双获胜，获得世运会参赛资格。"},
  {year:2025,icon:"🥇",title:"全国泰拳锦标赛双金",desc:"刘晓慧和Louisa在全国锦标赛中包揽金牌，展现统治力。"},
  {year:2025,icon:"🥇",title:"国际拳击邀请赛冠军",desc:"樊振东KO美国选手Mike Tyson Jr，震惊拳坛。"},
  {year:2025,icon:"🥇",title:"东亚泰拳锦标赛双金",desc:"刘晓慧在东亚锦标赛中TKO夺冠，平台泰拳登上区域之巅。"},
  {year:2025,icon:"⚔️",title:"自由搏击国际赛突破",desc:"Doris击败澳大利亚选手Lisa Chen，平台搏击首次国际赛获胜。"},
  {year:2025,icon:"🏆",title:"年终盛典双线告捷",desc:"Doris和Louisa在年终盛典中双双获胜，完美收官。"},
  {year:2024,icon:"📋",title:"平台战绩突破200场",desc:"平台累计比赛场次突破200场里程碑。"},
];

const STATS = {
  totalMatches: 218,
  totalWins: 178,
  totalKOs: 89,
  medals: 14,
  intlMatches: 42,
  recentForm: "12连胜",
};
