(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{125:function(e,a,t){},129:function(e,a,t){},131:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(28),o=t(18),i=t(12),s=t(29),d=t(30),l=t(34),m=t(31),u=t(35),p=t(13),v=t.n(p),f=(t(125),t(14));function b(){var e=Object(i.a)(["\n        .book-insides {\n          margin-top: -","vmin;\n        }\n      "]);return b=function(){return e},e}function k(){var e=Object(i.a)(["\n        .book-insides {\n          margin-top: -","vmin;\n        }\n      "]);return k=function(){return e},e}var g=function(e){function a(e){var t;Object(s.a)(this,a),(t=Object(l.a)(this,Object(m.a)(a).call(this,e))).handleAdvancePage=function(){var e=t.state.currentSpread;t.setState({currentSpread:e+=1,direction:"forward"})},t.handleBackPage=function(){var e=t.state.currentSpread;e>0&&t.setState({currentSpread:e-=1,direction:"back"})};var n=e.bookSpread,r=void 0===n?0:n;return t.state={currentSpread:r,direction:"forward",stateBookText:""},t}return Object(u.a)(a,e),Object(d.a)(a,[{key:"render",value:function(){for(var e=this.state,a=e.currentSpread,t=e.direction,n=e.stateBookText,c=this.props,i=c.coverImage,s=c.bookText,d=void 0===s?n:s,l=c.spreads,m=r.a.createElement("div",{className:"back-cover"},r.a.createElement("div",{className:"back-cover-inside"}),r.a.createElement("div",{className:"back-cover-outside"})),u=a>0?{transform:"rotateY(-180deg)",zIndex:1}:{},p=a>0?{left:"45vmin"}:{},g=l||d.length/1800,E=Math.round(g),h=[],N=0;N<E;N+=1){var j=2*N!==0?2*N+1:1,O=j+1,S=108*N+.1,w=S+54-.1,y=a===N?"flipping":a+1>N?"flipped":"to_flip",x="forward"===t?"flipped"===y?2:"to_flip"===y?0:1:"flipped"===y?1:"to_flip"===y?1:2,B=f.a.div(k(),S),I=f.a.div(b(),w);Math.abs(a-N)<3&&h.push(r.a.createElement("div",{key:"spread"+N,className:"page-container "+y,"data-spread":N,style:{zIndex:x}},r.a.createElement("div",{className:"front page","data-page":j,onClick:this.handleAdvancePage},r.a.createElement(B,null,r.a.createElement(v.a,{className:"book-insides",source:d}))),r.a.createElement("div",{className:"back page","data-page":O,onClick:this.handleBackPage},r.a.createElement(I,null,r.a.createElement(v.a,{className:"book-insides",source:d})))))}return r.a.createElement("div",{className:"book-container","data-spread":a,style:Object(o.a)({},p)},r.a.createElement("div",{className:"front-cover",style:Object(o.a)({},u)},r.a.createElement("div",{className:"bottom-corner"}),r.a.createElement("div",{className:"front-cover-outside",style:{backgroundImage:"url("+i+")"}}),r.a.createElement("div",{className:"front-cover-inside",onClick:this.handleBackPage})),h,m)}}]),a}(n.Component);t(129);var E=document.getElementById("root");Object(c.render)(n.createElement(function(){return n.createElement("div",{className:"book-stage"},n.createElement(g,{bookSpread:0,spreads:20}))},null),E)},38:function(e,a,t){e.exports=t(131)}},[[38,2,1]]]);
//# sourceMappingURL=main.d68ac5ec.chunk.js.map