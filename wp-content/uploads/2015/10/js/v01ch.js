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
    var altoF = 0;
    var wImagen = 50;
    var pImagen = 10;
    var wEje = 40;


    var presidentes = [];
    var carteles = [];
    var origenes = [];
    var federaciones = [];
    var involucrados = [];
    var celulas = [];
    var conflictos = [];
    var resumenconflictos = [];

    var presidentesE = [];
    var flagE = false;

    var oBolita = 5;
    var radio = 14;
    var diametro = 0;
    var radionumeroconflictos = 25;

    var clonDerecho = null;
    var clonIzquierdo = null;
    var telones = 0;
    var xE = 0;
    var xDrag = false;
    var hSlider = 10;
    var pSlider = 2;
    var wSliderControl = 80;


    var contenedor = window.d3.select("#contenedor");
    var svg = contenedor.append("svg")
            .attr("preserveAspectRatio", "xMidYMid")
            .attr("id", "svg");
    var fondo = svg.append('rect');

    var gFederacionesE = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gFederacionesE');
    var gTelonE = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gTelonE');

    var gHilosE = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gHilosE');
    var gCartelesE = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gCartelesE');//AQUI ESTÁN LOS BLOQUES DE CARTELES

    var gEtiquetasE = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gEtiquetasE');//AQUÍ ESTÁN LOS RECUADROS DE FONDO DE LA LEYENDA DE CADA CARTEL
    var gPlecasE = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gPlecasE');//AQUÍ ESTÁN LAS LEYENDAS DE CADA CARTEL




    var gConflictosE = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gConflictosE');



    var gCartelesR = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gCartelesR');//AQUI ESTÁN LOS BLOQUES RESALTADOS DE CARTELES
    var gColumnasE = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gColumnasE');

    var gEtiquetasR = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gEtiquetasR');//AQUÍ ESTÁN LOS RECUADROS DE FONDO DE LA LEYENDA DE CADA CARTEL RESALTADO
    var gPlecasR = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gPlecasR');//AQUÍ ESTÁN LAS LEYENDAS DE CADA CARTEL RESALTADO
    var gHilosR = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gHilosR');


    var gEncabezadoE = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'extendida').attr('id', 'gEncabezadoE');
    var gSlider = svg.append("g").attr('transform', 'translate(' + wEje + ',0)');

    var gClonDerecho = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('id', 'gClonDerecho');
    var gClonIzquierdo = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('id', 'gClonIzquierdo');

    var gFederaciones = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'fade');
    var gCarteles = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'fade');
    var gEtiquetas = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'fade');
    var gPlecas = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'fade');
    var gTelon = svg.append("g").attr('id', 'gTelon').attr('class', 'fade');
    var gEncabezado = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'fade');
    var gColumnas = svg.append("g").attr('transform', 'translate(' + wEje + ',0)').attr('class', 'fade');

    var gEje = svg.append("g");

    function init()
    {
        gTelon.attr('transform', 'translate(' + wEje + ',0)');
        var q = queue(1);
        q.defer(window.d3.tsv, 'tsv/presidentes.tsv', function (d) {
            return {id: d.id, nombre: d.nombre, inicio: +d.inicio, fotografia: 'img/' + d.fotografia, nombrecorto: d.nombrecorto, click: false};
        });
        q.defer(window.d3.tsv, 'tsv/carteles.tsv', function (d) {
            return {id: d.id, nombre: d.nombre, nombree: d.nombree, nombrelargo: d.nombrelargo, fila: +d.fila, mitad: (d.mitad === "1") ? true : false, fondo: d.fondo, color: d.color, borde: d.borde, anillo: d.anillo, inicio: +d.inicio, fin: +d.fin, porcentaje: +d.porcentaje, pleca: (d.pleca === "1") ? true : false, lineaini: d.lineaini, lineafin: d.lineafin, inicial: d.inicial, inicialc: d.inicialc, lideres: d.lideres.split('|'), x: 0, y: 0, w: 0, h: 0, yi: 0, yf: 0};
        });
        q.defer(window.d3.tsv, 'tsv/origenes.tsv', function (d) {
            return {origen: d.origen, destino: d.destino, offset: +d.offset};
        });
        q.defer(window.d3.tsv, 'tsv/federaciones.tsv', function (d) {
            return {id: d.id, nombre: d.nombre, lideres: d.lideres.split('|'), inicio: +d.inicio, fin: +d.fin, color: d.color, fuente: d.fuente, w: 0, y: 0, x: 0};
        });
        q.defer(window.d3.tsv, 'tsv/federacionescarteles.tsv', function (d) {
            return {id: d.id, aliados: d.aliados.split('|'), involucrados: d.involucrados.split('|'), x: 0, y: 500};
        });
        q.defer(window.d3.tsv, 'tsv/celulas.tsv');
        q.defer(window.d3.tsv, 'tsv/conflictos.tsv', function (d) {
            return {presidente: d.presidente, bando1: d.bando1.split('|'), bando2: d.bando2.split('|'), federacion: d.federacion, descripcion: d.descripcion, inicio: +d.inicio, fin: +d.fin, numero: +d.numero, total: +d.total};
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
//arreglo[6]=window._.select(arreglo[6],{presidente:'EZP'});
        resumenconflictos = arreglo[6];
//resumenconflictos[0]['fin']=1994;
        presidentesE = [];
        window._.each(presidentes, function (p) {
            var i = 1;
            for (i = 1; i <= 6; i++)
            {
                presidentesE.push(p);
            }
        });
        diametro = 2 * radio;
        var index = window._.indexBy(carteles, 'fila');
        var arr = window._.pluck(index, 'fila');
        var alto = ((hFila + pFila) * arr.length) + hEncabezado;
        var ancho = wColumna * presidentes.length;
        var anchoE = wColumnaE * presidentes.length;
        var max = getValorE(ancho);
        var arregloE = [-wEje, max];
        var offsetSlider = wSliderControl / 2;
        var arregloS = [offsetSlider, (ancho - offsetSlider)];
//        var arregloS=[0,(ancho-wSliderControl)];
        var escalarASlider = window.d3.scale.linear();
        escalarASlider.domain(arregloE);
        escalarASlider.range(arregloS);
        var escalarAExtendida = window.d3.scale.linear();
        escalarAExtendida.domain(arregloS);
        escalarAExtendida.range(arregloE);
//        svg.attr("width", ancho+wEje)
//                .attr("height", alto);
        fondo.attr('fill', '#ffffff')
                .attr("width", ancho + wEje)
                .attr("height", alto);
        gEje.append('rect')
                .attr('fill', '#cdcdcd')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', wEje)
                .attr('height', hEncabezado)
                .style('stroke', '#ffffff')
                .style('stroke-width', 2);
        gEje.append('rect')
                .attr('fill', '#58595b')
                .attr('x', 0)
                .attr('y', hEncabezado)
                .attr('width', wEje)
                .attr('height', alto)
                .attr('class', 'eje')
                .style('stroke', '#ffffff')
                .style('stroke-width', 2)
                .on('click', ponerTelon);
        gTelonE.append('rect')
                .attr('fill', 'transparent')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', anchoE)
                .attr('height', alto)
                .attr('class', 'grab');
        generaTelonE(ancho, alto, escalarASlider);
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
        generaLeyendasE();
        generaEtiquetasE();
        generaPlecasE();
        conflictos = agruparConflictos(resumenconflictos);
        generaConflictos();
        generaHilos();
        generaSlider(ancho, altoF);
        svg.attr("preserveAspectRatio", "xMidYMid");
        svg.attr("viewBox", "0 0 " + (ancho + wEje) + " " + (altoF + hSlider + (2 * pSlider)));
        gEje.append('text')
                .attr('transform', 'rotate(270 ' + ((wEje / 2) + 6) + ',' + ((altoF / 2) + hEncabezado) + ')')
                .attr('x', (wEje / 2) + 6)
                .attr('y', ((altoF / 2) + hEncabezado))
                .style('stroke', '#ffffff')
                .style('fill', '#ffffff')
                .style('text-transform', 'uppercase')
                .style('font-size', 18)
                .style('font-family', '"Helvetica Neue",Helvetica,Arial,sans-serif')
                .style('letter-spacing', 5)
                .on('click', ponerTelon)
                .text('Cárteles');
        generaClones(ancho, alto);
        generaTooltips();
        gPlecasE.select('rect')
                .attr('fill', '#ffffff')
                .style('opacity', .7)
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', anchoE)
                .attr('height', alto)
                .attr('class', 'ignorar');

        gFederacionesE.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .style('fill', 'transparent')
                .attr('width', (wColumnaE * 6 * presidentes.length))
                .attr('height', altoF);
        var mover = window.d3.behavior.drag()
                .on('dragstart', iniciarMoverExtendidos)
                .on('drag', function () {
                    moverExtendidos(arregloE, escalarASlider);
                })
                .on('dragend', terminarMoverExtendidos);
        /*        gFederacionesE.selectAll('rect').call(mover);
         gCartelesE.selectAll('rect').call(mover);
         gEtiquetasE.selectAll('rect').call(mover);
         gEtiquetasE.selectAll('text').call(mover);
         gPlecasE.selectAll('text').call(mover);
         gPlecasE.selectAll('line').call(mover);
         gPlecasE.selectAll('path').call(mover);*/
        gTelonE.selectAll('rect').call(mover);
//        gConflictosE.selectAll('circle').call(mover);
//        gConflictosE.selectAll('path').call(mover);
        gEncabezadoE.selectAll('rect').call(mover);
        gEncabezadoE.selectAll('text').call(mover);
        gEncabezadoE.selectAll('image').call(mover);
        var moverS = window.d3.behavior.drag()
                .on('dragstart', iniciarMoverSlider)
                .on('drag', function () {
                    moverSlider(arregloS, escalarAExtendida);
                })
                .on('dragend', terminarMoverSlider);
        gSlider.select('g.slidercontrolgroup').call(moverS);
        gSlider.select('rect').on('click', function () {
            moverSliderClick(this, arregloS, escalarAExtendida);
        });

        /****/
        gFederaciones.remove();
        gCarteles.remove();
        gEtiquetas.remove();
        gPlecas.remove();
//    gTelon.remove();
        gEncabezado.remove();
        gColumnas.remove();
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
                .style('stroke-width', 2)
                .attr('class','presidente');
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
                    var f = d.inicio + ' - ' + (d.inicio + 6);
                    if (d.id == 'EPN')
                    {
                        f = d.inicio + ' a 2014';
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
        /*        gEncabezado.selectAll(".fotografia.presidente").data(presidentes)
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
         });*/
        gEncabezado.selectAll("circle.conflictos.presidente").data(presidentes)
                .enter()
                .append('circle')
                .attr('class', 'conflictos presidente ignorar')
                .attr('cx', function (d, i) {
                    d.cx = (wImagen / 2) + (i + 1) * wColumna - (wImagen + pImagen);
                    return d.cx;
                })
                .attr('cy', function (d) {
                    d.cy = (wImagen / 2) + (hEncabezado - wImagen) / 2;
                    return d.cy;
                })
                .attr('r', radionumeroconflictos)
                .style('fill', '#ffffff')
                .style('stroke', '#ff0000')
                .style('stroke-width', '3px');

        gEncabezado.selectAll("text.conflictos.presidente.ignorar").data(presidentes)
                .enter()
                .append('text')
                .attr('class', 'conflictos presidente ignorar')
                .attr('x', function (d, i) {
                    return (wImagen / 2) + (i + 1) * wColumna - (wImagen + pImagen);
                })
                .attr('y', function (d) {
                    return 12 + (wImagen / 2) + (hEncabezado - wImagen) / 2;
                })
                .style('font-size', '35px')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .attr('fill', '#ff0000')
                .attr('text-anchor', 'middle')
                .text(function (d) {
                    var id = d.id;
                    var confs = window._.select(resumenconflictos, function (c) {
                        return (c.presidente === id) ? true : false;
                    });
                    return confs.length;
                });
    }
    ;

    function getCentroEncabezado(i)
    {
        var x0 = (i * wColumna) + pImagen;
        var xf = wColumna - (wImagen + (2 * pImagen));
        return (xf / 2) + x0;
    }
    ;

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
                .attr("y1", hEncabezado / 2)
                .attr("x2", presidentesE.length * wColumna)
                .attr("y2", hEncabezado / 2);
        gEncabezadoE.selectAll('text.periodo').data(presidentesE)
                .enter()
                .append('text')
                .attr('class', 'periodo')
                .attr('x', function (d, i) {
                    return getCentroEncabezadoE(i);
                })
                .attr('y', pPeriodoPresidente - 5)
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
                .attr('y', pNombrePresidente + 2)
                .style('font-size', '16px')
                .style('font-weight', 'bold')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .attr('fill', '#ffffff')
                .attr('text-anchor', 'middle')
                .text(function (d, i) {
                    return ((i % 6) + d.inicio);
                });
        gEncabezadoE.selectAll(".fotografia.presidente").data(presidentesE)
                .enter()
                .append("svg:image")
                .attr('width', wImagen)
                .attr('height', wImagen)
                .attr('class', 'presidente fotografia')
                .attr("xlink:href", function (d) {
                    return d.fotografia;
                })
                .attr('x', function (d, i) {
                    return (i) * wColumna - (wImagen / 2);
                })
                .attr('y', function (d) {
                    return (hEncabezado - wImagen) / 2;
                });
    }
    ;

    function getCentroEncabezadoE(i)
    {
        var x0 = (i * wColumna);
        var xf = wColumna;
        return (xf / 2) + x0;
    }
    ;

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
                    .style("stroke-width", function (d) {
                        var ancho = 1;
                        if (((i - 1) % 6) === 0)
                        {
                            ancho = 5;
                        }
                        return ancho;
                    })
                    .style("opacity", 1)
                    .attr("x1", x)
                    .attr("y1", hEncabezado)
                    .attr("x2", x)
                    .attr("y2", hEncabezado + alto)
                    .attr('class', 'ignorar')
                    .style("stroke-dasharray", function (d) {
                        var pars = '1,3';
                        if (((i - 1) % 6) === 0)
                        {
                            pars = '1,0';
                        }
                        return pars;
                    });
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
                .attr('class', function (d) {
                    return 'cartel ' + d.id;
                })
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

    var clicked = null;
    var cartelesE = [];
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
        /**********************************/
        window._.each(carteles, function (c) {
            var i = 0;
            for (i = c.inicio; i < c.fin; i++)
            {
                var cE = window._.clone(c);
                cE.anio = i;
                ini = (cE.anio - anioBase) * wAnioE;
                fin = ((cE.anio + 1) - anioBase) * wAnioE;
                x = ini;
                w = fin - ini;
                cE.xE = x;
                cE.wE = w;
                cartelesE.push(cE);
            }
        });
        /**********************************/
        gCartelesE.selectAll('rect.cartel').data(cartelesE)
                .enter()
                .append('rect')
                .attr('class', function (d) {
                    return 'pointer cartel ' + d.id;
                })
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
                .on('mouseover', function (d) {
                    if (clicked === null)
                    {
                        window._.each(cartelesE, function (cart) {
                            if ((d.id == 'organizacion-de-sinaloa') || (d.id == 'guadalajara'))
                            {
                                var flag = false;
                                if ((cart.id == 'organizacion-de-sinaloa') || (cart.id == 'guadalajara'))
                                {
                                    flag = true;
                                }
                                cart.resaltar = flag;
                            }
                            else
                            {
                                cart.resaltar = (cart.id == d.id) ? true : false;
                            }
//                            cart.resaltar=(cart.id==d.id)?true:false;
                        });
                        resaltaCarteles();
                    }
                })
                .on('mouseout', function (d) {
                    if (clicked === null)
                    {
                        window._.each(cartelesE, function (cart) {
                            cart.resaltar = false;
                        });
                        resaltaCarteles();
                    }
                })
                .on('click', function (d) {
                    if (clicked === d.id)
                    {
                        clicked = null;
                        window._.each(cartelesE, function (cart) {
                            cart.resaltar = false;
                        });
                    }
                    else
                    {
                        clicked = d.id;
                        window._.each(cartelesE, function (cart) {
                            if ((d.id == 'organizacion-de-sinaloa') || (d.id == 'guadalajara'))
                            {
                                var flag = false;
                                if ((cart.id == 'organizacion-de-sinaloa') || (cart.id == 'guadalajara'))
                                {
                                    flag = true;
                                }
                                cart.resaltar = flag;
                            }
                            else
                            {
                                cart.resaltar = (cart.id == d.id) ? true : false;
                            }
//                            cart.resaltar=(cart.id==d.id)?true:false;
                        });
                    }
                    resaltaCarteles();
                });
        gCartelesR.selectAll('rect.cartel').data(cartelesE, function (d) {
            return d.id + '-' + d.anio;
        })
                .enter()
                .append('rect')
                .attr('class', function (d) {
                    return 'pointer ignorar cartel ' + d.id;
                })
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
                .style('opacity', 0.8)
                .style('display', 'none');
        /*                .on('mouseout',function(d){
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
         });*/
    }
    ;

    function resaltaCarteles()
    {
        var resaltar = [];
        var idResaltar = [];
        var hilosResaltar = [];
        var destacados = window._.select(cartelesE, function (cart) {
            return (cart.resaltar);
        });
        idResaltar = window._.uniq(window._.pluck(destacados, 'id'));
        hilosResaltar = window._.uniq(window._.pluck(destacados, 'id'));
        window._.each(destacados, function (d) {
            resaltar.push(d.id + '-' + d.anio);
        });
        var ops = [];
        window._.each(destacados, function (d) {
            var confs = window._.select(conflictos, function (cart) {
                return cart.cartel.id === d.id;
            });
            window._.each(confs, function (conf) {
                window._.each(conf.oponentes, function (op) {
                    window._.each(op, function (o) {
                        ops.push(o.id + '-' + conf.anio);
                    });
                });
            });
        });
        ops = window._.uniq(ops);
        destacados = window._.select(cartelesE, function (cart) {
            return (ops.indexOf(cart.id + '-' + cart.anio) >= 0) ? true : false;
        });
        //var idResaltarTodos=idResaltar.concat(window._.uniq(window._.pluck(destacados,'id')));
        var idResaltarTodos = window._.uniq(window._.pluck(destacados, 'id'));
        window._.each(destacados, function (d) {
            resaltar.push(d.id + '-' + d.anio);
        });
        resaltar = window._.uniq(resaltar);
        var nuevosCarteles = window._.select(cartelesE, function (cart) {
            return (resaltar.indexOf(cart.id + '-' + cart.anio) >= 0) ? true : false;
        });
        gCartelesR.selectAll('rect.cartel').style('display', 'none');
        gCartelesR.selectAll('rect.cartel').data(nuevosCarteles, function (d) {
            return d.id + '-' + d.anio;
        })
                .style('display', function (d) {
                    var clave = d.id + '-' + d.anio;
                    var display = 'none';
                    if (resaltar.indexOf(clave) >= 0)
                        ;
                    {
                        display = 'block';
                    }
                    return display;
                });
        gPlecasR.selectAll('text.cartel.normal')
                .style('display', function (d) {
                    var display = 'none';
                    var clave = d.id + '-' + d.anio;
                    if ((resaltar.indexOf(clave) >= 0) && (idResaltar.indexOf(d.id) < 0))
                    {
                        display = 'block';
                    }
                    return display;
                });
        gEtiquetasR.selectAll('rect.etiqueta.normal')
                .style('display', function (d) {
                    var display = 'none';
                    var clave = d.clase + '-' + d.anio;
                    if ((resaltar.indexOf(clave) >= 0) && (idResaltar.indexOf(d.id) < 0))
                    {
                        display = 'block';
                    }
                    return display;
                });
        gPlecasR.selectAll('text.cartel.resaltado')
                .style('display', function (d) {
                    var display = 'none';
                    if (idResaltar.indexOf(d.id) >= 0)
                    {
                        display = 'block';
                    }
                    return display;
                });
        gEtiquetasR.selectAll('rect.etiqueta.resaltado')
                .style('display', function (d) {
                    var display = 'none';
                    if (idResaltar.indexOf(d.clase) >= 0)
                    {
                        display = 'block';
                    }
                    return display;
                });

        gHilosR.selectAll('path.cartel')
                .style('display', function (d) {
                    var display = 'none';
                    if (hilosResaltar.indexOf(d.cartel.id) >= 0)
                    {
                        display = 'block';
                    }
                    return display;
                });
        gHilosR.selectAll('path.punta')
                .style('display', function (d) {
                    var display = 'none';
                    if (hilosResaltar.indexOf(d.cartel.id) >= 0)
                    {
                        display = 'block';
                    }
                    return display;
                });

    }
    ;

    function generaLeyendas()
    {
        var leyendas = window._.select(carteles, function (c) {
            return c.nombre !== '';
        });
        gPlecas.selectAll('text.cartel').data(leyendas)
                .enter()
                .append('text')
                .attr('class', 'cartel')
                .attr('class', function (d) {
                    return 'cartel ' + d.id;
                })
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
                    tspan = text.attr('class', 'wrapped ' + clases).text(null).append("tspan").attr('class', clases).attr("x", text.attr('x')).attr("y", y).attr("dy", dy + "em");
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

    function generaLeyendasE() {
        var oX = getOffsetPleca(aPleca) * 2;
        var c = null;
        var leyendas = window._.select(carteles, function (c) {
            return c.nombree !== '';
        });
        var leyendasE = [];
        var anioBase = getAnioBase();
        window._.each(leyendas, function (l) {
            var i = 0;
            for (i = l.inicio; i < l.fin; i++)
            {
                var lE = window._.clone(l);
                lE.anio = i;
                lE.xE = ((i - anioBase) * wAnioE) + Math.ceil(wAnioE / 2);
                leyendasE.push(lE);
            }
        });
        gPlecasE.selectAll('text.cartel').data(leyendasE)
                .enter()
                .append('text')
                .attr('class', 'cartel')
                .attr('class', function (d) {
                    return 'cartel ' + d.id;
                })
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
        gPlecasE.selectAll('text.cartel').call(wrapE);
        gPlecasE.selectAll('text.wrapped').call(ajustaLineas);

        gPlecasR.selectAll('text.cartel.normal').data(leyendasE)
                .enter()
                .append('text')
                .attr('class', function (d) {
                    return 'ignorar cartel normal ' + d.id;
                })
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
        gPlecasR.selectAll('text.cartel.normal').call(wrapE);
        gPlecasR.selectAll('text.wrapped.normal').call(ajustaLineas);
        gPlecasR.selectAll('text.cartel.normal').style('display', 'none');

        gPlecasR.selectAll('text.cartel.resaltado').data(leyendasE)
                .enter()
                .append('text')
                .attr('class', function (d) {
                    return 'ignorar cartel resaltado ' + d.id;
                })
                .attr('fill', '#ffffff')
                .style('font-weight', 'bold')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 14)
                .style('text-transform', 'uppercase')
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
        gPlecasR.selectAll('text.cartel.resaltado').call(wrapE);
        gPlecasR.selectAll('text.wrapped.resaltado').call(ajustaLineas);
        gPlecasR.selectAll('text.cartel.resaltado').style('display', 'none');
    }
    ;

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
                    tspan = text.attr('class', 'wrapped ' + clases).text(null).append("tspan").attr('class', clases).attr("x", text.attr('x')).attr("y", y).attr("dy", dy + "em");
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
        gPlecasE.selectAll('line.pleca').data(arregloLineas)
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
        /*        gPlecasR.selectAll('line.pleca').data(arregloLineas)
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
         });*/

        var pleca = window.d3.svg.symbol()
                .type("triangle-up")
                .size(aPleca);
        var oX = getOffsetPleca(aPleca);
        var oY = hFila / 2;
        var plecas = window._.select(carteles, {pleca: true});
        gPlecasE.selectAll("path.pleca").data(plecas)
                .enter()
                .append("path")
                .attr("d", pleca)
                .attr("class", "pleca")
                .attr("transform", function (d) {
                    return "translate(" + (d.xE + oX) + "," + (d.y + oY) + "), rotate(90)";
                });
        /*        gPlecasR.selectAll("path.pleca").data(plecas)
         .enter()
         .append("path")
         .attr("d", pleca)
         .attr("class", "pleca")
         .attr("transform", function (d) {
         return "translate(" + (d.xE + oX) + "," + (d.y + oY) + "), rotate(90)";
         });*/
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
                arregloFlechas.push({x1: cfin.xE, x2: cfin.xE, y1: cini.yi + (cini.h / 2) + o.offset, y2: cfin.yi - oPleca});
                arregloPuntas.push({x: cfin.xE, y: cfin.yi, o: -oPleca, rot: 180});
            }
            else
            {
                arregloFlechas.push({x1: cfin.xE, x2: cfin.xE, y1: cini.yi + (cini.h / 2) + o.offset, y2: cfin.yf + oPleca});
                arregloPuntas.push({x: cfin.xE, y: cfin.yf, o: oPleca, rot: 0});
            }
        });
        gPlecasE.selectAll('line.flecha').data(arregloFlechas)
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
        /*        gPlecasR.selectAll('line.flecha').data(arregloFlechas)
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
         });*/
        gPlecasE.selectAll("path.flecha").data(arregloPuntas)
                .enter()
                .append("path")
                .attr("d", pleca)
                .attr("class", "flecha")
                .attr("transform", function (d) {
                    return "translate(" + (d.x) + "," + (d.y + d.o) + "), rotate(" + d.rot + ")";
                });
        /*        gPlecasR.selectAll("path.flecha").data(arregloPuntas)
         .enter()
         .append("path")
         .attr("d", pleca)
         .attr("class", "flecha")
         .attr("transform", function (d) {
         return "translate(" + (d.x) + "," + (d.y + d.o) + "), rotate(" + d.rot + ")";
         });*/
        gPlecasE.append('rect');
    }
    ;

    function generaEtiquetas()
    {
        var b = null;
        var etiquetas = [];
        var leyendas = gPlecas.selectAll('text.wrapped');
        leyendas.each(function (d) {
            b = this.getBBox();
            etiquetas.push({'color': d.color, 'borde': d.borde, 'x': b.x - pEtiquetaX, 'y': b.y - pEtiquetaY, 'width': b.width + (2 * pEtiquetaX), 'height': b.height + (2 * pEtiquetaY), 'clase': d.id});
        });
        gEtiquetas.selectAll('rect.etiqueta').data(etiquetas)
                .enter()
                .append('rect')
                .attr('class', function (d) {
                    return 'etiqueta ' + d.clase;
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

    var etiquetasN = [];
    var etiquetasR = [];
    function generaEtiquetasE()
    {
        var b = null;
        var etiquetas = [];
        var leyendas = gPlecasE.selectAll('text.wrapped');
        leyendas.each(function (d) {
            b = this.getBBox();
            var x = b.x - pEtiquetaX;
            var y = b.y - pEtiquetaY;
            var h = b.height + (2 * pEtiquetaY);
            var w = b.width + (2 * pEtiquetaX);
            etiquetas.push({'color': d.color, 'borde': d.borde, 'x': x, 'y': y, 'width': w, 'height': h, 'clase': d.id, 'anio': d.anio});
            var xizq = x;
            var xder = x + w;
            var ycentro = y + (h / 2);
            etiquetasN.push({xizq: parseInt(xizq), xder: parseInt(xder), ycentro: parseInt(ycentro), cartel: d.id, anio: d.anio});
        });
        gEtiquetasE.selectAll('rect.etiqueta').data(etiquetas)
                .enter()
                .append('rect')
                .attr('class', function (d) {
                    return 'etiqueta ' + d.clase;
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

        gEtiquetasR.selectAll('rect.etiqueta.normal').data(etiquetas)
                .enter()
                .append('rect')
                .attr('class', function (d) {
                    return 'ignorar etiqueta normal ' + d.clase;
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
                .attr('stroke-width', 2)
                .style('display', 'none');

        gPlecasR.selectAll('text.cartel.resaltado').style('display', 'block');
        etiquetas = [];
        leyendas = gPlecasR.selectAll('text.wrapped.resaltado');
        leyendas.each(function (d) {
            b = this.getBBox();
            var x = b.x - pEtiquetaX;
            var y = b.y - pEtiquetaY;
            var h = b.height + (2 * pEtiquetaY);
            var w = b.width + (2 * pEtiquetaX);
            etiquetas.push({'color': d.color, 'borde': d.borde, 'x': x, 'y': y, 'width': w, 'height': h, 'clase': d.id, 'anio': d.anio});
            var xizq = x;
            var xder = x + w;
            var ycentro = y + (h / 2);
            etiquetasR.push({xizq: parseInt(xizq), xder: parseInt(xder), ycentro: parseInt(ycentro), cartel: d.id, anio: d.anio});
        });
        gPlecasR.selectAll('text.cartel.resaltado').style('display', 'none');
        gEtiquetasR.selectAll('rect.etiqueta.resaltado').data(etiquetas)
                .enter()
                .append('rect')
                .attr('class', function (d) {
                    return 'ignorar etiqueta resaltado ' + d.clase;
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
                .attr('stroke-width', 2)
                .style('display', 'none');
    }
    ;

    ajustaCarteles = function ()
    {
        var base = hEncabezado + pFila;
        var f = 0;
        var filas = window._.pluck(carteles, 'fila');
        filas = window._.uniq(filas);
        filas.sort(function (a, b) {
            return (a - b);
        });
        window._.each(filas, function (fila) {
            var h = 0;
            var yi = 0;
            var dif = 0;
            var carts = window._.select(carteles, {fila: fila});
            var clases = window._.pluck(carts, 'id');
            clases = window._.uniq(clases);
            window._.each(clases, function (clase) {
                var elementos = gCarteles.selectAll('rect.cartel.' + clase);
                elementos.each(function (e) {
                    if (e.h > h)
                    {
                        h = e.h;
                        yi = e.yi;
                    }
                });
                var etiquetas = gEtiquetas.selectAll('rect.' + clase);
                etiquetas.each(function (e) {
                    if (e.height > h)
                    {
                        h = e.height;
                        yi = e.y;
                    }
                });
                dif = yi - base;
                elementos.each(function (e) {
                    e.y = e.y - dif;
                    e.yi = e.yi - dif;
                    e.yf = e.yf - dif;
                });
                gPlecas.selectAll('tspan.' + clase)
                        .each(function () {
                            var el = window.d3.select(this);
                            el.attr('y', el.attr('y') - dif);
                        });
                gEtiquetas.selectAll('rect.' + clase)
                        .each(function (d) {
                            d.y = d.y - dif;
                        });
            });
            if (fila !== f)
            {
                base += h + pFila;
            }
        });
        gCarteles.selectAll('rect.cartel')
                .attr('y', function (d) {
                    return d.yi;
                });
        gPlecas.selectAll('text.cartel')
                .attr('y', function (d) {
                    return d.y + 30;
                });
        gEtiquetas.selectAll('rect')
                .attr('y', function (d) {
                    return d.y;
                });

        var elementos = gCarteles.selectAll('rect.cartel');
        elementos.each(function (e) {
            if (e.h + e.yi > altoF)
            {
                altoF = e.h + e.yi;
            }
        });

        var etiquetas = gEtiquetas.selectAll('rect');
        etiquetas.each(function (e) {
            if (e.height + e.y > altoF)
            {
                altoF = e.height + e.y;
            }
        });
        altoF += pFila;

    };

    function generaTooltips()
    {
        var ancho = wColumna * presidentes.length;
        var anchoC= window.$(contenedor.node()).width();
        gClonDerecho.selectAll("rect.presidente").each(function (d, i) {
            var et = null;
            var p = presidentes[i];
            var id = p.id;
            var confs = window._.select(resumenconflictos, {presidente: id});
                var contenido = '<p><strong>Sexenio de ';
                contenido += p.nombre;
                contenido += ' </strong></p>';
                contenido += '<hr>';
                contenido += '<h2> ';
                contenido += confs.length;
                contenido += ' conflictos registrados</h2>';
                contenido += '<hr>';
                contenido += '<ol>';
                window._.each(confs, function (c) {
                    contenido += '<li>';
                    var b1 = c.bando1;
                    var b2 = c.bando2;
                    var arregloB1 = [];
                    var arregloB2 = [];
                    window._.each(b1, function (b) {
                        var cartel = window._.find(carteles, {id: b});
                        cartel = cartel || false;
                        if (cartel !== false)
                        {
                            var aux = '<span style="color:' + cartel.fondo + '"><strong>';
                            aux += cartel.nombree;
                            aux += '</strong></span>';
                            arregloB1.push(aux);
                        }
                    });
                    et = arregloB1.join(' + ');
                    if (c.federacion === null)
                    {
                        contenido += et;
                    }
                    else
                    {
                        if (arregloB1.length === 3)
                        {
                            contenido += '<strong>' + c.federacion + '</strong>';
                            contenido += ' (';
                            contenido += et;
                            contenido += ')';
                        }
                        else
                        {
                            contenido += et;
                        }
                    }
                    contenido += ' <em>vs.</em> ';
                    window._.each(b2, function (b) {
                        var cartel = window._.find(carteles, {id: b});
                        cartel = cartel || false;
                        if (cartel !== false)
                        {
                            var aux = '<span style="color:' + cartel.fondo + '"><strong>';
                            aux += cartel.nombree;
                            aux += '</strong></span>';
                            arregloB2.push(aux);
                        }
                    });
                    et = arregloB2.join(' + ');
                    if (c.federacion === null)
                    {
                        contenido += et;
                    }
                    else
                    {
                        if (arregloB2.length === 3)
                        {
                            contenido += '<strong>' + c.federacion + '</strong>';
                            contenido += ' (';
                            contenido += et;
                            contenido += ')';
                        }
                        else
                        {
                            contenido += et;
                        }
                    }
                    contenido += '</li>';
                });
                contenido += '</ol>';
                $(this).tooltipster({
                    theme: 'tooltipster tooltipster-numeroconflictos',
                    offsetX: (wColumna-(wImagen/2+pImagen))/(ancho/anchoC),
                    offsetY: (hEncabezado-(pImagen))/(ancho/anchoC),
                    content: $(contenido),
                    maxWidth: wColumna - 30,
                    functionReady: ajustaTooltip
                });
        });
        gClonIzquierdo.selectAll("rect.presidente").each(function (d, i) {
            var et = null;
            var p = presidentes[i];
            var id = p.id;
            var confs = window._.select(resumenconflictos, {presidente: id});
                var contenido = '<p><strong>Sexenio de ';
                contenido += p.nombre;
                contenido += ' </strong></p>';
                contenido += '<hr>';
                contenido += '<h2> ';
                contenido += confs.length;
                contenido += ' conflictos registrados</h2>';
                contenido += '<hr>';
                contenido += '<ol>';
                window._.each(confs, function (c) {
                    contenido += '<li>';
                    var b1 = c.bando1;
                    var b2 = c.bando2;
                    var arregloB1 = [];
                    var arregloB2 = [];
                    window._.each(b1, function (b) {
                        var cartel = window._.find(carteles, {id: b});
                        cartel = cartel || false;
                        if (cartel !== false)
                        {
                            var aux = '<span style="color:' + cartel.fondo + '"><strong>';
                            aux += cartel.nombree;
                            aux += '</strong></span>';
                            arregloB1.push(aux);
                        }
                    });
                    et = arregloB1.join(' + ');
                    if (c.federacion === null)
                    {
                        contenido += et;
                    }
                    else
                    {
                        if (arregloB1.length === 3)
                        {
                            contenido += '<strong>' + c.federacion + '</strong>';
                            contenido += ' (';
                            contenido += et;
                            contenido += ')';
                        }
                        else
                        {
                            contenido += et;
                        }
                    }


                    contenido += ' <em>vs.</em> ';
                    window._.each(b2, function (b) {
                        var cartel = window._.find(carteles, {id: b});
                        cartel = cartel || false;
                        if (cartel !== false)
                        {
                            var aux = '<span style="color:' + cartel.fondo + '"><strong>';
                            aux += cartel.nombree;
                            aux += '</strong></span>';
                            arregloB2.push(aux);
                        }
                    });
                    et = arregloB2.join(' + ');
                    if (c.federacion === null)
                    {
                        contenido += et;
                    }
                    else
                    {
                        if (arregloB2.length === 3)
                        {
                            contenido += '<strong>' + c.federacion + '</strong>';
                            contenido += ' (';
                            contenido += et;
                            contenido += ')';
                        }
                        else
                        {
                            contenido += et;
                        }
                    }

                    contenido += '</li>';
                });
                contenido += '</ol>';
                $(this).tooltipster({
                    theme: 'tooltipster tooltipster-numeroconflictos',
                    offsetX: (wColumna-(wImagen/2+pImagen))/(ancho/anchoC),
                    offsetY: (hEncabezado-(pImagen))/(ancho/anchoC),
                    content: $(contenido),
                    maxWidth: wColumna - 30,
                    functionReady: ajustaTooltip
                });
        });
        gConflictosE.selectAll('circle.oponente').each(function (d, i) {
            var contenido = '<p><strong>Conflicto ';
            contenido += d.numero;
            contenido += ' de ';
            contenido += d.total;
            contenido += ' (sexenio de ';
            var presidente = window._.find(presidentes, {id: d.presidente});
            contenido += presidente.nombrecorto;
            contenido += ')</strong></p>';
            contenido += '<hr>';
            contenido += '<p>';
/***********************************/
            d.cartelesfederacion=d.cartelesfederacion||[];
            if (d.federacion!==null)
            {
                if ((d.cartelesfederacion.length!==0)&&(d.alianza.length !== 0))
                {
                    contenido += '<span style="color:' + d.cartel.fondo + '"><strong>';
                    contenido += d.cartel.nombree;
                    contenido += '</strong></span>';
                }
                else
                {
                    var cartelesf=[];
                    window._.each(d.cartelesfederacion,function(cfid){
                        var cf=window._.find(carteles,{id:cfid});
                        cartelesf.push('<span style="color:'+cf.fondo+'"><strong>'+cf.nombree+'</strong></span>');
                    });
                    contenido += '<strong>'+d.federacion+'</strong> ('+cartelesf.join(' + ')+')';
                }
            }
            else
            {
                contenido += '<span style="color:' + d.cartel.fondo + '"><strong>';
                contenido += d.cartel.nombree;
                contenido += '</strong></span>';
            }
/***********************************/
/*
            contenido += '<span style="color:' + d.cartel.fondo + '"><strong>';
            contenido += d.cartel.nombree;
            contenido += '</strong></span>';
*/            
            contenido += ' <em>vs.</em> ';
            if (d.alianza.length === 0)
            {
                contenido += '<span style="color:' + d.fondo + '"><strong>';
                contenido += d.nombree;
                contenido += '</strong></span>';
            }
            else
            {
                var et = '';
                var arr = [];
                window._.each(d.alianza, function (al) {
                    var aux = '<span style="color:' + al.fondo + '"><strong>';
                    aux += al.nombree;
                    aux += '</strong></span>';
                    arr.push(aux);
                });
                et = arr.join(' + ');
                if (d.federacion === null)
                {
                    contenido += et;
                }
                else
                {
                    contenido += '<strong>' + d.federacion + '</strong>';
                    contenido += ' (';
                    contenido += et;
                    contenido += ')';
                }
            }
            contenido += '</p>';
            var descripcion = d.descripcion;
            descripcion = descripcion || false;
            if (descripcion !== false)
            {
                contenido += '<hr>';
                contenido += '<p>';
                contenido += descripcion;
                contenido += '</p>';
            }
            $(this).tooltipster({
                theme: 'tooltipster tooltipster-numeroconflictos',
                offsetX: radio/(ancho/anchoC),
                offsetY: (hEncabezado-(pImagen))/(ancho/anchoC),
                content: $(contenido),
                maxWidth: wColumna - 30,
                functionReady: ajustaTooltip
            });
        });

        /*        
         
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
         */
    }
    ;

    function ajustaTooltip(origin, tooltip)
    {
        var c = $(tooltip[0]).find('div').html();
        $(origin).tooltipster('content', $(c));
    }
    ;

    function generaFederaciones()
    {
        var anioBase = getAnioBase();
        var alto = (hFila + pFila) * carteles.length;
        var posicionesX = [];
        var posicionesY = [];
        gFederaciones.selectAll('rect.federacion').data(federaciones)
                .enter()
                .append('rect')
                .attr('class', function (f) {
                    return 'federacion ' + f.id;
                })
                .attr('x', function (f) {
                    var pos = ((f.inicio - anioBase) * wAnio);
                    posicionesX.push(pos);
                    return pos;
                })
                .attr('y', hEncabezado)
                .attr('width', function (f) {
                    f.w = (f.fin - f.inicio) * wAnio;
                    return f.w;
                })
                .attr('height', alto)
                .style('fill', function (f) {
                    return f.color;
                });
        gEtiquetas.selectAll('text.federacion.titulo').data(involucrados)
                .enter()
                .append('text')
                .attr('class', 'federacion titulo')
                .attr('text-anchor', 'middle')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 16)
                .style('text-transform', 'uppercase')
                .style('font-weight', 'bold')
                .attr('fill', function (i) {
                    var f = window._.find(federaciones, {id: i.id});
                    return f.fuente;
                })
                .attr('x', function (i) {
                    var f = window._.find(federaciones, {id: i.id});
                    var xi = f.inicio - anioBase;
                    var w = f.fin - f.inicio;
                    var x = (xi + (w / 2)) * wAnio;
                    i.x = x;
                    return x;
                })
                .attr('y', function (i) {
                    return i.y;
                })
                .text(function (i) {
                    var f = window._.find(federaciones, {id: i.id});
                    return f.nombre;
                });
        gEtiquetas.selectAll('text.federacion.fechas').data(involucrados)
                .enter()
                .append('text')
                .attr('class', 'federacion fechas')
                .attr('text-anchor', 'middle')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 14)
                .attr('fill', '#000000')
                .attr('x', function (i) {
                    return i.x;
                })
                .attr('y', function (i) {
                    var pos = i.y + 20;
                    posicionesY.push(i.y + 20);
                    return pos;
                })
                .text(function (i) {
                    var f = window._.find(federaciones, {id: i.id});
                    return f.inicio + ' - ' + f.fin;
                });
        var mas = window.d3.svg.symbol().type('cross').size(80);
        gFederaciones.append('circle')
                .attr('cx', posicionesX[0] + 62)
                .attr('cy', posicionesY[0] + 20)
                .attr('r', 12)
                .style('fill', '#e1a632');
        gFederaciones.append('circle')
                .attr('cx', posicionesX[0] + 84)
                .attr('cy', posicionesY[0] + 20)
                .attr('r', 12)
                .style('fill', '#8fc64f');
        gEtiquetas.append('path')
                .attr('d', mas)
                .attr("transform", function (d) {
                    return "translate(" + (posicionesX[0] + 74) + "," + (posicionesY[0] + 20) + ")";
                });
        gFederaciones.append('circle')
                .attr('cx', posicionesX[0] + 138)
                .attr('cy', posicionesY[0] + 20)
                .attr('r', 12)
                .style('fill', '#54c8f2');
        gEtiquetas.append('text')
                .attr('class', 'federacion etiqueta')
                .attr('text-anchor', 'middle')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 10)
                .style('font-style', 'italic')
                .attr('fill', '#000000')
                .attr('x', posicionesX[0] + 112)
                .attr('y', posicionesY[0] + 25)
                .text('VS.');
        gFederaciones.append('circle')
                .attr('cx', posicionesX[1] + 14)
                .attr('cy', posicionesY[1] + 20)
                .attr('r', 12)
                .style('fill', '#e1a632');
        gFederaciones.append('circle')
                .attr('cx', posicionesX[1] + 38)
                .attr('cy', posicionesY[1] + 20)
                .attr('r', 12)
                .style('fill', '#8fc64f');
        gEtiquetas.append('path')
                .attr('d', mas)
                .attr("transform", function (d) {
                    return "translate(" + (posicionesX[1] + 26) + "," + (posicionesY[1] + 20) + ")";
                });
        gFederaciones.append('circle')
                .attr('cx', posicionesX[1] + 80)
                .attr('cy', posicionesY[1] + 20)
                .attr('r', 12)
                .style('fill', '#54c8f2');
        gFederaciones.append('circle')
                .attr('cx', posicionesX[1] + 105)
                .attr('cy', posicionesY[1] + 20)
                .attr('r', 12)
                .style('fill', '#b09bc7');
        gEtiquetas.append('text')
                .attr('class', 'federacion etiqueta')
                .attr('text-anchor', 'middle')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 10)
                .style('font-style', 'italic')
                .attr('fill', '#000000')
                .attr('x', posicionesX[1] + 60)
                .attr('y', posicionesY[1] + 25)
                .text('VS.');
    }
    ;

    generaFederacionesE = function ()
    {
        var anioBase = getAnioBase();
        var alto = (hFila + pFila) * carteles.length;
        var posicionesX = [];
        var posicionesY = [];
        gFederacionesE.selectAll('rect.federacion').data(federaciones)
                .enter()
                .append('rect')
                .attr('class', function (f) {
                    return 'federacion ' + f.id;
                })
                .attr('x', function (f) {
                    var pos = ((f.inicio - anioBase) * wAnioE);
                    ;
                    posicionesX.push(pos);
                    return pos;
                })

                .attr('y', hEncabezado)
                .attr('width', function (f) {
                    f.w = (f.fin - f.inicio) * wAnioE;
                    return f.w;
                })
                .attr('height', alto)
                .style('fill', function (f) {
                    return f.color;
                });
        gFederacionesE.selectAll('text.federacion.titulo').data(involucrados)
                .enter()
                .append('text')
                .attr('class', 'federacion titulo')
                .attr('text-anchor', 'middle')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 16)
                .style('font-weight', 'bold')
                .style('text-transform', 'uppercase')
                .attr('fill', function (i) {
                    var f = window._.find(federaciones, {id: i.id});
                    return f.fuente;
                })
                .attr('x', function (i) {
                    var f = window._.find(federaciones, {id: i.id});
                    var xi = f.inicio - anioBase;
                    var w = f.fin - f.inicio;
                    var x = (xi + (w / 2)) * wAnioE;
                    i.x = x;
                    return x;
                })
                .attr('y', function (i) {
                    return i.y;
                })
                .text(function (i) {
                    var f = window._.find(federaciones, {id: i.id});
                    return f.nombre;
                });
        gFederacionesE.selectAll('text.federacion.fechas').data(involucrados)
                .enter()
                .append('text')
                .attr('class', 'federacion fechas')
                .attr('text-anchor', 'middle')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 14)
                .attr('fill', '#000000')
                .attr('x', function (i) {
                    return i.x;
                })
                .attr('y', function (i) {
                    var pos = i.y + 20;
                    posicionesY.push(i.y + 20);
                    return pos;
                })
                .text(function (i) {
                    var f = window._.find(federaciones, {id: i.id});
                    return f.inicio + ' - ' + f.fin;
                });
        var mas = window.d3.svg.symbol().type('cross').size(80);
        gFederacionesE.append('circle')
                .attr('cx', posicionesX[0] + 562)
                .attr('cy', posicionesY[0] + 20)
                .attr('r', 12)
                .style('fill', '#e1a632');
        gFederacionesE.append('circle')
                .attr('cx', posicionesX[0] + 584)
                .attr('cy', posicionesY[0] + 20)
                .attr('r', 12)
                .style('fill', '#8fc64f');
        gFederacionesE.append('path')
                .attr('d', mas)
                .attr("transform", function (d) {
                    return "translate(" + (posicionesX[0] + 574) + "," + (posicionesY[0] + 20) + ")";
                });
        gFederacionesE.append('circle')
                .attr('cx', posicionesX[0] + 638)
                .attr('cy', posicionesY[0] + 20)
                .attr('r', 12)
                .style('fill', '#54c8f2');
        gFederacionesE.append('text')
                .attr('class', 'federacion etiqueta')
                .attr('text-anchor', 'middle')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 10)
                .style('font-style', 'italic')
                .attr('fill', '#000000')
                .attr('x', posicionesX[0] + 612)
                .attr('y', posicionesY[0] + 25)
                .text('VS.');
        gFederacionesE.append('circle')
                .attr('cx', posicionesX[1] + 314)
                .attr('cy', posicionesY[1] + 20)
                .attr('r', 12)
                .style('fill', '#e1a632');
        gFederacionesE.append('circle')
                .attr('cx', posicionesX[1] + 338)
                .attr('cy', posicionesY[1] + 20)
                .attr('r', 12)
                .style('fill', '#8fc64f');
        gFederacionesE.append('path')
                .attr('d', mas)
                .attr("transform", function (d) {
                    return "translate(" + (posicionesX[1] + 326) + "," + (posicionesY[1] + 20) + ")";
                });
        gFederacionesE.append('circle')
                .attr('cx', posicionesX[1] + 380)
                .attr('cy', posicionesY[1] + 20)
                .attr('r', 12)
                .style('fill', '#54c8f2');
        gFederacionesE.append('circle')
                .attr('cx', posicionesX[1] + 405)
                .attr('cy', posicionesY[1] + 20)
                .attr('r', 12)
                .style('fill', '#b09bc7');
        gFederacionesE.append('text')
                .attr('class', 'federacion etiqueta')
                .attr('text-anchor', 'middle')
                .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                .style('font-size', 10)
                .style('font-style', 'italic')
                .attr('fill', '#000000')
                .attr('x', posicionesX[1] + 360)
                .attr('y', posicionesY[1] + 25)
                .text('VS.');
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
    }
    ;

    function generaTelonE(ancho, alto, escala)
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
                .style('fill', '#ffffff')
                .style('stroke','#ffffff')
                .style('stroke-width',2)
                .style('opacity', 0)
                .on('click', function (d) {
                    quitarTelon(d, ancho, this, escala);
                })
                .on('mouseover', function (d) {
                    window.d3.select(this).style('opacity', 0.90);
                })
                .on('mouseout', function (d) {
                    window.d3.select(this).style('opacity', 0.70);
                })
                .transition('agregartelon')
                .duration(200)
                .style("fill", "#000000")
                .style('opacity', 0.70);
    }
    ;


    function clonarElemento(origen, destino) {
        origen.each(function () {
            var clone = destino.node().appendChild(this.cloneNode(true));
            window.d3.select(clone).attr("class", "clon");
        });
    }
    ;

    function generaClones(ancho, alto)
    {
        clonDerecho = gClonDerecho.append('svg').attr('width', ancho).attr('height', alto);
        clonIzquierdo = gClonIzquierdo.append('svg').attr('width', ancho).attr('height', alto);
        clonDerecho.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', ancho)
                .attr('height', alto)
                .style('fill', '#ffffff');
        clonIzquierdo.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', ancho)
                .attr('height', alto)
                .style('fill', '#ffffff');
        clonarElemento(gFederaciones, clonDerecho);
        clonarElemento(gCarteles, clonDerecho);
        clonarElemento(gEtiquetas, clonDerecho);
        clonarElemento(gPlecas, clonDerecho);
        clonarElemento(gEncabezado, clonDerecho);
        clonarElemento(gColumnas, clonDerecho);
        clonarElemento(gTelon, clonDerecho);
        clonDerecho.selectAll('g.clon')
                .attr('transform', null);

        clonarElemento(gFederaciones, clonIzquierdo);
        clonarElemento(gCarteles, clonIzquierdo);
        clonarElemento(gEtiquetas, clonIzquierdo);
        clonarElemento(gPlecas, clonIzquierdo);
        clonarElemento(gEncabezado, clonIzquierdo);
        clonarElemento(gColumnas, clonIzquierdo);
        clonarElemento(gTelon, clonIzquierdo);
        clonIzquierdo.selectAll('g.clon')
                .attr('transform', null);
    }
    ;

    function quitarTelon(p, ancho, el, escala)
    {
        if (flagE === false)
        {
            flagE = true;
            p.click = true;
            var t = window.d3.select(el);
            var s = svg.node();
            var coord = window.d3.mouse(s);
            var x = coord[0];
            x -= wEje;
            xE = getValorE(x);
            actualizarSlider(xE, escala, false);
            t.transition('quitartelon')
                    .duration(200)
                    .style('fill', '#000000')
                    .style('opacity', 0.7)
                    .each('end', function (d) {
                        gEje.select('rect.eje').transition('cambiareje')
                                .duration(2000)
                                .style('fill', '#ff0000')
                                .each('end', function () {
                                    gEje.select('rect.eje').classed('pointer', true);
                                    gEje.select('text').classed('pointer', true).text('Regresar');
                                });

                        svg.selectAll('g.fade').style('opacity', 0);
                        gTelon.attr('transform', 'translate(' + wEje + ',' + (-altoF * 10) + ')');
                        svg.selectAll('g.extendida').attr('transform', 'translate(' + (-xE) + ',0)');
                        gClonIzquierdo.select('svg').attr('width', x);
                        gClonDerecho.attr('transform', 'translate(' + (x + wEje) + ',0)');
                        gClonDerecho.select('svg').attr('width', (ancho - x)).selectAll('.clon').attr('transform', 'translate(' + (-x) + ',0)');
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
                                .attr('transform', 'translate(' + (-x) + ',0)');
                        gClonDerecho.transition()
                                .duration(2000)
                                .attr('transform', 'translate(' + (ancho + wEje) + ',0)');
                    });
        }
    }
    ;

    function getValorE(v)
    {
        return ((v * 5) - wEje);
    }
    ;

    function ponerTelon()
    {
        if (flagE === true)
        {
            flagE = false;
            window._.each(presidentes, function (p) {
                p.click = false;
            });

            gEje.select('rect.eje').classed('pointer', false);
            gEje.select('text').classed('pointer', false);
            gEje.select('rect.eje').transition('regresareje')
                    .duration(2000)
                    .style('fill', '#58595b')
                    .each('end', function () {
                        gEje.select('text').text('Cárteles');
                    });
            gClonDerecho.selectAll('rect.telon')
                    .style("fill", '#000000')
                    .style("opacity", 0.7);
            var x = +gClonIzquierdo.select('svg').attr('width');
            gClonIzquierdo.selectAll('rect.telon')
                    .style("fill", '#000000')
                    .style("opacity", 0.7);
            gClonIzquierdo.transition()
                    .duration(2000)
                    .attr('transform', 'translate(' + wEje + ',0)')
                    .each('end', function () {
                        terminarPonerTelon(1);
                    });
            gClonDerecho.transition()
                    .duration(2000)
                    .attr('transform', 'translate(' + (x + wEje) + ',0)')
                    .each('end', function () {
                        terminarPonerTelon(1);
                    });
        }
    }
    ;

    function terminarPonerTelon(n)
    {
        telones += n;
        if (telones === 2)
        {
            telones = 0;
            svg.selectAll('g.fade').style('opacity', null);
            gTelon.attr('transform', 'translate(' + wEje + ',0)');
            gClonIzquierdo.selectAll('rect.telon').style('opacity', 0);
            gClonDerecho.selectAll('rect.telon').style('opacity', 0);
            gTelon.selectAll('rect.telon').style('fill', '#000000').style('opacity', .70);
        }
    }

    function iniciarMoverExtendidos(d)
    {
        xDrag = false;
        window.d3.selectAll('g.extendida').classed('grab', true);
        window.d3.selectAll('g.extendida').classed('grabbing', false);
    }
    ;

    function terminarMoverExtendidos(d)
    {
        xDrag = false;
        window.d3.selectAll('g.extendida').classed('grab', true);
        window.d3.selectAll('g.extendida').classed('grabbing', false);
    }
    ;

    function moverExtendidos(arreglo, escala)
    {
        var min = arreglo[0];
        var max = arreglo[1];
        window.d3.selectAll('g.extendida').classed('grab', false);
        window.d3.selectAll('g.extendida').classed('grabbing', true);
        if (xDrag === false)
        {
            xDrag = window.d3.event.x;
        }
        var delta = xDrag - window.d3.event.x;
        xE += delta;
        xE = Math.max(min, Math.min(max, xE));
        actualizarSlider(xE, escala, true);
    }
    ;

    function generaSlider(ancho, altoF)
    {
        gSlider.attr('transform', 'translate(' + wEje + ',' + altoF + ')');
        gSlider.append('rect')
                .attr('fill', '#000000')
                .style('stroke', '#ffff')
                .style('stroke-width', pSlider)
                .attr('height', hSlider + (2 * pSlider))
                .attr('width', ancho)
                .attr('class', 'slidercontrolgroup pointer');
        var g = gSlider.append('g')
                .attr('class', 'slidercontrolgroup')
        g.append('rect')
                .attr('fill', '#ff0000')
                .attr('height', hSlider + (2 * pSlider))
                .attr('width', wSliderControl)
                .attr('x', 0)
                .attr('y', 0);
        g.append('line')
                .style('stroke', '#000000')
                .attr('x1', wSliderControl / 2)
                .attr('x2', wSliderControl / 2)
                .attr('y1', pSlider)
                .attr('y2', hSlider + pSlider);
        var flecha = window.d3.svg.symbol()
                .type("triangle-up")
                .size(25);
        g.append('path')
                .attr('d', flecha)
                .attr('transform', 'translate(' + (3 * wSliderControl / 4) + ',' + ((hSlider / 2) + pSlider) + '), rotate(90)');
        g.append('path')
                .attr('d', flecha)
                .attr('transform', 'translate(' + (wSliderControl / 4) + ',' + ((hSlider / 2) + pSlider) + '), rotate(270)');
    }
    ;

    function iniciarMoverSlider(d)
    {
        gSlider.select('g.slidercontrolgroup')
                .classed('grab', true)
                .classed('grabbing', false);
    }
    ;

    function terminarMoverSlider(d)
    {
        gSlider.select('g.slidercontrolgroup')
                .classed('grab', true)
                .classed('grabbing', false);
    }
    ;

    function moverSlider(arreglo, escala)
    {
        var min = arreglo[0];
        var max = arreglo[1];
        gSlider.select('g.slidercontrolgroup')
                .classed('grab', false)
                .classed('grabbing', true);
        var x = Math.max(min, Math.min(max, window.d3.event.x));
        actualizarExtendida(x, escala);
    }
    ;

    function moverSliderClick(el, arreglo, escala)
    {
        var coord = window.d3.mouse(el);
        var x = coord[0];
        var min = arreglo[0];
        var max = arreglo[1];
        var x = Math.max(min, Math.min(max, x));
        actualizarExtendida(x, escala);
    }
    ;

    function actualizarSlider(xE, escala, flag)
    {
        flag = flag || false;
        var x = escala(xE);
        gSlider.select('g.slidercontrolgroup').attr('transform', 'translate(' + (x - (wSliderControl / 2)) + ',0)');
        if (flag)
        {
            svg.selectAll('g.extendida').attr('transform', 'translate(' + (-xE) + ',0)');
        }
    }
    ;

    function actualizarExtendida(x, escala)
    {
        xE = escala(x);
        gSlider.select('g.slidercontrolgroup').attr('transform', 'translate(' + (x - (wSliderControl / 2)) + ',0)');
        svg.selectAll('g.extendida').attr('transform', 'translate(' + (-xE) + ',0)');
    }
    ;

    function agruparConflictos(arr)
    {
        var conflictos = [];
        var presidente = null;
        var cartel = null;
        var cartelesfederacion = [];
        var oponente = null;
        var conflicto = null;
        var descripcion = null;
        var presidente = null;
        var federacion = null;
        var numero = 0;
        var total = 0;
        var anio = 0;
        window._.each(arr, function (c) {
            for (anio = c.inicio; anio <= c.fin; anio++)
            {
                presidente = window._.find(presidentes, {id: c.presidente});
                descripcion = c.descripcion;
                numero = c.numero;
                total = c.total;
                presidente = c.presidente;
                federacion = c.federacion;
                federacion = federacion || null;
cartelesfederacion=[];
                if (federacion!==null)
                {
                    if (c.bando1.length===3)
                    {
                        cartelesfederacion=window._.clone(c.bando1);
                    }
                    if (c.bando2.length===3)
                    {
                        cartelesfederacion=window._.clone(c.bando2);
                    }                    
                }
                window._.each(c.bando1, function (b) {
                    cartel = window._.find(carteles, function (cart) {
                        var flagId = (cart.id === b) ? true : false;
                        var flagAnio = ((cart.inicio <= anio) && (anio < cart.fin));
                        return (flagId && flagAnio);
                    });
                    var oponentes = [];
                    var arreglo = [];
                    window._.each(c.bando2, function (o) {
                        oponente = window._.clone(window._.find(carteles, function (clon) {
                            var flagId = (clon.id === o) ? true : false;
                            var flagAnio = ((clon.inicio <= anio) && (anio < clon.fin));
                            return (flagId && flagAnio);
                        }));
                        oponente.descripcion = descripcion;
                        oponente.numero = numero;
                        oponente.total = total;
                        oponente.presidente = presidente;
                        oponente.federacion = federacion;
oponente.cartelesfederacion=window._.clone(cartelesfederacion);
                        oponente.anio = anio;
                        arreglo.push(oponente);
                    });
                    oponentes.push(arreglo);
                    conflicto = window._.find(conflictos, function (conf) {
                        var flagAnio = (conf.anio === anio) ? true : false;
                        var flagCartel = (conf.cartel.id === cartel.id);
                        return (flagAnio && flagCartel);
                    });
                    conflicto = conflicto || false;
                    if (conflicto !== false)
                    {
                        conflicto.oponentes.push(arreglo);
                    }
                    else
                    {
                        conflictos.push({cartel: cartel, presidente: presidente, anio: anio, oponentes: oponentes});
                    }
                });
                window._.each(c.bando2, function (b) {
                    cartel = window._.find(carteles, function (cart) {
                        var flagId = (cart.id === b) ? true : false;
                        var flagAnio = ((cart.inicio <= anio) && (anio < cart.fin));
                        return (flagId && flagAnio);
                    });
                    var oponentes = [];
                    var arreglo = [];
                    window._.each(c.bando1, function (o) {
//                        oponente=window._.clone(window._.find(carteles,{id:o}));
                        oponente = window._.clone(window._.find(carteles, function (clon) {
                            var flagId = (clon.id === o) ? true : false;
                            var flagAnio = ((clon.inicio <= anio) && (anio < clon.fin));
                            return (flagId && flagAnio);
                        }));
                        oponente.descripcion = descripcion;
                        oponente.numero = numero;
                        oponente.total = total;
                        oponente.presidente = presidente;
                        oponente.federacion = federacion;
oponente.cartelesfederacion=window._.clone(cartelesfederacion);
                        oponente.anio = anio;
                        arreglo.push(oponente);
                    });
                    oponentes.push(arreglo);
                    conflicto = window._.find(conflictos, function (conf) {
                        var flagAnio = (conf.anio === anio) ? true : false;
                        var flagCartel = (conf.cartel.id === cartel.id);
                        return (flagAnio && flagCartel);
                    });
                    conflicto = conflicto || false;
                    if (conflicto !== false)
                    {
                        conflicto.oponentes.push(arreglo);
                    }
                    else
                    {
                        conflictos.push({cartel: cartel, presidente: presidente, anio: anio, oponentes: oponentes});
                    }
                });
            }
        });
        window._.each(conflictos, function (conf) {
            var claves = [];
            var oponentes = window._.clone(conf.oponentes);
            conf.oponentes = [];
            window._.each(oponentes, function (op) {
                var clave = window._.pluck(op, 'id').join('-');
                if (claves.indexOf(clave) < 0)
                {
                    claves.push(clave);
                    conf.oponentes.push(op);
                }
            });
        });
        var conflictosSinRepetidos = [];
        window._.each(conflictos, function (conf) {
            var oponentesSinRepetidos = [];
            var unitarios = window._.select(conf.oponentes, function (ops) {
                return (ops.length < 2) ? true : false;
            });
            unitarios = unitarios || [];
            var alianzas = window._.select(conf.oponentes, function (ops) {
                return (ops.length >= 2) ? true : false;
            });
            alianzas = alianzas || [];
            var alianzasId = [];
            window._.each(alianzas, function (ali) {
                var ids = window._.pluck(ali, 'id');
                window._.each(ids, function (id) {
                    alianzasId.push(id);
                });
            });
            alianzasId = window._.uniq(alianzasId);
            window._.each(unitarios, function (unit) {
                unit = unit[0];
                var id = unit.id;
                if (alianzasId.indexOf(id) < 0)
                {
                    oponentesSinRepetidos.push([unit]);
                }
            });
            window._.each(alianzas, function (ali) {
                oponentesSinRepetidos.push(ali);
            });
            conf.oponentes = window._.clone(oponentesSinRepetidos);
        });
        return conflictos;
    }
    ;

    generaConflictos = function ()
    {
        var signos = [];
        var iniciales = [];
        window._.each(conflictos, function (c) {
            var y = c.cartel.yi + ((c.cartel.yf - c.cartel.yi) / 2);
            var dAnio = c.anio - c.cartel.inicio;
            var x = c.cartel.xE + (dAnio * wAnioE);
            x += radio;
            window._.each(c.oponentes, function (arr) {
                var alianza = [];
                x += oBolita;
                if (arr.length > 1)
                {
                    signos.push({x: x + radio, y: y, num: (arr.length - 1), aux: arr.length});
                    window._.each(arr, function (al) {
                        alianza.push({nombree: al.nombree, fondo: al.fondo});
                    });
                }
                window._.each(arr, function (oponente) {
                    var op = window._.clone(oponente);
                    op.alianza = alianza;
                    gConflictosE.append('circle')
                            .datum(op)
                            //.datum(window._.clone(oponente))
                            .attr('class', function (d) {
                                d.cartel = c.cartel;
                                iniciales.push(d);
                                return 'auto oponente ' + d.id;
                            })
                            .style('fill', function (d) {
                                return d.fondo;
                            })
                            .style('stroke', function (d) {
                                return d.anillo;
                            })
                            .attr('stroke-width', 2)
                            .attr('cx', function (d) {
                                d.cx = x;
                                return d.cx;
                            })
                            .attr('cy', function (d) {
                                d.cy = y;
                                return d.cy;
                            })
                            .attr('r', radio);
                    x += 2 * radio;
                });
            });
            gConflictosE.selectAll('text').data(iniciales)
                    .enter().append('text')
                    .attr('class', 'auto conflicto ignorar')
                    .attr('text-anchor', 'middle')
                    .style('font-family', '"Helvetica Neue", Helvetica, Arial, sans-serif')
                    .style('font-size', 13)
                    .style('font-weight', 'bold')
                    .attr('fill', '#000000')
                    .attr('x', function (d) {
                        return d.cx;
                    })
                    .attr('y', function (d) {
                        return d.cy + 4;
                    })
                    .text(function (d) {
                        return d.inicialc;
                    })
        });
        var signo = window.d3.svg.symbol()
                .type("cross")
                .size(81);
        window._.each(signos, function (s) {
            var x = s.x;
            var y = s.y;
            var i = 0;
            for (i = 1; i <= s.num; i++)
            {
                x += 2 * radio * (i - 1);
                gConflictosE.append('path')
                        .attr('class', 'auto alianza ignorar')
                        .attr('d', signo)
                        .attr('transform', 'translate(' + x + ',' + y + ')');
            }
        });
    };

    limpiaResaltados = function ()
    {
        clicked = null;
        window._.each(cartelesE, function (cart) {
            cart.resaltar = false;
        });
        resaltaCarteles();
    };

    generaHilos = function ()
    {
        var puntaArriba = window.d3.svg.symbol()
                .type("triangle-up")
                .size(100);
        var puntaAbajo = window.d3.svg.symbol()
                .type("triangle-down")
                .size(100);
        var linea = window.d3.svg.line()
                .x(function (d) {
                    return d.x;
                })
                .y(function (d) {
                    return d.y;
                })
                .interpolate('basis');
        var circulos = gConflictosE.selectAll('circle.oponente');
        circulos.each(function (c) {
            var xi = null;
            var xf = null;
            var yOrigen = c.cy;
            var yDestino = c.yi;
            var sube = null;
            var yi = null;
            var yf = null;
            var origen = null;
            var destino = null;
            var xint=null;
            var xmin=null;
            var xmax=null;
            if (yOrigen >= yDestino)
            {
                origen = window._.find(etiquetasN, {cartel: c.cartel.id, anio: c.anio});
                destino = window._.find(etiquetasN, {cartel: c.id, anio: c.anio});
                sube = true;
                xi = origen.xizq;
                xf = destino.xizq;
                yi = origen.ycentro;
                yf = destino.ycentro;
                xmin=window._.min([xi,xf]);
            }
            else
            {
                origen = window._.find(etiquetasN, {cartel: c.cartel.id, anio: c.anio});
                destino = window._.find(etiquetasN, {cartel: c.id, anio: c.anio});
                sube = false;
                xi = origen.xder;
                xf = destino.xder;
                yi = origen.ycentro;
                yf = destino.ycentro;
                xmax=window._.max([xi,xf]);
            }
            var dify = parseInt((yf - yi) / 2);
            var punta = null;
            var puntos = [];
            puntos.push({x: xi, y: yi});
            if (sube === true)
            {
                xint=xmin-50;
                punta = {punta: puntaArriba, x: xf, y: yf};
            }
            else
            {
                xint=xmax+50;
                punta = {punta: puntaAbajo, x: xf, y: yf};
            }
                puntos.push({x:xint,y:(yf-dify)});
            puntos.push({x: xf, y: yf});
            gHilosE.append('path')
                    .attr('d', linea(puntos))
                    .attr("class", 'ignorar')
                    .attr('stroke', '#000000')
                    .style('opacity', '0.20')
                    .attr('stroke-width', '4px')
                    .attr('fill', 'none');
            gHilosR.append('path')
                    .datum(c)
                    .attr('d', linea(puntos))
                    .style("stroke", c.cartel.color)
                    .attr("class", 'cartel ignorar ' + c.cartel.id)
                    .attr('stroke-width', '4px')
                    .attr('fill', 'none')
                    .style('opacity', '0.8')
                    .style('display', 'none');
            var angulo = getAngulo(puntos[1], puntos[2]);
            if (sube === false)
            {
                angulo += 180;
            }
            gHilosR.append('path')
                    .datum(c)
                    .attr('class', 'punta ignorar ' + c.cartel.id)
                    .attr('d', punta.punta)
                    .attr('fill', c.cartel.color)
                    .attr("transform", function (d) {
                        return "translate(" + xf + "," + yf + "), rotate(" + angulo + ")";
                    })
                    .style('display', 'none');
        });
    };

    getAngulo = function (p0, p1)
    {
        var angle = Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
        angle += 90;
        return angle;
    };


    return {
        init: init
    };
}());
