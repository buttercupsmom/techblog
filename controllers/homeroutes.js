const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all posts and JOIN with user data
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User, Comment],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to gather info for user
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: [User],
        },
        {
          model: User,
        },
      ],
      order: [Comment, 'date-created', desc],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      loggedIn: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// // GET route to create a post
// router.get('/profile/post', withAuth, async (req, res) => {
//   res.render('editpost', {
//     logged_in: true,
//   });
// });

// GET route to edit blog post
// router.get('/profile/post/:id', withAuth, async (req, res) => {
//   if (!req.params.is) {
//     res.render('editpost');
//   }
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       inclue: [
//         {
//           model: Comment,
//           include: [User],
//         },
//         {
//           model: User,
//         },
//       ],
//       order: [[Comment, 'date_created', desc]],
//     });
//     const post = postData.get({ plain: true });

//     res.render('editpost', {
//       ...post,
//       logged_in: req.session.logged_in,
//       is_author: req.session.user_id,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
