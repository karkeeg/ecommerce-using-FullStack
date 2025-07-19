const {
  placeOrder,
  getAllOrders,
  getSingleOrder,
  getAllOrderByUser,
  updateOrder,
  deleteOrders,
  updateOrderStatus,
  updateOrderById,
  addOrder,
} = require("../controller/orderItemsController");
const { isloggedIn, isAdmin } = require("../controller/userController");

const router = require("express").Router();

router.post("/placeorder", placeOrder);
router.get("/getallorder", getAllOrders);
router.get("/getsingleorder/:id", getSingleOrder);
router.get("/getorderbyuser/:id", isloggedIn, getAllOrderByUser);

router.delete("/deleteOrder/:id", deleteOrders);
router.post("/updateorderstatus/:id", isAdmin, updateOrderStatus);
router.post("/updateorder/:id", isAdmin, updateOrderById);
router.post("/addorder", isAdmin, addOrder);

module.exports = router;
