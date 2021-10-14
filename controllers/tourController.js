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

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    })
  }

  next()
}

exports.getAllTours = (req, res) => {
  //console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours: tours
    // }
  })
}

exports.getTour = (req, res) => {
  //console.log(req.params)
  const id = req.params.id * 1;

  // const tour = tours.find(el => el.id === id)

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: tour
  //   }
  // })
}

exports.createTour = (req, res) => {
    res.status(201).json({
      status: "success"
    })
}

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>'
    }
  })
}

exports.deleteTour = (req, res) => {
//postman send 204 no-content
  res.status(204).json({
    status: 'success',
    data: null
  })
}
