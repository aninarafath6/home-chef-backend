const { Router, response } = require("express");
var express = require("express");
var router = express.Router();
var user_auth = require("../helpers/user_helpers/user_auth");
var home_page_based = require("../helpers/user_helpers/home_page_based");
var is_logged_user = require("../helpers/valid_user");
var add_to_cart = require("../helpers/user_helpers/cart/add_to_cart");
var display_cart = require("../helpers/user_helpers/cart/display_cart");
var cart_count = require("../helpers/user_helpers/cart/cart_count");
var change_quantity = require("../helpers/user_helpers/cart/change_quantity");
var get_total = require("../helpers/user_helpers/cart/total");
var remove_item = require("../helpers/user_helpers/cart/remove_item");
var getProductList = require("../helpers/user_helpers/cart/getProductList");
var place_order = require("../helpers/user_helpers/orders/place_order");
var display_orders = require("../helpers/user_helpers/orders/display_order");
var generateRazorPay = require("../helpers/user_helpers/orders/online_payment/razorPay/generateRazorpay");
var verify_razorPay_payment = require("../helpers/user_helpers/orders/online_payment/razorPay/razor_pay_verify");
var change_order_status = require("../helpers/user_helpers/orders/chenge_order_status");
router.post("/signup", (req, res) => {
  user_auth.user_signup(req.body).then((response) => {
    res.send({
      user_token: response.token,
      user_already: response.user_already,
      user_signup: response.user_signup,
    });
    // console.log(response);
  });
});

router.get("/isLogged", (req, res) => {
  user_auth.isLogged(req).then((response) => {
    res.send(response.loggin);
  });
});

router.post("/login", (req, res) => {
  user_auth.sms_login(req.body.input).then((response) => {
    res.send({
      otp_sended: response.otp_sended,
      type: response.type,
      user: response.user,
    });
    console.log(response);
  });
});

router.post("/verify-otp", (req, res) => {
  user_auth.verify_otp(req.body).then((response) => {
    res.send({ user_token: response.token, login: response.login });
  });
});

router.post("/verify-password", (req, res) => {
  user_auth.email_verify(req.body).then((response) => {
    res.send({ user_token: response.token, login: response.login });
    console.log(response);
  });
});

router.get("/get-home-page-items", (req, res) => {
  home_page_based.popular_food().then((response) => {
    res.status(200).send({ item: response, status: true });
  });
});

router.post("/add-to-cart", is_logged_user, (req, res) => {
  let token = req.headers.authorazation;

  add_to_cart(req.body.id, token).then((response) => {
    res.send({ response: response });
  });
});

router.get("/user-cart", is_logged_user, (req, res) => {
  let token = req.headers.authorazation;
  display_cart(token).then((response) => {
    res.send({ cart: response });
  });
});

router.get("/cart-count", is_logged_user, (req, res) => {
  let token = req.headers.authorazation;
  cart_count(token).then((response) => {
    // console.log({cart_count:response});
    res.status(200).send({ count: response });
  });
});

router.post("/change-quantity", is_logged_user, (req, res) => {
  console.log(req.body);
  change_quantity(req.body).then((response) => {
    res.send({ removeItem: response.removeItem });
  });
});
router.get("/get-total", is_logged_user, (req, res) => {
  let token = req.headers.authorazation;
  get_total(token).then((response) => {
    res.send({ total: response });
  });
});

router.post("/remove-cart-item", is_logged_user, (req, res) => {
  remove_item(req.body).then((response) => {
    res.send({ removeItem: response.removeItem });
  });
});
router.post("/place-order", is_logged_user, async (req, res) => {
  let token = req.headers.authorazation;
  let products = await getProductList(token);
  let total = await get_total(token);
  place_order(req.body, products, total, token).then((response) => {
    if (req.body.payment == "cod") {
      res.json({ codSuccess: true });
    } else if (req.body.payment == "RazorPay") {
      console.log("user using RazorPay");
      generateRazorPay(response.order_id, response.total)
        .then((response) => {
          res.send({ order: response, codSuccess: false });
        })
        .catch((err) => {
          res.send({ status: false, codSuccess: false });
        });
    } else {
      res.send({ status: false, codSuccess: false });
    }
  });
});
router.get("/display-order", is_logged_user, (req, res) => {
  let token = req.headers.authorazation;
  display_orders(token).then((response) => {
    res.json({ orders: response });
  });
});

router.post("/razorPay-verify-payment", is_logged_user, (req, res) => {
  console.log(req.body);
  verify_razorPay_payment(req.body)
    .then((response) => {
      change_order_status(req.body.order.receipt).then((response) => {
        res.send({ status: true });
        console.log("payment success");
      });
    })
    .catch((err) => {
      res.send({ status: false, msg: "payment failed" });
      console.log("payment failed");
    });
});

router.get("/getTotalPrice", is_logged_user, (req, res) => {
  let token = req.headers.authorazation;
  get_total(token).then((response) => {
    res.send({ total: response });
  });
});
module.exports = router;
