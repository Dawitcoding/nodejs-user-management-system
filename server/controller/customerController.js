const mongoose = require("mongoose")
const Customer = require("../models/Customer")
/**
 home route
 * **/

 exports.homepage = async (req, res) => {

    const messages = await req.consumeFlash('info');
    const messagess = await req.consumeFlash('danger');
    const locals = {
      title: 'NodeJs',
      description: 'Free NodeJs User Management System'
    }

    let perPage = 6;
    let page = req.query.page || 1;

    try {
      const customers = await Customer.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      const count = await Customer.count();

      res.render('index', {
        locals,
        customers,
        current: page,
        pages: Math.ceil(count / perPage),
        messages,
        messagess
      });

    } catch (error) {
      console.log(error);
    }

 }
// exports.homepage = async (req,res)=>{
    
//     const messages = await req.consumeFlash('info');
//     const locals = {
//         title:"Node-js",
//         description:"user managment system"
//     }

//     try {
//         const customers = await Customer.find({}).limit(22)
//         res.render('index', { locals, messages, customers } );
//     } catch (error) {
//         console.log(error)
//     }

    
// }


exports.about = async (req,res)=>{
    
  
    const locals = {
        title:"Node-js",
        description:"user managment system"
    }

    try {
      
        res.render('about', locals );
    } catch (error) {
        console.log(error)
    }

    
}





/**
 * add customer route
 * **/


exports.addCostumer = async (req,res)=>{ 

    

    const locals = {
        title:"add customer",
        description:"user managment system"
    }
    res.render("customer/add", locals)
}

/**
 * add customer route
 * / post
 * **/


exports.postCostumer = async (req,res)=>{

    console.log(req.body)

    const newCustomer = new Customer({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        details:req.body.details,
        tel:req.body.tel

    })

   try {
    await Customer.create(newCustomer)
    await req.flash("info", "New customer has been added.");

    res.redirect("/")
   } catch (error) {
    console.log(error)
   }
        
}


exports.viewCustomer = async (req, res) => {
   
    try {
        const customer = await Customer.findOne({ _id : req.params.id })

        const locals = {
            title:"view customer detail",
            description:"user managment system"
        }
        res.render("customer/view", {  locals, customer })

    } catch (error) {
        console.log(error)
    }

}


exports.edit = async (req, res) => {
   
    try {
        const customer = await Customer.findOne({ _id : req.params.id })

        const locals = {
            title:"edit customer detail",
            description:"user managment system"
        }
        res.render("customer/edit", {  locals, customer })

    } catch (error) {
        console.log(error)
    }

}

exports.editpost = async (req, res) => {
   
    try {
        await Customer.findByIdAndUpdate(req.params.id,{
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            tel:req.body.tel,
            email:req.body.email,
            details:req.body.details, 
            updatedAt: Date.now()
            
        })
        
        res.redirect(`/edit/${req.params.id}`)

    } catch (error) {
        console.log(error)
    }

}

exports.deleteCustomer = async (req, res) => {
   
    try {
        await Customer.deleteOne({ _id: req.params.id})
        await req.flash("danger", "user was deleted.");
            
        
        res.redirect('/')

    } catch (error) {
        console.log(error)
    }

}
   
    

exports.searchCustomer = async (req, res) => {
        
    const locals = {
        title: "Search Customer Data",
        description: "Free NodeJs User Management System",
    };
    
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    
        const customers = await Customer.find({
        $or: [
            { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
            { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        ]
        });
    
        res.render("search", {
        customers,
        locals
        })
        
    } catch (error) {
        console.log(error);
    }
    
} 
  


   