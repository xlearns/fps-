// setInterval(()=>{
//   var r = Math.random()*255|0,g = Math.random()*255|0,b = Math.random()*255|0;
//   c = Number((r<<16)+(g<<8)+b).toString(16)
//   document.body.style.backgroundColor='#'+c
// })

let frameState = function(){
      //最大帧
      this.maxFrame = 0
      //最小帧
      this.minFrame = 9999
      //当前帧
      this.currFrame = 0
      //当前时间
      this.currTime = 0
      //每帧流逝的时间
      this.elapseTime = 0
      //每秒开始时间
      this._sTime = 0
      //统计每秒总帧数
      this._sTFrame = 0
}
//启动帧状态检测器
frameState.prototype.start = function(){
  //初始化刚开始时间和当前时间
  this.currTime = this._sTime = new Date();
}
//每帧在循环前调用此方法，更新和计算帧数
frameState.prototype.update = function(){
  let ftime = new Date()
  //超过一秒:每秒统计一下。因为帧率是每秒钟执行多少次
  if(ftime - this._sTime>=1000){
     //当前帧
     this.currFrame = this._sTFrame
     //最大帧
     this.maxFrame = this.currFrame>this.maxFrame?this.currFrame:this.maxFrame
     //最小帧
     this.minFrame = this.currFrame<this.minFrame?this.currFrame:this.minFrame

     this._sTFrame = 0
     this._sTime = ftime
    
  }else{
     ++this._sTFrame
  }
  this.elapseTime = ftime - this.currTime
  this.currTime = ftime;
}

let f = new frameState()

//raf版本
function raf_loop(){
  f.update()
  requestAnimationFrame(raf_loop)
}
function raf(){
  f.start()
  loop()
}

//setInterval版本
let app = document.querySelector('#app')
function siv_loop(){
  app.innerHTML = `<h1>最大帧:${f.maxFrame}</h1><h1>最小帧:${f.minFrame}</h1><h1>平均帧:${f.currFrame}</h1>`
  console.log('最大帧',f.maxFrame)
  console.log('最小帧',f.minFrame)
  console.log('当前帧',f.currFrame)
  f.update()
}
function sIv(fps){
  f.start()
  setInterval(siv_loop,1000/fps)
}
sIv(-1)
