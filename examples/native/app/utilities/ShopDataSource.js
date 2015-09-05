"use strict";

import React from "react-native";

const { ListView } = React;

export default class ShopDataSource extends ListView.DataSource {
  constructor() {
    let getSectionData = (source, sectionId) => {
      return source[sectionId];
    };

    let getRowData = (source, sectionId, recordId) => {
      return source[`${sectionId}:${recordId}`];
    };

    super({
      getSectionData,
      getRowData,
      rowHasChanged:            (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged:  (section1, section2) => section1 !== section2
    });
  }

  cloneWithShop(shop) {
    let data = {
      General: "General Info",
      Domains: "Domains"
    };

    data["General:Name"]   = shop.name;
    data["General:Owner"]  = shop.shop_owner;
    data["Domains:Domain"] = shop.domain;

    let sectionIds = ["General", "Domains"];
    let rowIds     = [
      ["Name", "Owner"],
      ["Domain"]
    ];

    return this.cloneWithRowsAndSections(data, sectionIds, rowIds);
  }
}
