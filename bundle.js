function calc_sign_size() {
    scale = 2
    var sign_width = 440,  //外框大小
        sign_height = 140,
        sign_radius = 10,   //外框圆角半径
        mark_width = 15,   //标记点大小
        mark_radius = 4,    //标记点圆弧半径
        mark_margin_top = 12.5, //标记点偏移
        mark_margin_left = 100,
        sign_loop_margin = 1.5,  //边框偏移
        sign_border_width = 3,
        symbol_width = 45,
        symbol_height = 90,
        symbol_width_margin = 12,
        symbol_margin_left = 15.5,
        dot_size = 10

    $(".sign").css({
        "width": sign_width * scale,
        "height": sign_height * scale,
        "border-radius": sign_radius * scale
    })

    $(".mark").css({
        "width": (mark_width + 2 * mark_radius) * scale,
        "height": 2 * mark_radius * scale,
        "border-radius": mark_radius * scale
    })

    $(".sign-loop").css({
        "left": sign_loop_margin * scale,
        "top": sign_loop_margin * scale,
        "width": sign_width * scale - 2 * sign_loop_margin * scale,
        "height": sign_height * scale - 2 * sign_loop_margin * scale,
        "border-radius": sign_radius * scale,
        "border-width": sign_border_width * scale
    })

    $(".symbol").css({
        "width": symbol_width * scale,
        "height": symbol_height * scale,
        "margin-top": scale * (sign_height - symbol_height) * 0.5,
        "margin-right": scale * symbol_width_margin
    })

    $(".s0").css({ "margin-left": scale * symbol_margin_left })

    $(".dot").css({
        "width": scale * dot_size,
        "height": scale * dot_size,
        "border-radius": scale * dot_size,
        "margin-top": scale * (sign_height - dot_size) * 0.5,
    })

    $(".sign").show()

}

var letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
var word = "京津冀晋蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新港澳使领学警";

function is_letter(a) {
    if (letter.indexOf(a) > -1) {
        return letter.indexOf(a)
    }
}

function is_word(a) {
    return word.indexOf(a)
}

function random(a, b) {
    return parseInt(Math.random() * (b - a) + a)
}

var refreshit = function (code, type) {
    $(".sign").removeClass("blue yellow black white")
    $(".sign").addClass(type)

    for (var i = 0; i < 7; i++) {
        var c = code[i]
        var dom = $(".s" + i)
        dom.removeClass()
        dom.addClass("symbol s" + i)
    }

    var len = code.length;
    for (var i = 0; i < len; i++) {
        var c = code[i]
        var dom = $(".s" + i)
        dom.removeClass()
        dom.addClass("symbol s" + i)
        if (is_letter(c) > -1) {
            dom.addClass("number number" + c)
            index = is_letter(c)
            if (index <= 9) {
                dom.css({
                    "background-position": "-" + (index * 90) + "px 0px"
                })
            } else if (index <= 19) {
                dom.css({
                    "background-position": "-" + (index * 90 - 900) + "px -180px"
                })
            } else if (index <= 25) {
                dom.css({
                    "background-position": "-" + (index - 20) * 90 + "px -360px"
                })
            } else {
                var fix = 0
                if (c == '7' || c == '8' || c == '0') {
                    fix = 1
                }
                if (c == '9') { fix = 2 }
                dom.css({
                    "background-position": "-" + ((index - 26) * 90 + fix) + "px -540px"
                })
            }
        }
        if (is_word(c) > -1) {
            dom.addClass("word word" + is_word(c))
            index = is_word(c)
            if (index <= 8) {
                dom.css({
                    "background-position": "-" + (index * 90) + "px 0px"
                })
            } else if (index <= 17) {
                dom.css({
                    "background-position": "-" + (index - 9) * 90 + "px -180px"
                })
            } else if (index <= 26) {
                dom.css({
                    "background-position": "-" + (index - 18) * 90 + "px -360px"
                })
            } else {
                dom.css({
                    "background-position": "-" + (index - 27) * 90 + "px -540px"
                })
            }
        }
    }

    calc_sign_size();
}

function getQueryString() {
    var result = location.search.match(new RegExp("[\?][^\?\&]+[^\?\&]+", "g"));
    if (result) {
        for (var i = 0; i < result.length; i++) {
            result[i] = result[i].substring(1);
        }
        return result;
    }
    return ""
}

$(function () {
    $("#show").click(function () {
        var code = $("#code").val()
        var type = $("#type").val()
        refreshit(code, type)
    })

    $("#showRandom").click(function () {
        var wordArr = []
        var letterArr = []
        for (var index = 0; index < word.length; index++) {
            wordArr.push(word[index])
        }
        for (var index = 0; index < letter.length; index++) {
            letterArr.push(letter[index])
            letterArr = letterArr.splice(0, 26)
        }
        var num1 = random(0, wordArr.length)
        var num2 = random(0, letterArr.length)

        var arr = letter.split("");
        var result = "";
        for (var i = 0; i < 2; i++) {
            var n = Math.floor(Math.random() * arr.length);
            result += arr[n]
        }

        var final = wordArr[num1] + letterArr[num2] + result + Math.floor(Math.random() * (990 - 100)) + 100;
        var type = $("#type").val()
        refreshit(final, type)
    })

    $(".example").click(function () {
        var d = $(this).attr("data").split(":")
        refreshit(d[0], d[1])
    })

    var query = getQueryString();
    query = decodeURI(query)
    if (!query) query = $("#code").val()
    var type = $("#type").val()
    refreshit(query, type)
})