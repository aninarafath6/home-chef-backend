var db = require("../../config/connection");
var collection = require("../../config/collections");
var bcrypt = require("bcrypt");
var mongo = require("mongodb");
const { ADMIN_COLLECTION } = require("../../config/collections");
var objectId = require("mongodb").ObjectID;

module.exports = {
  // add vendor
  add_vendor: (vendor_data) => {
    return new Promise(async (resolve, reject) => {
      let is_vendor_already = await db
        .get()
        .collection(collection.VENDOR_COLLECTION)
        .findOne({ email: vendor_data.email });
      console.log(is_vendor_already);
      if (is_vendor_already) {
        console.log("exist");
      } else {
        vendor_data.password = await bcrypt.hash(
          vendor_data.password,
          10
        );
        vendor_data.status="active"

        console.log(vendor_data);
        db.get()
          .collection(collection.VENDOR_COLLECTION)
          .insertOne(vendor_data)
          .then((res) => {
            resolve(res.ops[0]._id);
          });
      }
    });
  },
  //end add vendor

  // get all vendors
  get_all_vendors: () => {
    return new Promise(async (resolve, reject) => {
      let vendors = await db
        .get()
        .collection(collection.VENDOR_COLLECTION)
        .find({})
        .toArray();
      resolve(vendors);
    });
  },
  // end get all vendors

  //un edited vendor
  uneditedData: (vendor_id) => {
    return new Promise(async (resolve, reject) => {
      let vendor = await db
        .get()
        .collection(collection.VENDOR_COLLECTION)
        .findOne({ _id: objectId(vendor_id) });
      resolve(vendor);
    });
  },
  //end un edited vendor

  //update vendor
  update_vendor: (newVendorData, id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.VENDOR_COLLECTION)
        .updateOne(
          { _id: objectId(id) },
          {
            $set: {
              name: newVendorData.vendor_name,
              shope_name: newVendorData.shope_name,
              location: newVendorData.location,
              serviceTime: newVendorData.service_taime,
              serviceDays: newVendorData.select,
            },
          }
        )
        .then((res) => {
          resolve();
        });
    });
  },
  //end update vendor

  //remove vendor

  remove_a_vendor: (vendor_id) => {
    return new Promise((resolve, reject) => {
     
        db.get()
          .collection(collection.VENDOR_COLLECTION).deleteOne({ _id: objectId(vendor_id) });
          resolve("hi")
        

    });
  },

  //end remove vendor
};
