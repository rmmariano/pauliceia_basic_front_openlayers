
$(document).ready(function(){

    // MODIFY / UPDATE
    var modify = new ol.interaction.Modify({
        features: features,
        // the SHIFT key must be pressed to delete vertices, so
        // that new vertices can be drawn at the same position
        // of existing vertices
        deleteCondition: function(event) {
            return ol.events.condition.shiftKeyOnly(event) &&
                ol.events.condition.singleClick(event);
        }
    });
    map.addInteraction(modify);

    // CREATE / ADD
    var draw;
    var typeSelect = document.getElementById('type');

    function addInteraction() {
        draw = new ol.interaction.Draw({
            features: features,
            type: /** @type {ol.geom.GeometryType} */ (typeSelect.value)
        });

        map.addInteraction(draw);
    }

    // when change the geometry type selected, stop the interaction of
    // the current draw and start the next
    typeSelect.onchange = function() {
        map.removeInteraction(draw);
        addInteraction();
    };

    // start drawing with the default geometry type selected
    addInteraction();

});
