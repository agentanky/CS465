console.log('Travel controller loaded');  // Add this log

/* Get travel view */
const travel = (req, res, next) => {
  console.log('Rendering travel view');  // Add this log
  res.render('travel', { title: "Travlr Getaways" });
};

module.exports = {
  travel
};

console.log('Travel controller exported');  // Add this log
