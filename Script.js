"use strict"

$(function () {
    ajaxLoad();

    $('.resetBtn').on('click', function () {
        setPoint(0, 0, 1)
        ajaxClear()
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
        let params = 'Y=' + y + '&' + 'X=' + x + '&' + 'R=' + r;
        ajaxPost(params)
        setPoint(y, x, r)
    }
}

function ajaxLoad() {
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            $('.result').append(request.responseText);
        }
    }
    request.open('post', 'PHP/Load.php')
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send()
}

function ajaxClear() {
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            $('.resultFromPhp').remove();
        }
    }
    request.open('post', 'PHP/Clear.php')
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send()
}

function ajaxPost(params) {
    let request = new XMLHttpRequest()
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            $('.result').append(request.responseText);
        }
    }
    request.open('post', 'PHP/Request.php')
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send(params)
}

function showError(message) {
    $('.error').css({'color': 'red', 'position': 'absolute', 'margin': '0 0 0 20px'}).html(message)
}