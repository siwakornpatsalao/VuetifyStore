(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{456:function(t,e,r){var content=r(474);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(22).default)("36153cb4",content,!0,{sourceMap:!1})},457:function(t,e,r){var content=r(478);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(22).default)("bc0be98a",content,!0,{sourceMap:!1})},473:function(t,e,r){"use strict";r(456)},474:function(t,e,r){var n=r(21)((function(i){return i[1]}));n.push([t.i,".blue1[data-v-76175248]{background-color:#1c7b8b}.blue1[data-v-76175248],.red1[data-v-76175248]{font-family:Arial,sans-serif;font-weight:700;position:absolute;right:0;text-align:center;top:0}.red1[data-v-76175248]{background-color:red}.green1[data-v-76175248]{background-color:green;font-family:Arial,sans-serif;font-weight:700;right:0;text-align:center;top:0}.green1[data-v-76175248],.icon1[data-v-76175248]{position:absolute}.icon1[data-v-76175248]{bottom:0;font-size:50px;left:0}.thisYear[data-v-76175248]{background-color:#1a9e51;left:-15px;position:absolute;text-align:center;top:5px;transform:rotate(330deg)}.frame[data-v-76175248]{opacity:1}.frame[data-v-76175248]:hover{transform:scale(1.1);transition:transform .2s ease-in-out}",""]),n.locals={},t.exports=n},477:function(t,e,r){"use strict";r(457)},478:function(t,e,r){var n=r(21)((function(i){return i[1]}));n.push([t.i,".slide-item[data-v-b43d02b8]{align-items:center;display:flex;height:200px;justify-content:center;margin-right:20px}.head[data-v-b43d02b8]{cursor:pointer;opacity:1}.head[data-v-b43d02b8]:hover{transform:scale(1.1);transition:transform .2s ease-in-out}",""]),n.locals={},t.exports=n},497:function(t,e,r){"use strict";r.r(e);var n=r(418),o=r(453),l=r(564),c=r(430),d=r(190),f=r(281),m=r(552),h=r(462),v=r(557),x=r(463),_=(r(282),r(25),r(200),r(33)),w=(r(109),r(9),r(5),r(68),r(79),r(44),r(62),{name:"GamePage",data:function(){return{datas:[],search:"",genre:null,platform:null,sort:"",page:1,perPage:40}},created:function(){var t=this;return Object(_.a)(regeneratorRuntime.mark((function e(){var r,n,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!localStorage.getItem("Data")){e.next=7;break}r=JSON.parse(localStorage.getItem("Data")),console.log("hey"+r),t.datas=r,e.next=14;break;case 7:return e.next=9,t.$axios.get("/api/api1/games");case 9:n=e.sent,data=n.data,console.log("hey2"+data),data.sort((function(a,b){return a.id-b.id})),t.datas=data;case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.error(e.t0);case 19:case"end":return e.stop()}}),e,null,[[0,16]])})))()},computed:{filterList:function(){var t=this,e=(this.page-1)*this.perPage,r=e+this.perPage,n=this.datas.filter((function(data){return data.title.toLowerCase().includes(t.search.toLowerCase())}));return this.genre&&(n=n.filter((function(data){return data.genre===t.genre}))),this.platform&&(n=n.filter((function(data){return data.platform===t.platform}))),n.slice(e,r)},genres:function(){return this.datas.map((function(t){return t.genre}))},platforms:function(){return this.datas.map((function(t){return t.platform}))}},methods:{goTo:function(data){this.$router.push("/".concat(data.id))},sorted:function(){return"Alphabetic"==this.sort?this.datas.sort((function(a,b){return a.title<b.title?-1:a.title>b.title?1:0})):"Release Date"==this.sort?this.datas.sort((function(a,b){return new Date(a.release_date)-new Date(b.release_date)})):this.datas},update:function(t){this.page=t},reset:function(){this.datas.sort((function(a,b){return a.id-b.id})),this.search="",this.genre=null,this.platform=null,this.sort=null}},head:function(){return{title:"Game List"}}}),y=(r(473),r(90)),component=Object(y.a)(w,(function(){var t=this,e=t._self._c;return e("div",{staticStyle:{"margin-left":"80px"}},[e(h.a,[e(l.a,{attrs:{cols:"9"}},[e("div",[e(v.a,{staticStyle:{"max-width":"150px"},attrs:{label:"Show",items:["Alphabetic","Release Date"]},on:{change:t.sorted},model:{value:t.sort,callback:function(e){t.sort=e},expression:"sort"}})],1),t._v(" "),e("div",{staticClass:"container"},[e(c.a,[e(h.a,t._l(t.filterList,(function(data){return e(l.a,{key:data.id},[e(o.a,{attrs:{width:"220",color:"#121212"},on:{click:function(e){return t.goTo(data)}}},[e(f.a,{staticClass:"frame",attrs:{cover:"",src:data.thumbnail,width:"250.25",height:"270.66"}},[e(o.a,{class:{blue1:"PC (Windows)"==data.platform,red1:"Web Browser"==data.platform,green1:"PC (Windows)"!=data.platform&&"Web Browser"!=data.platform},attrs:{width:"60px"}},[e("p",[t._v(t._s("PC (Windows)"==data.platform?"PC":"Web Browser"==data.platform?"Web":"Web & PC"))])]),t._v(" "),"PC (Windows)"==data.platform?e(d.a,{staticClass:"icon1"},[t._v("mdi-monitor")]):t._e(),t._v(" "),"Web Browser"==data.platform?e(d.a,{staticClass:"icon1"},[t._v("mdi-web-box")]):t._e(),t._v(" "),"PC (Windows)"!=data.platform&&"Web Browser"!=data.platform?e(d.a,{staticClass:"icon1"},[t._v("mdi-controller")]):t._e(),t._v(" "),new Date(data.release_date).getFullYear()===(new Date).getFullYear()?e(o.a,{staticClass:"thisYear",attrs:{height:"20px",width:"85px"}},[e("p",[t._v("New")])]):t._e()],1),t._v(" "),e("span",{staticStyle:{"font-size":"9px","text-transform":"uppercase","letter-spacing":"1px"},attrs:{color:"grey"}},[t._v("Base Game")]),t._v(" "),e("p",{attrs:{size:"14px"}},[t._v(t._s(data.title))])],1)],1)})),1)],1)],1)]),t._v(" "),e(l.a,[e("div",{staticStyle:{"margin-left":"20px"}},[e("div",{staticStyle:{"margin-top":"85px"}},[e(n.a,{staticStyle:{"margin-bottom":"10px"},attrs:{color:"secondary"},on:{click:t.reset}},[t._v("Reset")]),t._v(" "),e(x.a,{staticStyle:{"max-width":"200px"},attrs:{"prepend-inner-icon":"mdi-magnify",outlined:"",placeholder:"Keywords"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),t._v(" "),e(v.a,{staticStyle:{"max-width":"200px"},attrs:{label:"Genre",items:t.genres},model:{value:t.genre,callback:function(e){t.genre=e},expression:"genre"}}),t._v(" "),e(v.a,{staticStyle:{"max-width":"200px"},attrs:{label:"Platform",items:t.platforms},model:{value:t.platform,callback:function(e){t.platform=e},expression:"platform"}})],1)])],1),t._v(" "),e("div",{staticClass:"text-center"},[e(m.a,{attrs:{length:Math.ceil(t.filterList/t.perPage),"total-visible":7},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)],1)}),[],!1,null,"76175248",null);e.default=component.exports},498:function(t,e,r){"use strict";r.r(e);var n=r(281),o=r(558),l=r(33),c=(r(109),r(282),r(44),{name:"headGame",data:function(){return{model:null,datas:[]}},created:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){var r,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/api/api1/games");case 3:r=e.sent,data=r.data,console.log(data),data.sort((function(a,b){return a.id-b.id})),t.datas=data.slice(0,10),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()},computed:{},methods:{goTo:function(data){this.$router.push("/".concat(data.id))}}}),d=(r(477),r(90)),component=Object(d.a)(c,(function(){var t=this,e=t._self._c;return e("div",[e(o.a,t._l(t.datas,(function(data){return e("v-slide-group-item",{key:data.id},[e("div",{staticClass:"slide-item"},[e(n.a,{staticClass:"head",attrs:{src:data.thumbnail},on:{click:function(e){return t.goTo(data)}}})],1)])})),1)],1)}),[],!1,null,"b43d02b8",null);e.default=component.exports},570:function(t,e,r){"use strict";r.r(e);var n=r(497),o=r(498),l={components:{ListGame:n.default,HeadGame:o.default}},c=r(90),component=Object(c.a)(l,(function(){var t=this,e=t._self._c;return e("div",[e("head-game"),t._v(" "),e("br"),t._v(" "),e("list-game")],1)}),[],!1,null,null,null);e.default=component.exports}}]);