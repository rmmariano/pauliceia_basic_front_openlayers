// GLOBAL VARIAVLES

var __FEATURES__;

var __MAP__;

var __LAYERS_RADIO_BUTTON__;
var __LAYERS_CHECKBOX__;
var __LAYERS_ALWAYS_VISIBLE__;



function create_and_get_layers(){

    var layer_oms = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        name: 'osm_maps'
    });

    var layer_bing_maps = new ol.layer.Tile({
        source: new ol.source.BingMaps({
            // tem que ser minha chave pega em http://www.bingmapsportal.com/
            key: 'Alji1HfwaerGb-YbkcTD9xcpBXzDGWslJg_hq4iHMyoTyoJfKfAADEwch34C6bCn',
            imagerySet: 'AerialWithLabels'
        }),
        visible: false,
        name: 'bing_maps'
    });

    var layer_geoserver_wms_pauliceia_sara_brasil = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://www.dpi.inpe.br/terrama2-geoserver/ows',
            params: {'LAYERS': 'pauliceia:mosaicSara', 'TILED': true},
            serverType: 'geoserver'
        }),
        visible: true,
        name: 'layer_geoserver_wms_pauliceia_sara_brasil',
    });

    __FEATURES__ = new ol.Collection();
    var layer_feature_overlay = new ol.layer.Vector({
        source: new ol.source.Vector({features: __FEATURES__}),
        visible: true,
        name: 'layer_feature_overlay',
    });


    // test layers

    var layer_geoserver_wms_test_pauliceia_ba_municipios = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/pauliceia/wms',
            params: {'LAYERS': 'pauliceia:ba_municipios', 'TILED': true},
            serverType: 'geoserver'
        }),
        visible: false,
        name: 'layer_geoserver_wms_test_pauliceia_ba_municipios'
    });

    var layer_geoserver_wms_test_pauliceia_focos = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/pauliceia/wms',
            params: {'LAYERS': 'pauliceia:focos', 'TILED': true},
            serverType: 'geoserver'
        }),
        visible: false,
        name: 'layer_geoserver_wms_test_pauliceia_focos'
    });

    var layer_geoserver_wms_test_pauliceia_tab_event= new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/pauliceia/wms',
            params: {'LAYERS': 'pauliceia:tab_event', 'TILED': true},
            serverType: 'geoserver'
        }),
        visible: false,
        name: 'layer_geoserver_wms_test_pauliceia_tab_event'
    });

    //


    // Create the types of layers

    __LAYERS_RADIO_BUTTON__ = [ layer_oms, layer_bing_maps ];
    __LAYERS_CHECKBOX__ = [
        layer_geoserver_wms_pauliceia_sara_brasil,

        layer_geoserver_wms_test_pauliceia_ba_municipios,
        layer_geoserver_wms_test_pauliceia_focos,
        layer_geoserver_wms_test_pauliceia_tab_event,
    ];
    __LAYERS_ALWAYS_VISIBLE__ = [
        layer_feature_overlay
    ];

    // union layers_radio_button with layers_checkbox
    layers = __LAYERS_RADIO_BUTTON__.concat(__LAYERS_CHECKBOX__);
    // the result "layers" union with layers_always_visible
    layers = layers.concat(__LAYERS_ALWAYS_VISIBLE__);

    return layers;
}


$(document).ready(function(){

    // view.getCenter()
    // Array [ -4751748.755897983, -1662340.417439912 ]

    // var view = new ol.View({
    //     // brasil inteiro
    //     // center: [-6217890.205764902, -1910870.6048274133],
    //     // zoom: 4,
    //
    //     // centro SP
    //     center: [-5191416.910254965, -2697764.155309246],
    //     zoom: 15,
    //
    //     maxZoom: 18,
    //     minZoom: 2,
    // });

    // Bahia
    var view = new ol.View({
        center: [-4751748.755897983, -1662340.417439912],
        zoom: 6,
        maxZoom: 18,
        minZoom: 2,
    });

    __MAP__ = new ol.Map({
        layers: create_and_get_layers(),

        target: 'map',
        controls: ol.control.defaults().extend([
            // it shows map's scale
            new ol.control.ScaleLine(),
            // it shows zoom slider
            new ol.control.ZoomSlider()
        ]),
        view: view
    });

});
