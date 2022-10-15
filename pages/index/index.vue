<template>
	<view class="container">
		<uni-section class="colin-section" title="服务器连接状态" type="circle">
			<view class="colin-body">
				<uni-badge v-show="connState" class="uni-badge-left-margin" text="连接正常" type="primary" />
				<!--<uni-badge class="uni-badge-left-margin" text="连接中..." type="success" />-->
				<uni-badge v-show="!connState" class="uni-badge-left-margin" text="连接异常" type="warning" />
			</view>
		</uni-section>
		
		<uni-section class="colin-section" title="设备信息列表" type="circle">
			<uni-grid :column="4" :highlight="true" @change="change">
							<uni-grid-item v-for="(deviceList, index) in 8" :index="index" :key="index">
								<view class="grid-item-box" style="background-color: #fff;">
									
									
								</view>
							</uni-grid-item>
						</uni-grid>
			
		</uni-section>
		
		<uni-section class="colin-section" title="设备操作区域" type="circle">
			<uni-section title="基本控制" type="line" padding>
				<view class="colin-body">
					<button class="button" type="primary" @click="">全开</button>
					<button class="button" type="default" @click="">全关</button>
					<button class="button" type="warn" @click="">急停</button>
				</view>
				
						
			</uni-section>
			<uni-section title="步进控制" type="line" padding>
						<uni-number-box @change="changeValue" />
						<button class="button" type="primary" @click="">执行</button>
			</uni-section>
			
		</uni-section>
		
		<uni-section class="colin-section" title="系统通知" subTitle="" type="circle">
					<uni-notice-bar show-icon scrollable
						text="平台正常运行中, 如有问题请联系系统管理员!" />
				</uni-section>
		
	</view>
</template>

<script>
	import {options,url,list} from '@/mqtt_config/mqttclient.js';
	var mqtt = require('mqtt/dist/mqtt');
	var client;
	export default {
		data() {
			return {
				connState: false,
				deviceList: ['设备1','设备2','设备3','设备4','设备5','设备6','设备7','设备8'],
				numberValue: 0,
			}
		},
		methods: {
			change(value) {
				this.numberValue = value
		    },
			connect(){
				var _this = this;
				client = mqtt.connect(url,options);
				client.on('connect',function(){
					_this.connState = true;
					client.subscribe(list,{
						qos:1
					},err=>{
						console.log(err || '订阅成功');
					});
				});
			},

		},
		onInit: {
			
		},
		//页面挂载完调用
		mounted() {
			this.connect();
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	.colin-section{
		margin-top: 10px;
	}
	.colin-body{
		flex-flow: row;
		justify-content: flex-start;
		padding: 10px;;
		
	}
	.button{
		margin-bottom: 10px;
	}
	
</style>
