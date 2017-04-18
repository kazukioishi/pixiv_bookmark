namespace pixiv_bookmark.scraper {
    export function findIDFromIllustID(illustid: string, callback: (retid: string) => void) {
        //search for max 100pages
        var doajax: (pageid: number) => void = function (pageid: number) {
            var counter: number = pageid;
            $.ajax({
                type: "GET",
                url: `//www.pixiv.net/bookmark.php?rest=show&p=${pageid}`,
                success: function (data) {
                    var retflag: boolean = false;
                    $(data).find(".image-item").each(function (index, val) {
                        if ($(this).find("img")[0].getAttribute("data-id") == illustid) {
                            //item found
                            callback($(this).find("input")[0].getAttribute("value"));
                            retflag = true;
                        }
                    });
                    //if not found
                    counter++;
                    if(counter > 100 || retflag) return;
                    doajax(counter); //call myself
                }
            });
        }
        doajax(1);
    }
}
