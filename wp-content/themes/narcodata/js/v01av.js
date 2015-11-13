var visualizacion_v=function(){function t(){V.attr("transform","translate(0,"+H+")");var t=queue(1);t.defer(window.d3.tsv,"tsv/presidentes.tsv",function(t){return{id:t.id,nombre:t.nombre,inicio:+t.inicio,fotografia:"img/"+t.fotografia,nombrecorto:t.nombrecorto}}),t.defer(window.d3.tsv,"tsv/carteles.tsv",function(t){return{id:t.id,nombre:t.nombre,nombrelargo:t.nombrelargo,fila:+t.fila,mitad:"1"===t.mitad?!0:!1,fondo:t.fondo,color:t.color,borde:t.borde,inicio:+t.inicio,fin:+t.fin,porcentaje:+t.porcentaje,pleca:"1"===t.pleca?!0:!1,lineaini:t.lineaini,lineafin:t.lineafin,inicial:t.inicial,lideres:t.lideres.split("|"),x:0,y:0,w:0,h:0,xi:0,xf:0}}),t.defer(window.d3.tsv,"tsv/origenes.tsv",function(t){return{origen:t.origen,destino:t.destino,offset:+t.offset}}),t.defer(window.d3.tsv,"tsv/federaciones.tsv",function(t){return{id:t.id,nombre:t.nombre,lideres:t.lideres.split("|"),inicio:+t.inicio,fin:+t.fin,color:t.color,fuente:t.fuente,h:0,x:0,y:0}}),t.defer(window.d3.tsv,"tsv/federacionescarteles.tsv",function(t){return{id:t.id,aliados:t.aliados.split("|"),involucrados:t.involucrados.split("|"),y:0,x:560}}),t.defer(window.d3.tsv,"tsv/celulas.tsv",function(t){return{cartel:t.cartel,presidente:t.presidente,total:+t.total}}),t.awaitAll(e)}function e(t,e){N=e[0],M=e[1],j=e[2],$=e[3],C=e[4],L=e[5],L=window._.select(L,function(t){return t.total>0}),window._.each(C,function(t){t.y="federacion-1"===t.id?30:10});var i=window._.indexBy(M,"fila"),a=window._.pluck(i,"fila"),l=(x+v)*a.length+h,o=w*N.length;P.append("rect").attr("fill","#cdcdcd").attr("x",0).attr("y",0).attr("height",H).attr("width",h),P.append("rect").attr("fill","#58595b").attr("x",h).attr("y",0).attr("height",H).attr("width",l);var f=V.append("rect").attr("class","telon").attr("x",0).attr("y",0).attr("width","100%").attr("height","100%").style("fill","#ffffff");n(),generaFederaciones(),r(),c(),s(),p(),ajustaCarteles(),d(),generaTooltips(),B.attr("viewBox","0 0 "+A+" "+(o+H)),P.append("text").attr("y",H/2+6).attr("x",A/2).style("stroke","#ffffff").style("fill","#ffffff").style("text-transform","uppercase").style("font-size",18).style("font-family",'"Helvetica Neue",Helvetica,Arial,sans-serif').style("letter-spacing",5).html("Cárteles"),S.selectAll("line, path, text").style("opacity",0),E.selectAll("rect, text").style("opacity",0),f.transition().duration(1e3).attr("x",l).each("end",function(){S.selectAll("line, path, text").transition().duration(500).style("opacity",1),E.selectAll("rect, text").transition().duration(500).style("opacity",1)}).remove()}function n(){W.selectAll("rect").data(N).enter().append("rect").attr("y",function(t,e){return e*w}).attr("x",0).attr("height",w).attr("width",h).attr("fill","#000000").style("stroke","#ffffff").style("stroke-width",2),W.selectAll("text.periodo.inicio").data(N).enter().append("text").attr("class","periodo inicio").attr("y",function(t,e){return i(e)}).attr("x",_).style("font-size","24px").style("font-weight","bold").style("font-family",'"Helvetica Neue", Helvetica, Arial, sans-serif').attr("fill","#ffffff").attr("text-anchor","middle").text(function(t){return t.inicio}),W.selectAll("text.periodo.inter").data(N).enter().append("text").attr("class","periodo inter").attr("y",function(t,e){return i(e)+23}).attr("x",_).style("font-size","24px").style("font-weight","bold").style("font-family",'"Helvetica Neue", Helvetica, Arial, sans-serif').attr("fill","#ffffff").attr("text-anchor","middle").text("a"),W.selectAll("text.periodo.fin").data(N).enter().append("text").attr("class","periodo fin").attr("y",function(t,e){return i(e)+50}).attr("x",_).style("font-size","24px").style("font-weight","bold").style("font-family",'"Helvetica Neue", Helvetica, Arial, sans-serif').attr("fill","#ffffff").attr("text-anchor","middle").text(function(t){var e=t.inicio+6;return"EPN"==t.id&&(e=2014),e}),W.selectAll(".fotografia.presidente").data(N).enter().append("svg:image").attr("width",b).attr("height",b).attr("class","presidente fotografia").attr("xlink:href",function(t){return t.fotografia}).attr("y",function(t,e){return e*w+ +k}).attr("x",function(t){return(h-b)/2})}function i(t){return t*w+2*k+b+23}function r(){var t=N.length+1,e=0,n=(x+v)*M.length,i=1;for(i=1;t>=i;i++)X.append("line").style("stroke","#000000").style("stroke-width",1).style("opacity",1).attr("y1",e).attr("x1",h).attr("y2",e).attr("x2",h+n).style("stroke-dasharray","1,3"),e=i*w}function a(){var t=window._.min(N,function(t){return t.inicio});return t.inicio}function l(t){return Math.ceil(x*t/100)}function o(t){return Math.ceil((x-t)/2)}function c(){var t=a(),e=0,n=0,i=0,r=0,c=0,s=0,f=0,d=0;window._.each(M,function(a){e=h+(x+v)*a.fila-x,a.mitad&&(e+=x/2),i=l(a.porcentaje),f=e+o(i),s=f+i,r=(a.inicio-t)*y,c=(a.fin-t)*y,n=r,d=c-r,a.x=e,a.y=n,a.w=i,a.h=d,a.xf=s,a.xi=f}),R.selectAll("rect.cartel").data(M).enter().append("rect").attr("class",function(t){return"cartel "+t.id}).attr("x",function(t){return t.xi}).attr("y",function(t){return t.y}).attr("width",function(t){return t.w}).attr("height",function(t){return t.h}).attr("fill",function(t){return t.fondo}).attr("stroke",function(t){return t.fondo}).attr("stroke-width",1)}function s(){var t=(2*u(m),window._.select(M,function(t){return""!==t.inicial}));S.selectAll("text.cartel").data(t).enter().append("text").attr("class","cartel").attr("class",function(t){return"cartel "+t.id}).attr("fill","#ffffff").style("font-weight","bold").style("font-family",'"Helvetica Neue", Helvetica, Arial, sans-serif').style("font-size",12).attr("text-anchor","middle").attr("y",function(t){return t.y+Math.ceil(t.h/2)+q}).attr("x",function(t){return t.xi+Math.ceil(t.w/2)}).text(function(t){return t.inicial})}function f(t){var e=window._.select(M,function(e){return""!==e[t]}),n=window._.pluck(e,t);return n=window._.uniq(n)}function d(){var t=f("lineaini"),e=[],n=0,i=0,r=0,a={},l=[];window._.each(t,function(t){e=window._.select(M,{lineaini:t}),a=window._.min(e,"y"),n=a.y,a=window._.min(e,"xi"),i=a.xi,a=window._.max(e,"xf"),r=a.xf,l.push({y1:n,y2:n,x1:i,x2:r})}),t=f("lineafin"),window._.each(t,function(t){e=window._.select(M,{lineafin:t}),a=window._.min(e,"y"),n=a.y+a.h,a=window._.min(e,"xi"),i=a.xi,a=window._.max(e,"xf"),r=a.xf,l.push({y1:n,y2:n,x1:i,x2:r})}),S.selectAll("line.pleca").data(l).enter().append("line").attr("class","pleca").style("stroke","#000000").style("stroke-width",g).style("opacity",1).attr("y1",function(t){return t.y1}).attr("x1",function(t){return t.x1}).attr("y2",function(t){return t.y2}).attr("x2",function(t){return t.x2});var o=window.d3.svg.symbol().type("triangle-up").size(m),c=u(m),s=x/2,d=window._.select(M,{pleca:!0});S.selectAll("path.pleca").data(d).enter().append("path").attr("d",o).attr("class","pleca").attr("transform",function(t){return"translate("+(t.x+s)+","+(t.y+c)+"), rotate(180)"});var p=[],y=[],w=c,h=null,v=null,_=[];window._.each(j,function(t){_=window._.select(M,{id:t.destino}),v=window._.min(_,"inicio"),h=window._.find(M,function(e){return e.id===t.origen&&e.inicio<=v.inicio&&v.inicio<=e.fin}),p.push({y1:v.y-10,y2:v.y+g/2,x1:h.xi+h.w/2+t.offset,x2:h.xi+h.w/2+t.offset}),v.xi>=h.xi?(p.push({y1:v.y,y2:v.y,x1:h.xi+h.w/2+t.offset,x2:v.xi-w}),y.push({y:v.y,x:v.xi,o:-w,rot:90})):(p.push({y1:v.y,y2:v.y,x1:h.xi+h.w/2+t.offset,x2:v.xf+w}),y.push({y:v.y,x:v.xf,o:w,rot:-90}))}),S.selectAll("line.flecha").data(p).enter().append("line").attr("class","flecha").style("stroke","#000000").style("stroke-width",g).style("opacity",1).attr("x1",function(t){return t.x1}).attr("y1",function(t){return t.y1}).attr("x2",function(t){return t.x2}).attr("y2",function(t){return t.y2}),S.selectAll("path.flecha").data(y).enter().append("path").attr("d",o).attr("class","flecha").attr("transform",function(t){return"translate("+(t.x+t.o)+","+t.y+"), rotate("+t.rot+")"})}function u(t){var e=Math.sqrt(3)/2,n=Math.sqrt(e*t*2);return Math.floor(n/2)-2}function p(){var t=[],t=window._.select(M,function(t){return""!==t.inicial});E.selectAll("circle.etiqueta").data(t).enter().append("circle").attr("class",function(t){return"etiqueta "+t.id}).style("fill",function(t){return t.color}).style("stroke",function(t){return t.borde}).attr("stroke-width",2).attr("cx",function(t){return t.cx=t.xi+t.w/2,t.cx}).attr("cy",function(t){return t.cy=t.y+t.h/2-q,t.cy}).attr("r",z)}var y=26,w=6*y,x=50,h=70,v=4,m=200,g=5,_=35,A=0,b=50,k=10,H=40,z=18,q=2,N=[],M=[],j=[],$=[],C=[],L=[],T=window.d3.select("#contenedor01av"),B=T.append("svg").attr("preserveAspectRatio","xMidYMid").attr("id","svg"),F=B.append("g").attr("transform","translate(0,"+H+")"),R=B.append("g").attr("transform","translate(0,"+H+")"),E=B.append("g").attr("transform","translate(0,"+H+")"),S=B.append("g").attr("transform","translate(0,"+H+")"),V=B.append("g"),W=B.append("g").attr("transform","translate(0,"+H+")"),X=B.append("g").attr("transform","translate(0,"+H+")"),Y=B.append("g").attr("transform","translate(0,"+H+")"),P=B.append("g");return ajustaCarteles=function(){var t=h+v,e=0,n=window._.pluck(M,"fila");n=window._.uniq(n),n.sort(function(t,e){return t-e}),window._.each(n,function(n){var i=0,r=0,a=0,l=window._.select(M,{fila:n}),o=window._.pluck(l,"id");o=window._.uniq(o),window._.each(o,function(e){var n=R.selectAll("rect.cartel."+e);n.each(function(t){t.w>i&&(i=t.w,r=t.xi)});var l=E.selectAll("circle."+e);l.each(function(t){var e=this.getBBox();e.width>i&&(i=e.width,r=e.x)}),a=r-t,n.each(function(t){t.x=t.x-a,t.xi=t.xi-a,t.xf=t.xf-a}),E.selectAll("circle."+e).each(function(t){t.cx=t.cx-a})}),n!==e&&(t+=i+v)}),R.selectAll("rect.cartel").attr("x",function(t){return t.xi}),S.selectAll("text.cartel").attr("x",function(t){return t.xi+t.w/2}),E.selectAll("circle").attr("cx",function(t){return t.cx});var i=R.selectAll("rect.cartel");i.each(function(t){t.w+t.xi>A&&(A=t.w+t.xi)});var r=E.selectAll("circle");r.each(function(t){2*z+t.x>A&&(A=2*z+t.x)}),A+=v},generaTooltips=function(){var t=w*N.length,e=window.$(T.node()).height();R.selectAll("rect.cartel").each(function(t,e){var n=t.lideres.length<2?"Líder":"Líderes",i="";window._.each(t.lideres,function(t){i+="<li>"+t+"</li>"});var r=t.inicio,a=t.w/2,l=window._.findLast(N,function(t){var e=t.inicio+6;return t.inicio<=r&&e>=r}),o='<p class="tt-titulo vertical">'+t.nombrelargo+'</p><p class="tt-subtitulo vertical">'+n+" en el sexenio de "+l.nombrecorto+':</p><ul class="tt-lideres vertical">'+i+"</ul>";window.$(this).tooltipster({theme:"tooltipster tooltipsterv tooltipster-"+t.id,content:window.$(o),position:"top",offsetX:a,maxWidth:8*x,functionReady:ajustaTooltip})}),F.selectAll("rect.federacion").each(function(n,i){var r=n.lideres.length<2?"Líder":"Líderes",a="";window._.each(n.lideres,function(t){a+="<li>"+t+"</li>"});var l=n.h/2/(t/e),o='<p class="tt-titulo vertical">'+n.nombre+'</p><p class="tt-subtitulo vertical">'+r+':</p><ul class="tt-lideres vertical">'+a+"</ul>";window.$(this).tooltipster({theme:"tooltipster tooltipsterv tooltipster-"+n.id,content:window.$(o),position:"top",offsetX:2*A/(t/e),offsetY:l,maxWidth:8*x,functionReady:ajustaTooltip})})},ajustaTooltip=function(t,e){var n=window.$(e[0]).find("div").html();window.$(t).tooltipster("content",window.$(n))},generaFederaciones=function(){var t=a(),e=(x+v)*M.length;F.selectAll("rect.federacion").data($).enter().append("rect").attr("class",function(t){return"federacion "+t.id}).attr("y",function(e){return(e.inicio-t)*y}).attr("x",h).attr("height",function(t){return t.h=(t.fin-t.inicio)*y,t.h}).attr("width",e).style("fill",function(t){return t.color}),E.selectAll("text.federacion.titulo").data(C).enter().append("text").attr("class","federacion titulo").attr("text-anchor","middle").style("font-family",'"Helvetica Neue", Helvetica, Arial, sans-serif').style("font-size",18).style("font-weight","bold").style("text-transform","uppercase").attr("fill",function(t){var e=window._.find($,{id:t.id});return e.fuente}).attr("y",function(e){var n=window._.find($,{id:e.id}),i=(n.inicio-t)*y;return e.y+=i,"federacion-2"===n.id&&(e.y+=20),e.y}).attr("x",function(t){return t.x}).text(function(t){var e=window._.find($,{id:t.id});return e.nombre});var n=[578,604],i=[490,693];F.attr("id","gFederaciones"),E.attr("id","gEtiquetas");var r=window.d3.svg.symbol().type("cross").size(36);F.append("circle").attr("cx",n[0]+32).attr("cy",i[0]).attr("r",6).style("fill","#e1a632"),F.append("circle").attr("cx",n[0]+44).attr("cy",i[0]).attr("r",6).style("fill","#8fc64f"),E.append("path").attr("d",r).attr("transform",function(t){return"translate("+(n[0]+38)+","+i[0]+")"}),F.append("circle").attr("cx",n[0]+44).attr("cy",i[0]+22).attr("r",6).style("fill","#54c8f2"),E.append("text").attr("class","federacion etiqueta").attr("text-anchor","middle").style("font-family",'"Helvetica Neue", Helvetica, Arial, sans-serif').style("font-size",5).style("font-style","italic").attr("fill","#000000").attr("x",n[0]+46).attr("y",i[0]+13).text("VS."),F.append("circle").attr("cx",n[1]+6).attr("cy",i[1]).attr("r",6).style("fill","#e1a632"),F.append("circle").attr("cx",n[1]+18).attr("cy",i[1]).attr("r",6).style("fill","#8fc64f"),E.append("path").attr("d",r).attr("transform",function(t){return"translate("+(n[1]+12)+","+i[1]+")"}),F.append("circle").attr("cx",n[1]+4).attr("cy",i[1]+22).attr("r",6).style("fill","#54c8f2"),F.append("circle").attr("cx",n[1]+18).attr("cy",i[1]+22).attr("r",6).style("fill","#b09bc7"),E.append("text").attr("class","federacion etiqueta").attr("text-anchor","middle").style("font-family",'"Helvetica Neue", Helvetica, Arial, sans-serif').style("font-size",5).style("font-style","italic").attr("fill","#000000").attr("x",n[1]+20).attr("y",i[1]+13).text("VS.")},generaCelulas=function(){Y.attr("id","gCelulas"),Y.selectAll("circle.total").data(N).enter().append("circle").attr("class","total").attr("cy",function(t,e){return e*w+ +k+b/2}).attr("cx",function(t){return h/2}).attr("r",b/2).style("fill","#ffffff").style("stroke","#ff0000").attr("stroke-width",2),Y.selectAll("text.total").data(N).enter().append("text").attr("class","total").style("fill","#ff0000").style("stroke","#ff0000").style("text-anchor","middle").style("font-size","36px").style("font-family",'"Helvetica Neue", Helvetica, Arial, sans-serif').attr("y",function(t,e){return e*w+ +k+b/2+12}).attr("x",function(t){return h/2}).text(function(t){var e=window._.select(L,{presidente:t.id}),n=window._.sum(e,"total");return n})},{init:t}}();