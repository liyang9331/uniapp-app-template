<template>
  <view>
    <u-navbar :autoBack="true" :placeholder="true" class="navbar">
      <!-- 通过自定义插槽修改顶部导航栏 -->
      <view slot="left" class="fdr-c tabbar-left">
        <u--image
          src="/static/img/navbar/back.png"
          width="22rpx"
          height="41rpx"
          style="margin-right: 21rpx"
        ></u--image>
        <text class="tt">服务注销</text>
      </view>
    </u-navbar>
    <view class="cancellation">
      <view style="margin-top: 60rpx">
        <text class="text" style="font-size: 18px; color: #000000"
          >您即将注销综合视频管理平台服务</text
        >
      </view>

      <view class="tips">
        <text
          class="paragraph-style"
          style="color: #e43d33; margin-bottom: 30rpx"
          >以下数据一旦注销后将无法恢复，请谨慎操作</text
        >
        <text class="paragraph-style" style="margin-bottom: 15rpx"
          >服务数据包括产品内保存的资料，以及开启的相应权限及服务</text
        >
        <text class="paragraph-style" style="margin-bottom: 15rpx"
          >·您的账号相关的资料，例如头像、昵称等</text
        >
        <text class="paragraph-style" style="margin-bottom: 15rpx"
          >·您操作app产生的相关数据</text
        >
      </view>
    </view>
    <view class="button" @click="cancellation()">
      <text>我已知悉，确认注销</text>
    </view>
  </view>
</template>

<script>
import * as Api from "@/api/user.js";
export default {
  data() {
    return {
      showSex: false,
      defaultAvatar: "/static/img/user/defaultAvatar.jpg",
      passWord: "",
      userInfo: {},
    };
  },
  created() {},
  onLoad() {
    // this.getUserInfo();
  },
  methods: {
    // 服务注销
    cancellation() {
      uni.showModal({
        title: "确认",
        content: "您确认注销吗？",
        success: function (res) {
          if (res.confirm) {
            Api.accountCancel({}).then((res) => {
              uni.showToast({
                title: "注销成功",
                icon: "success",
                complete: (res) => {
                  setTimeout(() => {
                    // 路由跳转，关闭所有页面
                    uni.reLaunch({
                      url: "../login/login",
                    });
                  }, 1500);
                },
              });
            });
          } else if (res.cancel) {
            // 用户点击取消
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cancellation {
  font-size: 28rpx;
  margin-top: 30rpx;
  padding-left: 30rpx;
}

.tips {
  margin-top: 15px;
  border-radius: 5px;
  background-color: rgba(255, 192, 203, 0.3);
  padding: 20rpx 10rpx;
  margin-right: 30rpx;
  color: #000000;
}

.paragraph-style {
  font-size: 28rpx;
  display: block;
}

.button {
  width: 690rpx !important;
  height: 70rpx;
  background: rgba(42, 104, 252, 1);
  opacity: 1;
  border-radius: 14rpx;
  color: #ffffff;
  margin: auto;
  margin-top: 264rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
