'use strict';

$(document).ready(() => {
    // console.log("hey");
    $(".add").click(function(){
        let day = $(this).attr('day');
        $(this).next().append(
            `
            <div>
                <input type="text" name="type_${day}" required>
                <input type="number" name="startTime_h_${day}" min="0" max="23" required>                
                <input type="number" name="startTime_m_${day}" min="0" max="59" required>                
                <input type="number" name="endTime_h_${day}" min="0" max="23" required>                
                <input type="number" name="endTime_m_${day}" min="0" max="59" required>                
                <input type="button" value="-" class="del">
            </div>
            `            
        );
    });

    $(document).on('click', '.del', function() {
        $(this).parent().remove();
    });
});