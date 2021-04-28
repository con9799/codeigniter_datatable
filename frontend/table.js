var $dtables = {};
var getLang = function(lng, key) {
    var langdata['uz'] = {
        'datatable_decimal': ,
        'datatable_emptyTable': "Jadvalda ma'lumotlar yo'q",
        'datatable_info': "_TOTAL_ dona ma'lumotlardan _START_-dan _END_-gachasi ko'rsatilmoqda",
        'datatable_infoEmpty': "0 dona ma'lumotlardan 0-dan 0-gachasi ko'rsatilmoqda",
        'datatable_infoFiltered': "(_MAX_ donadan saralab olindi)",
        'datatable_infoPostFix': "",
        'datatable_thousands': ",",
        'datatable_lengthMenu': "_MENU_ yozuvni ko'rsatish",
        'datatable_loadingRecords': "Ma'lumotlar yuklanmoqda...",
        'datatable_processing': "Qayta ishlanmoqda...",
        'datatable_search': "",
        'datatable_searchPlaceholder': "Qidirish...",
        'datatable_zeroRecords': "Mos keladigan yozuvlar topilmadi",
        'datatable_first': "Birinchi",
        'datatable_last': "Oxirgi",
        'datatable_next': "Keyingi",
        'datatable_previous': "Avvalgi",
        'datatable_sortAscending': ": ustunini to'g'ri tartiblash",
        'datatable_sortDescending': ": ustunini teskari tartiblash",
        'datatable_buttons_copyTitle': "Buferga nusxalash",
        'datatable_buttons_copySuccess_d': "Buferga %d qator ko'chirildi",
        'datatable_buttons_copySuccess_1': "Bir satr buferga ko'chirildi",
        'datatable_buttons_pageLength_d': "%d qatordan yozuv",
        'datatable_buttons_pageLength_all': "Barcha yozuvlar",
    };
    return langdata[lng][key];
}
var generateDatableSettings = function(elem) {
    var tableset = {};
    tableset['language'] = {
        "decimal":        getLang('uz', 'datatable_decimal'),
        "emptyTable":     getLang('uz', 'datatable_emptyTable'),
        "info":           getLang('uz', 'datatable_info'),
        "infoEmpty":      getLang('uz', 'datatable_infoEmpty'),
        "infoFiltered":   getLang('uz', 'datatable_infoFiltered'),
        "infoPostFix":    getLang('uz', 'datatable_infoPostFix'),
        "thousands":      getLang('uz', 'datatable_thousands'),
        "lengthMenu":     getLang('uz', 'datatable_lengthMenu'),
        "loadingRecords": getLang('uz', 'datatable_loadingRecords'),
        "processing":     getLang('uz', 'datatable_processing'),
        "search":         getLang('uz', 'datatable_search'),
        "searchPlaceholder": getLang('uz', 'datatable_searchPlaceholder'),
        "zeroRecords":    getLang('uz', 'datatable_zeroRecords'),
        "paginate": {
            "first":      getLang('uz', 'datatable_first'),
            "last":       getLang('uz', 'datatable_last'),
            "next":       getLang('uz', 'datatable_next'),
            "previous":   getLang('uz', 'datatable_previous')
        },
        "aria": {
            "sortAscending":  getLang('uz', 'datatable_sortAscending'),
            "sortDescending": getLang('uz', 'datatable_sortDescending')
        },
        "buttons": {
            "copyTitle": getLang('uz', 'datatable_buttons_copyTitle'),
            "copySuccess": {
                _: getLang('uz', 'datatable_buttons_copySuccess_d'),
                1: getLang('uz', 'datatable_buttons_copySuccess_1')
            },
            "pageLength": {
                _: getLang('uz', 'datatable_buttons_pageLength_d'),
                '-1': getLang('uz', 'datatable_buttons_pageLength_all'),
            }
        }
    }

    var datatableButtons = elem.attr('datatable-buttons');
    var datatableButtonsDom = elem.attr('datatable-buttons-dom');
    var datatableProcessing = elem.attr('datatable-processing');
    var datatableServerSide = elem.attr('datatable-serverside');
    var datatableserverMethod = elem.attr('datatable-servermethod');
    var datatableAjax = elem.attr('datatable-ajax');
    var datatableColumns = elem.attr('datatable-columns');
    var datatableColumnDefs = elem.attr('datatable-columndefs');
    var datatableOrder = elem.attr('datatable-order');
    var datatableResponsive = elem.attr('datatable-responsive');
    var datatablelengthMenu = elem.attr('datatable-lengthmenu');
    var datatablefnRowCallback = elem.attr('datatable-fnrowcallback');
    var datatableSecured = elem.attr('datatable-secured');

    if (typeof datatableProcessing !== "undefined") {
        tableset.processing = (datatableProcessing == '1') ? true : false;
    }

    if (typeof datatableServerSide !== "undefined") {
        tableset.serverSide = (datatableServerSide == '1') ? true : false;
    }

    if (typeof datatableResponsive !== "undefined") {
        tableset.responsive = (datatableResponsive == '1') ? true : false;
    }

    if (typeof datatableSecured !== "undefined") {
        datatableSecured = (datatableSecured == 'true') ? true : false;
    }

    if (typeof datatablefnRowCallback !== "undefined") {
        datatablefnRowCallback = $.parseJSON(datatablefnRowCallback);
        tableset.fnRowCallback = new Function(datatablefnRowCallback['arguments'], datatablefnRowCallback['body']);
    }

    if (typeof datatableserverMethod !== "undefined") {
        tableset.serverMethod = datatableserverMethod;
    }

    if (typeof datatableAjax !== "undefined") {
        datatableAjax = $.parseJSON(datatableAjax);
        if (datatableSecured) {
            datatableAjax.data = function ( d ) {
                d[backSet.csrf_hash_name] = backSet.csrf_hash;
            };    
            datatableAjax.complete = function(response) {
                var data  = $.parseJSON(response.responseText);
                backSet.csrf_hash = data['hash_token'];
            }
        }
        /* Ajax xatoliklarni olish
        datatableAjax.error = function ( d ) {
            console.log(d);
        };
        */
        tableset.ajax = datatableAjax;
    }

    if (typeof datatableColumns !== "undefined") {
        tableset.columns = $.parseJSON(datatableColumns);
    }

    if (typeof datatablelengthMenu !== "undefined") {
        tableset.lengthMenu = $.parseJSON(datatablelengthMenu);
    }

    if (typeof datatableOrder !== "undefined") {
        tableset.order = $.parseJSON(datatableOrder);
    }

    if (typeof datatableColumnDefs !== "undefined") {
        tableset.columnDefs = $.parseJSON(datatableColumnDefs);
    }

    if (typeof datatableButtonsDom === "undefined") {
        datatableButtonsDom = "Bfrtip";
    }

    if (typeof datatableButtons !== "undefined") {
        datatableButtons = $.parseJSON(datatableButtons);
        if (datatableButtons.length > 0) {
            tableset.dom = datatableButtonsDom;
            tableset.buttons = new Object([]);
            $.each(datatableButtons, function(i, item) {
                if (typeof item === 'string') {
                    tableset.buttons.push(item); 
                }
                if (typeof item === 'object') {
                    let button = {};
                    if ('text' in item) { button.text = item['text'];}
                    if ('className' in item) { button.className = item['className'];}
                    if ('extend' in item) {button.extend = item['extend'];}
                    if ('buttons' in item) {
                        $.each(item['buttons'], function(bi, bitem) {
                            if ('customize' in bitem) {
                                item['buttons'][bi]['customize'] = new Function(bitem['customize']['arguments'], bitem['customize']['body']);
                            }
                            if ('action' in bitem) {
                                item['buttons'][bi]['action'] = new Function(bitem['action']['arguments'], bitem['action']['body']);
                            }
                        });
                        button.buttons = item['buttons'];
                    }
                    if ('action' in item) { 
                        button.action = new Function(item['action']['arguments'], item['action']['body']);
                    }
                    tableset.buttons.push(button); 
                }
            });
            $.extend({}, tableset.buttons);
        }
    }
    return tableset;
}

(function ( $ ) {
    if ( $( "[datatable]" ).length ) {
        $( "[datatable]" ).each(function( index ) {
            var table = $( this );
            var name = table.attr( 'datatable' );
            $dtables[name] = $('[datatable='+name+']').DataTable(generateDatableSettings(table));
        });
    }
})(jQuery);
