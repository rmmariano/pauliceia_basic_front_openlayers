
$(document).ready(function(){

    $('#layers input[type=radio]').change(function() {
        // This action get the event of the radio button of base map
        // when select it, showing it and hiding the others

        // var layer = $(this).val();

        // map.getLayers().getArray().forEach(function(e) {
        //     var name = e.get('name');
        //
        //     if (e.get("always_visible_it")) {}
        //
        //     e.setVisible(name == layer);
        // });


        var layers_name = $(this).val();

        // var __layers__ = map.getLayers().getArray();
        var __layers__ = layers_radio_button;

        for (var i=0; i<__layers__.length; i++) {
            var layer = __layers__[i];

            var name = layer.get('name');

            // if the layer is to be always visible, so doesn't mess in it
            // if (layer.get("always_visible_it"))
            //     continue;

            layer.setVisible(name == layers_name);

        }


        // independently of base map, the layer that do creation/modification
        // of geometry stay visible
        // layer_feature_overlay.setVisible(true);
        // layer_geoserver_wms_pauliceia_sara_brasil.setVisible(true);
    });


    $("#div_checkbox_layers input[type='checkbox']").change(function() {
        // This action get the event of the checkbox when select or unselect it,
        // so show or hide the layer equivalent

        // this.checked
        var layers = layers_checkbox;

        for (var i=0; i<layers.length; i++) {
            var layer = layers[i];

            if (layer.getProperties()["name"] == this.id) {
                // invert the visible: if true will be false, and vice-versa
                layer.setVisible(!layer.getVisible());
                break;
            }
        }

    });

});
