var visualizacion = (function () {
    var wAnio = 40;
    var wColumna = wAnio * 6;
    var wAnioE = wColumna;
    var wColumnaE = wAnioE * 6;
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
    var conflictos=[];
    
    var presidentesE=[];
    var flagE=false;
    
    var oBolita=5;
    var radio=14;
    var diametro=0;
    
    var clonDerecho=null;
    var clonIzquierdo=null;
    var telones=0;
    var xE=0;
    var xDrag=false;
    var hSlider=10;
    var pSlider=2;
    var wSliderControl=80;


    var opcion = 'a';

    var contenedor = window.d3.select("#contenedor");
    var svg = contenedor.append("svg")
            .attr("preserveAspectRatio", "xMidYMid")
            .attr("id", "svg");
    var fondo= svg.append('rect');

    var gFederacionesE = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gFederacionesE');
    var gCartelesE = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gCartelesE');
    var gColumnasE = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gColumnasE');
    var gEtiquetasE = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gEtiquetasE');
    var gPlecasE = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gPlecasE');
    
    var gCartelesB = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gCartelesB');
    var gEtiquetasB = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gEtiquetasB');
    var gLeyendasB = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gLeyendasB');
    var gCartelesR = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gCartelesR');
    var gEtiquetasR = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gEtiquetasR');
    var gLeyendasR = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gLeyendasR');

    var gConflictosE = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gConflictosE');
    var gEncabezadoE = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','extendida').attr('id','gEncabezadoE');
    var gSlider = svg.append("g").attr('transform','translate('+wEje+',0)');
    
    var gClonDerecho = svg.append("g").attr('transform','translate('+wEje+',0)').attr('id','gClonDerecho');
    var gClonIzquierdo = svg.append("g").attr('transform','translate('+wEje+',0)').attr('id','gClonIzquierdo');

    var gFederaciones = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','fade');
    var gCarteles = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','fade');
    var gEtiquetas = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','fade');
    var gPlecas = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','fade');
    var gTelon = svg.append("g").attr('id','gTelon').attr('class','fade');
    var gEncabezado = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','fade');
    var gColumnas = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','fade');
    var gCelulas = svg.append("g").attr('transform','translate('+wEje+',0)').attr('class','fade');
    
    var gEje = svg.append("g");
    
    function init(valor)
    {
        valor=valor||null;
        switch(valor)
        {
            case 'b':
                opcion='b';
                gTelon.attr('transform','translate('+wEje+',0)');
                break;
            default:
                opcion='a';
                gTelon.attr('transform','translate('+wEje+',0)');
                break;
        }
        var q = queue(1);
        q.defer(window.d3.tsv, 'tsv/presidentes.tsv', function (d) {
            return {id: d.id, nombre: d.nombre, inicio: +d.inicio, fotografia: 'img/'+d.fotografia, nombrecorto:d.nombrecorto, click:false};
        });
        q.defer(window.d3.tsv, 'tsv/carteles.tsv', function (d) {
            return {id: d.id, nombre: d.nombre, nombree: d.nombree, nombrelargo: d.nombrelargo, fila: +d.fila, mitad: (d.mitad === "1") ? true : false, fondo: d.fondo, color: d.color, borde: d.borde, inicio: +d.inicio, fin: +d.fin, porcentaje: +d.porcentaje, pleca: (d.pleca === "1") ? true : false, lineaini: d.lineaini, lineafin: d.lineafin, inicial:d.inicial, inicialc:d.inicialc, lideres:d.lideres.split('|'), x: 0, y: 0, w: 0, h: 0, yi: 0, yf: 0};
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
        q.defer(window.d3.tsv, 'tsv/conflictos.tsv', function (d) {
            return {presidente:d.presidente,bando1:d.bando1.split('|'),bando2:d.bando2.split('|'),descripcion:d.descripcion,inicio:+d.inicio,fin:+d.fin};
        });
        q.awaitAll(generaVisualizacion);
    }
    ;

    function generaVisualizacion(error, arreglo)
    {
        presidentes = arreglo[0];
        carteles = arreglo[1];
        origenes = arreglo[2];
        federaciones = arreglo[3];
        involucrados = arreglo[4];
        celulas = arreglo[5];
        conflictos = agruparConflictos(arreglo[6]);
        presidentesE=[];
        window._.each(presidentes,function(p){
            var i=1;
            for (i=1;i<=6;i++)
            {
                presidentesE.push(p);
            }
        });
        diametro=2*radio;
        var index = window._.indexBy(carteles, 'fila');
        var arr = window._.pluck(index, 'fila');
        var alto = ((hFila + pFila) * arr.length) + hEncabezado;
        var ancho = wColumna * presidentes.length;        
        var anchoE = wColumnaE * presidentes.length;
        var max=getValorE(ancho);
        var arregloE=[-wEje,max];
        var offsetSlider=wSliderControl/2;
        var arregloS=[offsetSlider,(ancho-offsetSlider)];
//        var arregloS=[0,(ancho-wSliderControl)];
        var escalarASlider=window.d3.scale.linear();
        escalarASlider.domain(arregloE);
        escalarASlider.range(arregloS);
        var escalarAExtendida=window.d3.scale.linear();
        escalarAExtendida.domain(arregloS);
        escalarAExtendida.range(arregloE);
        svg.attr("width", ancho+wEje)
                .attr("height", alto);
        fondo.attr('fill','#ffffff')
                .attr("width", ancho+wEje)
                .attr("height", alto);
        gEje.append('rect')
                .attr('fill','#cdcdcd')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', wEje)
                .attr('height', hEncabezado)
                .style('stroke', '#ffffff')
                .style('stroke-width', 2);
        gEje.append('rect')
                .attr('fill','#58595b')
                .attr('x', 0)
                .attr('y', hEncabezado)
                .attr('width', wEje)
                .attr('height', alto)
                .attr('class','eje')
                .style('stroke', '#ffffff')
                .style('stroke-width', 2)
                .on('click',ponerTelon);
        gCartelesE.append('rect')
                .attr('fill','#ffffff')
                .attr('class','telon')
                .style('opacity',0)
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', anchoE)
                .attr('height', alto);
        switch(opcion)
        {
            case 'b':
                generaTelonE(ancho,alto,escalarASlider);
                break;
            default:
                generaTelon();
                break;                    
        }
        generaEncabezado();
        generaFederaciones();
        generaColumnas();
        generaCarteles();
        generaLeyendas();
        generaEtiquetas();
        ajustaCarteles();
        generaPlecas();
        generaEncabezadoE();
        generaFederacionesE();
        generaColumnasE();
        generaCartelesE();
        generaPlecasE();
        generaConflictos();
        generaLeyendasE();
        generaEtiquetasE();
        generaEtiquetasB();
        generaSlider(ancho,altoF);
        switch(opcion)
        {
            default:
//                generaCelulas();
//                generaGrafos();
                break;
            case 'a':
                generaTooltips();
                break;
        }
        if (contenedor.classed('resp'))
        {
            svg.attr("width", (ancho+wEje)*3/4)
                    .attr("height", (altoF+hSlider+(2*pSlider))*3/4);
            svg.attr("viewBox", "0 0 " + (ancho+wEje) + " " + (altoF+hSlider+(2*pSlider)));
        }
        else
        {
            svg.attr("width", ancho+wEje)
                    .attr("height", altoF+hSlider+(2*pSlider));
        }
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
                .on('click',ponerTelon)
                .text('Cárteles');
        switch(opcion)
        {
            case 'b':
                generaClones(ancho,alto);
                break;
            case 'a':
                gPlecas.selectAll('line, path, text').style('opacity', 0);
                gEtiquetas.selectAll('rect, text').style('opacity', 0);
                r.transition()
                    .duration(1000)
                    .attr("x", ancho)
                    .each('end', function () {
                        gPlecas.selectAll('line, path, text')
                                .transition()
                                .duration(500)
                                .style('opacity', 1);
                        gEtiquetas.selectAll('rect, text')
                                .transition()
                                .duration(500)
                                .style('opacity', 1);
                    })
                    .remove();
                break;
            default:
                break;
        }
        gFederacionesE.append('rect')
                .attr('x',0)
                .attr('y',0)
                .style('fill','transparent')
                .attr('width',(wColumnaE*6*presidentes.length))
                .attr('height',altoF);
        var mover = window.d3.behavior.drag()
                .on('dragstart', iniciarMoverExtendidos)
                .on('drag', function(){moverExtendidos(arregloE,escalarASlider);})
                .on('dragend', terminarMoverExtendidos);
/*        gFederacionesE.selectAll('rect').call(mover);
        gCartelesE.selectAll('rect').call(mover);
        gEtiquetasE.selectAll('rect').call(mover);
        gEtiquetasE.selectAll('text').call(mover);
        gPlecasE.selectAll('text').call(mover);
        gPlecasE.selectAll('line').call(mover);
        gPlecasE.selectAll('path').call(mover);*/
        gCartelesE.selectAll('rect.telon').call(mover);
        gConflictosE.selectAll('circle').call(mover);
        gConflictosE.selectAll('path').call(mover);
        gEncabezadoE.selectAll('rect').call(mover);
        gEncabezadoE.selectAll('text').call(mover);
        gEncabezadoE.selectAll('image').call(mover);
        var moverS = window.d3.behavior.drag()
                .on('dragstart', iniciarMoverSlider)
                .on('drag', function(){moverSlider(arregloS,escalarAExtendida);})
                .on('dragend', terminarMoverSlider);
        gSlider.select('g.slidercontrolgroup').call(moverS);
        gSlider.select('rect').on('click',function(){moverSliderClick(this,arregloS,escalarAExtendida);});

/****/
    gFederaciones.remove();
    gCarteles.remove();
    gEtiquetas.remove();
    gPlecas.remove();
//    gTelon.remove();
    gEncabezado.remove();
    gColumnas.remove();
    gCelulas.remove();
/****/
   }
    ;

    function generaEncabezado()
    {
        gEncabezado.selectAll('rect').data(presidentes)
                .enter()
                .append('rect')
                .attr('x', function (d, i) {
                    return i * wColumna;
                })
                .attr('y', 0)
                .attr('width', wColumna)
                .attr('height', hEncabezado)
                .attr('fill', '#000000')
                .style('stroke', '#ffffff')
                .style('stroke-width', 2);
        gEncabezado.selectAll('text.periodo').data(presidentes)
                .enter()
                .append('text')
                .attr('class', 'periodo')
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
                    return d.inicio + ' - ' + (d.inicio + 6);
                });
        gEncabezado.selectAll('text.presidente').data(presidentes)
                .enter()
                .append('text')
                .attr('class', 'presidente')
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
                .attr('class','presidente fotografia')
                .attr("xlink:href",function(d){
                    return d.fotografia;
                })
                .attr('x',function(d,i){
                    return (i+1)*wColumna-(wImagen+pImagen);
                })
                .attr('y',function(d){
                    return (hEncabezado-wImagen)/2;
                });
    };

    function getCentroEncabezado(i)
    {
        var x0=(i * wColumna) + pImagen;
        var xf=wColumna-(wImagen+(2*pImagen));
        return (xf/2)+x0;
    };
    
    function generaEncabezadoE()
    {
        gEncabezadoE.selectAll('rect').data(presidentesE)
                .enter()
                .append('rect')
                .attr('x', function (d, i) {
                    return i * wColumna;
                })
                .attr('y', 0)
                .attr('width', wColumna)
                .attr('height', hEncabezado)
                .attr('fill', '#000000')
                .style('stroke', '#ffffff')
                .style('stroke-width', 2);
        gEncabezadoE.append('line')
                .style("stroke", "#ffffff")
                .style("stroke-width", 2)
                .style("opacity", 1)
                .attr("x1", 0)
                .attr("y1", hEncabezado/2)
                .attr("x2", presidentesE.length*wColumna)
                .attr("y2", hEncabezado/2);
        gEncabezadoE.selectAll('text.periodo').data(presidentesE)
                .enter()
                .append('text')
                .attr('class', 'periodo')
                .attr('x', function (d, i) {
                    return getCentroEncabezadoE(i);
                })
                .attr('y', pPeriodoPresidente-5)
                .style('font-size', '20px')
                .style('font-weight', 'normal')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .attr('fill', '#ffffff')
                .attr('text-anchor', 'middle')
                .text(function (d) {
                    return d.nombrecorto;
                });
        gEncabezadoE.selectAll('text.presidente').data(presidentesE)
                .enter()
                .append('text')
                .attr('class', 'presidente')
                .attr('x', function (d, i) {
                    return getCentroEncabezadoE(i);
                })
                .attr('y', pNombrePresidente+2)
                .style('font-size', '16px')
                .style('font-weight', 'bold')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .attr('fill', '#ffffff')
                .attr('text-anchor', 'middle')
                .text(function (d,i) {
                    return ((i%6)+d.inicio);
                });
        gEncabezadoE.selectAll(".fotografia.presidente").data(presidentesE)
                .enter()
                .append("svg:image")
                .attr('width',wImagen)
                .attr('height',wImagen)
                .attr('class','presidente fotografia')
                .attr("xlink:href",function(d){
                    return d.fotografia;
                })
                .attr('x',function(d,i){
                    return (i)*wColumna-(wImagen/2);
                })
                .attr('y',function(d){
                    return (hEncabezado-wImagen)/2;
                });
    };

    function getCentroEncabezadoE(i)
    {
        var x0=(i * wColumna);
        var xf=wColumna;
        return (xf/2)+x0;
    };
    
    function generaColumnas()
    {
        var num = presidentes.length + 1;
        var x = 0;
        var alto = (hFila + pFila) * carteles.length;
        var i = 1;
        for (i = 1; i <= num; i++)
        {
            gColumnas.append("line")
                    .style("stroke", "#000000")
                    .style("stroke-width", 1)
                    .style("opacity", 1)
                    .attr("x1", x)
                    .attr("y1", hEncabezado)
                    .attr("x2", x)
                    .attr("y2", hEncabezado + alto)
                    .style("stroke-dasharray", ("1,3"));
            x = i * wColumna;
        }
    };

    function generaColumnasE()
    {
        var num = presidentesE.length + 1;
        var x = 0;
        var alto = (hFila + pFila) * carteles.length;
        var i = 1;
        for (i = 1; i <= num; i++)
        {
            gColumnasE.append("line")
                    .style("stroke", "#000000")
                    .style("stroke-width", 1)
                    .style("opacity", 1)
                    .attr("x1", x)
                    .attr("y1", hEncabezado)
                    .attr("x2", x)
                    .attr("y2", hEncabezado + alto)
                    .style("stroke-dasharray", ("1,3"));
            x = i * wColumna;
        }
    };

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
    };
    
    function generaCartelesE()
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
            ini = (c.inicio - anioBase) * wAnioE;
            fin = (c.fin - anioBase) * wAnioE;
            x = ini;
            w = fin - ini;
            c.xE = x;
            c.wE = w;
        });
        gCartelesE.selectAll('rect.cartel').data(carteles)
                .enter()
                .append('rect')
                .attr('class', function(d){ return 'cartel '+d.id;})
                .attr('x', function (d) {
                    return d.xE;
                })
                .attr('y', function (d) {
                    return d.yi;
                })
                .attr('width', function (d) {
                    return d.wE;
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
//INSERTAR
        gCartelesB.selectAll('rect.blur').data(carteles)
                .enter()
                .append('rect')
                .attr('class', function(d){ d.seleccionado=false;d.hover=false; return 'blur '+d.id;})
                .attr('x', function (d) {
                    return d.xE;
                })
                .attr('y', function (d) {
                    return d.yi;
                })
                .attr('width', function (d) {
                    return d.wE;
                })
                .attr('height', function (d) {
                    return d.h;
                })
                .attr('fill', '#ffffff')
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 1)
                .style('opacity',0.70)
                .on('mouseover',function(d){
                    d.hover=true;
                    var carts=window._.select(carteles,{id:d.id});
                    window._.each(carts,function(cart){
                        cart.hover=d.hover;
                    });
                    resaltaCarteles();
                })
/*
                .on('mouseout',function(d){
                    d.hover=false;
                    var carts=window._.select(carteles,{id:d.id});
                    window._.each(carts,function(cart){
                        cart.hover=d.hover;
                    });
                    resaltaCarteles();
                })
*/
                .on('click',function(d){
                    d.seleccionado=!d.seleccionado;
                    var carts=window._.select(carteles,{id:d.id});
                    window._.each(carts,function(cart){
                        cart.seleccionado=d.seleccionado;
                    });
                    resaltaCarteles();
                });
    };
    
    function resaltaCarteles()
    {//PENDING
        var resaltar=[];
        var destacados=window._.select(carteles,function(cart){
            return (cart.seleccionado||cart.hover);
        });
        window._.each(destacados,function(d){
            resaltar.push(d.id+'-'+d.inicio);
        });
        var ops=[];
        window._.each(destacados,function(d){
            var confs=window._.select(conflictos,function(cart){
                return cart.cartel.id===d.id;
            });            
            window._.each(confs,function(conf){
                window._.each(conf.oponentes,function(op){
                    window._.each(op,function(o){
                        ops.push(o.id);
                    });
                });
            });            
        });
        ops=window._.uniq(ops);
        destacados=window._.select(carteles,function(cart){
            return (ops.indexOf(cart.id)>=0)?true:false;
        });
        window._.each(destacados,function(d){
            resaltar.push(d.id+'-'+d.inicio);
        });
        resaltar=window._.uniq(resaltar);
        var nuevosCarteles=window._.select(carteles,function(cart){
            return (resaltar.indexOf(cart.id+'-'+cart.inicio)>=0)?true:false;
        });
        var cartelesR=gCartelesR.selectAll('rect.cartelr').data(nuevosCarteles,function(d){return d.id+'-'+d.inicio;});
        cartelesR.enter()
                .append('rect')
                .attr('class', function(d){ return 'cartelr '+d.id;})
                .attr('x', function (d) {
                    return d.xE;
                })
                .attr('y', function (d) {
                    return d.yi;
                })
                .attr('width', function (d) {
                    return d.wE;
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
                .attr('stroke-width', 1)
                .on('mouseout',function(d){
                    d.hover=false;
                    var carts=window._.select(carteles,{id:d.id});
                    window._.each(carts,function(cart){
                        cart.hover=d.hover;
                    });
                    resaltaCarteles();
                })
                .on('click',function(d){
                    d.seleccionado=!d.seleccionado;
                    var carts=window._.select(carteles,{id:d.id});
                    window._.each(carts,function(cart){
                        cart.seleccionado=d.seleccionado;
                    });
                    resaltaCarteles();
                });
        cartelesR.exit()
                .remove();
        var ids=window._.uniq(window._.pluck(nuevosCarteles,'id'));
        var leyendasER=window._.select(leyendasE,function(l){
            return (ids.indexOf(l.id)>=0)?true:false;
        });
//console.log(leyendasER);

        var textosR=gCartelesR.selectAll('text.cartel').data(leyendasER,function(d){return d.id+'-'+d.anio;});
        textosR.enter()
                .append('text')
                .attr('class', function(d){ return 'cartel '+d.id;})
                .attr('fill', '#ffffff')
                .style('font-weight', 'bold')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 12)
                .attr('text-anchor', 'middle')
                .attr('x', function (d) {
                    return d.xE;
                })
                .attr('y', function (d) {
                    return d.y + 30;
                })
                .text(function (d) {
                    return d.nombree;
                });
        textosR.exit()
                .remove();
        gCartelesR.selectAll('text.cartel').call(wrapE);
        gCartelesR.selectAll('text.wrapped').call(ajustaLineas);

        var b = null;
        var etiquetas = [];
        var leyendas = gCartelesR.selectAll('text.wrapped');
        leyendas.each(function (d) {
            b = this.getBBox();
            etiquetas.push({'color': d.color, 'borde': d.borde, 'x': b.x - pEtiquetaX, 'y': b.y - pEtiquetaY, 'width': b.width + (2 * pEtiquetaX), 'height': b.height + (2 * pEtiquetaY), 'clase':d.id, 'id':d.id+'-'+d.anio});
        });
        var etiquetasR=gCartelesR.selectAll('rect.etiqueta').data(etiquetas,function(d){return d.id;});
        etiquetasR.enter()
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
        etiquetasR.exit()
                .remove();
        gCartelesR.selectAll('text.cartel').data([]).exit().remove();

        var leyendasR=gCartelesR.selectAll('text.cartel').data(leyendasER,function(d){return d.id+'-'+d.anio;});
        leyendasR.enter()
                .append('text')
                .attr('class', function(d){ return 'cartel '+d.id;})
                .attr('fill', '#ffffff')
                .style('font-weight', 'bold')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 12)
                .attr('text-anchor', 'middle')
                .attr('x', function (d) {
                    return d.xE;
                })
                .attr('y', function (d) {
                    return d.y + 30;
                })
                .text(function (d) {
                    return d.nombree;
                });
        leyendasR.exit()
                .remove();
        gCartelesR.selectAll('text.cartel').call(wrapE);
        gCartelesR.selectAll('text.wrapped').call(ajustaLineas);



//        console.log(gCartelesE.selectAll('rect.cartelr'));
//        var originales=[];
//        gCartelesE.selectAll('rect.cartel');
/*        
        var confs=window._.select(conflictos,function(cart){
            return cart.cartel.id===cartel.id;
        });
        var ops=[];
        window._.each(confs,function(conf){
            window._.each(conf.oponentes,function(op){
                window._.each(op,function(o){
                    ops.push(o.id);
                });
            });
        });
        ops=window._.uniq(ops);
        console.log(ops);
*/
    };

    function generaLeyendas()
    {
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
    };
    
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
    };
    
    var leyendasE=[];
    function generaLeyendasE() {
        var oX = getOffsetPleca(aPleca) * 2;
        var c = null;
        var leyendas = window._.select(carteles, function (c) {
            return c.nombree !== '';
        });
        var anioBase=getAnioBase();
        window._.each(leyendas,function(l){
            var i=0;
            for (i=l.inicio;i<l.fin;i++)
            {
                var lE=window._.clone(l);
                lE.anio=i;
                lE.xE=((i-anioBase)*wAnioE)+Math.ceil(wAnioE/2);
                leyendasE.push(lE);
            }            
        });
        gLeyendasB.selectAll('text.cartel').data(leyendasE)
                .enter()
                .append('text')
                .attr('class', function(d){ return 'cartel '+d.id;})
                .attr('fill', '#ffffff')
                .style('font-weight', 'bold')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 12)
                .attr('text-anchor', 'middle')
                .attr('x', function (d) {
                    return d.xE;
                })
                .attr('y', function (d) {
                    return d.y + 30;
                })
                .text(function (d) {
                    return d.nombree;
                });
        gLeyendasB.selectAll('text.cartel').call(wrapE);
        gLeyendasB.selectAll('text.wrapped').call(ajustaLineas);
        gLeyendasR.selectAll('text.cartel').data(leyendasE)
                .enter()
                .append('text')
                .attr('class', function(d){ return 'cartel '+d.id;})
                .attr('fill', '#ffffff')
                .style('font-weight', 'bold')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 12)
                .attr('text-anchor', 'middle')
                .attr('x', function (d) {
                    return d.xE;
                })
                .attr('y', function (d) {
                    return d.y + 30;
                })
                .text(function (d) {
                    return d.nombree;
                });
        gLeyendasR.selectAll('text.cartel').call(wrapE);
        gLeyendasR.selectAll('text.wrapped').call(ajustaLineas);
    };

    function wrapE(text) {
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
                if (tspan.node().getComputedTextLength() > (text.datum().wE - 30)) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr('class', clases).attr("x", text.attr('x')).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    };

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
    };

    function generaEtiquetasB()
    {
        var b = null;
        var etiquetas = [];
        var leyendas = gLeyendasB.selectAll('text.wrapped');
        leyendas.each(function (d) {
            b = this.getBBox();
            etiquetas.push({'color': d.color, 'borde': d.borde, 'x': b.x - pEtiquetaX, 'y': b.y - pEtiquetaY, 'width': b.width + (2 * pEtiquetaX), 'height': b.height + (2 * pEtiquetaY), 'clase':d.id});
        });
        gEtiquetasB.selectAll('rect.etiquetab').data(etiquetas)
                .enter()
                .append('rect')
                .attr('class', function(d){
                    return 'etiquetab '+d.clase;
                })
                .style('fill', '#ffffff')
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
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 2);
        gEtiquetasR.selectAll('rect.etiquetab').data(etiquetas)
                .enter()
                .append('rect')
                .attr('class', function(d){
                    return 'etiquetab '+d.clase;
                })
                .style('fill', '#ffffff')
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
                .attr('stroke', '#ffffff')
                .attr('stroke-width', 2);
    };

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

    };

    function getOffsetPleca(a)
    {
        var f = (Math.sqrt(3)) / 2;
        var h = Math.sqrt(f * a * 2);
        return Math.floor(h / 2) - 2;
    };

    function generaPlecasE()
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
            x = obj.xE;
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
            x = obj.xE + obj.wE;
            obj = window._.min(arreglo, 'yi');
            y1 = obj.yi;
            obj = window._.max(arreglo, 'yf');
            y2 = obj.yf;
            arregloLineas.push({x1: x, x2: x, y1: y1, y2: y2});
        });
        gCartelesB.selectAll('line.pleca').data(arregloLineas)
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
        gCartelesB.selectAll('line.plecab').data(arregloLineas)
                .enter()
                .append("line")
                .attr('class', 'plecab')
                .style("stroke", "#ffffff")
                .style("stroke-width", wLinea)
                .style("opacity", 0.70)
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
        gCartelesB.selectAll("path.pleca").data(plecas)
                .enter()
                .append("path")
                .attr("d", pleca)
                .attr("class", "pleca")
                .attr("transform", function (d) {
                    return "translate(" + (d.xE + oX) + "," + (d.y + oY) + "), rotate(90)";
                })
                .style('fill','#000000')
                .style('stroke','#000000')
                .style('stroke-width',1);
        gCartelesB.selectAll("path.plecab").data(plecas)
                .enter()
                .append("path")
                .attr("d", pleca)
                .attr("class", "plecab")
                .attr("transform", function (d) {
                    return "translate(" + (d.xE + oX) + "," + (d.y + oY) + "), rotate(90)";
                })
                .style('fill','#ffffff')
                .style('stroke','#ffffff')
                .style('stroke-width',1)
                .style('opacity',0.70)
                .style('stroke-opacity',0.70);
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
            arregloFlechas.push({x1: cfin.xE - 60, x2: cfin.xE + (wLinea / 2), y1: cini.yi + (cini.h / 2) + o.offset, y2: cini.yi + (cini.h / 2) + o.offset});
            if (cfin.yi >= cini.yi)
            {
                arregloFlechas.push({x1: cfin.xE, x2: cfin.xE, y1: cini.yi + (cini.h / 2) + o.offset + (wLinea/2), y2: cfin.yi - oPleca});
                arregloPuntas.push({x: cfin.xE, y: cfin.yi, o: -oPleca, rot: 180});
            }
            else
            {
                arregloFlechas.push({x1: cfin.xE, x2: cfin.xE, y1: cini.yi + (cini.h / 2) + o.offset - (wLinea/2), y2: cfin.yf + oPleca});
                arregloPuntas.push({x: cfin.xE, y: cfin.yf, o: oPleca, rot: 0});
            }
        });
        gCartelesB.selectAll('line.flecha').data(arregloFlechas)
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
        gCartelesB.selectAll('line.flechab').data(arregloFlechas)
                .enter()
                .append('line')
                .attr('class', 'flechab')
                .style("stroke", "#ffffff")
                .style("stroke-width", wLinea)
                .style("opacity", 0.70)
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
        gCartelesB.selectAll("path.flecha").data(arregloPuntas)
                .enter()
                .append("path")
                .attr("d", pleca)
                .attr("class", "flecha")
                .attr("transform", function (d) {
                    return "translate(" + (d.x) + "," + (d.y + d.o) + "), rotate(" + d.rot + ")";
                });
        gCartelesB.selectAll("path.flechab").data(arregloPuntas)
                .enter()
                .append("path")
                .attr("d", pleca)
                .attr("class", "flechab")
                .attr("transform", function (d) {
                    return "translate(" + (d.x) + "," + (d.y + d.o) + "), rotate(" + d.rot + ")";
                })
                .style('fill','#ffffff')
                .style('opacity',0.70);
    };

    function generaEtiquetas()
    {
        var b = null;
        var etiquetas = [];
        var leyendas = gPlecas.selectAll('text.wrapped');
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
    };
    
    function generaEtiquetasE()
    {
        var b = null;
        var etiquetas = [];
        var leyendas = gCartelesB.selectAll('text.wrapped');
        leyendas.each(function (d) {
            b = this.getBBox();
            etiquetas.push({'color': d.color, 'borde': d.borde, 'x': b.x - pEtiquetaX, 'y': b.y - pEtiquetaY, 'width': b.width + (2 * pEtiquetaX), 'height': b.height + (2 * pEtiquetaY), 'clase':d.id});
        });
        gCartelesB.selectAll('rect.etiqueta').data(etiquetas)
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
        leyendasE=[];
        gCartelesB.selectAll('text.cartel').data([]).exit().remove();
    };

    ajustaCarteles = function()
    {
        var base=hEncabezado+pFila;
//        var base=hEncabezado-pFila+radio;
//console.log('Base (original): '+(hEncabezado+pFila));
//console.log('Base (nueva): '+(hEncabezado-pFila+radio));
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
/*                if (diametro>h)
                {
                    yi+=radio-(h/2);
                    h=diametro;                    
                }*/
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
//h=window._.max([h,2*radio]);
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
        gCarteles.selectAll('rect.cartel').each(function(d,i){
            var lider=(d.lideres.length<2)?'Líder':'Líderes';
            var lideres='';
            window._.each(d.lideres,function(l){
                lideres+='<li>'+l+'</li>';
            });
            var inicio=d.inicio;
            var offset=d.w/2;
            var presidente=window._.findLast(presidentes,function(p){
                var fin=p.inicio+6;
                return ((p.inicio<=inicio)&&(inicio<=fin));
            });
            var contenido='<p class="tt-titulo">'+d.nombrelargo+'</p><p class="tt-subtitulo">'+lider+' en el sexenio de '+presidente.nombrecorto+':</p><ul class="tt-lideres">'+lideres+'</ul>';
            $(this).tooltipster({
                 theme: 'tooltipster tooltipster-'+d.id,
                 content: $(contenido),
                 position: 'top',
                 offsetX:offset,
                 maxWidth:wColumna-30,
                 functionReady:ajustaTooltip
            });
        });

        gEje.selectAll('rect.federacion').each(function(d,i){
            var lider=(d.lideres.length<2)?'Líder':'Líderes';
            var lideres='';
            window._.each(d.lideres,function(l){
                lideres+='<li>'+l+'</li>';
            });
            var offset=d.w/2;
            var contenido='<p class="tt-titulo">'+d.nombre+'</p><p class="tt-subtitulo">'+lider+':</p><ul class="tt-lideres">'+lideres+'</ul>';
            $(this).tooltipster({
                 theme: 'tooltipster tooltipster-'+d.id,
                 content: $(contenido),
                 position: 'top',
                 offsetX:offset,
                 offsetY:-altoF*3/4,
                 maxWidth:wColumna-30,
                 functionReady:ajustaTooltip
            });
        });

    };

    function ajustaTooltip(origin,tooltip)
    {
        var c=$(tooltip[0]).find('div').html();
        $(origin).tooltipster('content',$(c));
    };
    
    function generaFederaciones()
    {
        var anioBase = getAnioBase();
        var alto = (hFila + pFila) * carteles.length;
            gFederaciones.selectAll('rect.federacion').data(federaciones)
                    .enter()
                    .append('rect')
                    .attr('class',function(f){return 'federacion '+f.id;})
                    .attr('x',function(f){return ((f.inicio-anioBase)*wAnio);})
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
                    .style('font-size', 18)
                    .style('font-weight', 'bold')
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
                    .style('font-size', 16)
                    .attr('fill', '#000000')
                    .attr('x',function(i){
                        return i.x;
                    })
                    .attr('y',function(i){
                        return i.y+20;
                    })
                    .text(function(i){
                        var f=window._.find(federaciones,{id:i.id});
                        return f.inicio+' - '+f.fin;
                    });
    };
    
    generaFederacionesE = function()
    {
        var anioBase = getAnioBase();
        var alto = (hFila + pFila) * carteles.length;
            gFederacionesE.selectAll('rect.federacion').data(federaciones)
                    .enter()
                    .append('rect')
                    .attr('class',function(f){return 'federacion '+f.id;})
                    .attr('x',function(f){return ((f.inicio-anioBase)*wAnioE);})
                    .attr('y',hEncabezado)
                    .attr('width',function(f){f.w=(f.fin-f.inicio)*wAnioE;return f.w;})
                    .attr('height',alto)
                    .style('fill', function (f) {return f.color;});
            gEtiquetasE.selectAll('text.federacion.titulo').data(involucrados)
                    .enter()
                    .append('text')
                    .attr('class','federacion titulo')
                    .attr('text-anchor', 'middle')
                    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                    .style('font-size', 18)
                    .style('font-weight', 'bold')
                    .attr('fill', function(i){
                        var f=window._.find(federaciones,{id:i.id});
                        return f.fuente;
                    })
                    .attr('x',function(i){
                        var f=window._.find(federaciones,{id:i.id});
                        var xi=f.inicio-anioBase;
                        var w=f.fin-f.inicio;
                        var x=(xi+(w/2))*wAnioE;
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
            gEtiquetasE.selectAll('text.federacion.fechas').data(involucrados)
                    .enter()
                    .append('text')
                    .attr('class','federacion fechas')
                    .attr('text-anchor', 'middle')
                    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                    .style('font-size', 16)
                    .attr('fill', '#000000')
                    .attr('x',function(i){
                        return i.x;
                    })
                    .attr('y',function(i){
                        return i.y+20;
                    })
                    .text(function(i){
                        var f=window._.find(federaciones,{id:i.id});
                        return f.inicio+' - '+f.fin;
                    });
    };
    
    function generaTelon()
    {
        gTelon.append('rect')
                .attr('class', 'telon')                
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", '100%')
                .attr("height", '100%')
                .style("fill", "#ffffff");
    };
    
    function generaTelonE(ancho,alto,escala)
    {
        gTelon.selectAll('rect.telon').data(presidentes)
                .enter()
                .append('rect')
                .attr('class', 'telon')                
                .attr('x', function (d, i) {
                    return i * wColumna;
                })
                .attr('y', hEncabezado)//Si se quiere incluir a los presidentes en el telón, se pasa a 0
                .attr('width', wColumna)
                .attr('height', alto)
                .style('fill','#ffffff')
                .style('opacity',0)
                .on('click',function(d){quitarTelon(d,ancho,this,escala);})
                .on('mouseover',function(d){window.d3.select(this).style('opacity',0.90);})
                .on('mouseout',function(d){window.d3.select(this).style('opacity',0.70);})
                .transition('agregartelon')
                .duration(200)
                .style("fill", "#000000")
                .style('opacity',0.70);
    };
    
    
    function clonarElemento(origen, destino) {
        origen.each(function() {
                var clone = destino.node().appendChild(this.cloneNode(true));
                window.d3.select(clone).attr("class", "clon");
        });
    };
   
    function generaClones(ancho,alto)
    {
        clonDerecho=gClonDerecho.append('svg').attr('width',ancho).attr('height',alto);
        clonIzquierdo=gClonIzquierdo.append('svg').attr('width',ancho).attr('height',alto);
        clonDerecho.append('rect')
                .attr('x',0)
                .attr('y',0)
                .attr('width',ancho)
                .attr('height',alto)
                .style('fill','#ffffff');
        clonIzquierdo.append('rect')
                .attr('x',0)
                .attr('y',0)
                .attr('width',ancho)
                .attr('height',alto)
                .style('fill','#ffffff');
        clonarElemento(gFederaciones,clonDerecho);
        clonarElemento(gCarteles,clonDerecho);
        clonarElemento(gEtiquetas,clonDerecho);
        clonarElemento(gPlecas,clonDerecho);
        clonarElemento(gEncabezado,clonDerecho);
        clonarElemento(gColumnas,clonDerecho);
        clonarElemento(gTelon,clonDerecho);
        clonDerecho.selectAll('g.clon')
                .attr('transform',null);

        clonarElemento(gFederaciones,clonIzquierdo);
        clonarElemento(gCarteles,clonIzquierdo);
        clonarElemento(gEtiquetas,clonIzquierdo);
        clonarElemento(gPlecas,clonIzquierdo);
        clonarElemento(gEncabezado,clonIzquierdo);
        clonarElemento(gColumnas,clonIzquierdo);
        clonarElemento(gTelon,clonIzquierdo);
        clonIzquierdo.selectAll('g.clon')
                .attr('transform',null);
    };

    function quitarTelon(p,ancho,el,escala)
    {
        if (flagE===false)
        {
            flagE=true;
            p.click=true;
            var t=window.d3.select(el);
            var s=svg.node();
            var coord=window.d3.mouse(s);
            var x=coord[0];
            x-=wEje;
            xE=getValorE(x);
            actualizarSlider(xE,escala,false);
            t.transition('quitartelon')
                    .duration(200)
                    .style('fill','#000000')
                    .style('opacity',0.7)
                    .each('end',function(d){
                    gEje.select('rect.eje').transition('cambiareje')
                            .duration(2000)
                            .style('fill','#ff0000')
                            .each('end',function(){
                                gEje.select('rect.eje').classed('pointer',true);
                                gEje.select('text').classed('pointer',true).text('Regresar');                    
                            });

                        svg.selectAll('g.fade').style('opacity',0);
                        gTelon.attr('transform','translate('+wEje+','+(-altoF*10)+')');
                        svg.selectAll('g.extendida').attr('transform','translate('+(-xE)+',0)');
                        gClonIzquierdo.select('svg').attr('width',x);
                        gClonDerecho.attr('transform','translate('+(x+wEje)+',0)');
                        gClonDerecho.select('svg').attr('width',(ancho-x)).selectAll('.clon').attr('transform','translate('+(-x)+',0)');
                        gClonDerecho.selectAll('rect.telon')
                                .style("fill", '#000000')
                                .style("opacity", 0.7);
//                                .style("fill", function(d,i){return (presidentes[i].click===true)?'#ffffff':'#000000';})
//                                .style("opacity", function(d,i){return (presidentes[i].click===true)?0:0.7;});
                        gClonIzquierdo.selectAll('rect.telon')
                                .style("fill", '#000000')
                                .style("opacity", 0.7);
//                                .style("fill", function(d,i){return (presidentes[i].click===true)?'#ffffff':'#000000';})
//                                .style("opacity", function(d,i){return (presidentes[i].click===true)?0:0.7;});
                        gClonIzquierdo.transition()
                                .duration(2000)
                                .attr('transform','translate('+(-x)+',0)');
                        gClonDerecho.transition()
                                .duration(2000)
                                .attr('transform','translate('+(ancho+wEje)+',0)');
                    });            
        }
    };
    
    function getValorE(v)
    {
        return ((v*5)-wEje);
    };
    
    function ponerTelon()
    {
        if (flagE===true)
        {
            flagE=false;
            window._.each(presidentes,function(p){
                p.click=false;
            });

                gEje.select('rect.eje').classed('pointer',false);
                gEje.select('text').classed('pointer',false);
                gEje.select('rect.eje').transition('regresareje')
                        .duration(2000)
                        .style('fill','#58595b')
                        .each('end',function(){
                            gEje.select('text').text('Cárteles');                    
                        });
                    gClonDerecho.selectAll('rect.telon')
                            .style("fill", '#000000')
                            .style("opacity", 0.7);
                    var x=+gClonIzquierdo.select('svg').attr('width');
                    gClonIzquierdo.selectAll('rect.telon')
                            .style("fill", '#000000')
                            .style("opacity", 0.7);
                    gClonIzquierdo.transition()
                            .duration(2000)
                            .attr('transform','translate('+wEje+',0)')
                            .each('end',function(){terminarPonerTelon(1);});
                    gClonDerecho.transition()
                            .duration(2000)
                            .attr('transform','translate('+(x+wEje)+',0)')
                            .each('end',function(){terminarPonerTelon(1);});
        }
    };
    
    function terminarPonerTelon(n)
    {
        telones+=n;
        if (telones===2)
        {
            telones=0;
            svg.selectAll('g.fade').style('opacity',null);
            gTelon.attr('transform','translate('+wEje+',0)');
            gClonIzquierdo.selectAll('rect.telon').style('opacity',0);
            gClonDerecho.selectAll('rect.telon').style('opacity',0);
            gTelon.selectAll('rect.telon').style('fill','#000000').style('opacity',.70);
        }
    }
    
    function iniciarMoverExtendidos(d)
    {
        xDrag=false;
        window.d3.selectAll('g.extendida').classed('grab',true);
        window.d3.selectAll('g.extendida').classed('grabbing',false);
    };
    
    function terminarMoverExtendidos(d)
    {
        xDrag=false;
        window.d3.selectAll('g.extendida').classed('grab',true);
        window.d3.selectAll('g.extendida').classed('grabbing',false);
    };

    function moverExtendidos(arreglo,escala)
    {
        var min=arreglo[0];
        var max=arreglo[1];
        window.d3.selectAll('g.extendida').classed('grab',false);
        window.d3.selectAll('g.extendida').classed('grabbing',true);
        if (xDrag===false)
        {
            xDrag=window.d3.event.x;
        }
        var delta=xDrag-window.d3.event.x;
        xE+=delta;
        xE=Math.max(min, Math.min(max, xE));
        actualizarSlider(xE,escala,true);
    };
    
    function generaSlider(ancho,altoF)
    {
        gSlider.attr('transform','translate('+wEje+','+altoF+')');
        gSlider.append('rect')
                .attr('fill','#000000')
                .style('stroke','#ffff')
                .style('stroke-width', pSlider)
                .attr('height',hSlider+(2*pSlider))
                .attr('width',ancho)
                .attr('class','slidercontrolgroup pointer');
        var g=gSlider.append('g')
                .attr('class','slidercontrolgroup')
        g.append('rect')
                .attr('fill','#ff0000')
                .attr('height',hSlider+(2*pSlider))
                .attr('width',wSliderControl)
                .attr('x',0)
                .attr('y',0);
        g.append('line')
                .style('stroke','#000000')
                .attr('x1',wSliderControl/2)
                .attr('x2',wSliderControl/2)
                .attr('y1',pSlider)
                .attr('y2',hSlider+pSlider);
        var flecha = window.d3.svg.symbol()
                .type("triangle-up")
                .size(25);
        g.append('path')
                .attr('d',flecha)
                .attr('transform','translate('+(3*wSliderControl/4)+','+((hSlider/2)+pSlider)+'), rotate(90)');
        g.append('path')
                .attr('d',flecha)
                .attr('transform','translate('+(wSliderControl/4)+','+((hSlider/2)+pSlider)+'), rotate(270)');
    };

    function iniciarMoverSlider(d)
    {
        gSlider.select('g.slidercontrolgroup')
                .classed('grab',true)
                .classed('grabbing',false);
    };
    
    function terminarMoverSlider(d)
    {
        gSlider.select('g.slidercontrolgroup')
                .classed('grab',true)
                .classed('grabbing',false);
    };

    function moverSlider(arreglo,escala)
    {
        var min=arreglo[0];
        var max=arreglo[1];
        gSlider.select('g.slidercontrolgroup')
                .classed('grab',false)
                .classed('grabbing',true);
        var x=Math.max(min, Math.min(max, window.d3.event.x));
        actualizarExtendida(x,escala);
    };
    
    function moverSliderClick(el,arreglo,escala)
    {
        var coord=window.d3.mouse(el);
        var x=coord[0];
        var min=arreglo[0];
        var max=arreglo[1];
        var x=Math.max(min, Math.min(max, x));
        actualizarExtendida(x,escala);
    };
    
    function actualizarSlider(xE,escala,flag)
    {
        flag=flag||false;
        var x=escala(xE);
        gSlider.select('g.slidercontrolgroup').attr('transform','translate('+(x-(wSliderControl/2))+',0)');
        if (flag)
        {
            svg.selectAll('g.extendida').attr('transform','translate('+(-xE)+',0)');
        }
    };

    function actualizarExtendida(x,escala)
    {
        xE=escala(x);
        gSlider.select('g.slidercontrolgroup').attr('transform','translate('+(x-(wSliderControl/2))+',0)');
        svg.selectAll('g.extendida').attr('transform','translate('+(-xE)+',0)');
    };
    
    function agruparConflictos(arreglo)
    {
        var conflictos=[];
        var presidente=null;
        var cartel=null;
        var oponente=null;
        var conflicto=null;
        var anio=0;
        window._.each(arreglo,function(c){
            for (anio=c.inicio;anio<=c.fin;anio++)
            {
                presidente=window._.find(presidentes,{id:c.presidente});
                window._.each(c.bando1,function(b){
                    cartel=window._.find(carteles,function(cart){
                        var flagId=(cart.id===b)?true:false;
                        var flagAnio=((cart.inicio<=anio)&&(anio<=cart.fin));
                        return (flagId&&flagAnio);
                    });
                    var oponentes=[];
                    var arreglo=[];
                    window._.each(c.bando2,function(o){
                        oponente=window._.find(carteles,{id:o});
                        arreglo.push(oponente);
                    });
                    oponentes.push(arreglo);
                    conflicto=window._.find(conflictos,function(conf) {
                        var flagAnio=(conf.anio===anio)?true:false;
                        var flagCartel=(conf.cartel.id===cartel.id);
                        return (flagAnio&&flagCartel);
                    });
                    conflicto=conflicto||false;
                    if (conflicto!==false)
                    {
                        conflicto.oponentes.push(arreglo);
                    }
                    else
                    {
                        conflictos.push({cartel:cartel,presidente:presidente,anio:anio,oponentes:oponentes});
                    }
                })
                window._.each(c.bando2,function(b){
                    cartel=window._.find(carteles,{id:b});
                    var oponentes=[];
                    var arreglo=[];
                    window._.each(c.bando1,function(o){
                        oponente=window._.find(carteles,{id:o});
                        arreglo.push(oponente);
                    });
                    oponentes.push(arreglo);
                    conflicto=window._.find(conflictos,function(conf) {
                        var flagAnio=(conf.anio===anio)?true:false;
                        var flagCartel=(conf.cartel.id===cartel.id);
                        return (flagAnio&&flagCartel);
                    });
                    conflicto=conflicto||false;
                    if (conflicto!==false)
                    {
                        conflicto.oponentes.push(arreglo);
                    }
                    else
                    {
                        conflictos.push({cartel:cartel,presidente:presidente,anio:anio,oponentes:oponentes});
                    }
                })
            }            
        });
        window._.each(conflictos,function(conf){
            var claves=[];
            var oponentes=window._.clone(conf.oponentes);
            conf.oponentes=[];
            window._.each(oponentes,function(op){
                var clave=window._.pluck(op,'id').join('-');
                if (claves.indexOf(clave)<0)
                {
                    claves.push(clave);
                    conf.oponentes.push(op);
                }
            });
        });
        var conflictosSinRepetidos=[];
        window._.each(conflictos,function(conf){
            var oponentesSinRepetidos=[];
            var unitarios=window._.select(conf.oponentes,function(ops){
                return (ops.length<2)?true:false;
            });
            unitarios=unitarios||[];
            var alianzas=window._.select(conf.oponentes,function(ops){
                return (ops.length>=2)?true:false;
            });
            alianzas=alianzas||[];
            var alianzasId=[];
            window._.each(alianzas,function(ali){
                var ids=window._.pluck(ali,'id');
                window._.each(ids,function(id){
                    alianzasId.push(id);
                });
            });
            alianzasId=window._.uniq(alianzasId);
            window._.each(unitarios,function(unit){
                unit=unit[0];
                var id=unit.id;
                if (alianzasId.indexOf(id)<0)
                {
                    oponentesSinRepetidos.push([unit]);
                }
            });
            window._.each(alianzas,function(ali){
                oponentesSinRepetidos.push(ali);
            });
            conf.oponentes=window._.clone(oponentesSinRepetidos);
        });
        return conflictos;
    };
    
    generaConflictos = function()
    {
        var signos=[];
        var iniciales=[];
        window._.each(conflictos,function(c){
            var y=c.cartel.yi+((c.cartel.yf-c.cartel.yi)/2);
            var dAnio=c.anio-c.cartel.inicio;
            var x=c.cartel.xE+(dAnio*wAnioE);
            x+=radio;
            window._.each(c.oponentes,function(arr) {
                x+=oBolita;
                if (arr.length>1)
                {
                    signos.push({x:x+radio,y:y,num:(arr.length-1),aux:arr.length});
                }
                window._.each(arr,function(oponente){
                    gConflictosE.append('circle')
                            .datum(window._.clone(oponente))
                            .attr('class', function(d){
                                iniciales.push(d);
                                return 'oponente '+d.id;
                            })
                            .style('fill', function (d) {
                                return d.color;
                            })
                            .style('stroke', function (d) {
                                return d.borde;
                            })
                            .attr('stroke-width', 2)
                            .attr('cx', function (d) {
                                d.cx=x;
                                return d.cx;
                            })
                            .attr('cy', function (d) {
                                d.cy=y;
                                return d.cy;
                            })
                            .attr('r',radio);
                    x+=2*radio;
                });
            });
            gConflictosE.selectAll('text').data(iniciales)
                    .enter().append('text')
                    .attr('class','conflicto')
                    .attr('text-anchor', 'middle')
                    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                    .style('font-size', 13)
                    .style('font-weight', 'bold')
                    .attr('fill', '#000000')
                    .attr('x',function(d){return d.cx;})
                    .attr('y',function(d){return d.cy+4;})
                    .text(function(d){return d.inicialc;})
        });
        var signo = window.d3.svg.symbol()
                .type("cross")
                .size(81);
        window._.each(signos,function(s){
            var x=s.x;
            var y=s.y;
            var i=0;
            for (i=1;i<=s.num;i++)
            {
                x+=2*radio*(i-1);
                gConflictosE.append('path')
                        .attr('class','alianza')
                        .attr('d',signo)
                        .attr('transform','translate('+x+','+y+')');
            }
        });
    }

    generaCelulas = function()
    {
gCelulas.attr('id','gCelulas');
        gCelulas.selectAll("circle.total").data(presidentes)
                .enter()
                .append("circle")
                .attr('class','total')
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
                .attr('class','total')
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
    
    
    generaGrafos = function()
    {
        window._.each(presidentes,function(p){
            var cts=window._.indexBy(carteles,'id');
            window._.each(cts,function(c){
                var cls=window._.select(celulas,{presidente:p.id,cartel:c.id});
                if (cls.length>0)
                {
                    var g=gCelulas.append('g');
                    g.attr('transform','translate(100,100)');
                    var nodos=[{nombre:c.nombrelargo}];
                    var ligas=[];
                    var i=0;
                    window._.each(cls,function(cl){
                        i++;
                        nodos.push({nombre:cl.nombre});
                        ligas.push({source:0,target:i});
                    });
console.log(c);
                    var force = window.d3.layout.force()
                            .nodes(nodos)
                            .links(ligas);
                    var link = g.selectAll('.link')
                            .data(ligas)
                            .enter().append('line')
                            .style('stroke','#ffffff')
                            .attr('class', 'link');
                    var node = g.selectAll('.node')
                            .data(nodos)
                            .enter().append('circle')
                            .attr('fill','#ff0000')
                            .attr('class', 'node');
force.on('end', function() {
    node.attr('r', 10)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; });
    link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

});
                    force.start();
                }
            });
        });
    };
    
    return {
        init:init
    };
}());
