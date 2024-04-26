<template>
  <div class="equipment-detail">
    <div class="top">
      <div class="equipment-info">
        <div class="header">
          <i class="icon-chi-lun-xiang"></i>
          设备信息
        </div>
        <div class="equipment-info-content">
          <div class="title">
            <span>{{equipment.name}}</span>
            <span>
              <i class="el-icon-bell" />
              设备检修日期临近，请联系工程师
            </span>
          </div>
          <div class="content">
            <div class="number">
              <p>设备编号</p>
              <p>{{equipment.number}}</p>
              <p>绑定车牌号</p>
              <p>{{ equipment.carNumber }}</p>
              <p>首次绑定时间</p>
              <p>{{ equipment.bindAt }}</p>
            </div>
            <div class="status">
              <p>使用寿命</p>
              <p>{{ equipment.limitedPeriod }}</p>
              <p>设备状态</p>
              <p>{{ equipment.deviceStatus }}</p>
              <p>推荐检修时间</p>
              <p>{{ equipment.maintainDate }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="history-trace">
        <div class="header">
          <i class="icon-trace"></i>
          历史轨迹
        </div>
        <div class="history-trace-content">
          <div class="trace-img"><img src="@/share/assets/images/trace1.png" /></div>
          <div class="summary">
            <div class="summary-title">概要</div>
            <div class="summary-content">
              <p class="summary-content-item">
                <label>行驶里程</label>
                <span>14 km</span>
              </p>
              <p class="summary-content-item">
                <label>最大时速</label>
                <span>117.4 km/h</span>
              </p>
              <p class="summary-content-item">
                <label>行驶时长</label>
                <span>8分35秒</span>
              </p>
              <p class="summary-content-item">
                <label>平均时速</label>
                <span>61.86 km/h</span>
              </p>
              <p class="summary-content-item">
                <label>停留时长</label>
                <span>1小时44分钟</span>
              </p>
              <p class="summary-content-item">
                <label>点火时长</label>
                <span>10分10秒</span>
              </p>
              <p class="summary-content-item">
                <label>起始地址</label>
                <span>湖南省岳阳市岳阳县新开镇岳阳南收费站(G0421许广高速入口),距岳阳南收费站(G0421许广高速出口)27米</span>
              </p>
              <p class="summary-content-item">
                <label>结束地址</label>
                <span>湖南省岳阳市岳阳县荣家湾镇岳阳南大队湖南省高速公路交通警察局岳阳支队岳阳南大队,距岳阳南大队18米</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="video-monitor">
        <div class="header">
          <i class="icon-video"></i>
          视频监控
        </div>
        <div class="video-monitor-content">
          <div class="video-img"><img src="@/share/assets/images/video1.png" /></div>
          <div class="video-img"><img src="@/share/assets/images/video1.png" /></div>
          <div class="video-img"><img src="@/share/assets/images/video1.png" /></div>
          <div class="video-img"><img src="@/share/assets/images/video1.png" /></div>
          <div class="video-img"><img src="@/share/assets/images/video1.png" /></div>
          <div class="video-img"><img src="@/share/assets/images/video2.png" /></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'equipmentDetail',
    data () {
      return {
        equipment: {
          name: '搬运机器人',
          number: 'LXH-001',
          carNumber: '川A67678',
          limitedPeriod: '24个月',
          bindAt: '2024/04/01 12:00',
          deviceStatus: '在线',
          maintainDate: '2024/05/01 12:00',
        },
      }
    },
  }
</script>
<style lang="scss" scoped>
@import "src/share/styles/variable";
@import "src/share/styles/mixin";

.equipment-detail {
  height: 100vh;
  overflow: scroll;
  padding: 15px;
  .top {
    height: 400px;
    display: flex;
    .equipment-info {
      width: 450px;
      padding: 15px 30px;
      box-shadow: $list-shadow-box;
      background-color: $color-white;

      .header {
        i {
          background-color: #bed50f;
        }
      }

      .equipment-info-content {
        padding: 20px 0;

        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;

          span:nth-of-type(1) {
            color: $color-dark-blue;
            font-size: 16px;
            font-weight: 600;
            width: 30%;
          }

          span:nth-of-type(2) {
            color: $color-warning;
            text-align: right;
            width: 70%;
            @include ellipsis-text();

            i {
              font-size: 16px;
              color: $color-light-grey;
              position: relative;
            }
            i:after {
              content: '';
              position: absolute;
              right: 0;
              top: 0;
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background-color: $color-warning;
            }
          }
        }

        .content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 20px;

          .number, .status {
            width: 50%;

            & > p {
              @include ellipsis-text;
            }

            p:nth-child(2n+1) {
              font-size: 16px;
              color: $color-light-grey;
            }

            p:nth-child(2n) {
              font-size: 16px;
              font-weight: 600;
              line-height: 30px;
              color: $color-pale-black;
              margin-bottom: 10px;
            }

            p:nth-last-child(1) {
              margin-bottom: 0;
            }
          }
        }
      }
    }
    .history-trace {
      width: calc(100% - 450px);
      margin-left: 15px;
      padding: 15px 30px;
      box-shadow: $list-shadow-box;
      background-color: $color-white;

      .header {
        i {
          background-color: $color-abnormal;
        }
      }

      .history-trace-content {
        padding: 20px 0;
        height: 100%;
        display: flex;
        .trace-img {
          flex: 1;
          height: calc(100% - 20px);
          img {
            width: 100%;
            height: 100%;
          }
        }
        .summary {
          width: 300px;
          margin-left: 15px;

          .summary-title {
            font-weight: 600;
          }
          .summary-content {
            margin-top: 10px;
            &-item {
              display: flex;
              align-items: center;
              margin-bottom: 10px;

              label {
                flex: 2;
              }
              span {
                flex: 3;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
  .bottom {
    margin-top: 15px;
    padding: 15px 30px;
    box-shadow: $list-shadow-box;
    background-color: $color-white;

    .header {
      i {
        background-color: $color-shell-pale-yellow;
      }
    }
    .video-monitor-content {
      padding: 20px 0;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      .video-img {
        width: 33.33%;
        img {
          width: 100%;
        }
      }
    }
  }
  .header {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    font-size: 20px;
    font-weight: 600;
    color: $color-pale-black;
    border-bottom: 1px solid $color-pale-grey;

    i {
      display: inline-block;
      margin-right: 13px;
      padding: 5px;
      border-radius: 5px;
      color: $color-white;
    }
  }
}
</style>
