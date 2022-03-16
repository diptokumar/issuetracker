const catchAsync = require('../../utils/catchAsync')
const AttendanceModel = require('../../models/AttendanceModel/attandanceModel')
// const OfficeModel = require('../../models/Officemodel/officeModel')
const moment = require('moment');
const User = require('../../models/UserModel/userModel')
// const _ = require('loadash')

 //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
 function calcCrow(lat1, lon1, lat2, lon2) 
 {
    // let radiusmillion =  6371000;
   var R = 6371000; // m
   var dLat = toRad(lat2-lat1);
   var dLon = toRad(lon2-lon1);
   var lat1 = toRad(lat1);
   var lat2 = toRad(lat2);

   var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
     Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
   var d = R * c;
   return d;
 }

 // Converts numeric degrees to radians
 function toRad(Value) 
 {
     return Value * Math.PI / 180;
 }



exports.createAttendance = catchAsync(async (req, res, next) => {
    
    var userid=req.user._id;

    const month = moment().format('MM-yy');
    const date = moment().format('DD-MM-yy');
    const time = moment().format('LT');
    let attendance;

    const attendancecheck = await AttendanceModel.findOne({
        userId:userid,
        dateid:date
    });

    // console.log(attendancecheck);
    if(attendancecheck === null) {
         attendance = await AttendanceModel.create({
            userId:userid,
            // org:userOrg,
            address:req.body.address,
            area: req.user.area,
            region: req.user.region,
            teritori: req.user.teritori,
            lat:req.body.lat,
            lon:req.body.lon,
            role:req.user.role,
            linemanager: req.user.linemanager,
            dateid:date,
            month:month,
            photo:req.file.key,
            intime:time,
            // distanceinmeter: distanceinmeter,
            // office:userOffice,
            isLate:req.body.isLate,
            remarks:req.body.remarks,
        });
    }

    
    res.status(201).json({
        status: 'success',
        attendance
    })
})


exports.dayclose = catchAsync(async (req, res, next) => {
    
    let userid=req.user._id;

    const time = moment().format('LT');
    const date = moment().format('DD-MM-yy');

    let todaycheckAttandace = await AttendanceModel.findOne({
        userId: userid,
        dateid: date
    })
    if(todaycheckAttandace === null || todaycheckAttandace === undefined) {
        res.status(200).json({
            status: 'error',
            message: 'Today Attendance Not Given',
        })
    }else{
        const dayclose = await AttendanceModel.findOneAndUpdate({
            userId: userid,
            dateid: date
        },
        {
            dayOff: {
                outTime: time,
                remarks: req.body.remarks,
                lat: req.body.lat,
                lon: req.body.lon,
                address: req.body.address
            }
        }) 
        res.status(200).json({
            status: 'success',
            message: 'Today dayclose Given',
        })
    }

    


})

exports.daycloseCheck = catchAsync(async (req, res, next) => {
    let userid=req.user._id;
  

    const date = moment().format('DD-MM-yy');
  

    let todaycheckAttandace = await AttendanceModel.findOne({
        userId: userid,
        dateid: date
    });
    // console.log(todaycheckAttandace);
    if(todaycheckAttandace === null || todaycheckAttandace === undefined) {
        res.status(200).json({
            status: 'error',
            message: 'Today Attendance Not Given',
            dayclose: false
        })
    }else{
        if(todaycheckAttandace.dayOff.outTime === null){
            res.status(200).json({
                status: 'success',
                dayclose: false,
            })
        }else{
            res.status(200).json({
                status: 'success',
                dayclose: true,
            })
        }
    }
})


exports.getUserAttendance = catchAsync(async (req, res, next) => {
    var userid=req.user._id;
    const date = moment().format('DD-MM-yy');
    const attendance = await AttendanceModel.find({userId:userid}).sort('-createdAt')
    res.status(200).json({
        status: 'success',
        attendance
    })
})

exports.getMyAttendanceMonthly = catchAsync(async (req, res, next) => {
    var userid=req.user._id;
    const {month} = req.params;
    // const date = moment().format('DD-MM-');
    const attendance = await AttendanceModel.find({userId:userid, month: month}).select('intime dayOff photo isLate dateid').sort('-createdAt')
    res.status(200).json({
        status: 'success',
        length: attendance.length,
        attendance
    })
})




exports.checkAttandace = catchAsync(async (req, res, next) => {
    var userid=req.user._id;
    const date = moment().format('DD-MM-yy');
    const attendance = await AttendanceModel.find({userId:userid,dateid:date})
    res.status(200).json({
        status: 'success',
        attendance
    })
})

exports.checkAttandaceLate = catchAsync(async (req, res, next) => {
    // var {time}=req.params;
    // let timesave = "9:30"
    // var userid=req.user._id;
    // var userOffice=req.user.office;
    const timex = moment().format('LT');
    // const office = await OfficeModel.findOne({_id:userOffice})
    const officeTime="9:30";
    var beginningTime = moment(officeTime, 'h:mma');
    var endTime = moment(timex, 'h:mma');  
    var late=beginningTime.isBefore(endTime);
    res.status(200).json({
        status: 'success',
        late:late
    })
})

exports.getallAttendance = catchAsync(async (req, res, next) => {
    const attendance = await AttendanceModel.find()
    res.status(200).json({
        status: 'success',
        attendance
    })
})

exports.getallorgAttendance = catchAsync(async (req, res, next) => {
    const {orgid} = req.params;
    const Attendance = await AttendanceModel.find({
        org: orgid,
    })
    res.status(200).json({
        status: 'success',
        Attendance
    })
})

exports.getsingleAttendance = catchAsync(async (req, res, next) =>{
    const {id} = req.params
    const singleAttendance = await AttendanceModel.findOne({_id:id})
    if(!singleAttendance){
        res.status(200).json({
            status: 'success',
            message: 'Attendance not found'
        })
    }
    res.status(200).json({
        status: 'success',
        singleAttendance
    })
})

exports.updateAttendance = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const updatesingleAttendance = await AttendanceModel.updateOne({ _id: id },req.body , {new: true})
    if (!updatesingleAttendance) {
        res.status(200).json({
            status: 'success',
            message: 'Attendance not found'
        })
    }
    res.status(200).json({
        status: 'success',
        updatesingleAttendance
    })
})

exports.deleteAttendance = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const deletesingleAttendance = await AttendanceModel.deleteOne({ _id: id })
    if (!deletesingleAttendance) {
        res.status(200).json({
            status: 'success',
            message: 'area not found'
        })
    }
    res.status(200).json({
        status: 'success',
        message: 'Attendance Deleted'
    })
})


exports.srattendancegivennotgiven = catchAsync(async (req, res, next) => {

    let userId = req.user._id;
    const dateid = moment().format('DD-MM-YYYY');
    // const yesterday = moment().add(-1, 'days');
    // const previousdaydate = yesterday.format('DD-MM-YYYY');
    let alluserattenadance = [];
    const allusers = await User.find({
        linemanager: userId
    });
    let lngth = allusers.length;
    const todaygivenattandance = await AttendanceModel.find({
      dateid: dateid,
      linemanager: userId
    }).populate('userId')
    // console.log("today given",todaygivenattandance)
    for(let i=0;i<todaygivenattandance.length;i++){  
        let obj = {};
        obj._id = todaygivenattandance[i].userId._id;
        obj.attanadancecheck = true;
        obj.name = todaygivenattandance[i].userId.name;
        obj.employeeId= todaygivenattandance[i].userId.employeeId
        obj.phoneNumber = todaygivenattandance[i].userId.phoneNumber
        obj.image = todaygivenattandance[i].photo
        obj.intime = todaygivenattandance[i].intime
        // console.log(obj);
        alluserattenadance.push(obj)
}
// console.log(todaygivenattandance)
var ids = new Set(alluserattenadance.map(d => d.employeeId));
// console.log('idssss',ids);
var merged = [...alluserattenadance, ...allusers.filter(d => !ids.has(d.employeeId))];
// console.log(merged);

let objectarr = []
        merged.map(a => {
            let obj = {}
            // console.log('from array',a)
            if(!a.hasOwnProperty('attanadancecheck')){
                obj._id = a._id
                obj.attanadancecheck = false;
                obj.employeeId = a.employeeId;
                obj.name = a.name;
                obj.phoneNumber = a.phoneNumber;
                obj.image = a.image
                objectarr.push(obj)
            }else{
                objectarr.push(a)
            }
        })
    // if(todaygivenattandance.length === 0){
    //     for (let i = 0; i < allusers.length; i++) { 
    //               let obj = {};
    //               obj._id = allusers[i]._id;
    //               obj.attanadancecheck = false;
    //               obj.name = allusers[i].name;
    //               obj.employeeId= allusers[i].employeeId,
    //               obj.phoneNumber = allusers[i].phoneNumber
    //               obj.image = allusers[i].image
    //               console.log(obj);
    //               alluserattenadance.push(obj)
    //             }
             
    // }else{
    //   for (let i = 0; i < allusers.length; i++) { 
    //     for (let j = 0; j < todaygivenattandance.length; j++) {
    //       console.log(allusers[i]._id);
    //       console.log(todaygivenattandance[j].userId);
          
    //       if(allusers[i]._id.equals(todaygivenattandance[j].userId)){
    //           let obj = {};
    //           obj._id = allusers[i]._id;
    //           obj.attanadancecheck = true;
    //           obj.name = allusers[i].name;
    //           obj.employeeId= allusers[i].employeeId
    //           obj.phoneNumber = allusers[i].phoneNumber
    //           obj.image = allusers[i].image
    //         //   obj.attandancetime = allusers[i].intime
    //           obj.attandancetime = todaygivenattandance[j].intime
    //           console.log(obj);
    //           alluserattenadance.push(obj)
    //         }
    //         else{
    //           let obj = {};
    //           obj._id = allusers[i]._id;
    //           obj.attanadancecheck = false;
    //           obj.name = allusers[i].name;
    //           obj.employeeId= allusers[i].employeeId
    //           obj.phoneNumber = allusers[i].phoneNumber
    //           obj.image = allusers[i].image
    //           console.log(obj);
    //           alluserattenadance.push(obj)
    //         }
    //       }
    //     }}
    alluserattenadance = objectarr;
    return res.status(200).json({
      status: 'success',
      length: alluserattenadance.length,
      alluserattenadance
    })
  });

exports.todayusercheckAttandace = catchAsync(async (req, res, next) => {
    
    let alluserattenadance = [];
    const {dateid} = req.params;
    const allusers = await User.find({
        role: 'SR'
    }).populate({
        
          path : 'office',
          populate : {
            path : 'geo',
            populate: 'area region teritori'
            
          }
        
      });
    //   console.log(allusers);

    const todaygivenattandance = await AttendanceModel.find({
      dateid: dateid
    }).populate({
        path : 'userId',
        populate : {
          path : 'office',
          populate : {
            path : 'geo',
            populate: 'area region teritori'
            
          }
        }
      });

    for(let i=0;i<todaygivenattandance.length;i++){  
        let obj = {};
        obj._id = todaygivenattandance[i].userId._id;
        obj.attanadancecheck = true;
        obj.name = todaygivenattandance[i].userId.name;
        obj.employeeId= todaygivenattandance[i].userId.employeeId
        obj.phoneNumber = todaygivenattandance[i].userId.phoneNumber
        obj.userinfo = todaygivenattandance[i].userId
        obj.image = todaygivenattandance[i].photo
        obj.intime = todaygivenattandance[i].intime
        obj.lat = todaygivenattandance[i].lat
        obj.lon = todaygivenattandance[i].lon
        obj.remarks = todaygivenattandance[i].remarks
        obj.isLate = todaygivenattandance[i].isLate
        // console.log(obj);
        alluserattenadance.push(obj)
}
    var ids = new Set(alluserattenadance.map(d => d.employeeId));
    var merged = [...alluserattenadance, ...allusers.filter(d => !ids.has(d.employeeId))];
        let objectarr = []
        merged.map(a => {
            let obj = {}
            if(!a.hasOwnProperty('attanadancecheck')){
                obj.attanadancecheck = false;
                obj.employeeId = a.employeeId;
                obj.name = a.name;
                obj.phoneNumber = a.phoneNumber;
                obj.userinfo = a
                objectarr.push(obj)
            }else{
                objectarr.push(a)
            }
        })



         res.status(200).json({
            status: 'success',
            length: objectarr.length,
            // merged,
            
            objectarr
         
            // todaygivenattandance
          })

})


exports.datewiseuserscheckAttandace = catchAsync(async (req, res, next) => {
    
    const {dateid} = req.params;
    const todaygivenattandance = await AttendanceModel.find({
      dateid: dateid
    }).populate('userId');

    res.status(200).json({
    status: 'success',
    length: todaygivenattandance.length,
    todaygivenattandance,
    
    })

})

exports.downloadallattendace = catchAsync(async (req, res, next) => {
    let alluserattenadance = [];
    const allusers = await User.find({
      role: 'SR'
    }).populate('linemanager');
    let lngth = allusers.length;
    const todaygivenattandance = await AttendanceModel.find({
     
    }).populate('userId')
    // console.log("today given",allusers)
    for(let i=0;i<todaygivenattandance.length;i++){  
        let obj = {};
        obj._id = todaygivenattandance[i].userId._id;
        obj.attanadancecheck = true;
        obj.name = todaygivenattandance[i].userId.name;
        obj.employeeId= todaygivenattandance[i].userId.employeeId
        obj.phoneNumber = todaygivenattandance[i].userId.phoneNumber
        obj.image = todaygivenattandance[i].photo
        obj.intime = todaygivenattandance[i].intime
        // console.log(obj);
        alluserattenadance.push(obj)
}
// console.log(todaygivenattandance)
var ids = new Set(alluserattenadance.map(d => d.employeeId));
// console.log('idssss',ids);
var merged = [...alluserattenadance, ...allusers.filter(d => !ids.has(d.employeeId))];
// console.log(merged);

let objectarr = []
        merged.map(a => {
            let obj = {}
            // console.log('from array',a)
            if(!a.hasOwnProperty('attanadancecheck')){
                obj._id = a._id
                obj.attanadancecheck = false;
                obj.name = a.name;
                obj.employeeId = a.employeeId;
                obj.linemanager = a.linemanager.employeeId;
                obj.linemanegername = a.linemanager.name;
                
                obj.phoneNumber = a.phoneNumber;
                // obj.image = a.image
                objectarr.push(obj)
            }else{
                objectarr.push(a)
            }
        })

    // alluserattenadance = objectarr;
    return res.status(200).json({
      status: 'success',
      length: objectarr.length,
    //   alluserattenadance,
      objectarr
    })

})



exports.toattendancegivennotgivenSR = catchAsync(async (req, res, next) => {

    // let userId = req.user._id;
    const dateid = moment().format('DD-MM-YYYY');
    let alluserattenadance = [];
    const allusers = await User.find({
        area: req.user.area,
        role: 'SR'
    });
    let lngth = allusers.length;
    const todaygivenattandance = await AttendanceModel.find({
      dateid: dateid,
      area: req.user.area,
      role: 'SR'
    }).populate('userId')
    // console.log("today given",todaygivenattandance)
    for(let i=0;i<todaygivenattandance.length;i++){  
        let obj = {};
        obj._id = todaygivenattandance[i].userId._id;
        obj.attanadancecheck = true;
        obj.name = todaygivenattandance[i].userId.name;
        obj.employeeId= todaygivenattandance[i].userId.employeeId
        obj.phoneNumber = todaygivenattandance[i].userId.phoneNumber
        obj.image = todaygivenattandance[i].photo
        obj.intime = todaygivenattandance[i].intime
        // console.log(obj);
        alluserattenadance.push(obj)
}
// console.log(todaygivenattandance)
var ids = new Set(alluserattenadance.map(d => d.employeeId));
// console.log('idssss',ids);
var merged = [...alluserattenadance, ...allusers.filter(d => !ids.has(d.employeeId))];
// console.log(merged);

let objectarr = []
        merged.map(a => {
            let obj = {}
            if(!a.hasOwnProperty('attanadancecheck')){
                obj._id = a._id
                obj.attanadancecheck = false;
                obj.employeeId = a.employeeId;
                obj.name = a.name;
                obj.phoneNumber = a.phoneNumber;
                obj.image = a.image
                objectarr.push(obj)
            }else{
                objectarr.push(a)
            }
        })
    alluserattenadance = objectarr;
    return res.status(200).json({
      status: 'success',
      length: alluserattenadance.length,
      alluserattenadance
    })
  });


exports.toattendancegivennotgivenSS = catchAsync(async (req, res, next) => {

    // let userId = req.user._id;
    // console.log(req.user.area)
    const dateid = moment().format('DD-MM-YYYY');
    let alluserattenadance = [];
    const allusers = await User.find({
        area: req.user.area,
        role: 'SS'
    });
    // console.log(allusers);
    let lngth = allusers.length;
    const todaygivenattandance = await AttendanceModel.find({
      dateid: dateid,
      area: req.user.area,
      role: 'SS'
    }).populate('userId')
    // console.log("today given",todaygivenattandance)
    for(let i=0;i<todaygivenattandance.length;i++){  
        let obj = {};
        obj._id = todaygivenattandance[i].userId._id;
        obj.attanadancecheck = true;
        obj.name = todaygivenattandance[i].userId.name;
        obj.employeeId= todaygivenattandance[i].userId.employeeId
        obj.phoneNumber = todaygivenattandance[i].userId.phoneNumber
        obj.image = todaygivenattandance[i].photo
        obj.intime = todaygivenattandance[i].intime
        // console.log(obj);
        alluserattenadance.push(obj)
}
// console.log(todaygivenattandance)
var ids = new Set(alluserattenadance.map(d => d.employeeId));
// console.log('idssss',ids);
var merged = [...alluserattenadance, ...allusers.filter(d => !ids.has(d.employeeId))];
// console.log(merged);

let objectarr = []
        merged.map(a => {
            let obj = {}
            if(!a.hasOwnProperty('attanadancecheck')){
                obj._id = a._id
                obj.attanadancecheck = false;
                obj.employeeId = a.employeeId;
                obj.name = a.name;
                obj.phoneNumber = a.phoneNumber;
                obj.image = a.image
                objectarr.push(obj)
            }else{
                objectarr.push(a)
            }
        })
    alluserattenadance = objectarr;
    return res.status(200).json({
      status: 'success',
      length: alluserattenadance.length,
      alluserattenadance
    })
  });





exports.rbhattendancegivennotgivenSR = catchAsync(async (req, res, next) => {

    // let userId = req.user._id;
    const dateid = moment().format('DD-MM-YYYY');
    let alluserattenadance = [];
    const allusers = await User.find({
        region: req.user.region,
        role: 'SR'
    });
    let lngth = allusers.length;
    const todaygivenattandance = await AttendanceModel.find({
      dateid: dateid,
      region: req.user.region,
      role: 'SR'
    }).populate('userId')
    // console.log("today given",todaygivenattandance)
    for(let i=0;i<todaygivenattandance.length;i++){  
        let obj = {};
        obj._id = todaygivenattandance[i].userId._id;
        obj.attanadancecheck = true;
        obj.name = todaygivenattandance[i].userId.name;
        obj.employeeId= todaygivenattandance[i].userId.employeeId
        obj.phoneNumber = todaygivenattandance[i].userId.phoneNumber
        obj.image = todaygivenattandance[i].photo
        obj.intime = todaygivenattandance[i].intime
        // console.log(obj);
        alluserattenadance.push(obj)
}
// console.log(todaygivenattandance)
var ids = new Set(alluserattenadance.map(d => d.employeeId));
// console.log('idssss',ids);
var merged = [...alluserattenadance, ...allusers.filter(d => !ids.has(d.employeeId))];
// console.log(merged);

let objectarr = []
        merged.map(a => {
            let obj = {}
            if(!a.hasOwnProperty('attanadancecheck')){
                obj._id = a._id
                obj.attanadancecheck = false;
                obj.employeeId = a.employeeId;
                obj.name = a.name;
                obj.phoneNumber = a.phoneNumber;
                obj.image = a.image
                objectarr.push(obj)
            }else{
                objectarr.push(a)
            }
        })
    alluserattenadance = objectarr;
    return res.status(200).json({
      status: 'success',
      length: alluserattenadance.length,
      alluserattenadance
    })
  });


exports.rbhattendancegivennotgivenSS = catchAsync(async (req, res, next) => {

    // let userId = req.user._id;
    // console.log(req.user.area)
    const dateid = moment().format('DD-MM-YYYY');
    let alluserattenadance = [];
    const allusers = await User.find({
        region: req.user.region,
        role: 'SS'
    });
    // console.log(allusers);
    let lngth = allusers.length;
    const todaygivenattandance = await AttendanceModel.find({
      dateid: dateid,
      region: req.user.region,
      role: 'SS'
    }).populate('userId')
    // console.log("today given",todaygivenattandance)
    for(let i=0;i<todaygivenattandance.length;i++){  
        let obj = {};
        obj._id = todaygivenattandance[i].userId._id;
        obj.attanadancecheck = true;
        obj.name = todaygivenattandance[i].userId.name;
        obj.employeeId= todaygivenattandance[i].userId.employeeId
        obj.phoneNumber = todaygivenattandance[i].userId.phoneNumber
        obj.image = todaygivenattandance[i].photo
        obj.intime = todaygivenattandance[i].intime
        alluserattenadance.push(obj)
}

var ids = new Set(alluserattenadance.map(d => d.employeeId));
var merged = [...alluserattenadance, ...allusers.filter(d => !ids.has(d.employeeId))];

let objectarr = []
        merged.map(a => {
            let obj = {}
            if(!a.hasOwnProperty('attanadancecheck')){
                obj._id = a._id
                obj.attanadancecheck = false;
                obj.employeeId = a.employeeId;
                obj.name = a.name;
                obj.phoneNumber = a.phoneNumber;
                obj.image = a.image
                objectarr.push(obj)
            }else{
                objectarr.push(a)
            }
        })
    alluserattenadance = objectarr;
    return res.status(200).json({
      status: 'success',
      length: alluserattenadance.length,
      alluserattenadance
    })
  });

exports.rbhattendancegivennotgivenTO = catchAsync(async (req, res, next) => {

    // let userId = req.user._id;
    // console.log(req.user.area)
    const dateid = moment().format('DD-MM-YYYY');
    let alluserattenadance = [];
    const allusers = await User.find({
        region: req.user.region,
        role: 'TO'
    });
    // console.log(allusers);
    let lngth = allusers.length;
    const todaygivenattandance = await AttendanceModel.find({
      dateid: dateid,
      region: req.user.region,
      role: 'TO'
    }).populate('userId')
    // console.log("today given",todaygivenattandance)
    for(let i=0;i<todaygivenattandance.length;i++){  
        let obj = {};
        obj._id = todaygivenattandance[i].userId._id;
        obj.attanadancecheck = true;
        obj.name = todaygivenattandance[i].userId.name;
        obj.employeeId= todaygivenattandance[i].userId.employeeId
        obj.phoneNumber = todaygivenattandance[i].userId.phoneNumber
        obj.image = todaygivenattandance[i].photo
        obj.intime = todaygivenattandance[i].intime
        alluserattenadance.push(obj)
}

var ids = new Set(alluserattenadance.map(d => d.employeeId));
var merged = [...alluserattenadance, ...allusers.filter(d => !ids.has(d.employeeId))];

let objectarr = []
        merged.map(a => {
            let obj = {}
            if(!a.hasOwnProperty('attanadancecheck')){
                obj._id = a._id
                obj.attanadancecheck = false;
                obj.employeeId = a.employeeId;
                obj.name = a.name;
                obj.phoneNumber = a.phoneNumber;
                obj.image = a.image
                objectarr.push(obj)
            }else{
                objectarr.push(a)
            }
        })
    alluserattenadance = objectarr;
    return res.status(200).json({
      status: 'success',
      length: alluserattenadance.length,
      alluserattenadance
    })
  });
