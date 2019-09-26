const presets = [
   [
     "@babel/env",
     {
       targets: {
         edge: "11",
         firefox: "50",
         chrome: "47",
         safari: "10.1",
       },
       useBuiltIns: "usage",
       "corejs":2
     },
   ],
 ];
 
 module.exports = { presets };