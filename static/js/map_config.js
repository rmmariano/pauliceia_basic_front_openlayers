var features;

var view;
var layers;
var map;

var layer_oms;
var layer_bing_maps;
// var layer_geoserver_wms;
var layer_geoserver_wms_pauliceia_sara_brasil;
var layer_feature_overlay;

var layer_geoserver_wms_test_pauliceia_ba_municipios;
var layer_geoserver_wms_test_pauliceia_focos;
var layer_geoserver_wms_test_pauliceia_tab_event;



var layers_radio_button;
var layers_checkbox;
var layers_always_visible;


$(document).ready(function(){

    // view.getCenter()
    // Array [ -4751748.755897983, -1662340.417439912 ]

    view = new ol.View({
        // brasil inteiro
        // center: [-6217890.205764902, -1910870.6048274133],
        // zoom: 4,

        // Bahia
        center: [-4751748.755897983, -1662340.417439912],
        zoom: 6,

        // centro SP
        // center: [-5191416.910254965, -2697764.155309246],
        // zoom: 15,

        maxZoom: 18,
        minZoom: 2,
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

    // layer_geoserver_wms = new ol.layer.Tile({
    //     extent: [-13884991, 2870341, -7455066, 6338219],
    //     source: new ol.source.TileWMS({
    //         url: 'https://ahocevar.com/geoserver/wms',
    //         params: {'LAYERS': 'topp:states',
    //         // 'TILED': true
    //         },
    //         serverType: 'geoserver'
    //     }),
    //     visible: false,
    //     name: 'geoserver_maps'
    // })

    layer_geoserver_wms_pauliceia_sara_brasil = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://www.dpi.inpe.br/terrama2-geoserver/ows',
            params: {'LAYERS': 'pauliceia:mosaicSara', 'TILED': true},
            serverType: 'geoserver'
        }),
        visible: true,
        name: 'layer_geoserver_wms_pauliceia_sara_brasil',
        always_visible_it: true,
    });

    features = new ol.Collection();
    layer_feature_overlay = new ol.layer.Vector({
        source: new ol.source.Vector({features: features}),
        visible: true,
        name: 'layer_feature_overlay',
        always_visible_it: true,
    });


    // test layers

    layer_geoserver_wms_test_pauliceia_ba_municipios = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/pauliceia/wms',
            params: {'LAYERS': 'pauliceia:ba_municipios', 'TILED': true},
            serverType: 'geoserver'
        }),
        visible: false,
        name: 'layer_geoserver_wms_test_pauliceia_ba_municipios'
    });

    layer_geoserver_wms_test_pauliceia_focos = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/pauliceia/wms',
            params: {'LAYERS': 'pauliceia:focos', 'TILED': true},
            serverType: 'geoserver'
        }),
        visible: false,
        name: 'layer_geoserver_wms_test_pauliceia_focos'
    });

    layer_geoserver_wms_test_pauliceia_tab_event= new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/pauliceia/wms',
            params: {'LAYERS': 'pauliceia:tab_event', 'TILED': true},
            serverType: 'geoserver'
        }),
        visible: false,
        name: 'layer_geoserver_wms_test_pauliceia_tab_event'
    });

    //

    layers_radio_button = [ layer_oms, layer_bing_maps ];
    layers_checkbox = [
        layer_geoserver_wms_pauliceia_sara_brasil,

        layer_geoserver_wms_test_pauliceia_ba_municipios,
        layer_geoserver_wms_test_pauliceia_focos,
        layer_geoserver_wms_test_pauliceia_tab_event,
    ];
    layers_always_visible = [
        layer_feature_overlay
    ];

    // union layers_radio_button with layers_checkbox
    layers = layers_radio_button.concat(layers_checkbox)
    // the result "layers" union with layers_always_visible
    layers = layers.concat(layers_always_visible)




    // layer_oms fica mais no "fundo"
    // layer_feature_overlay fica mais na "frente"
    // layers = [layer_oms, layer_bing_maps,
    //
    //             layer_geoserver_wms_test_pauliceia_ba_municipios,
    //             layer_geoserver_wms_test_pauliceia_focos,
    //             layer_geoserver_wms_test_pauliceia_tab_event,
    //
    //             layer_geoserver_wms_pauliceia_sara_brasil,
    //             layer_feature_overlay
    //         ];




    map = new ol.Map({
        layers: layers,

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
