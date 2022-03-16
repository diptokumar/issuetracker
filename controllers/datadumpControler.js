const XLSX = require('xlsx');
const { upload } = require('./../middleware/multer');
const Areamodel = require('../models/GeoModel/areaModel');
const Regionmodel = require('../models/GeoModel/regionModel');
const Territorymodel = require('../models/GeoModel/teritoriesModel');
const mongoose = require('mongoose');
const geocreate = require('../models/GeoModel/geoModel');
const Routecreate = require('../models/RouteModel/routeModel');
const Officecreate = require('../models/Officemodel/officeModel');
const InventoryModel = require('../models/InventoryModel/inventoryModel')
const userModel = require('../models/UserModel/userModel');
const pjp = require('../models/PjpModel/pjpModel')
const targetmodel = require('../models/TargetModel/targetModel')


exports.excelarea = async (req, res, next) => {
    upload(req, res, function(err) {
      if (err) {
        res.json({ error_code: 1, err_desc: err });
        return;
      }
      /** Multer gives us file info in req.file object */
      if (!req.file) {
        res.json({ error_code: 1, err_desc: 'No file passed' });
        return;
      }
  
      // console.log(req.file.path);
      try {
        const workbook = XLSX.readFile(req.file.path);
        const sheet_name_list = workbook.SheetNames;
        // console.log(sheet_name_list); // getting as Sheet1
  
        sheet_name_list.forEach(async function(y) {
          const worksheet = workbook.Sheets[y];
          const data = XLSX.utils.sheet_to_json(worksheet);
          // console.log(data);
  
          // data.map(async val => {
          //   const userId = await user.findOne({ employeeId: val.employeeId });
          //   const storeId = await store.findOne({
          //     storedmscode: val.storedmscode
          //   });
          //   const storeuserupdate = await store.updateOne(
          //     {
          //       storedmscode: val.storedmscode
          //     },
          //     {
          //       $addToSet: {
          //         users: userId._id
          //       }
          //     },
          //     {
          //       new: true
          //     }
          //   );
          //   return await user.updateOne(
          //     { employeeId: val.employeeId },
          //     {
          //       $set: {
          //         'stores.store': storeId._id
          //       }
          //     },
          //     { new: true }
          //   );
          // });
          let org = "618cc7528f01e300094e5ba8";
          // data.map(async (el)=> {
          //   let regionid = await Regionmodel.findOne({name: el.RegionName});
          //   let obj = {};
          //   obj.name= el.area;
          //   obj.region = regionid._id;
          //   obj.org = mongoose.Types.ObjectId(org)
          //   console.log(obj);
          //   area = await Areamodel.create(obj);

          // })
          // for(let i=0; i<data.length; i++){
          //   console.log(data[i]);
          // let regionid = await Regionmodel.findOne({name: data[i].RegionName});
          //   let obj = {};
          //   obj.name= data[i].area;
          //   obj.region = regionid._id;
          //   obj.org = mongoose.Types.ObjectId(org)
          //   console.log(obj);
          //   // area = await Areamodel.create(obj);
          //   // console.log(area);

          // }

          // for(let i = 0; i <data.length; i++) {
          //   const areaid = await Areamodel.findOne({
          //     name: data[i].area
          //   })
          //   // console.log(areaid);
          //   let obj = {};
           
          //   obj.name = data[i].teritory
          //   obj.org = mongoose.Types.ObjectId(org)
          //   obj.area = areaid._id;
          //   console.log(obj);
          //   await Territorymodel.create(obj)
          // }


          // data.map(async el => {
          //   // let obj = {};
          //   // const 
          //   // obj.name = el.name;
          //   // obj.org = mongoose.Types.ObjectId(org);
          //   // obj.role = el.role;
          //   // obj.employeeId = areaid.employeeId
          //   // obj.DistributionCode = regionid._id
          //   // obj.teritori =territoryid._id
          //   // obj.org = mongoose.Types.ObjectId(org)

          //   //  let routes = [];

          //   // for (const property in el) {
          //   //   console.log(`${property}: ${object[property]}`);
          //   //   if(property.startsWith('routeCodes')){
          //   //     console.log('heheehhe')
          //   //     routes.push(property)
          //   //   }
          //   //   // routes.push()
          //   // }


          //   const office = await Officecreate.findOne({distributioncode: el.DistributionCode})
          //   // console.log(office)

          //   const linemanager = await userModel.findOne({
          //     employeeId: el.ssid
          //   })

          //   const obj = {
          //     name: el.name,
          //     email: el.email,
          //     role: el.role,
          //     org: mongoose.Types.ObjectId(org), 
          //     employeeId: el.employeeId,
          //     phoneNumber: el.phoneNumber,
          //     linemanager: linemanager._id,
          //     office: office._id,
          //     password: el.password,
          //     passwordConfirm: el.password
          //   }
          //   console.log(obj)
          //   const user = await userModel.create({
          //     name: el.name,
          //     email: el.email,
          //     role: el.role,
          //     org: mongoose.Types.ObjectId(org), 
          //     employeeId: el.employeeId,
          //     phoneNumber: el.phoneNumber,
          //     linemanager: linemanager._id,
          //     office: office._id,
          //     password: el.password,
          //     passwordConfirm: el.password
          //   })
          //   console.log(user);
            
          // })


          // let count = 60;
          // for(let i = 0; i < data.length; i++){
          //   count++;
          //   const office = await Officecreate.findOne({distributioncode: data[i].DistributionCode})
          //   // console.log(office)
          //   let routeid1
          //   let routeid2
          //   let routeid3
          //   let routeid4
          //   let routeid5
          //   let routeid6
          //   for(let j = 0; j < 1;j++){
              
          //      routeid1 = await Routecreate.findOne({
          //       routeCode: data[i].routecode1
          //     });
          //     console.log(routeid1)
          //      routeid2 = await Routecreate.findOne({
          //       routeCode: data[i].routecode2
          //     });
          //     console.log(routeid2)
          //      routeid3 = await Routecreate.findOne({
          //       routeCode: data[i].routecode3
          //     });
          //     console.log(routeid3)
          //      routeid4 = await Routecreate.findOne({
          //       routeCode: data[i].routecode4
          //     });
          //     console.log(routeid4)
          //      routeid5 = await Routecreate.findOne({
          //       routeCode: data[i].routecode5
          //     });
          //     console.log(routeid5)
          //      routeid6 = await Routecreate.findOne({
          //       routeCode: data[i].routecode6
          //     });
          //     console.log(routeid6)
          //   }
          //   console.log(routeid1._id,routeid2._id,routeid3._id,routeid4._id,routeid5._id,routeid6._id)
            
          //   const linemanager = await userModel.findOne({
          //     employeeId: data[i].ssid
          //   })
          //   let email = `hellooi${count}@gmail.com`
          //   //  console.log(outeid1)
          //   let test = [routeid1._id,routeid2._id,routeid3._id,routeid4._id,routeid5._id,routeid6._id]
          //   // console.log(test);
          //   const obj = {
          //     name: data[i].name,
          //     email: email,
          //     role: "SR",
          //     org: mongoose.Types.ObjectId(org), 
          //     employeeId: data[i].employeeId,
          //     phoneNumber: data[i].phoneNumber,
          //     linemanager: linemanager._id,
          //     route: test,
          //     office: office._id,
          //     password: "12345678",
          //     passwordConfirm:"12345678"
            
          //   }
          //   // console.log(obj)
            
            
          //   const user = await userModel.create({
          //     name: data[i].name,
          //     email: email,
          //     role: "SR",
          //     org: mongoose.Types.ObjectId(org), 
          //     employeeId: data[i].employeeId,
          //     phoneNumber: data[i].phoneNumber,
          //     linemanager: linemanager._id,
          //     route: test,
          //     office: office._id,
          //     password: "12345678",
          //     passwordConfirm:"12345678"
          //   })
          //   for(let i = 0; i <test.length; i++){

          //     // let routefind = await Routecreate.findOne({
          //     //   _id: test[i]
          //     // })
          //    let routefind = await Routecreate.findOneAndUpdate(
          //       { _id: test[i] },
          //       {
          //         $push: { users: user._id }
          //         // $addToSet: { users: user._id }
          //       },
          //       { new: true }
          //     );
              
          //     // console.log(routefind);
          //   }
          //   console.log(user)
            
          
          // }
            

          // for(let i = 0; i <data.length; i++){
          // let regionid = await Regionmodel.findOne({name: data[i].RegionName});
          // console.log(regionid)
          //   let areaid = await Areamodel.findOne({name: data[i].AreaName});
          //   console.log(areaid, "areaid")
          //   let territoryid = await Territorymodel.findOne({name: data[i].TerritoryName})
          //   console.log(territoryid, "territoryid")
          //   let obj = {};

          //   obj.name = data[i].GeoName;
          //   obj.org = org;
          //   obj.geocode = data[i].geocode
          //   obj.area = areaid._id
          //   obj.region = regionid._id
          //   obj.teritori =territoryid._id
          //   obj.org = mongoose.Types.ObjectId(org)
            
          //   let object = await geocreate.create(obj);
          //   console.log(object);
          // }
          // data.map(async (el) => {

          //   let regionid = await Regionmodel.findOne({name: el.RegionName});
           
          //   let areaid = await Areamodel.findOne({name: el.AreaName});
          //   let territoryid = await Territorymodel.findOne({name: el.TerritoryName})
          //   let obj = {};

          //   obj.name = el.GeoName;
          //   obj.org = org;
          //   obj.geocode = el.geocode
          //   obj.area = areaid._id
          //   obj.region = regionid._id
          //   obj.teritori =territoryid._id
          //   obj.org = mongoose.Types.ObjectId(org)
          //   console.log(obj);
          //   await geocreate.create(obj);
          // })
        //   data.map(async (el) => {
        //     const geo = await geocreate.findOne({geocode: el.geocode})
        //    const obj =  {
        //       name: el.routename,
        //       // distributioncode: el.distributioncode,
        //       geo: geo._id,
        //       org: mongoose.Types.ObjectId(org),
        //       users: [],
        //       shops: [],
        //       routeCode: el.routecode,
        //       availableDay: ['Sat','Sun',
        //       'Mon','Tue','Wed',
        //       'Thurs','Fri'],
        //   }
        //   console.log(obj)
        //     // const geo = await geocreate.findOne({geocode: el.geoCode})
        //   const route = await Routecreate.create(obj);
          
        //   const georoutes = await geocreate.findOneAndUpdate({ _id: geo._id}, {
        //       $push: {
        //         routes: route._id
        //       },
             
        //   }, {
        //       new: true,
        //   })
        // });

        // for(let i = 0; i <data.length; i++){
        //    const geo = await geocreate.findOne({geocode: data[i].geocode})
        //    const obj =  {
        //       name: data[i].routename,
        //       // distributioncode: el.distributioncode,
        //       geo: geo._id,
        //       org: mongoose.Types.ObjectId(org),
        //       users: [],
        //       shops: [],
        //       routeCode: data[i].routecode,
        //       availableDay: ['Sat','Sun',
        //       'Mon','Tue','Wed',
        //       'Thurs','Fri'],
        //   }
        //   console.log(obj)
        //   // const geo = await geocreate.findOne({geocode: el.geoCode})
        //   const route = await Routecreate.create(obj);
          
        //   const georoutes = await geocreate.findOneAndUpdate({ _id: geo._id}, {
        //       $push: {
        //         routes: route._id
        //       },
             
        //   }, {
        //       new: true,
        //   })
        // }

      //   for(let i=0; i<data.length; i++){
      
      //     const geo = await geocreate.findOne({geocode: data[i].geocode})
      //     // console.log(geo);
      //     // const teritori = await Territorymodel.findOne({geocode: el.Geo})
      //    const obj =  {
      //     name: data[i].name,
      //     // lat: el.lat,
      //     // lon: el.lon,
      //     // address: el.address,
      //     distributioncode: data[i].DistributionCode,
      //     teritori: geo.teritori,
      //     region: geo.region,
      //     area: geo.area,
      //     org: mongoose.Types.ObjectId(org),
      //     geo: geo._id,
      //     startTime: "09:30",
      //     offTime: "10:30",
          
      //     workingDay: [
      //       {
      //         monthName: "January",
      //         days: 26
      //       },
      //       {
      //         monthName: "February",
      //         days: 26
      //       },
      //       {
      //         monthName: "March",
      //         days: 26
      //       },
      //       {
      //         monthName: "April",
      //         days: 26
      //       },
      //       {
      //         monthName: "May",
      //         days: 26
      //       },
      //       {
      //         monthName: "June",
      //         days: 26
      //       },
      //       {
      //         monthName: "July",
      //         days: 26
      //       },
      //       {
      //         monthName: "August",
      //         days: 26
      //       },
      //       {
      //         monthName: "September",
      //         days: 26
      //       },
      //       {
      //         monthName: "October",
      //         days: 26
      //       },
      //       {
      //         monthName: "November",
      //         days: 26
      //       },
      //       {
      //         monthName: "December",
      //         days: 26
      //       }
      //     ]
      //     // users: [],
      //     // shops: [],
      //     // availableDay: ['Sat','Sun',
      //     //   'Mon','Tue','Wed',
      //     //   'Thurs','Fri'],
      //   }
      //   console.log(obj)
      //   const office = await Officecreate.create({
      //     name: data[i].name,
      //     // lat: el.lat,
      //     // lon: el.lon,
      //     // address: el.address,
      //     distributioncode: data[i].DistributionCode,
      //     teritori: geo.teritori,
      //     region: geo.region,
      //     area: geo.area,
      //     org: mongoose.Types.ObjectId(org),
      //     geo: geo._id,
      //     startTime: "09:30",
      //     offTime: "10:30",
          
      //     workingDay: [
      //       {
      //         monthName: "January",
      //         days: 26
      //       },
      //       {
      //         monthName: "February",
      //         days: 26
      //       },
      //       {
      //         monthName: "March",
      //         days: 26
      //       },
      //       {
      //         monthName: "April",
      //         days: 26
      //       },
      //       {
      //         monthName: "May",
      //         days: 26
      //       },
      //       {
      //         monthName: "June",
      //         days: 26
      //       },
      //       {
      //         monthName: "July",
      //         days: 26
      //       },
      //       {
      //         monthName: "August",
      //         days: 26
      //       },
      //       {
      //         monthName: "September",
      //         days: 26
      //       },
      //       {
      //         monthName: "October",
      //         days: 26
      //       },
      //       {
      //         monthName: "November",
      //         days: 26
      //       },
      //       {
      //         monthName: "December",
      //         days: 26
      //       }
      //     ]
      //   })

      //    await InventoryModel.create({
      //     office: office._id,
      //     org: mongoose.Types.ObjectId(org),
      //     product: []
      // });
    
      //   }
    //     data.map(async (el) => {
    //       console.log(el);
    //       const geo = await geocreate.findOne({geocode: el.geocode})
    //       console.log(geo);
    //       // const teritori = await Territorymodel.findOne({geocode: el.Geo})
    //      const obj =  {
    //       name: el.name,
    //       lat: el.lat,
    //       lon: el.lon,
    //       // address: el.address,
    //       distributioncode: el.DistributionCode,
    //       teritori: geo.teritori,
    //       region: geo.region,
    //       area: geo.area,
    //       org: mongoose.Types.ObjectId(org),
    //       geo: geo._id,
    //       startTime: "08 : 00 AM",
    //       offTime: "09 : 00 PM",
          
    //       workingDay: [
    //         {
    //           monthName: "January",
    //           days: 26
    //         },
    //         {
    //           monthName: "February",
    //           days: 26
    //         },
    //         {
    //           monthName: "March",
    //           days: 26
    //         },
    //         {
    //           monthName: "April",
    //           days: 26
    //         },
    //         {
    //           monthName: "May",
    //           days: 26
    //         },
    //         {
    //           monthName: "June",
    //           days: 26
    //         },
    //         {
    //           monthName: "July",
    //           days: 26
    //         },
    //         {
    //           monthName: "August",
    //           days: 26
    //         },
    //         {
    //           monthName: "September",
    //           days: 26
    //         },
    //         {
    //           monthName: "October",
    //           days: 26
    //         },
    //         {
    //           monthName: "November",
    //           days: 26
    //         },
    //         {
    //           monthName: "December",
    //           days: 26
    //         }
    //       ]
    //       // users: [],
    //       // shops: [],
    //       // availableDay: ['Sat','Sun',
    //       //   'Mon','Tue','Wed',
    //       //   'Thurs','Fri'],
    //     }
    //     console.log(obj)
    //     const office = await Officecreate.create({
    //       name: el.name,
    //       lat: el.lat,
    //       lon: el.lon,
    //       distributioncode: el.DistributionCode,
    //       teritori: geo.teritori,
    //       region: geo.region,
    //       area: geo.area,
    //       org: mongoose.Types.ObjectId(org),
    //       geo: geo._id,
    //       startTime: "08 : 00 AM",
    //       offTime: "09 : 00 PM",
    //       workingDay: [
    //         {
    //           monthName: "January",
    //           days: 26
    //         },
    //         {
    //           monthName: "February",
    //           days: 26
    //         },
    //         {
    //           monthName: "March",
    //           days: 26
    //         },
    //         {
    //           monthName: "April",
    //           days: 26
    //         },
    //         {
    //           monthName: "May",
    //           days: 26
    //         },
    //         {
    //           monthName: "June",
    //           days: 26
    //         },
    //         {
    //           monthName: "July",
    //           days: 26
    //         },
    //         {
    //           monthName: "August",
    //           days: 26
    //         },
    //         {
    //           monthName: "September",
    //           days: 26
    //         },
    //         {
    //           monthName: "October",
    //           days: 26
    //         },
    //         {
    //           monthName: "November",
    //           days: 26
    //         },
    //         {
    //           monthName: "December",
    //           days: 26
    //         }
    //       ]
    //     })

    //      await InventoryModel.create({
    //       office: office._id,
    //       org: mongoose.Types.ObjectId(org),
    //       product: []
    //   });
    // });
      //   const checkinventory = await InventoryModel.findOne({
      //     office: office._id
      // });
      // console.log(checkinventory);
      // if(!checkinventory){
      //     console.log(checkinventory);
          
      //     const geo = await geocreate.findOne({geocode: el.geoCode})
      //     const route = await Routecreate.create(obj);
        
      //   const georoutes = await geocreate.findOneAndUpdate({ _id: req.body.geo}, {
      //       $push: {
      //           routes: route._id
      //       },
           
      //   }, {
      //       new: true,
      //   })
      
          // RegionName
          // data.map(async (el)=>{
            
          //   let obj = {};
          //   obj.name = el.RegionName
            
          //   await Regionmodel.create({
          //     name: el.RegionName,
          //     org: mongoose.Types.ObjectId(org)
          //   })

            
          // })
          // let reg = "61f949f1ef608f50f689ab36";
          // for(let i = 0; i <data.length; i++) {
          //   const areaid = await Areamodel.findOne({
          //     name: data[i].area
          //   })
          //   // console.log(areaid);
          //   let obj = {};
           
          //   obj.name = data[i].teritory
          //   obj.org = mongoose.Types.ObjectId(org)
          //   obj.area = areaid._id;
          //   console.log(obj);
          //   await Territorymodel.create(obj)
          // }
          // data.map(async (el)=>{
          //   const areaid = await Areamodel.findOne({
          //     name: el.area
          //   })
          //   // console.log(areaid);
          //   let obj = {};
           
          //   obj.name = el.teritory
          //   obj.org = mongoose.Types.ObjectId(org)
          //   obj.area = areaid._id;
          //   console.log(obj);
          //   // await Territorymodel.create(obj)

          // })


          // for(let i = 0; i <data.length; i++){
          //   const user = await userModel.findOne({
          //     employeeId: data[i].employeeId
          //   })
          //   const route= await Routecreate.findOne({
          //     routeCode: data[i].Route
          //   })
          //   let obj = {
          //     route: route._id,
          //     user: user._id,
          //     org: mongoose.Types.ObjectId(org),
          //     isShop: false,
          //     isRoute: true,
          //     day: [data[i].Day],
          //     linemanager: user.linemanager,
          //     month: '02-2022'
          //   }
            
          //   const current = await pjp.create(obj);

          //   console.log(current)
          // }

          // data.map(async el => {


          //   const user = await userModel.findOne({
          //     employeeId: el.SO
          //   })
          //   const route= await Routecreate.findOne({
          //     routeCode: el.routecode
          //   })
          //   let obj = {
          //     route: route._id,
          //     user: user._id,
          //     org: mongoose.Types.ObjectId(org),
          //     isShop: false,
          //     isRoute: true,
          //     day: [el.Day],
          //     linemanager: user.linemanager,
          //     month: '02-2022'
          //   }
            
          //   const current = await pjp.create(obj);

          //   console.log(current)

          // })


          // data.map(async el => {
          //   const user = await userModel.findOne({
          //     employeeId: el.employeeId
          //   })
          //   // console.log(user)
          //   // const route= await Routecreate.findOne({
          //   //   routeCode: el.route
          //   // })
          //   let obj = {
          //     office: user.office,
          //     linemanager:user.linemanager,
          //     achiveTarget: 0,
          //     user: user._id,
          //     org: mongoose.Types.ObjectId(org),
          //     actualTarget: el.usertarget,
          //     username: user.name,
          //     month: '02-2022'
          //   }
            
          //    const current = await targetmodel.create(obj);

          //   console.log(current)

          // })

          for(let i = 0; i <data.length; i++){
            const user = await userModel.findOne({
              employeeId: data[i].employeeId
            })
          
            let obj = {
              office: user.office,
              linemanager:user.linemanager,
              achiveTarget: 0,
              user: user._id,
              org: mongoose.Types.ObjectId(org),
              actualTarget: data[i].Target,
              username: user.name,
              month: '02-2022'
            }
            
             const current = await targetmodel.create(obj);

            // console.log(current)
          }

          // data.map(async (el) => {
          //   const userdetails = await userModel.findOne({ employeeId: el.employeeId});
          //   const routeid1 = await Routecreate.findOne({
          //     routecode: el.routecode1
          //   });
          //   const routeid2 = await Routecreate.findOne({
          //     routecode: el.routecode2
          //   });
          //   const routeid3 = await Routecreate.findOne({
          //     routecode: el.routecode3
          //   });
          //   const routeid4 = await Routecreate.findOne({
          //     routecode: el.routecode4
          //   });
          //   const routeid5 = await Routecreate.findOne({
          //     routecode: el.routecode5
          //   });
          //   const routeid6 = await Routecreate.findOne({
          //     routecode: el.routecode6
          //   });
          // })


          //   // let regionid = await Regionmodel.findOne({name: el.RegionName});
           
          //   // let areaid = await Areamodel.findOne({name: el.Area});
          //   // let territoryid = await Territorymodel.findOne({name: el.TerritoryName})
          //   // let obj = {};

          //   // obj.name = el.GeoName;
          //   // obj.org = org;
          //   // obj.geocode = el.geocode
          //   // obj.area = areaid._id
          //   // obj.region = regionid._id
          //   // obj.teritori =territoryid._id
          //   // obj.org = mongoose.Types.ObjectId(org)
          //   // console.log(obj);
          //   // await geocreate.create(obj);
          // })

          // for(let i=0; i<data.length; i++){
          //   // console.log(data[i]);
          //   let regionid = await Regionmodel.findOne({name: data[i].RegionName});
           
          //   let areaid = await Areamodel.findOne({name: data[i].Area});
          //   let territoryid = await Territorymodel.findOne({name: data[i].TerritoryName})
          //   let obj = {};

          //   obj.name = data[i].GeoName;
          //   obj.org = org;
          //   obj.geocode = data[i].geocode
          //   obj.area = areaid._id
          //   obj.region = regionid._id
          //   obj.teritori =territoryid._id
          //   obj.org = mongoose.Types.ObjectId(org)
          //   // console.log(obj);
          //   await geocreate.create(obj);
          // }


          // const users = await Areamodel.create(data);
          //length: pjp.length, data: pjp
          res.json({ success: 'success', 
          // length: users.length, data: users 
        });
        });
      } catch (e) {
        res.json({ error_code: 1, err_desc: 'Corupted excel file' });
      }
    });
  };
  


exports.excelterittory = async (req, res, next) => {
    upload(req, res, function(err) {
      if (err) {
        res.json({ error_code: 1, err_desc: err });
        return;
      }
      /** Multer gives us file info in req.file object */
      if (!req.file) {
        res.json({ error_code: 1, err_desc: 'No file passed' });
        return;
      }
  
      // console.log(req.file.path);
      try {
        const workbook = XLSX.readFile(req.file.path);
        const sheet_name_list = workbook.SheetNames;
        // console.log(sheet_name_list); // getting as Sheet1
  
        sheet_name_list.forEach(async function(y) {
          const worksheet = workbook.Sheets[y];
          const data = XLSX.utils.sheet_to_json(worksheet);
          // console.log(data);
  
          /*data.map(async val => {
            const userId = await user.findOne({ employeeId: val.employeeId });
            const storeId = await store.findOne({
              storedmscode: val.storedmscode
            });
            const storeuserupdate = await store.updateOne(
              {
                storedmscode: val.storedmscode
              },
              {
                $addToSet: {
                  users: userId._id
                }
              },
              {
                new: true
              }
            );
            return await user.updateOne(
              { employeeId: val.employeeId },
              {
                $set: {
                  'stores.store': storeId._id
                }
              },
              { new: true }
            );
          });*/
          let org = "618cc7528f01e300094e5ba8";
          data.map(async (el) => {
            let obj = {};
            obj.name = el.TeritorryName;
            obj.org = org;
            // console.log(obj);
            await Areamodel.create({
              name: el.name,
              org: mongoose.Types.ObjectId(org)
            });
          })
          const users = await user.create(data);
          //length: pjp.length, data: pjp
          res.json({ success: 'success', length: users.length, data: users });
        });
      } catch (e) {
        res.json({ error_code: 1, err_desc: 'Corupted excel file' });
      }
    });
  };