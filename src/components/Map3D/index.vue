<template>
  <div id="map3D-container" :ref="refName">map3D</div>
</template>

<script>
import {  getCurrentInstance, onMounted, onUnmounted, nextTick } from 'vue';
import { debounce } from '@/utils/utils.js';

export default {
  name: 'Map3D',
  props: {
    options: Object,
  },
  setup(props) {
    const refName = 'Map3D';
    // const baseImg = '../../assets/images/zoom-1.png';
    const baseImg = import.meta.globEager("../../assets/images/zoom-2.png")["../../assets/images/zoom-2.png"].default;
    // const baseImg = require('../../assets/images/zoom-1.png');
    const scanImg = import.meta.globEager("../../assets/images/zoom-1.png")["../../assets/images/zoom-1.png"].default;
    const config = {
      // 扫描线条配置
      lineWidth: 0.5, // 扫描线条宽度
      color: '#01CADE', // 线条颜色
      levels: 1,
      intensity: 3, // 强度
      threshold: 0.01,
    };

    let context, dom, myChart, canvas;
    const image = (url) => {
      return new Promise(function (resolve) {
        var image = new Image();
        image.src = url;
        image.onload = function () {
          var canvas = document.createElement('canvas');
          canvas.width = image.width / 8;
          canvas.height = image.height / 8;
          var contextCanvas = canvas.getContext('2d');
          contextCanvas.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(contextCanvas.getImageData(0, 0, canvas.width, canvas.height));
        };
      });
    };
    const initCharts = (opt) => {
      var contourChart = echarts.init(document.createElement('canvas'), null, {
        width: 4096,
        height: 2048,
      });
      var img = new echarts.graphic.Image({
        style: {
          image: opt.image,
          x: -1,
          y: -1,
          width: opt.image.width + 2,
          height: opt.image.height + 2,
        },
      });
      contourChart.getZr().add(img);
      opt.onupdate = function () {
        img.dirty();
      };
      myChart.setOption({
        globe: {
          top: '5%',
          globeRadius: 130,
          baseTexture: baseImg,
          displacementScale: 0.05,
          displacementQuality: 'high',
          shading: 'realistic',
          realisticMaterial: {
            roughness: 0.2,
            metalness: 0,
          },

          postEffect: {
            enable: true,
            depthOfField: {
              // enable: true
            },
          },
          light: {
            ambient: {
              intensity: 1,
            },
            main: {
              // 主光源
              intensity: 0,
              shadow: false,
            },
            /*ambientCubemap: {
                        texture: ROOT_PATH + 'data-gl/asset/lake.hdr',
                        exposure: 1,
                        diffuseIntensity: 0.5,
                        specularIntensity: 2
                    }*/
          },
          viewControl: {
            center: [0, 0, 0],
            alpha: 30,
            beta: 160,
            autoRotate: true,
            autoRotateAfterStill: 10,
            distance: 240,
            autoRotateSpeed: 4,
            targetCoord: [100.405051, 30.912916],
          },
          layers: [
            {
              type: 'blend',
              blendTo: 'emission',
              texture: contourChart,
              intensity: config.intensity,
            },
          ],
        },
        series: [
          {
            // 点
            type: 'scatter3D',
            // type: 'scatter',
            coordinateSystem: 'globe',
            blendMode: 'source-over',
            showEffectOn: 'render',
            zlevel: 10,
            effectType: 'ripple',
            // symbol:"path://data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAllBMVEX8xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38xV38v0v7sSX7rx/7sSYAAACsGEOsAAAALHRSTlMAAiJCWWRhViBYZiEBN22Wsr+xlYS8wr1bwSRuy+v8JUT7RVpjvlfMA8CwO6U37FgAAAABYktHRDHZ2x1yAAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH5QUYCTchBK9bdAAAAMxJREFUGNNtkdsSgjAMREMFLyuKoAZFQQXvVvT/v84UOoCO+9Se6c4mWyIjR/Vcrz/oKYcaDUewGo0t8ifoaOJX0LBpMAvDaD411DAlh8WSK8ULuSjJWAlbs9Va6MqhBNjEzNs0y9KtvN0AO9oDc2EHLToIDYCcCiBiTvWzLJ86ZZ4BBR2BkDnT5etV6ow5BDzq/8CTgefG/q7skbHXQZc66GKD/o70Z/irXTP+XrMp5Ha6t4WQ/+hW9/Bto+O2ZNVW7yS563luntTf8QEebBqPN9S75gAAAABJRU5ErkJggg==",
            symbolSize: 15,
            rippleEffect: {
              period: 4,
              scale: 4,
              brushType: 'fill',
            },
            hoverAnimation: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.data[3] + '\n' + params.data[4] + '\n' + params.data[5];
                  },
                  distance: 10,
                },
              },
              emphasis: {
                label: {
                  show: true,
                  formatter: function (params) {
                    return params.data[3] + '\n' + params.data[4] + '\n' + params.data[5];
                  },
                  distance: 10,
                },
              },
            },
            data: [
              [116.405051, 39.912916, 1, '1', '北京市', '啦啦啦啦啦啦a'],
              [104.071388, 30.639088, 2, '2', '四川省', '啦啦啦啦啦啦b'],
              [121.493628, 31.241707, 3, '3', '上海市', '啦啦啦啦啦啦c'],
            ],
            // data:data,
          },
        ],
      });
      myChart.dispatchAction({
        type: 'showTip', // 根据 tooltip 的配置项显示提示框。
        seriesIndex: 0,
        // dataIndex: 0
      });
    };
    const initMap = () => {
      dom = context.$refs[refName];
      myChart = echarts.init(dom);
      canvas = document.createElement('canvas');
      console.log('canvas', canvas);
      canvas.width = 4096;
      canvas.height = 2048;
      let contextCanvas = canvas.getContext('2d');
      contextCanvas.lineWidth = config.lineWidth;
      contextCanvas.strokeStyle = config.color;
      contextCanvas.fillStyle = config.color;
      contextCanvas.shadowColor = config.color;
      image(scanImg).then(function (image) {
        var m = image.height,
          n = image.width,
          values = new Array(n * m),
          contours = d3.contours().size([n, m]).smooth(true),
          projection = d3.geoIdentity().scale(canvas.width / n),
          path = d3.geoPath(projection, contextCanvas);
        for (var j = 0, k = 0; j < m; ++j) {
          for (var i = 0; i < n; ++i, ++k) {
            values[k] = image.data[k << 2] / 255;
          }
        }
        var opt = {
          image: canvas,
        };
        var results = [];
        function update(threshold, levels) {
          contextCanvas.clearRect(0, 0, canvas.width, canvas.height);
          var thresholds = [];
          for (var i = 0; i < levels; i++) {
            thresholds.push((threshold + (1 / levels) * i) % 1);
          }
          results = contours.thresholds(thresholds)(values);
          redraw();
        }
        function redraw() {
          results.forEach(function (d, idx) {
            contextCanvas.beginPath();
            path(d);
            contextCanvas.globalAlpha = 1;
            contextCanvas.stroke();
            if (idx > (config.levels / 5) * 3) {
              contextCanvas.globalAlpha = 0.01;
              contextCanvas.fill();
            }
          });
          opt.onupdate();
        }
        d3.timer(function (t) {
          var threshold = (t % 10000) / 10000;
          update(threshold, 1);
        });
        initCharts(opt);
        update(config.threshold, config.levels);
      });
    };
 
    onMounted(async () => {
      context = getCurrentInstance().ctx;
      initMap();
    });

    return {
      refName,
    };
  },
};
</script>

<style lang="scss">
#map3D-container {
  width: 100%;
  height: 100%;
}
</style>
