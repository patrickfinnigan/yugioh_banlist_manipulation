$(document).ready(function () {
  let endpoint = "https://db.ygoprodeck.com/api/v7/cardinfo.php";
  // let name = 'Dark%20Magician'
  // let type = 'Effect%20Monster'
  let startprice = 1.00;
  let min_rarity = "Common";
  // (UR), (ScR), (SR), (C), (DSPR), (R), (GGR), (PG), (GUR), (UtR), (PScR), (GScR)

  let cards = [];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  let startprice_usd = formatter.format(startprice);
  console.log(startprice_usd)

  $(".banned_cards").prepend(
    // '<table>',
    // '<tbody>',
    '<tr class="xl7828542" style="color: black; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: auto; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; height: 0pt; mso-height-source: userset;"  valign="middle" height="30pt" align="center">',
    '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; height: 30pt; text-line-through: none; text-underline-style: none; width: 87pt;"  width="87pt" valign="middle" height="30pt" align="center">Card Type</td>',
    '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; border-left: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="middle" align="center">Card Name</td>',
    '<td class="xl8628542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: normal; border-left: none; text-line-through: none; text-underline-style: none; width: 84pt;" width="84pt" valign="middle" align="center">Bulk Diver Format</td>',
    '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; border-left: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="middle" align="center">Min Price</td>',
    '<td class="xl8528542" style="background: #1C1C1C; border: 0.5pt solid windowtext; color: white; font-family: Calibri, sans-serif; font-size: 12pt; font-style: normal; font-weight: bold; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: middle; white-space: nowrap; border-left: none; text-line-through: none; text-underline-style: none; width: 173pt;" width="173pt" valign="middle" align="center">Rarities</td>',
    "</tr>"
    // '</tbody>',
    // '</table>'
  );

  $.getJSON(
    endpoint + "?startprice=" + startprice + "&endprice=99999.99",
    function (json) {
      $.each(json.data, function (ix, obj) {
        let cards = [];

        let name = obj.name;
        let type = obj.type;
        let card_sets = obj.card_sets;

        let price_array = [];
        let rarity_array = [];
        let rarity_code_array = [];

        if (card_sets === undefined) {
          return true;
        }

        for (let i = 0; i < card_sets.length; i++) {
          let set_price = parseFloat(card_sets[i].set_price);
          let set_rarity = card_sets[i].set_rarity;
          let set_rarity_code = card_sets[i].set_rarity_code;
          if ($.inArray(set_rarity, rarity_array) >= 0) {
            continue;
          } else if (
            set_price === 0 ||
            set_price === null ||
            set_price === "0.00" ||
            set_rarity === 0 ||
            set_rarity === null ||
            set_rarity === ""
          ) {
            continue;
          } else if (set_price <= startprice) {
            continue;
          } else {
            price_array.push(set_price);
            rarity_array.push(set_rarity);
            rarity_code_array.push(set_rarity_code);
          }
        }

        let min_price = Math.min(...price_array);

        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        });

        let min_price_usd = formatter.format(min_price);

        let rarity_string = rarity_code_array.join(", ");
        // console.log(name);

        if (type === "Normal Monster") {
          $(".banned_normal_monsters").append(
            "<tr>",
            // '<tr style="height: 15.0pt;" height="20">',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">' +
              type +
              "</td>",
            '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
              name +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 84pt;" width="84pt" valign="bottom" align="center">Forbidden</td>',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">' +
              min_price_usd +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FF9; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 173pt;" width="173pt" valign="bottom" align="center">' +
              rarity_string +
              "</td>",
            "</tr>"
          );
        } else if (type === "Effect Monster" || type === "Tuner Monster") {
          $(".banned_effect_monsters").append(
            "<tr>",
            // '<tr style="height: 15.0pt;" height="20">',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">' +
              type +
              "</td>",
            '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
              name +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 84pt;" width="84pt" valign="bottom" align="center">Forbidden</td>',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">' +
              min_price_usd +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #FFC000; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 173pt;" width="173pt" valign="bottom" align="center">' +
              rarity_string +
              "</td>",
            "</tr>"
          );
        } else if (type === "Fusion Monster") {
          $(".banned_fusion_monsters").append(
            "<tr>",
            // '<tr style="height: 15.0pt;" height="20">',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">' +
              type +
              "</td>",
            '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
              name +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 84pt;" width="84pt" valign="bottom" align="center">Forbidden</td>',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">' +
              min_price_usd +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #CF9FFF; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 173pt;" width="173pt" valign="bottom" align="center">' +
              rarity_string +
              "</td>",
            "</tr>"
          );
        } else if (type === "Link Monster") {
          $(".banned_link_monsters").append(
            "<tr>",
            // '<tr style="height: 15.0pt;" height="20">',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">' +
              type +
              "</td>",
            '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
              name +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 84pt;" width="84pt" valign="bottom" align="center">Forbidden</td>',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">' +
              min_price_usd +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #00589A; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 173pt;" width="173pt" valign="bottom" align="center">' +
              rarity_string +
              "</td>",
            "</tr>"
          );
        } else if (type === "Synchro Monster") {
          $(".banned_synchro_monsters").append(
            "<tr>",
            // '<tr style="height: 15.0pt;" height="20">',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">' +
              type +
              "</td>",
            '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
              name +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 84pt;" width="84pt" valign="bottom" align="center">Forbidden</td>',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">' +
              min_price_usd +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #F2F2F2; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 173pt;" width="173pt" valign="bottom" align="center">' +
              rarity_string +
              "</td>",
            "</tr>"
          );
        } else if (type === "XYZ Monster") {
          $(".banned_xyz_monsters").append(
            "<tr>",
            // '<tr style="height: 15.0pt;" height="20">',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">' +
              type +
              "</td>",
            '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
              name +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 84pt;" width="84pt" valign="bottom" align="center">Forbidden</td>',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">' +
              min_price_usd +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #404040; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 173pt;" width="173pt" valign="bottom" align="center">' +
              rarity_string +
              "</td>",
            "</tr>"
          );
        } else if (type === "Spell Card") {
          $(".banned_spell_cards").append(
            "<tr>",
            // '<tr style="height: 15.0pt;" height="20">',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">' +
              type +
              "</td>",
            '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
              name +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 84pt;" width="84pt" valign="bottom" align="center">Forbidden</td>',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">' +
              min_price_usd +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #1D9E74; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 173pt;" width="173pt" valign="bottom" align="center">' +
              rarity_string +
              "</td>",
            "</tr>"
          );
        } else if (type === "Trap Card") {
          $(".banned_trap_cards").append(
            "<tr>",
            // '<tr style="height: 15.0pt;" height="20">',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-top: none; height: 15pt; text-line-through: none; text-underline-style: none; width: 87pt;"width="87pt" valign="bottom" height="15pt" align="center">' +
              type +
              "</td>",
            '<td class="xl7628542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 232pt;" width="232pt" valign="bottom" align="center">' +
              name +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 84pt;" width="84pt" valign="bottom" align="center">Forbidden</td>',
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 95pt;" width="95pt" valign="bottom" align="center">' +
              min_price_usd +
              "</td>",
            '<td class="xl8128542" style="border: 0.5pt solid windowtext; color: black; font-family: Calibri, sans-serif; font-size: 11pt; font-style: normal; font-weight: 400; mso-background-source: auto; mso-font-charset: 0; mso-ignore: padding; mso-number-format: General; mso-pattern: black none; padding: 0; text-align: center; text-decoration: none; vertical-align: bottom; white-space: normal; background: #BC5A84; border-left: none; border-top: none; text-line-through: none; text-underline-style: none; width: 173pt;" width="173pt" valign="bottom" align="center">' +
              rarity_string +
              "</td>",
            "</tr>"
          );
        } else {
          return true;
        }
      });
    }
  );

  // console.log(cards);
});
