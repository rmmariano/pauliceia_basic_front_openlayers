
$(document).ready(function(){

    $('#layers input[type=radio]').change(function() {
        // This action get the event of the radio button of base map
        // when select it, showing it and hiding the others

        var layers_name_option = $(this).val();

        for (var i=0; i<__LAYERS_RADIO_BUTTON__.length; i++) {
            var layer = __LAYERS_RADIO_BUTTON__[i];

            var layers_name = layer.get('name');

            // if the "layer" is the layer chosen on radio button, so
            // set visible equals true, else set visible equals false
            layer.setVisible(layers_name == layers_name_option);
        }
    });


    $("#div_checkbox_layers input[type='checkbox']").change(function() {
        // This action get the event of the checkbox when select or unselect it,
        // so show or hide the layer equivalent

        for (var i=0; i<__LAYERS_CHECKBOX__.length; i++) {
            var layer = __LAYERS_CHECKBOX__[i];

            if (layer.get("name") == this.id) {
                // invert the visible: if true will be false, and vice-versa
                layer.setVisible(!layer.getVisible());
                break;
            }
        }

    });

});
