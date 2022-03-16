const catchAsync = require('../../utils/catchAsync')
const RouteModel = require('../../models/RouteModel/routeModel')
const UserModel = require('../../models/UserModel/userModel')
const OrderModel = require('../../models/OrderModel/orderModel')
const GeoModel = require('../../models/GeoModel/geoModel')
const mongoose = require('mongoose');
const shop = require('../../models/ShopModel/shopModel')

exports.createroute = catchAsync(async (req, res, next) => {
    const route = await RouteModel.create({
        name: req.body.name,
        routeCode: req.body.routeCode,
        geo: req.body.geo,
        org: req.body.org,
        users: req.body.users,
        shops: req.body.shops,
        availableDay: req.body.availableDay,
    });
    
    const georoutes = await GeoModel.findOneAndUpdate({ _id: req.body.geo}, {
        $push: {
            routes: route._id
        },
       
    }, {
        new: true,
    })
    
    res.status(200).json({
        status: 'success',
        route
    })
})

exports.getallroute = catchAsync(async (req, res, next) => {
    const route = await RouteModel.find().populate({path:'geo'}).populate({path:'shops',populate:{path:'route',populate:{path:'geo'}}})
    res.status(200).json({
        status: 'success',
        route
    })
})

exports.getallorgroute = catchAsync(async (req, res, next) => {
    const {orgid} = req.params;

    const route = await RouteModel.find({
        org: orgid
    }).populate({path:'geo',populate: {path:'teritori area region' }}).lean()

   
    res.status(200).json({
        status: 'success',
        length: route.length,
        route,
    })
})

exports.getRouteGeo = catchAsync(async (req, res, next) => {
    const userId = req.user._id
    const {geoId} = req.params;
    // console.log(userId)
    const route = await RouteModel.find({geo:geoId})
    res.status(200).json({
        status: 'success',
        route
    })
})


exports.getUserRoute = catchAsync(async (req, res, next) => {
    const userId = req.user._id
    // console.log(userId)
    const route = await RouteModel.find({'users':userId}).populate({path:'geo'}).
    populate({path:'shops',populate:{path:'route',populate:{path:'geo'}}})
    res.status(200).json({
        status: 'success',
        route
    })
})

exports.getallusersroute = catchAsync(async (req, res, next) => {
    const {userid} = req.params
    
    const userroute = await UserModel.findOne({_id: userid})
                .populate('route').populate({path:'route', populate:{path:'geo'}});
    
    let {route} = userroute;
    
        res.status(200).json({
            status: 'success',
            route
        })
    
    
})


exports.getDpRoute = catchAsync(async (req, res, next) => {
    const userId = req.user.org
    const {routeId} = req.params;
    const user = await UserModel.find({'route':routeId,'role':'DP',org:userId})
    res.status(200).json({
        status: 'success',
        user
    })
})

exports.getsingleroute = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const singleroute = await RouteModel.findOne({ _id: id })
    if (!singleroute) {
        res.status(200).json({
            status: 'success',
            message: 'route not found'
        })
    }
    res.status(200).json({
        status: 'success',
        singleroute
    })
})



exports.routessaleschart = catchAsync(async (req, res, next) => {

    const {routes} =  req.params;
    const Productsalesum = await OrderModel.aggregate([

        { $match: { route: mongoose.Types.ObjectId(routes) }},
        {
        $group: {
        _id:{
        month: { $month: '$createdAt' }},
        Totalsale: { $sum: { $convert: { input: '$grandTotal', to: 'double' } }},
        totalunit: {$sum : "$totalproducts"}
        }
        }])

        res.status(200).json({
            status: 'success',
            Productsalesum
        })

})


exports.totalorderfromroute = catchAsync(async (req, res, next) => {
    const {route} =  req.params;
    const Productsalesum = await OrderModel.aggregate([

        { $match: { route: mongoose.Types.ObjectId(route) }},
        {
        $group: {
        // _id:{

        

        // year: { $year: '$createdAt' }},
        _id: null,
        Totalsale: { $sum: { $convert: { input: '$grandTotal', to: 'double' } }},
        totalunit: {$sum : "$totalproducts"}
        }
        }])

        res.status(200).json({
            status: 'success',
            Productsalesum
        })
})

exports.bestsellingshop = catchAsync(async (req, res, next) => {


    const {route} =  req.params;
    const bestsellingshop =  await OrderModel.aggregate([
        { $match: { route: mongoose.Types.ObjectId(route) }},
        
        {
             "$group": {
                 "_id": "$shop",
                 "totalsale": 
                 { $sum: { $convert: { input: '$subTotal', to: 'double' } } },
                   
                // "totalamount": { $sum: { $convert: { input: '$orderProducts.total', to: 'double' } } },
                
                }
                    },
                      {
                          $sort: {totalsale: -1}
                      },{
                          $limit: 1
                      }
    ])
    const Productsalesum = await OrderModel.aggregate([

        { $match: { route: mongoose.Types.ObjectId(route) }},
        {
        $group: {
        _id: null,
        Totalsale: { $sum: { $convert: { input: '$grandTotal', to: 'double' } }},
        totalunit: {$sum : "$totalproducts"}
        }
        }])

    const singleroute = await RouteModel.findOne({ _id: route }).select('name')
    // console.log(singleroute);
    //     console.log(Productsalesum);
    // console.log(bestsellingshop);
    let shopname
    let shopdescription
    if(bestsellingshop.length === 0) {

        shopname = "no shop available"
        shopdescription = {
            shopname: shopname,
            totalsale:  0
        }
    }else{
        shopname = await shop.findOne({
            _id: bestsellingshop[0]._id
        })
        shopdescription = {
            shopname: shopname.name,
            totalsale:  bestsellingshop[0].totalsale
        }
    }

    
    // console.log(shopdescription);

 res.status(200).json({
    success: true,
    shopdescription,
    Productsalesum,
    singleroute
})
})


exports.allrouteshop = catchAsync(async (req, res, next) => {

    const {route} =  req.params;
    const allshop = await shop.find({
        route: route
    }).populate('route')

    const arg = [
        {
          '$match': {
            '$expr': {
              '$eq': [
                {
                  '$year': '$createdAt'
                }, 2022
              ]
            }, 
            'status': {
              '$ne': 'Pending'
            },
            route: mongoose.Types.ObjectId(route)
          }
        }, {
          '$group': {
            '_id': {
              'month': {
                '$month': '$createdAt'
              }
            }, 
            'amount': {
              '$sum': {
                '$convert': {
                  'input': '$grandTotal', 
                  'to': 'double'
                }
              }
            }, 
            'quantity': {
              '$sum': '$totalproducts'
            }
          }
        },
        {
            $sort: {"_id.month": 1}
        }
      ];
      const orderdata = await OrderModel.aggregate(arg);

    let amountdata = [];
    let unit = []
    let month = [];
    for(let i=0; i<orderdata.length; i++){
        if(orderdata[i]._id.month === 1){
            month.push('Jan')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 2){
            month.push('Feb')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 3){
            month.push('Mar')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 4){
            month.push('Apr')
            amountdata.push(orderdata[i].amount)
            unit.push(alloorderdatarder[i].quantity)
        }
        else if(orderdata[i]._id.month === 5){
            month.push('May')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 6){
            month.push('Jun')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 7){
            month.push('Jul')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }else if(orderdata[i]._id.month === 8){
            month.push('Aug')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }else if(orderdata[i]._id.month === 9){
            month.push('Sep')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 10){
            month.push('Oct')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }else if(orderdata[i]._id.month === 11){
            month.push('Nov')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)      
        }else if(orderdata[i]._id.month === 12){
            month.push('Dec')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)      
        }
    }


        res.status(200).json({
            status: 'success',
            length: allshop.length,
            allshop,
            amountdata,
            unit,
            month
        })

})



exports.storewisessaleschart = catchAsync(async (req, res, next) => {

    const {shop} =  req.params;
    const Productsalesum = await OrderModel.aggregate([

        { $match: { shop: mongoose.Types.ObjectId(shop) }},
        {
        $group: {
        _id:{
        month: { $month: '$createdAt' }},
        Totalsale: { $sum: { $convert: { input: '$grandTotal', to: 'double' } }},
        totalunit: {$sum : "$totalproducts"}
        }
        }])

        res.status(200).json({
            status: 'success',
            Productsalesum
        })

})


exports.yearlydata = catchAsync(async (req, res, next) => {
    const {route} = req.params;
    const arg = [
        {
          '$match': {
            '$expr': {
              '$eq': [
                {
                  '$year': '$createdAt'
                }, 2022
              ]
            }, 
            'status': {
              '$ne': 'Pending'
            },
            route: mongoose.Types.ObjectId(route)
          }
        }, {
          '$group': {
            '_id': {
              'month': {
                '$month': '$createdAt'
              }
            }, 
            'amount': {
              '$sum': {
                '$convert': {
                  'input': '$grandTotal', 
                  'to': 'double'
                }
              }
            }, 
            'quantity': {
              '$sum': '$totalproducts'
            }
          }
        },
        {
            $sort: {"_id.month": 1}
        }
      ];
      const orderdata = await OrderModel.aggregate(arg);

    let amountdata = [];
    let unit = []
    let month = [];
    for(let i=0; i<orderdata.length; i++){
        if(orderdata[i]._id.month === 1){
            month.push('Jan')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 2){
            month.push('Feb')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 3){
            month.push('Mar')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 4){
            month.push('Apr')
            amountdata.push(orderdata[i].amount)
            unit.push(alloorderdatarder[i].quantity)
        }
        else if(orderdata[i]._id.month === 5){
            month.push('May')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 6){
            month.push('Jun')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 7){
            month.push('Jul')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }else if(orderdata[i]._id.month === 8){
            month.push('Aug')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }else if(orderdata[i]._id.month === 9){
            month.push('Sep')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }
        else if(orderdata[i]._id.month === 10){
            month.push('Oct')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)
        }else if(orderdata[i]._id.month === 11){
            month.push('Nov')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)      
        }else if(orderdata[i]._id.month === 12){
            month.push('Dec')
            amountdata.push(orderdata[i].amount)
            unit.push(orderdata[i].quantity)      
        }
    }

      res.status(200).json({
        status: 'success',
        amountdata,
        unit,
        month
    })
})



exports.updateroute = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const updatesingleroute = await RouteModel.updateOne({ _id: id }, req.body, { new: true })
    if (!updatesingleroute) {
        res.status(200).json({
            status: 'success',
            message: 'route not found'
        })
    }
    res.status(200).json({
        status: 'success',
        updatesingleroute
    })
})

exports.deleteroute = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const deletesingleroute = await RouteModel.deleteOne({ _id: id })
    if (!deletesingleroute) {
        res.status(200).json({
            status: 'success',
            message: 'route not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'route Deleted'
    })
})


exports.routepaginandsearch  = catchAsync(async (req, res, next) => {

    let {currentpage, orgid, routename} = req.query;

    const limitValue =  15;
    // const {orgid} = req.params;
    const skipValue = parseInt(currentpage) || 0;
    let routes;
    let number;
    let pagenumber;
    // console.log(routename)
    if(routename === undefined){
        // console.log(routename)
        routename = "";
        // console.log(routename.length)
    }
    if(routename.length > 0 ){
        routes= await RouteModel.find({
            org: orgid,
            name: {$regex: routename, $options: '$i'}
        })
        // .
        // limit(limitValue * 1).
        // skip((skipValue - 1) * limitValue)
        // .sort({ createdAt: 'desc'});
        pagenumber = 1;
        
    }else{
        routes = await 
        RouteModel.find({
            org: orgid
        }).
        limit(limitValue * 1).
        skip((skipValue - 1) * limitValue)
        .sort({ createdAt: 'desc'});
        number = await RouteModel.aggregate([
            {
              '$group': {
                '_id': null, 
                'total': {
                  '$sum': 1
                }
              }
            }, {
              '$project': {
                'pagenumber': {
                  '$divide': [
                    '$total', 15
                  ]
                }
              }
            }
          ]);
        if(number.length === 0){
            pagenumber = 1;
        }else{
            pagenumber = Math.ceil(number[0].pagenumber);
        }
    }

    
        // console.log(routes);
        

    res.status(200).json({
        status: 'success',
        routes,
        pagenumber
    })

})


exports.removesetroute = catchAsync(async (req, res, next) => {
    const { userid, routeid } = req.params;

    const removeroute = await UserModel.findOneAndUpdate({
        _id: userid,
    },{
        $pull: { route:  routeid}
    },
    {
      multi: true
    })
    // console.log(removeroute)
    const removeuser = await RouteModel.findOneAndUpdate({
        _id: routeid,
    },{
        $pull: { users:  userid}
    },
    {
      multi: true
    })
    // console.log(removeuser)
    res.status(200).json({
        status: 'success',
        removeroute,
        removeuser
    })

//     const users = await RouteModel.findOneAndUpdate(
//       { _id: routeid },
//       {
//         $pull: { users:  userid}
//     },
//     {
//       multi: true
//     }
//     );
  
//     const productdelete = await Store.update(
//     { _id: storeid },
//     {
//       $pull: { inventory: { product: productId } }
//     },
//     {
//       multi: true
//     }
//   );
  
//       console.log(req.body.routes);
//     req.body.routes.map(async val => {
//         return await Route.findOneAndUpdate(
//           { _id: val },
//           {
//             $addToSet: { users: userid }
//           },
//           { new: true }
//         );
//       })


})