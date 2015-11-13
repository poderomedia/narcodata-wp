var visualizacion = (function () {
    var wAnio = 40;
    var wColumna = wAnio * 6;
    var hFila = 50;
    var hEncabezado = 70;
    var pFila = 4;
    var aPleca = 200;
    var wLinea = 5;
    var pNombrePresidente = 53;
    var pPeriodoPresidente = 35;
    var pEtiquetaX = 2;
    var pEtiquetaY = 2;
    var altoF=0;
    var wImagen = 50;
    var pImagen = 10;
    var wEje=40;


    var presidentes = [];
    var carteles = [];
    var origenes = [];
    var federaciones = [];
    var involucrados = [];
    var celulas=[];
    
    var contenedor = window.d3.select("#contenedor01bh");
    var svg = contenedor.append("svg")
                .attr("id", "svg");

    var gFederaciones = svg.append("g").attr('transform','translate('+wEje+',0)');
    var gCarteles = svg.append("g").attr('transform','translate('+wEje+',0)');
    var gEtiquetas = svg.append("g").attr('transform','translate('+wEje+',0)');
    var gPlecas = svg.append("g").attr('transform','translate('+wEje+',0)');
    var gTelon = svg.append("g");
    var gEncabezado = svg.append("g").attr('transform','translate('+wEje+',0)');
    var gColumnas = svg.append("g").attr('transform','translate('+wEje+',0)');
    var gCelulas = svg.append("g").attr('transform','translate('+wEje+',0)');
    var gEje = svg.append("g");

    function init()
    {
        var q = queue(1);
        q.defer(window.d3.tsv, 'tsv/presidentes.tsv', function (d) {
            return {id: d.id, nombre: d.nombre, inicio: +d.inicio, fotografia: 'img/'+d.fotografia, nombrecorto:d.nombrecorto};
        });
        q.defer(window.d3.tsv, 'tsv/carteles.tsv', function (d) {
            return {id: d.id, nombre: d.nombre, nombree: d.nombree, nombrelargo: d.nombrelargo, fila: +d.fila, mitad: (d.mitad === "1") ? true : false, fondo: d.fondo, color: d.color, borde: d.borde, anillo: d.anillo, inicio: +d.inicio, fin: +d.fin, porcentaje: +d.porcentaje, pleca: (d.pleca === "1") ? true : false, lineaini: d.lineaini, lineafin: d.lineafin, inicial:d.inicial, inicialc:d.inicialc, lideres:d.lideres.split('|'), x: 0, y: 0, w: 0, h: 0, yi: 0, yf: 0};
        });
        q.defer(window.d3.tsv, 'tsv/origenes.tsv', function (d) {
            return {origen:d.origen,destino:d.destino,offset:+d.offset};
        });
        q.defer(window.d3.tsv, 'tsv/federaciones.tsv', function (d) {
            return {id:d.id,nombre: d.nombre,lideres:d.lideres.split('|'),inicio:+d.inicio,fin:+d.fin,color:d.color,fuente:d.fuente,w:0,y:0,x:0};
        });
        q.defer(window.d3.tsv, 'tsv/federacionescarteles.tsv', function (d) {
            return {id:d.id,aliados:d.aliados.split('|'),involucrados:d.involucrados.split('|'),x:0,y:500};
        });
        q.defer(window.d3.tsv, 'tsv/celulas.tsv');
        q.awaitAll(generaVisualizacion);
    };

    function generaVisualizacion(error, arreglo)
    {
        presidentes = arreglo[0];
        carteles = arreglo[1];
        origenes = arreglo[2];
        federaciones = arreglo[3];
        involucrados = arreglo[4];
        celulas = arreglo[5];
//celulas=window._.select(celulas,{presidente:'EZP'});
        var index = window._.indexBy(carteles, 'fila');
        var arr = window._.pluck(index, 'fila');
        var alto = ((hFila + pFila) * arr.length) + hEncabezado;
        var ancho = wColumna * presidentes.length;
//        svg.attr("width", ancho+wEje)
//                .attr("height", alto);
        gEje.append('rect')
                .attr('fill','#cdcdcd')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', wEje)
                .attr('height', hEncabezado);
        gEje.append('rect')
                .attr('fill','#58595b')
                .attr('x', 0)
                .attr('y', hEncabezado)
                .attr('width', wEje)
                .attr('height', alto);
        var r = gTelon.append('rect')
                .attr('class', 'telon')                
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", '100%')
                .attr("height", '100%')
                .style("fill", "#000000")
                .style('opacity',0.70);
        generaEncabezado();
        generaFederaciones();
        generaColumnas();
        generaCarteles();
        generaLeyendas();
        generaEtiquetas();
        ajustaCarteles();
        generaPlecas();
        generaCelulas();
        generaGrafos();
        generaTooltips();
/*        svg.attr("width", (ancho+wEje)*1180/(ancho+wEje))
                .attr("height", altoF*1180/(ancho+wEje));*/
/*        svg.attr("width", (ancho+wEje))
                .attr("height", altoF)*/
        svg.attr("preserveAspectRatio", "xMidYMid");
        svg.attr("viewBox", "0 0 " + (ancho+wEje) + " " + altoF);
        gEje.append('text')
                .attr('transform','rotate(270 '+((wEje/2)+6)+','+((altoF/2)+hEncabezado)+')')
                .attr('x',(wEje/2)+6)
                .attr('y',((altoF/2)+hEncabezado))
                .style('stroke','#ffffff')
                .style('fill','#ffffff')
                .style('text-transform','uppercase')
                .style('font-size',18)
                .style('font-family','"Helvetica Neue",Helvetica,Arial,sans-serif')
                .style('letter-spacing',5)
                .html('Cárteles');
   };

    function generaEncabezado()
    {
        gEncabezado.selectAll('rect.presidente').data(presidentes)
                .enter()
                .append('rect')
                .attr('x', function (d, i) {
                    return i * wColumna;
                })
                .attr('y', 0)
                .attr('class', 'presidente')
                .attr('width', wColumna)
                .attr('height', hEncabezado)
                .attr('fill', '#000000')
                .style('stroke', '#ffffff')
                .style('stroke-width', 2);
        gEncabezado.selectAll('text.periodo').data(presidentes)
                .enter()
                .append('text')
                .attr('class', 'periodo ignorar')
                .attr('x', function (d, i) {
                    return getCentroEncabezado(i);
                })
                .attr('y', pPeriodoPresidente)
                .style('font-size', '24px')
                .style('font-weight', 'bold')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .attr('fill', '#ffffff')
                .attr('text-anchor', 'middle')
                .text(function (d) {
                    var f=d.inicio + ' - ' + (d.inicio + 6);
                    if (d.id=='EPN')
                    {
                        f=d.inicio + ' a 2014';
                    }
                    return f;
                });
        gEncabezado.selectAll('text.presidente').data(presidentes)
                .enter()
                .append('text')
                .attr('class', 'presidente ignorar')
                .attr('x', function (d, i) {
                    return getCentroEncabezado(i);
                })
                .attr('y', pNombrePresidente)
                .style('font-size', '12px')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .attr('fill', '#ffffff')
                .attr('text-anchor', 'middle')
                .text(function (d) {
                    return d.nombre;
                });
        gEncabezado.selectAll(".fotografia.presidente").data(presidentes)
                .enter()
                .append("svg:image")
                .attr('width',wImagen)
                .attr('height',wImagen)
                .attr('class','presidente fotografia ignorar')
                .attr("xlink:href",function(d){
                    return d.fotografia;
                })
                .attr('x',function(d,i){
                    return (i+1)*wColumna-(wImagen+pImagen);
                })
                .attr('y',function(d){
                    return (hEncabezado-wImagen)/2;
                });
    }
    ;

    function getCentroEncabezado(i)
    {
        var x0=(i * wColumna) + pImagen;
        var xf=wColumna-(wImagen+(2*pImagen));
        return (xf/2)+x0;
        //return (i * wColumna) + (wColumna / 2);
    }

    function generaColumnas()
    {
        var num = presidentes.length + 1;
        var x = 0;
        var alto = (hFila + pFila) * carteles.length;
        var i = 1;
        for (i = 1; i <= num; i++)
        {
            gColumnas.append("line")
                    .style("stroke", "#ffffff")
                    .style("stroke-width", 2)
                    .style("opacity", 1)
                    .attr("x1", x)
                    .attr("y1", hEncabezado)
                    .attr("x2", x)
                    .attr("y2", hEncabezado + alto);
            x = i * wColumna;
        }
    }
    ;

    function getAnioBase()
    {
        var pIni = window._.min(presidentes, function (p) {
            return p.inicio;
        });
        return pIni.inicio;
    }
    ;

    function getAltura(p)
    {
        return Math.ceil(hFila * p / 100);
    }
    ;

    function getDiferenciaAltura(h)
    {
        return Math.ceil((hFila - h) / 2);
    }
    ;

    function generaCarteles()
    {
        var anioBase = getAnioBase();
        var x = 0;
        var y = 0;
        var w = 0;
        var ini = 0;
        var fin = 0;
        var yf = 0;
        var yi = 0;
        var h = 0;
        window._.each(carteles, function (c) {
            y = hEncabezado + ((hFila + pFila) * c.fila) - hFila;
            if (c.mitad)
            {
                y += (hFila / 2);
            }
            h = getAltura(c.porcentaje);
            yi = y + getDiferenciaAltura(h);
            yf = yi + h;
            ini = (c.inicio - anioBase) * wAnio;
            fin = (c.fin - anioBase) * wAnio;
            x = ini;
            w = fin - ini;
            c.x = x;
            c.y = y;
            c.w = w;
            c.h = h;
            c.yf = yf;
            c.yi = yi;
        });
        gCarteles.selectAll('rect.cartel').data(carteles)
                .enter()
                .append('rect')
                .attr('class', function(d){ return 'cartel '+d.id;})
                .attr('x', function (d) {
                    return d.x;
                })
                .attr('y', function (d) {
                    return d.yi;
                })
                .attr('width', function (d) {
                    return d.w;
                })
                .attr('height', function (d) {
                    return d.h;
                })
                .attr('fill', function (d) {
                    return d.fondo;
                })
                .attr('stroke', function (d) {
                    return d.fondo;
                })
                .attr('stroke-width', 1);
    }
    ;

    function generaLeyendas()
    {
        var oX = getOffsetPleca(aPleca) * 2;
        var c = null;
        var leyendas = window._.select(carteles, function (c) {
            return c.nombre !== '';
        });
        gPlecas.selectAll('text.cartel').data(leyendas)
                .enter()
                .append('text')
                .attr('class', 'cartel')
                .attr('class', function(d){ return 'cartel '+d.id;})
                .attr('fill', '#ffffff')
                .style('font-weight', 'bold')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 12)
                .attr('text-anchor', 'middle')
                .attr('x', function (d) {
                    return d.x + Math.ceil(d.w / 2);
                })
                .attr('y', function (d) {
                    return d.y + 30;
                })
                .text(function (d) {
                    return d.nombre;
                });
        gPlecas.selectAll('text.cartel').call(wrap);
        gPlecas.selectAll('text.wrapped').call(ajustaLineas);
    }
    ;

    function wrap(text) {
        text.each(function () {
            var text = window.d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    clases = text.attr('class'),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.2, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy") || 0),
                    tspan = text.attr('class', 'wrapped '+clases).text(null).append("tspan").attr('class', clases).attr("x", text.attr('x')).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > (text.datum().w - 30)) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr('class', clases).attr("x", text.attr('x')).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }
    ;

    function ajustaLineas(text)
    {
        window._.each(text[0], function (t) {
            t = window.d3.select(t);
            var spans = t.selectAll('tspan');
            var num = spans[0].length;
            var par = (num % 2 === 0) ? true : false;
            var m = Math.floor(num / 2);
            var lineHeight = 1.2;
            var delta = lineHeight;
            if (par)
            {
                delta = lineHeight / 2;
                m--;
                m *= lineHeight;
                m += delta;
                m *= -1;
            }
            else
            {
                m *= delta;
                m *= -1;
            }
            spans.each(function () {
                var el = window.d3.select(this);
                el.attr('dy', (parseFloat(el.attr('dy').replace('em', '')) + m) + 'em');
            });
        });
    }
    ;

    function getCartelesConLineas(linea)
    {
        var arreglo = window._.select(carteles, function (c) {
            return (c[linea] !== '');
        });
        var lineas = window._.pluck(arreglo, linea);
        lineas = window._.uniq(lineas);
        return lineas;
    }
    ;

    function generaPlecas()
    {
        var lineas = getCartelesConLineas('lineaini');
        var arreglo = [];
        var x = 0;
        var y1 = 0;
        var y2 = 0;
        var obj = {};
        var arregloLineas = [];
        window._.each(lineas, function (l) {
            arreglo = window._.select(carteles, {'lineaini': l});
            obj = window._.min(arreglo, 'x');
            x = obj.x;
            obj = window._.min(arreglo, 'yi');
            y1 = obj.yi;
            obj = window._.max(arreglo, 'yf');
            y2 = obj.yf;
            arregloLineas.push({x1: x, x2: x, y1: y1, y2: y2});
        });
        lineas = getCartelesConLineas('lineafin');
        window._.each(lineas, function (l) {
            arreglo = window._.select(carteles, {'lineafin': l});
            obj = window._.min(arreglo, 'x');
            x = obj.x + obj.w;
            obj = window._.min(arreglo, 'yi');
            y1 = obj.yi;
            obj = window._.max(arreglo, 'yf');
            y2 = obj.yf;
            arregloLineas.push({x1: x, x2: x, y1: y1, y2: y2});
        });
        gPlecas.selectAll('line.pleca').data(arregloLineas)
                .enter()
                .append("line")
                .attr('class', 'pleca')
                .style("stroke", "#000000")
                .style("stroke-width", wLinea)
                .style("opacity", 1)
                .attr("x1", function (d) {
                    return d.x1;
                })
                .attr("y1", function (d) {
                    return d.y1;
                })
                .attr("x2", function (d) {
                    return d.x2;
                })
                .attr("y2", function (d) {
                    return d.y2;
                });

        var pleca = window.d3.svg.symbol()
                .type("triangle-up")
                .size(aPleca);
        var oX = getOffsetPleca(aPleca);
        var oY = hFila / 2;
        var plecas = window._.select(carteles, {pleca: true});
        gPlecas.selectAll("path.pleca").data(plecas)
                .enter()
                .append("path")
                .attr("d", pleca)
                .attr("class", "pleca")
                .attr("transform", function (d) {
                    return "translate(" + (d.x + oX) + "," + (d.y + oY) + "), rotate(90)";
                });
        var arregloFlechas = [];
        var arregloPuntas = [];
        var oPleca = oX;
        var cini = null;
        var cfin = null;
        var aux = [];
        window._.each(origenes, function (o) {
            aux = window._.select(carteles, {id: o.destino});
            cfin = window._.min(aux, 'inicio');
            cini = window._.find(carteles, function (c) {
                return (c.id === o.origen) && ((c.inicio <= cfin.inicio) && (cfin.inicio <= c.fin));
            });
            arregloFlechas.push({x1: cfin.x - 10, x2: cfin.x + (wLinea / 2), y1: cini.yi + (cini.h / 2) + o.offset, y2: cini.yi + (cini.h / 2) + o.offset});
            if (cfin.yi >= cini.yi)
            {
                arregloFlechas.push({x1: cfin.x, x2: cfin.x, y1: cini.yi + (cini.h / 2) + o.offset, y2: cfin.yi - oPleca});
                arregloPuntas.push({x: cfin.x, y: cfin.yi, o: -oPleca, rot: 180});
            }
            else
            {
                arregloFlechas.push({x1: cfin.x, x2: cfin.x, y1: cini.yi + (cini.h / 2) + o.offset, y2: cfin.yf + oPleca});
                arregloPuntas.push({x: cfin.x, y: cfin.yf, o: oPleca, rot: 0});
            }
        });
        gPlecas.selectAll('line.flecha').data(arregloFlechas)
                .enter()
                .append('line')
                .attr('class', 'flecha')
                .style("stroke", "#000000")
                .style("stroke-width", wLinea)
                .style("opacity", 1)
                .attr("x1", function (d) {
                    return d.x1;
                })
                .attr("y1", function (d) {
                    return d.y1;
                })
                .attr("x2", function (d) {
                    return d.x2;
                })
                .attr("y2", function (d) {
                    return d.y2;
                });
        gPlecas.selectAll("path.flecha").data(arregloPuntas)
                .enter()
                .append("path")
                .attr("d", pleca)
                .attr("class", "flecha")
                .attr("transform", function (d) {
                    return "translate(" + (d.x) + "," + (d.y + d.o) + "), rotate(" + d.rot + ")";
                });

    }
    ;

    function getOffsetPleca(a)
    {
        var f = (Math.sqrt(3)) / 2;
        var h = Math.sqrt(f * a * 2);
        return Math.floor(h / 2) - 2;
    }
    ;

    function generaEtiquetas()
    {
        var b = null;
        var etiquetas = [];
        var leyendas = window.d3.selectAll('text.wrapped');
        leyendas.each(function (d) {
            b = this.getBBox();
            etiquetas.push({'color': d.color, 'borde': d.borde, 'x': b.x - pEtiquetaX, 'y': b.y - pEtiquetaY, 'width': b.width + (2 * pEtiquetaX), 'height': b.height + (2 * pEtiquetaY), 'clase':d.id});
        });
        gEtiquetas.selectAll('rect.etiqueta').data(etiquetas)
                .enter()
                .append('rect')
                .attr('class', function(d){
                    return 'etiqueta '+d.clase;
                })
                .style('fill', function (d) {
                    return d.color;
                })
                .attr('x', function (d) {
                    return d.x;
                })
                .attr('y', function (d) {
                    return d.y;
                })
                .attr('width', function (d) {
                    return d.width;
                })
                .attr('height', function (d) {
                    return d.height;
                })
                .attr('stroke', function (d) {
                    return d.borde;
                })
                .attr('stroke-width', 2);
    }
    ;
    
    ajustaCarteles = function()
    {
        var base=hEncabezado+pFila;
        var f=0;
        var filas=window._.pluck(carteles,'fila');
        filas=window._.uniq(filas);
        filas.sort(function(a, b){return a-b});
        window._.each(filas,function(fila){
            var h=0;
            var yi=0;
            var dif=0;
            var carts=window._.select(carteles,{fila:fila});
            var clases=window._.pluck(carts,'id');
            clases=window._.uniq(clases);
            window._.each(clases,function(clase){
                var elementos=gCarteles.selectAll('rect.cartel.'+clase);
                elementos.each(function(e){
                    if (e.h>h)
                    {
                        h=e.h;
                        yi=e.yi;
                    }
                });
                var etiquetas=gEtiquetas.selectAll('rect.'+clase);
                etiquetas.each(function(e){
                    if (e.height>h)
                    {
                        h=e.height;
                        yi=e.y;
                    }
                });
                dif=yi-base;
                elementos.each(function(e){
                    e.y=e.y-dif;
                    e.yi=e.yi-dif;
                    e.yf=e.yf-dif;
                });
                gPlecas.selectAll('tspan.'+clase)
                        .each(function(){
                            var el=window.d3.select(this);
                            el.attr('y',el.attr('y')-dif);
                        });
                gEtiquetas.selectAll('rect.'+clase)
                        .each(function(d){
                            d.y=d.y-dif;
                        });
            });
            if(fila!==f)
            {
                base+=h+pFila;
            }
        });
        gCarteles.selectAll('rect.cartel')
                .attr('y',function(d){
                    return d.yi;
                });
        gPlecas.selectAll('text.cartel')
                .attr('y', function (d) {
                    return d.y + 30;
                });
        gEtiquetas.selectAll('rect')
                .attr('y',function(d){
                    return d.y;
                });

        var elementos=gCarteles.selectAll('rect.cartel');
                elementos.each(function(e){
                    if (e.h+e.yi>altoF)
                    {
                        altoF=e.h+e.yi;
                    }
                });
                
        var etiquetas=gEtiquetas.selectAll('rect');
                etiquetas.each(function(e){
                    if (e.height+e.y>altoF)
                    {
                        altoF=e.height+e.y;
                    }
                });
        altoF+=pFila;

    };

    function generaTooltips()
    {
        var ancho = wColumna * presidentes.length;
        var anchoC= window.$(contenedor.node()).width();
        gEncabezado.selectAll("rect.presidente").each(function (d, i) {
            var et = null;
            var p = presidentes[i];
            var id = p.id;
            var cls=window._.select(celulas,{presidente:id});
                var contenido = '<p><strong>Sexenio de ';
                contenido += p.nombre;
                contenido += ' </strong></p>';
                contenido += '<hr>';
                contenido += '<h2> ';
                contenido += cls.length;
                if (cls.length==1)
                {
                    contenido += ' célula delictiva registradas</h2>';
                }
                else
                {
                    contenido += ' células delictivas registradas</h2>';
                }
                var carts=window._.pluck(cls,'cartel');
                carts=window._.uniq(carts);
                contenido += '<hr>';
                contenido += '<ul>';
                window._.each(carts, function (cart) {
                    var celcartel=window._.select(cls,{cartel:cart});
                    if (celcartel.length>0)
                    {
                        var cartel = window._.find(carteles, {id: cart});
                        contenido += '<li style="color:' + cartel.fondo + '">';
                        contenido += celcartel.length;
                        contenido += ' de ';
                        contenido += '<strong style="text-transform: uppercase">';
                        contenido += cartel.nombree;
                        contenido += '</strong>';
                        contenido += ': ';
                        var ns=window._.pluck(celcartel,'nombre');
                        ns=ns.join(', ');
                        contenido += ns;
                        contenido += '</li>';                        
                    }
                });
                contenido += '</ul>';
                $(this).tooltipster({
                    theme: 'tooltipster tooltipster-numeroconflictos',
                    offsetX: (wColumna-(wImagen/2+pImagen))/(ancho/anchoC),
                    offsetY: (hEncabezado-(pImagen))/(ancho/anchoC),
                    content: $(contenido),
                    maxWidth: 2*wColumna,
                    functionReady: ajustaTooltip
                });
        });
    };

    ajustaTooltip = function(origin,tooltip)
    {
        var c=$(tooltip[0]).find('div').html();
        $(origin).tooltipster('content',$(c));
    };
    
    generaFederaciones = function()
    {
        var anioBase = getAnioBase();
        var alto = (hFila + pFila) * carteles.length;
        var posicionesX=[];
        var posicionesY=[];
            gFederaciones.selectAll('rect.federacion').data(federaciones)
                    .enter()
                    .append('rect')
                    .attr('class',function(f){return 'federacion '+f.id;})
                    .attr('x',function(f){
                        var pos=((f.inicio-anioBase)*wAnio);
                        posicionesX.push(pos);
                        return pos;
                    })
                    .attr('y',hEncabezado)
                    .attr('width',function(f){f.w=(f.fin-f.inicio)*wAnio;return f.w;})
                    .attr('height',alto)
                    .style('fill', function (f) {return f.color;});
            gEtiquetas.selectAll('text.federacion.titulo').data(involucrados)
                    .enter()
                    .append('text')
                    .attr('class','federacion titulo')
                    .attr('text-anchor', 'middle')
                    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                    .style('font-size', 16)
                    .style('font-weight', 'bold')
                    .style('text-transform', 'uppercase')
                    .attr('fill', function(i){
                        var f=window._.find(federaciones,{id:i.id});
                        return f.fuente;
                    })
                    .attr('x',function(i){
                        var f=window._.find(federaciones,{id:i.id});
                        var xi=f.inicio-anioBase;
                        var w=f.fin-f.inicio;
                        var x=(xi+(w/2))*wAnio;
                        i.x=x;
                        return x;
                    })
                    .attr('y',function(i){
                        return i.y;
                    })
                    .text(function(i){
                        var f=window._.find(federaciones,{id:i.id});
                        return f.nombre;
                    });
            gEtiquetas.selectAll('text.federacion.fechas').data(involucrados)
                    .enter()
                    .append('text')
                    .attr('class','federacion fechas')
                    .attr('text-anchor', 'middle')
                    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                    .style('font-size', 14)
                    .attr('fill', '#000000')
                    .attr('x',function(i){
                        return i.x;
                    })
                    .attr('y',function(i){
                        var pos=i.y+20;
                        posicionesY.push(i.y+20);
                        return pos;
                    })
                    .text(function(i){
                        var f=window._.find(federaciones,{id:i.id});
                        return f.inicio+' - '+f.fin;
                    });
        var mas = window.d3.svg.symbol().type('cross').size(80);
        gFederaciones.append('circle')
                .attr('cx',posicionesX[0]+62)
                .attr('cy',posicionesY[0]+20)
                .attr('r',12)
                .style('fill','#e1a632');
        gFederaciones.append('circle')
                .attr('cx',posicionesX[0]+84)
                .attr('cy',posicionesY[0]+20)
                .attr('r',12)
                .style('fill','#8fc64f');
        gEtiquetas.append('path')
                .attr('d',mas)
                .attr("transform", function(d) { return "translate(" + (posicionesX[0]+74) + "," + (posicionesY[0]+20) + ")"; });
        gFederaciones.append('circle')
                .attr('cx',posicionesX[0]+138)
                .attr('cy',posicionesY[0]+20)
                .attr('r',12)
                .style('fill','#54c8f2');
        gEtiquetas.append('text')
                    .attr('class','federacion etiqueta')
                    .attr('text-anchor', 'middle')
                    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                    .style('font-size', 10)
                    .style('font-style', 'italic')
                    .attr('fill', '#000000')
                    .attr('x',posicionesX[0]+112)
                    .attr('y',posicionesY[0]+25)
                    .text('VS.');
        gFederaciones.append('circle')
                .attr('cx',posicionesX[1]+14)
                .attr('cy',posicionesY[1]+20)
                .attr('r',12)
                .style('fill','#e1a632');
        gFederaciones.append('circle')
                .attr('cx',posicionesX[1]+38)
                .attr('cy',posicionesY[1]+20)
                .attr('r',12)
                .style('fill','#8fc64f');
        gEtiquetas.append('path')
                .attr('d',mas)
                .attr("transform", function(d) { return "translate(" + (posicionesX[1]+26) + "," + (posicionesY[1]+20) + ")"; });
        gFederaciones.append('circle')
                .attr('cx',posicionesX[1]+80)
                .attr('cy',posicionesY[1]+20)
                .attr('r',12)
                .style('fill','#54c8f2');
        gFederaciones.append('circle')
                .attr('cx',posicionesX[1]+105)
                .attr('cy',posicionesY[1]+20)
                .attr('r',12)
                .style('fill','#b09bc7');
        gEtiquetas.append('text')
                    .attr('class','federacion etiqueta')
                    .attr('text-anchor', 'middle')
                    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                    .style('font-size', 10)
                    .style('font-style', 'italic')
                    .attr('fill', '#000000')
                    .attr('x',posicionesX[1]+60)
                    .attr('y',posicionesY[1]+25)
                    .text('VS.');
    };
    
    generaCelulas = function()
    {
gCelulas.attr('id','gCelulas');
        gCelulas.selectAll("circle.total").data(presidentes)
                .enter()
                .append("circle")
                .attr('class','total ignorar')
                .attr('cx',function(d,i){
                    return (i+1)*wColumna-(wImagen+pImagen)+wImagen/2;
                })
                .attr('cy',function(d){
                    return hEncabezado/2;
                })
                .attr('r',wImagen/2)
                .style('fill','#ffffff')
                .style('stroke','#ff0000')
                .attr('stroke-width', 2);
        gCelulas.selectAll("text.total").data(presidentes)
                .enter()
                .append('text')
                .attr('class','total ignorar')
                .style('fill','#ff0000')
                .style('stroke','#ff0000')
                .style('text-anchor','middle')
                .style('font-size','36px')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .attr('x',function(d,i){
                    return (i+1)*wColumna-(wImagen+pImagen)+(wImagen/2);
                })
                .attr('y',function(d){
                    return (hEncabezado/2)+12;
                })
                .text(function(d){
                    var cs=window._.select(celulas,{presidente:d.id});
                    return cs.length;
                });
                
    };
    
    var clicked=null;
    generaGrafos = function()
    {
        gCelulas.append('rect')
                .attr('x',0)
                .attr('y',0)
                .attr('width','100%')
                .attr('height','100%')
                .style('fill','#ffffff')
                .style('opacity',0)
                .attr('class', 'pointer')
                .attr('transform','translate(0,'+hEncabezado+')')
                .on('click',resaltaTodos);
        
        window._.each(presidentes,function(p){
            var ctssexenio=window._.select(carteles,function(cart){
                return ((cart.inicio>=p.inicio)&&(cart.fin<=p.inicio+6))?true:false;
            });
            var cts=window._.indexBy(ctssexenio,'id');
            window._.each(cts,function(c){
                var cls=window._.select(celulas,{presidente:p.id,cartel:c.id});
                if (cls.length>0)
                {
                    var clases=c.id+' '+p.id;
                    var g=gCelulas.append('g')
                            .attr('transform','translate('+c.x+','+c.yi+')');
                    var nodos=[{nombre:c.inicialc,x:(c.w/2),y:(c.h/2),fixed:true,cartel:c.id,presidente:p.id,clase:clases,xi:(c.w/2),yi:(c.h/2)}];
                    var ligas=[];
                    var i=0;
                    window._.each(cls,function(cl){
                        i++;
                        nodos.push({nombre:cl.nombre,clase:clases});
                        ligas.push({source:0,target:i,clase:clases});
                    });
                    var force = window.d3.layout.force()
                            .nodes(nodos)
                            .links(ligas)
                            .size([c.w,c.h])
                            .linkDistance(10)
                            .charge([-1500])
                            .gravity(0.3);

                    var link = g.selectAll('.link')
                            .data(ligas)
                            .enter().append('line')
                            .style('stroke','#ffffff')
                            .style('z-index',0)
                            .attr('class', function(d){
                                return 'link ignorar '+d.clase;
                            })
                            .style('opacity',0.2);
                    var node = g.selectAll('.node')
                            .data(nodos)
                            .enter().append('circle')
                            .attr('fill',function(d,i){
                                //var color=c.borde;
                        var color=c.fondo;
                                if (i===0)
                                {
                                    color=c.fondo;
                                }
                                return color;
                            })
                            .attr('class', function(d,i){
                                var clases='node '+d.clase;
                                if (i===0)
                                {
                                    clases+=' fixed pointer';
                                }
                                else
                                {
                                    clases+=' grab';
                                }
                                return clases;
                            })
                            .attr('r',function(d,i){
                                var r=10;
                                if (i===0)
                                {
                                    r=16;
                                }
                                return r;
                            })
                            .style('z-index',function(d,i){
                                var z=0;
                                if (i===0)
                                {
                                    z=100;
                                }
                                return z;
                            })
                            .style('opacity',function(d,i){
                                var op=0.2;
                                if (i===0)
                                {
                                    op=1;
                                }
                                return op;
                            })
                            .on('click',function(d,i){
                                if (i===0)
                                {
                                    var id=d.cartel+'-'+d.presidente;
                                    if (clicked===id)
                                    {
                                        clicked=null;
                                        resaltaTodos();
                                    }
                                    else
                                    {
                                        clicked=id;
                                        resaltaGrafos(d.cartel,d.presidente);
                                    }
                                }
                            })
                                    .on('mouseover',function(d,i){
                                        if ((i===0)&&((clicked === null)))
                                        {
                                            resaltaGrafos(d.cartel,d.presidente);
                                        }
                                    })
                                    .on('mouseout',function(d,i){
                                        if ((i===0)&&((clicked === null)))
                                        {
                                            resaltaTodos();
                                        }
                                    })                                    
                            .call(force.drag);
var texts = g.selectAll("text")
                    .data(nodos)
                    .enter()
                    .append("text")
                    .style('fill','#ffffff')
                    .style('stroke','#ffffff')
                    .style('text-anchor','middle')
                    .style('font-size',function(d,i){
                        var tamanio='14px';
                        if (i===0)
                        {
                            tamanio='18px';
                        }
                        return tamanio;
                    })
                            .attr('class',function(d){
                                return 'node ignorar '+d.clase;
                            })
                            .style('z-index',function(d,i){
                                var z=0;
                                if (i===0)
                                {
                                    z=100;
                                }
                                return z;
                            })
                            .style('opacity',function(d,i){
                                var op=0.2;
                                if (i===0)
                                {
                                    op=1;
                                }
                                return op;
                            })
                    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                    .text(function(d) { return d.nombre; }); 
force.on('tick', function() {
    node.attr('cx', function(d) {
        if (d.index===0)
        {
            d.x=d.xi;
        }
        return d.x;
    })
        .attr('cy', function(d) {
        if (d.index===0)
        {
            d.y=d.yi;
        }
        return d.y;
        });
    link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });
    texts.attr("transform", function(d) {
        return "translate(" + d.x + "," + (d.y+6) + ")";
    });
});
                    force.start();
                }
            });
        });
    };
    
    resaltaTodos = function() {
        clicked=null;
        gCelulas.selectAll('circle.node')
                .style('opacity',function(d){
                    var op=0.2;
                    if (d.index===0)
                    {
                        op=1;
                    }
                    return op;
                });
        gCelulas.selectAll('text.node')
                .style('opacity',function(d){
                    var op=0.2;
                    if (d.index===0)
                    {
                        op=1;
                    }
                    return op;
                });
        gCelulas.selectAll('.link')
                .style('opacity',0.2);
    };
    
    resaltaGrafos = function (cartel,presidente) {
//        console.log(cartel+' '+presidente);
        gCelulas.selectAll('circle.node')
                .style('opacity',function(d){
//console.log(d);
                    var clases=d.clase.split(' ');
                    var flagC=(clases.indexOf(cartel)>=0)?true:false;
                    var flagP=(clases.indexOf(presidente)>=0)?true:false;
                    var op=0;
                    if (flagC&&flagP)
                    {
                        op=1;
                    }
                    else if (d.index===0)
                    {
                        op=0.5;
                    }
                    return op;
                });
        gCelulas.selectAll('text.node')
                .style('opacity',function(d){
                    var clases=d.clase.split(' ');
                    var flagC=(clases.indexOf(cartel)>=0)?true:false;
                    var flagP=(clases.indexOf(presidente)>=0)?true:false;
                    var op=0;
                    if (flagC&&flagP)
                    {
                        op=1;
                    }
                    else if (d.index===0)
                    {
                        op=0.5;
                    }
                    return op;
                });
        gCelulas.selectAll('.link')
                .style('opacity',function(d){
                    var clases=d.clase.split(' ');
                    var flagC=(clases.indexOf(cartel)>=0)?true:false;
                    var flagP=(clases.indexOf(presidente)>=0)?true:false;
                    var op=0;
                    if (flagC&&flagP)
                    {
                        op=1;
                    }
                    else if (d.index===0)
                    {
                        op=0.5;
                    }
                    return op;
                });
    };
    
    return {
        init:init
    };
}());
