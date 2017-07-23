
$(document).ready(function(){

    // when change the radio buttom, change the base map
    $('#layers input[type=radio]').change(function() {
        var layer = $(this).val();

        map.getLayers().getArray().forEach(function(e) {
            var name = e.get('name');
            e.setVisible(name == layer);
        });
        // independently of base map, the layer that do creation/modification
        // of geometry stay visible
        layer_feature_overlay.setVisible(true);
        layer_geoserver_wms_sara_brasil.setVisible(true);
    });

});
