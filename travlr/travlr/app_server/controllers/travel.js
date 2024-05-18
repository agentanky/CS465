

/* Get travel view */
const travel = (req, res, next) => {
  res.render('travel', { title: "Travlr Getaways" });
};

module.exports = {
  travel
};


