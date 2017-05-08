require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

let imageDatas = require('../data/imageDatas.json');

//自执行函数，将图片名信息转成图片url信息
imageDatas = (
    function genImageUrl(imageDatasArr) {
        for(var i = 0,j = imageDatasArr.length; i<j; i++){
            var singleImageData = imageDatasArr[i];

            singleImageData.imageUrl = require('../images/'+singleImageData.fileName);

            imageDatasArr[i]=singleImageData;
        }
        return imageDatasArr;
    }
)(imageDatas);

    var ImgFigure = React.createClass({
        render:function() {
            return (
                <figure className="img-figure">
                    <img src = {this.props.data.imageUrl} alt={this.props.data.title}/>
                    <figcaption>
                        <h2 className="img-title">{this.props.data.title}</h2>
                    </figcaption>
                </figure>
            );
        }
    });



class AppComponent extends React.Component {

    Constant = {
        centerPos: {
            left: 0,
            right: 0
        },
        hPosRange: {     //水平方向取值范围
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        vPosRange: {     //垂直方向的取值范围
            x: [0, 0],
            topY: [0, 0]
        }
    }


    componentDidMount(){
        //首先拿到舞台的大小
        var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW/2),
            halfStageH = Math.ceil(stageH/2);

        // 拿到一个图片的大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW/2),
            halfImgH = Math.ceil(imgH/2);

        //计算中心图片的位置
        this.Constant.centerPos = {
            left : halfStageW - halfImgW,
            top : halfStageH - halfImgH
        }

        

    }



  render() {
      var controllerUnits = [],imgFigures = [];

      imageDatas.forEach(function(value,index) {
          imgFigures.push(<ImgFigure key={index} ref={'imgFigure'+index} data = {value} />);
      });

      return (
        <section className="stage" ref="stage">
              <section className="img-sec">
              {imgFigures}
          </section>
          <nav className="controller-nav">
              {controllerUnits}
          </nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
