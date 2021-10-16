const Tour = require('./../models/tourModel')



// exports.checkID = (req, res, next, val) => {
//   console.log(`tour id is: ${val}`)

//   if(req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     });
//   }
//   next()
// }

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price'
//     })
//   }

//   next()
// } 

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next()  
}

exports.getAllTours = async (req, res) => {
  try {

    //Build query
    //1) Filtering 
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    //2)Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    //console.log(JSON.parse(queryStr)
    let query = Tour.find(JSON.parse(queryStr))
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy')

  //2) sorting
  if(req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy)
  } else {
    query = query.sort('-createdAt')
  }

  //3) Field limiting
  if(req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields)
  } else {
    query = query.select('-__v');
  }

  //4) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page - 1) * limit;

  //page=2&limit=10
  query = query.skip(skip).limit(limit);

  if (req.query.page) {
    const numTours = await Tour.countDocuments();
    if (skip >= numTours) throw new Error('this page doesn\'t exist!')
  }

  //Execute query
  const tours = await query;

    //console.log(req.requestTime)
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'failed!!!!',
      message: err
    })
  }

}

exports.getTour = async (req, res) => {
  //console.log(req.params)
  //const id = req.params.id * 1;

  // const tour = tours.find(el => el.id === id)

  try {
    const tour = await Tour.findById(req.params.id)
    //Tour.findOne({_id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    })
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }

}

exports.createTour = async (req, res) => {
  try {
    // const newTours = new Tour({})
    // newTours.save();
  
    const newTour = await Tour.create(req.body)
  
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour
        }
      })
  } catch(err) {
    res.status(400).json({
      status: 'failed!',
      message: err
    })
  }
}

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    })
  } catch(err) {
    res.status(404).json({
      status: "failed!",
      message: err
    })
  }
}

exports.deleteTour = async (req, res) => {
try {
  await Tour.findByIdAndDelete(req.params.id)

  //postman send 204 no-content
  res.status(204).json({
    status: 'tour successfully deleted!',
    data: null
  })
} catch(err) {
  res.status(404).json({
    status: 'failed',
    data: err
  })
}
}
