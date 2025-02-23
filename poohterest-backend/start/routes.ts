/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// import "./post.ts"
// import "./user.ts"
import router from '@adonisjs/core/services/router'
import UsersController from "#controllers/users_controller"
import PinsController from '#controllers/pin_controller'
import { middleware } from './kernel.js'
import CommentsController from '#controllers/comments_controller'
import LikesController from '#controllers/likes_controller'
import ProfileController from '#controllers/profile_controller'


router.group(() => {
    router.post('/register', [UsersController, 'register'])
    router.post('/login',[UsersController,'login'])

    router.get('/pins', [PinsController,'index'])
    router.get('/user/pins', [PinsController,'showbyuser']).use(middleware.auth())
    router.get('/pins/:id', [PinsController,'show'])
    router.post('/pins',[PinsController,'store']).use(middleware.auth())
    router.delete('/pins/:id',[PinsController,'destroy']).use(middleware.auth())
    
    router.get('/pins/:pin_id/comments', [CommentsController,'index'])
    router.post('/pins/comments', [CommentsController,'store']).use(middleware.auth())
    router.delete('/comments/:id', [CommentsController,'destroy']).use(middleware.auth())

    router.post('/pins/:pin_id/likes', [LikesController,'store']).use(middleware.auth())
    router.delete('/pins/:pin_id/likes', [LikesController,'destroy']).use(middleware.auth())
    router.get('/pins/:pin_id/likes', [LikesController,'count'])
    
    router.get('/profile', [ProfileController,'show']).use(middleware.auth())
    router.put('/profile', [ProfileController,'update']).use(middleware.auth())
    router.post('/profile/change-password', [ProfileController,'changePassword']).use(middleware.auth())
    
  }).prefix('/api')