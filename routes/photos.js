const express = require('express');
const router = express.Router();

/* GET single photo by id. */
router.get('/:photoid', (req, res, next)=>{
  const id = parseInt(req.params.photoid);
  const selectedPhoto = req.app.locals.photos.find(p => p.id === id);
  const photoTitle = selectedPhoto ? selectedPhoto.title : 'Photo Not Found';
  res.render('photo', {
    title: photoTitle,
    photo: selectedPhoto
  });
});

/* POST new photo. */
router.post('/', function(req, res, next) { 
  const { title, description, imageUrl } = req.body;
 
  // Generate a new id (simple approach: max id + 1)
  const newId = req.app.locals.photos.length > 0 
    ? Math.max(...req.app.locals.photos.map(p => p.id)) + 1 
    : 1;

    // Create new photo object
    // JavaScript tip in creating objects: 
    // When the property name and the variable name are the same, 
    //   you can omit the ': variable' part.
    // So instead of writing 'title: title', we can just write 'title', 
    //   and it will be understood as 'title: title'.
  const newPhoto = {
    id: newId,
    title,
    description,
    imageUrl
  };

    // Add to photos array
  req.app.locals.photos.push(newPhoto);
  
  // Redirect to home page
  res.redirect('/');
});

module.exports = router;