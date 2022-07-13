<p align="center">
  <img src="src/assets/logo.png" alt="LOGO" ali>
</p>

<br/>

# SEMESTA BAN MERCHANT WEB APP 🌍

# File-based routing

Here are some examples of file paths and their corresponding URLs for commonly used patterns in file-based routing. We'll be using src/pages as the pages directory:

### Index routes

- src/pages/index.tsx -> /
- src/pages/posts/index.tsx -> /posts

### Nested routes

- src/pages/posts/topic.tsx -> /posts/topic
- src/pages/settings/profile.tsx -> /settings/profile

### Dynamic routes

- src/pages/posts/[slug].tsx -> /posts/:slug
- src/pages/[user]/settings.tsx -> /:user/settings
- src/pages/posts/[...all].tsx -> /posts/\*
