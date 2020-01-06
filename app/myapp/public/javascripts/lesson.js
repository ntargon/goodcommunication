'use strict';

$(document).ready(() => {
    // console.log("hey");
    $(".student").click(function(){
        console.log(this);
        let studentId = this.value;
        $(".lesson-list").html("");
        $.get(`/api/lessons?studentId=${studentId}`, (results = {}) =>{
            let data = results.data;
            console.log(data);
            if(!data || !data.lessons) return;
            data.lessons.forEach((lesson) => {
                $(".lesson-list").append(
                    `
                    <div>
                        <li>Lesson Type: <a href="/lessons/${lesson._id}">${lesson.type}</a></li>
                        <li>Date: ${lesson.date}</li>
                        <li>Start Time: ${lesson.startTime}</li>
                        <li>End Time: ${lesson.endTime}</li>
                        <button class='${lesson.registered ? "registered-button" : "register-button"}' data-id="${lesson._id}">
                        ${lesson.registered ? "Cancel" : "Register"}
                      </button>
                    </div>
                    `
                )
            })
        })
        .then(() => {
            addRegisterButtonListener(studentId);
        });
    });
});

let addRegisterButtonListener = (studentId) => {
    $(".register-button").unbind('click');
    $(".registered-button").unbind('click');

    $(".register-button").click((event) => {
      let $button = $(event.target),
        lessonId = $button.data("id");
      $.get(`/api/lessons/${lessonId}/register?studentId=${studentId}`, (results = {}) => {
        let data = results.data;
        if(data && data.success){
          $button
            .text('Cancel')
            .addClass('registered-button')
            .removeClass('register-button');
            addRegisterButtonListener(studentId);
        }else{
          $button.text('Try again');
        }
      });
    });

    $(".registered-button").click((event) => {
        let $button = $(event.target),
          lessonId = $button.data("id");
        $.get(`/api/lessons/${lessonId}/cancel?studentId=${studentId}`, (results = {}) => {
          let data = results.data;
          if(data && data.success){
            $button
              .text('Register')
              .addClass('register-button')
              .removeClass('registered-button');
              addRegisterButtonListener(studentId);
          }else{
            $button.text('Try again');
          }
        });
      });


  }