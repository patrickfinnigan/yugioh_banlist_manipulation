$(document).ready(function () {
    let endpoint = 'https://db.ygoprodeck.com/api/v7/cardinfo.php'
    // let name = 'Dark%20Magician'
    // let type = 'Effect%20Monster'
    let startprice= 10.00
    let endprice = 9999.99

    let cards = [];

    $(".banned_cards").prepend(
        // '<table>',
        // '<tbody>',
        '<tr class="xl7828542" style="color: black; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: auto; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; height: 0pt; mso-height-source: userset;"  valign="middle" height="30pt" align="center">',
        '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; height: 30pt; text-line-through: none; text-underline-style: none; width: 87pt;"  width="87pt" valign="middle" height="30pt" align="center">Card Type</td>',
        '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; border-left: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="middle" align="center">Card Name</td>',
        '<td class="xl8628542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: normal; border-left: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="middle" align="center">Advanced Format</td>',
        '<td class="xl8628542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: normal; border-left: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="middle" align="center">Traditional Format</td>',
        '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; border-left: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="middle" align="center">Min Price</td>',
        '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; border-left: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="middle" align="center">Max Price</td>',
        '</tr>',
        // '</tbody>',
        // '</table>'

    );

    $.getJSON(endpoint + "?startprice=" + startprice + "&endprice=" + endprice , function (json) {
        $.each(json.data, function (ix, obj) {
            let cards = [];

            let name = obj.name;
            let type = obj.type;
            let card_sets = obj.card_sets;

            let price_array = [];
            
            if (card_sets === undefined) {
                return true;
            }

            for (let i = 0; i < card_sets.length; i++) {
                let set_price = parseFloat(card_sets[i].set_price);
                if (set_price === 0 || set_price === null || set_price === Infinity) {
                    continue;
                } else {
                    price_array.push(set_price);
                }
            }

            
            let min_price = Math.min(...price_array);
            let max_price = Math.max(...price_array);

            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
              })

            let min_price_usd = formatter.format(min_price);
            let max_price_usd = formatter.format(max_price);

            console.log(name);
            console.log(min_price);


            // const sortedBy = {
            //     "Normal Monster": 0, 
            //     "Effect Monster": 1, 
            //     "Tuner Monster": 2, 
            //     "Fusion Monster": 3, 
            //     "Link Monster": 4, 
            //     "Synchro Monster": 5, 
            //     "XYZ Monster": 6, 
            //     "Spell Card": 7, 
            //     "Trap Card": 8
            // }


            // $(cards).push(name);

            if (type === "Normal Monster") {
                $(".banned_normal_monsters").append(
                    '<tr>',
                    // '<tr style="height: 15.0pt;" height="20">',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">'
                    + type +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
                    name +
                    '</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Forbidden</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Limited</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">'
                    + min_price_usd +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="bottom" align="center">'
                    + max_price_usd +
                    '</td>',
                    '</tr>'
                );
            } else if (type === "Effect Monster" || type === "Tuner Monster") {
                $(".banned_effect_monsters").append(
                    '<tr>',
                    // '<tr style="height: 15.0pt;" height="20">',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">'
                    + type +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
                    name +
                    '</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Forbidden</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Limited</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">'
                    + min_price_usd +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="bottom" align="center">'
                    + max_price_usd +
                    '</td>',
                    '</tr>'
                );
            } else if (type === "Fusion Monster") {
                $(".banned_fusion_monsters").append(
                    '<tr>',
                    // '<tr style="height: 15.0pt;" height="20">',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">'
                    + type +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
                    name +
                    '</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Forbidden</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Limited</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">'
                    + min_price_usd +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="bottom" align="center">'
                    + max_price_usd +
                    '</td>',
                    '</tr>'
                );
            } else if (type === 'Link Monster') {
                $(".banned_link_monsters").append(
                    '<tr>',
                    // '<tr style="height: 15.0pt;" height="20">',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">'
                    + type +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
                    name +
                    '</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Forbidden</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Limited</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">'
                    + min_price_usd +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="bottom" align="center">'
                    + max_price_usd +
                    '</td>',
                    '</tr>'
                );

            } else if (type === 'Synchro Monster') {
                $(".banned_synchro_monsters").append(
                    '<tr>',
                    // '<tr style="height: 15.0pt;" height="20">',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">'
                    + type +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
                    name +
                    '</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Forbidden</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Limited</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">'
                    + min_price_usd +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="bottom" align="center">'
                    + max_price_usd +
                    '</td>',
                    '</tr>'
                );

            } else if (type === 'XYZ Monster') {
                $(".banned_xyz_monsters").append(
                    '<tr>',
                    // '<tr style="height: 15.0pt;" height="20">',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">'
                    + type +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
                    name +
                    '</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Forbidden</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Limited</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">'
                    + min_price_usd +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="bottom" align="center">'
                    + max_price_usd +
                    '</td>',
                    '</tr>'
                );

            } else if (type === 'Spell Card') {
                $(".banned_spell_cards").append(
                    '<tr>',
                    // '<tr style="height: 15.0pt;" height="20">',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">'
                    + type +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
                    name +
                    '</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Forbidden</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Limited</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">'
                    + min_price_usd +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="bottom" align="center">'
                    + max_price_usd +
                    '</td>',
                    '</tr>'
                );

            } else if (type === 'Trap Card') {
                $(".banned_trap_cards").append(
                    '<tr>',
                    // '<tr style="height: 15.0pt;" height="20">',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">'
                    + type +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
                    name +
                    '</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Forbidden</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 74pt;" width="74pt" valign="bottom" align="center">Limited</td>',
                    '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">'
                    + min_price_usd +
                    '</td>',
                    '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 83pt;" width="83pt" valign="bottom" align="center">'
                    + max_price_usd +
                    '</td>',
                    '</tr>'
                );

            } else {
                return true;
            }


        });

    });

    console.log(cards);

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