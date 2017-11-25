import React, { Component } from 'react'
import ImgData from '../data/imgdatas.json'
import ReactDOM from 'react-dom'
import { Constant } from 'react-constant'
// 引入图片url-loader
const imgurl = [require('../images/1.jpg'), require('../images/2.jpg'), require('../images/3.jpg'),
  require('../images/4.jpg'), require('../images/5.jpg'), require('../images/6.jpg'),
  require('../images/7.jpg'), require('../images/8.jpg'), require('../images/9.jpg'), require('../images/10.jpg'),
  require('../images/11.jpg'), require('../images/12.jpg'), require('../images/13.jpg'), require('../images/14.jpg'),
  require('../images/15.jpg'), require('../images/16.jpg'), require('../images/17.jpg'), require('../images/18.jpg'),
  require('../images/19.jpg'), require('../images/20.jpg')
]
// 利用自行函数 将图片名信息转成图片图片Url信息
const imageDatas = (function imgUrl (imgArr) {
  for (var i = 0; i < imgArr.length; i++) {
    // var imgJson = JSON.parse(imgArr[i])
    var singeImgArr = imgArr[i]
    const fileName = singeImgArr.fileName
    singeImgArr.imgUrl = imgurl[i]
    imgArr[i] = singeImgArr
  }
  return imgArr
})(ImgData)
// 图片组件
class Figure extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  // this.handleClickThrottled = throttle(this.handleClick, 1000)
  }
  handleClick (e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse()
    }else {
      this.props.Center()
    }

    e.stopPropagation()
    e.preventDefault()
  }
  render () {
    var styleObj = {}

    // 如果props拿到了图片的位置信息，则把它给style
    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos
    }
    var figureClassName = 'imgBox'
    figureClassName += this.props.arrange.isInverse ? ' is-inverse' : ''

    return (
      <figure className={figureClassName} style={styleObj} onClick={this.handleClick}>
        <img src={this.props.data.imgUrl} alt={this.props.data.title} />
        <figcaption>
          <h2>{this.props.data.title}</h2>
          <div className='img-back' onClick={this.handleClick}>
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    )
  }
}
// 控制组件
class ControllerUnit extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  // this.handleClickThrottled = throttle(this.handleClick, 1000)
  }
  handleClick (e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse()
    } else {
      this.props.Center()
    }

    e.stopPropagation()
    e.preventDefault()
    /* e.stopPrapagation()
    e.preventDefault(); */

  }
  render () {
    var controlelrUnitClassName = 'controller-unit'
    if (this.props.arrange.isCenter) {
      controlelrUnitClassName += ' is-center';
      if (this.props.arrange.isInverse) {
          controlelrUnitClassName += ' is-inverse';
      } 
    }
    return (
      <span className={controlelrUnitClassName} onClick={this.handleClick}></span>
    )
  }
}
class Stage extends Component {
  constructor (props) {
    super(props)
    // this.addItem.bind(this)
    this.Constant = {
      // 中心图片的取值
      centerPos: {
        left: 0,
        top: 0
      },
      // 左右区域的取值范围
      hPosRange: {
        leftSecX: [0, 0], // 左边区域的取值范围
        rightSecX: [0, 0], // 右边区域的取值范围
        y: [0, 0]
      },
      // 中间上面的取值范围
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }

    }
    this.state = {
      imgsArrangeArr: []
    }
    // this.rearrange(centerIndex)

  }

  // 判断是否翻转
  inverse (Index) {
    return function () {
      var imgsArrangeArr = this.state.imgsArrangeArr
      imgsArrangeArr[Index].isInverse = !imgsArrangeArr[Index].isInverse
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      })
    }.bind(this)
  }
  // 随机获取旋转角度

  getRotate () {
    var punc = (Math.random() > 0.5) ? '' : '-'
    var getRandomStr = Math.ceil(Math.random() * 30)
    var getRotateStr = 'rotate(' + punc + getRandomStr + 'deg)'
    return getRotateStr
  }
  // 拿到区间内随机值
  getRangeRandom (low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  }
  /*
   * 重新布局所有图片
   * @param centerIndex 指定居中排布哪个图片
   */
  rearrange (centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
      Constant = this.Constant,
      centerPos = Constant.centerPos,
      hPosRange = Constant.hPosRange,
      vPosRange = Constant.vPosRange,
      hPosRangeLeftSecX = hPosRange.leftSecX,
      hPosRangeRightSecX = hPosRange.rightSecX,
      hPosRangeY = hPosRange.y,
      vPosRangeTopY = vPosRange.topY,
      vPosRangeX = vPosRange.x,
      imgsArrangeTopArr = [], // 用来存储储存在上部的图片信息
      topImgNum = Math.floor(Math.random() * 2), // 取一个或者不取放在上方
      topImgSpliceIndex = 0,

      // 布局中间的图片
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1); // 声明一个变量用来存储居中图片的状态信息
    imgsArrangeCenterArr[0] = {
      pos: {
        left: centerPos.left + 'px',
        top: centerPos.top + 'px',
		zIndex: 200
      },
      isCenter: true

    }; // 拿到中间的图片 然后让位置居中

    // 布局中上的图片
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum)); // 获取上面图片的索引
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum)
    // 上侧图片定位
    // 因为不确定imgsArrangTopArr是否为空  先遍历
    var t = this
    imgsArrangeTopArr.forEach(function (value, index) {
      imgsArrangeTopArr[index] = {
        isCenter: false,
        pos: {
          left: this.getRangeRandom(vPosRangeX[0], vPosRangeX[1]) + 'px',
          top: this.getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]) + 'px',
          transform: this.getRotate()
        }
      }
    }.bind(this))

    // 布局上侧的图片
    for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
      var hPosRangeLOrR = null
      if (i < k) {
        hPosRangeLOrR = hPosRangeLeftSecX
      }else {
        hPosRangeLOrR = hPosRangeRightSecX
      }
      imgsArrangeArr[i] = {
        isCenter: false,
        pos: {
          left: this.getRangeRandom(hPosRangeLOrR[0], hPosRangeLOrR[1]) + 'px',
          top: this.getRangeRandom(hPosRangeY[0], hPosRangeY[1]) + 'px',
          transform: this.getRotate()
        }
      }
    }

    // 把剔除掉的中心的图片和中上的图片重新放回数组中
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) { // 如果上方有一张图片，把这张图片插入原数组中
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0])
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })
    // debugger

  }
  // 是否在中间 
  center (Index) {
    return function () {
      this.rearrange(Index)
    }.bind(this)
  }

  // 组件加载后 为每张图片计算位置的取值范围
  componentDidMount () {
    // 首先拿到舞台的大小
    var stageDom = ReactDOM.findDOMNode(this.refs.stage),
      stageW = stageDom.scrollWidth, // scrollWidth实际宽度 不包括滚动条  clientWidth可视高度 offsetWidth实际宽度 包括滚动条
      stageH = stageDom.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2)
    var imgFigureDom = ReactDOM.findDOMNode(this.refs.imgFigure0),
      imgW = imgFigureDom.clientWidth,
      imgH = imgFigureDom.clientHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2)
    // 中间图片
    this.Constant.centerPos.left = halfStageW - halfImgW
    this.Constant.centerPos.top = halfStageH - halfImgH
    // 左右图片取值范围
    this.Constant.hPosRange.leftSecX[0] = -halfImgW
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW
    this.Constant.hPosRange.y[0] = -halfImgH
    this.Constant.hPosRange.y[1] = stageH - halfImgH
    // 中间上部图片取值范围
    this.Constant.vPosRange.x[0] = halfStageW - imgW
    this.Constant.vPosRange.x[1] = halfStageW
    this.Constant.vPosRange.topY[0] = -halfImgH
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3
    this.rearrange(0)
  }
  render () {
    var imgList = []
    var controller = []
    imageDatas.forEach(function (value, index) {
      // 如果状态没有初始化  那么久初始化状态对象
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0,
            transform: ''
          },
          isInverse: false, // 判断正反面
          isCenter: false // 判断是否在中间
        }
      }

      imgList.push(<Figure
                     key={index}
                     data={value}
                     ref={'imgFigure' + index}
                     arrange={this.state.imgsArrangeArr[index]}
                     inverse={this.inverse(index)}
                     Center={this.center(index)} />);
        controller.push(<ControllerUnit key={index}
            data={value}
            arrange={this.state.imgsArrangeArr[index]}
            inverse={this.inverse(index)}
            Center={this.center(index)}/>)

    
    }.bind(this))
    return (<section className='stage' ref='stage'>
              <section className='img-sec'>
                {imgList}
              </section>
              <nav className='controller-nav'>
                {controller}  
              </nav>
            </section>
    )
    // }

  }
}
export default Stage
var a = { aa: 10 } ;
var b = { bb: 20 } ;
