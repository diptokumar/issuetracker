const User = require('./../../models/UserModel/userModel');
const catchAsync = require('./../../utils/catchAsync');
const AppError = require('./../../utils/appError');
const Route = require('./../../models/RouteModel/routeModel')
const Order = require('./../../models/ordermodel')
// const moment = require('moment')
var moment = require('moment-timezone');



exports.daterangequery = catchAsync(async (req, res, next) => {

  // const date = {$gte: moment(new Date()).tz("Asia/Dhaka").subtract(7, 'day').toDate()}

  const date = moment("").tz("Asia/Dhaka");
console.log(date);
  const orders = await Order.aggregate([
    {
      $match: {
        createdAt: date
      },
    },
    {
      $group: {
        _id: null,
        sum: {
          $sum: 1
        }
      }
    }
  ])


res.status(200).json({
  status: 'success',
  orders
})

})







const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.saveUser=catchAsync(async(req,res,next)=>{
  let user;

    if(req.file === undefined){
       user = await User.create({...req.body});
    }else{

        user = await User.create({...req.body,
        image: req.file.key
      });
    }
  // const user = await User.create(req.body);
   


res.status(200).json({
      status: 'success',
      user
  })

})

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});




exports.getAllfilterusers = catchAsync(async (req, res, next) => {

  const {orgid,role} = req.params;
  
  const users = await User.find({
    org: orgid,
    role: role
  });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    users
  });
});




exports.setInstituteforuser = catchAsync(async (req, res, next) => {
  const { userid } = req.params;
  
  const user = await User.findOneAndUpdate(
    { _id: userid },
    {
      $addToSet: { assignSchool: req.body.institutes }
    },
    { new: true }
  );

  
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    user
  });
});


exports.getAllOrgUsers = catchAsync(async (req, res, next) => {
  const {orgid} = req.params;
  const users = await User.find({
    org: orgid
  }).populate('route');

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  // const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    
  });

  res.status(200).json({
    status: 'success',
    updatedUser
    
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  
    const { id } = req.params;
    const users = await User.find({ _id: id });

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      users
    });
});


exports.linemanagerSelect = catchAsync(async (req, res, next) => {
  const {role} = req.params;
  if(role === 'SR' || role === 'DP'){
    const users = await User.find({ role: 'SS' }).select('name employeeId');
    res.status(200).json({
      status: 'success',
      length: users.length,
      users
    });
  }else if(role === 'SS'){
    const users = await User.find({ role: 'TO' }).select('name employeeId');
    res.status(200).json({
      status: 'success',
      length: users.length,
      users
    });
  }else if(role === 'TO'){
    const users = await User.find({ role: 'RBH' }).select('name employeeId');
    res.status(200).json({
      status: 'success',
      length: users.length,
      users
    });
  }
  
  
  else{
    res.status(200).json({
      status: 'success',
      message: 'Role is not specificly need Linemanager'
    });
  }
  
})

exports.yourunderUserlist = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.find({
    linemanager: userId
  })
  if(!user){
    res.status(200).json({
      status: 'error',
      message: 'No user found'
    });
  }
  res.status(200).json({
    status: 'success',
    length: user.length,
    user
  });
})

exports.solistunderss = catchAsync(async (req, res, next) => {
  const {ssid} = req.params;
  const user = await User.find({
    linemanager: ssid
  })
  if(!user){
    res.status(200).json({
      status: 'error',
      message: 'No user found'
    });
  }
  res.status(200).json({
    status: 'success',
    length: user.length,
    user
  });
})

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};

exports.userPagination = catchAsync(async (req, res, next) => {
  // console.log("hello")
  let {currentpage, orgid, useremployee, role} = req.query;
  // console.log(currentpage, orgid, useremployee, role);
  const limitValue =  15;
  const skipValue = parseInt(currentpage) || 0;
  let users;
  let number;
  let pagenumber;

  if(role === undefined){
    role= 'SR';
  }
  if(useremployee === undefined){
      // console.log(useremployee)
      useremployee = "";
      // console.log(shopname.length)
  }
  if(useremployee.length >0 ){
      users= await User.find({
          org: orgid,
          role: role,
          employeeId: {$regex: useremployee, $options: '$i'}
      }).populate('route')
      // .
      // limit(limitValue * 1).
      // skip((skipValue - 1) * limitValue)
      // .sort({ createdAt: 'desc'});
      pagenumber = 1;
      
  }else{
      users = await 
      User.find({
          org: orgid,
          role: role
      }).populate('route').
      limit(limitValue * 1).
      skip((skipValue - 1) * limitValue)
      .sort({ createdAt: 'desc'});
      number = await User.aggregate([
          {
            $match: {
              role: role
            }
          },
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

  res.status(200).json({
      status: 'success',
      users,
      pagenumber
  })

})


exports.usertosolist = catchAsync(async (req, res, next) => {

  // console.log(req.user.area);
  const user = await User.find({
    area: req.user.area,
    role: 'SR'
  }).populate('route');

  res.status(200).json({
    status: 'success',
    length: user.length,
    user
});

})

exports.userToSSlist = catchAsync(async (req, res, next) => {

  const {toId} = req.params;
  
  const user = await User.find({
    linemanager: toId
  }).populate('route');

  res.status(200).json({
    status: 'success',
    length: user.length,
    user
});
})

exports.userToSRlist = catchAsync(async (req, res, next) => {

  const {toId} = req.params;
  
  const todata = await User.findOne({
    _id: toId
  });
  const user = await User.find({
    area: todata.area,
    role: 'SR'
  }).populate('route');

  res.status(200).json({
    status: 'success',
    length: user.length,
    user
});
})


exports.userSSlistunderRbh = catchAsync(async (req, res, next) => {


  const user = await User.find({
    region: req.user.region,
    role: 'SS'
  }).populate('route');

  res.status(200).json({
    status: 'success',
    length: user.length,
    user
});
})

exports.userSolistunderRbh = catchAsync(async (req, res, next) => {


  const user = await User.find({
    region: req.user.region,
    role: 'SR'
  }).populate('route');

  res.status(200).json({
    status: 'success',
    length: user.length,
    user
});
})