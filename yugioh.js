$(document).ready(function () {
    let endpoint = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'
    // let name = 'Dark%20Magician'
    let type = 'Effect%20Monster'

    let cards = [];

    $(".fake_cards").prepend(
        // '<table>',
        // '<tbody>',
        '<tr class="xl7828542" style="color: black; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: auto; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; height: 0pt; mso-height-source: userset;"  valign="middle" height="30pt" align="center">',
        '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; height: 30pt; text-line-through: none; text-underline-style: none; width: 87pt;"  width="87pt" valign="middle" height="30pt" align="center">Card Type</td>',
        '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; border-left: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="middle" align="center">Card Name</td>',
        '<td class="xl8628542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: normal; border-left: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="middle" align="center">Advanced Format</td>',
        '<td class="xl8628542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: normal; border-left: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="middle" align="center">Traditional Format</td>',
        '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; border-left: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="middle" align="center">Remarks</td>',
        '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; border-left: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="middle" align="center">Card Database</td>',
        '</tr>',
        // '</tbody>',
        // '</table>'

    );

    $.getJSON(endpoint + "?type=" + type, function (json) {
        $.each(json.data, function (ix, obj) {
            let name = obj.name;
            console.log(name);
            $(cards).push(name);
            $(".fake_cards").append(
                '<tr>',
                // '<tr style="height: 15.0pt;" height="20">',
                '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">Monster/Effect</td>',
                '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
                name +
                '</td>',
                '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Forbidden</td>',
                '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Limited</td>',
                '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">New</td>',
                '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="bottom" align="center"><a href="https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&amp;cid=12128"><span style="text-decoration: none;">Link</span></a></td>',
                '</tr>'

            );

        });

        console.log(cards);
    });

    // $.ajax({
    //     url: endpoint + "?type=" + type ,
    //     contentType: "application/json",
    //     dataType: 'json',
    //     success: function(result){
    //         console.log(result.data[1]);
    //         console.log(result.data[2]);
    //         console.log(result.data[3]);
    //         console.log(result.data[9].name);
    //     }
    // })

});