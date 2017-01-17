/// <reference path="./findbookmark.ts"/>
namespace pixiv_bookmark {
    export function main() {
        var style: string = GM_getResourceText('toastr');
        GM_addStyle(style);

        $(".bookmark-container").append('<a href="javascript:void(0)" style="display:none" id="us_bookmark" class="_button">即ブックマークする</a>');
        $(".bookmark-container").append('<a href="javascript:void(0)" style="display:none" id="us_unbookmark" class="_button">ブックマークを外す</a>');

        ($(".edit-bookmark").length == 0) ? $("#us_bookmark").show() : $("#us_unbookmark").show();

        $('#us_bookmark').on('click', function () { onBookmarkClick() });
        $('#us_unbookmark').on('click', function () { onUnBookmarkClick() });
    }

    function onBookmarkClick() {
        $.ajax({
            type: "POST",
            url: `http://www.pixiv.net/bookmark_add.php?id=${pixiv.context.illustId}`,
            data: {
                "mode": "add",
                "tt": pixiv.context.token,
                "id": pixiv.context.illustId,
                "type": "illust",
                "from_sid": "",
                "comment": "",
                "tag": "",
                "restrict": "0"
            },
            success: function (j_data: string) {
                toastr["success"]("ブックマークに追加しました");
                $('#us_bookmark').hide();
                $('#us_unbookmark').show();
            }
        });
    }

    function onUnBookmarkClick() {
        //find id
        scraper.findIDFromIllustID(pixiv.context.illustId, function (contextid: string) {
            $.ajax({
                type: "POST",
                url: "http://www.pixiv.net/bookmark_setting.php",
                data: {
                    "type": "",
                    "tt": pixiv.context.token,
                    "tag": "",
                    "untagged": "0",
                    "rest": "show",
                    "p": "1",
                    "book_id[]": contextid,
                    "add_tag": "",
                    "del": "ブックマーク解除"
                },
                success: function (j_data: string) {
                    toastr["success"]("ブックマークを解除しました");
                    $('#us_bookmark').show();
                    $('#us_unbookmark').hide();
                }
            });
        });
    }
}