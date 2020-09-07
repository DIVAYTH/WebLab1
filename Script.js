"use strict"

$(function () {
    $.ajax({
        type: "POST",
        url: "PHP/Load.php",
        success: function (answer) {
            $('.result').append(answer);
        }
    })

    $('.resetBtn').on('click', function () {
        setPoint(0, 0, 1)
        $.ajax({
            type: "POST",
            url: "PHP/Clear.php",
            success: function () {
                $('.resultFromPhp').remove();
            }
        })
    })

    $('.submitBtn').on('click', function (event) {
        let y = $('.yInput').val()
        let x = $('.xInput').val()
        let r = $('input[name="R"]:checked').val();
        checkY(y, x, r)
        event.preventDefault()
    })
})

function setPoint(y, x, r) {
    $('#pointer').attr("cx", (x * 140 / r + 200))
        .attr("cy", (y * -140 / r + 200));
}

function checkY(y, x, r) {
    if (!y) {
        showError('Вы не ввели Y')
    } else if (y < -5 || y > 3) {
        showError('Y должен быть от -5 до 3')
    } else if (isNaN(y)) {
        showError('Y должен быть числом')
    } else {
        $('.error').html("")
        $.ajax({
            type: "POST",
            url: "PHP/Request.php",
            data: {Y: y, X: x, R: r},
            success: function (answer) {
                $('.result').append(answer);
            }
        })
        setPoint(y, x, r)
    }
}

function showError(message) {
    $('.error').css({'color': 'red', 'position': 'absolute', 'margin': '0 0 0 20px'}).html(message)
}