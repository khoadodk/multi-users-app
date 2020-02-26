# Multi Users App / Hackr.io clone

Tech stack: Next.js, Node.js, Express, AWS S3, AWS SES, AWS EC2, AWS Route 53, AWS IAM, MongoDB

## App Features

### React - Front End

1. User

- <del>Register</del>
- <del>Account Activation</del>
- Login
- Forgot/Reset Password
- Submit/Update/Delete Links
- Update Profile

2. Admin

- Create/Update/Delete Categories
- Submit/Update/Delete Links
- Update Profile

### Node/Express - Back End

1. Models

- <del>User</del>
- Categories
- Links

2. Controllers

- Users: login, <del>register</del>, <del>email confirmation</del>, forgotPassword, resetPassword
- Categories: all categories, single categories, CRUD categories, image upload to AWS S3
- Links: all links, single link, CRUD links
