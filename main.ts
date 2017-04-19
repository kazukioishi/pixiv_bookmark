/// <reference path="./findbookmark.ts"/>
namespace pixiv_bookmark {
    export function main() {
        var style: string = GM_getResourceText('toastr');
        GM_addStyle(style);

        $(".bookmark-container").append(`<a href="javascript:void(0)" style="display:none" id="us_bookmark" class="_bookmark-toggle-button add-bookmark">
                                        <span class="bookmark-icon"></span>
                                        <span class="description">即ブックマークする</span>
                                        </a>`);
        $(".bookmark-container").append(`<a href="javascript:void(0)" style="display:none" id="us_unbookmark" class="_bookmark-toggle-button add-bookmark">
                                        <span class="bookmark-icon"></span>
                                        <span class="description">ブックマークを外す</span>
                                        </a>`);

        ($(".edit-bookmark").length == 0) ? $("#us_bookmark").show() : $("#us_unbookmark").show();

        $('#us_bookmark').on('click', () => onBookmarkClick());
        $('#us_unbookmark').on('click', () => onUnBookmarkClick());
    }

    function onBookmarkClick() {
        $.ajax({
            type: "POST",
            url: `//www.pixiv.net/bookmark_add.php?id=${pixiv.context.illustId}`,
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
            success: (j_data: string) => {
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
                url: "//www.pixiv.net/bookmark_setting.php",
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
                success: (j_data: string) => {
                    toastr.success("ブックマークを解除しました");
                    $('#us_bookmark').show();
                    $('#us_unbookmark').hide();
                },
                error: () => {
                    toastr.warning("(多分)ブックマークを解除しました");
                    $('#us_bookmark').show();
                    $('#us_unbookmark').hide();
                }
            });
        });
    }
}
