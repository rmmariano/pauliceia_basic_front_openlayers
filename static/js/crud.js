
$(document).ready(function(){

    // MODIFY / UPDATE
    var modify = new ol.interaction.Modify({
        features: __FEATURES__,
        // the SHIFT key must be pressed to delete vertices, so
        // that new vertices can be drawn at the same position
        // of existing vertices
        deleteCondition: function(event) {
            return ol.events.condition.shiftKeyOnly(event) &&
                ol.events.condition.singleClick(event);
        }
    });
    __MAP__.addInteraction(modify);


    // CREATE / ADD
    var draw;
    var typeSelect = document.getElementById('type');

    function addInteraction() {
        draw = new ol.interaction.Draw({
            features: __FEATURES__,
            type: /** @type {ol.geom.GeometryType} */ (typeSelect.value)
        });

        __MAP__.addInteraction(draw);
    }

    // when change the geometry type selected, stop the interaction of
    // the current draw and start the next
    typeSelect.onchange = function() {
        __MAP__.removeInteraction(draw);
        addInteraction();
    };

    // start drawing with the default geometry type selected
    addInteraction();

});
