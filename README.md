### A simple blog `API`

This is a simple implementation of a blog app that one can(Once registered):
- Users can create account
- Users can update their profile
- Create posts 
- Update their posts
- Delete personal posts
- Like posts
- Unregistered users can just view

This is a hands on experience expects that one is:
- Better knowledge on javascript syntax
For one to build this the assumptions are:
- You are familiar with  `mongodb` database
- You are familiar with `node js` and `express js` for building backend services
- Familiar with how `API's` work
- familiar with `jwt-authentication`

Running the project in development
```sh
npm run dev
```

Running the script in production

```sh
npm start
```

# API endpoints

```sh
# Authentication
/auth/register/
/auth/login/
#Account management
/user/single/:userId
/user/all
/user/update/:userId
/user/blogs
# Blog management
/blog/update/:blogId/
/blog/delete/:blogId/
/blog/like/:blogId/
/blog/comment/:blogId/
/blog/single/:blogId/
/blog/
```