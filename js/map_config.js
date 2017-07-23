var features;
var map;

var layer_oms;
var layer_bing_maps;
var layer_geoserver_wms;
var layer_geoserver_wms_sara_brasil;
var layer_feature_overlay;


$(document).ready(function(){

  var view = new ol.View({
    // brasil inteiro
    // center: [-6217890.205764902, -1910870.6048274133],
    // centro SP
    center: [-5191416.910254965, -2697764.155309246],
    zoom: 15,
    maxZoom: 18,
    minZoom: 2
  });

  layer_oms = new ol.layer.Tile({
		source: new ol.source.OSM(),
		visible: true,
		name: 'osm_maps'
	});

	layer_bing_maps = new ol.layer.Tile({
		source: new ol.source.BingMaps({
						// tem que ser minha chave pega em http://www.bingmapsportal.com/
						key: 'Alji1HfwaerGb-YbkcTD9xcpBXzDGWslJg_hq4iHMyoTyoJfKfAADEwch34C6bCn',
		        imagerySet: 'AerialWithLabels'
		    }),
		visible: false,
		name: 'bing_maps'
	});

  layer_geoserver_wms = new ol.layer.Tile({
  	extent: [-13884991, 2870341, -7455066, 6338219],
  	source: new ol.source.TileWMS({
  		url: 'https://ahocevar.com/geoserver/wms',
  		params: {'LAYERS': 'topp:states',
  		// 'TILED': true
  		},
  		serverType: 'geoserver'
  	}),
    visible: false,
		name: 'geoserver_maps'
  })

  layer_geoserver_wms_sara_brasil = new ol.layer.Tile({
      source: new ol.source.TileWMS({
          url: 'http://www.dpi.inpe.br/terrama2-geoserver/ows',
          params: {'LAYERS': 'pauliceia:mosaicSara', 'TILED': true},
          serverType: 'geoserver'
      }),
      visible: true,
      name: 'sara_brasil_mosaic'
  });

  features = new ol.Collection();
  layer_feature_overlay = new ol.layer.Vector({
    source: new ol.source.Vector({features: features}),
    visible: true
  });

  map = new ol.Map({
    // layer_oms fica mais no "fundo"
    // layer_feature_overlay fica mais na "frente"
    layers: [layer_oms, layer_bing_maps, layer_geoserver_wms,
            layer_geoserver_wms_sara_brasil, layer_feature_overlay],
    target: 'map',
    controls: ol.control.defaults().extend([
      // barra de escala (canto inferior esquerdo)
      new ol.control.ScaleLine(),
      // barra de zoom e aumentar/diminuir zoom
      new ol.control.ZoomSlider()
    ]),
    view: view
  });

});
