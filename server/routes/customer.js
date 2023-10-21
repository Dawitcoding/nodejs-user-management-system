const express= require("express")
const router= express.Router()
const customerController = require("../controller/customerController")

//home
router.get("/", customerController.homepage)
router.get("/about", customerController.about)


router.get("/add", customerController.addCostumer)
router.post("/add", customerController.postCostumer)

router.get("/view/:id", customerController.viewCustomer)

router.get("/edit/:id", customerController.edit)
router.put("/edit/:id", customerController.editpost)
router.delete("/edit/:id", customerController.deleteCustomer)

router.post("/search", customerController.searchCustomer)
module.exports = router