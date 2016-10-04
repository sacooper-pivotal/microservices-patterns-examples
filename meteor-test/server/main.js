import { Meteor } from 'meteor/meteor';
//import Eureka from 'eureka-js-client';

const Eureka = require('eureka-js-client').Eureka;
const client = new Eureka({
  // application instance information 
  instance: {
    app: 'meteortestapp',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      '$' : 8080,
      '@enabled' : true
    },
    vipAddress: 'jq.test.something.com',
    dataCenterInfo: {
      name: 'MyOwn',
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo'
    }
  },
  eureka: {
    // eureka server host / port 
    host: 'sam-eureka-server.cfapps.pez.pivotal.io',
    port: 80,
    servicePath: "/eureka/apps",
    fetchRegistry: true
  }
});  
const eurekaAppInfo = [];


Meteor.startup(() => {
  client.start(); 

  //get app info from Eureka after 1 second
  setTimeout(() => {
    eurekaAppInfo.push(client.getInstancesByAppId('javaclient'));
  },1000);

  //console.log(eurekaAppInfo);
});

