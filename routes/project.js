var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;
  console.log("projectID is: " + projectID)
  models.Project
    .find({"_id": projectID})
    .exec(afterQuery);
  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    console.log(projects[0]);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  var newPost = new models.Project(form_data);
  newPost.save(afterSave);
  console.log(newPost)
  function afterSave(err) {
    if(err) res.send(500);
    res.redirect('/');
  }

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
  models.Project
    .find({"_id": projectID})
    .remove()
    .exec(projectDeletedResponse);

    function projectDeletedResponse(err) {
      if(err) res.send(500, "Sorry chuck, didn't work");
      res.send(200);
    }
  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}