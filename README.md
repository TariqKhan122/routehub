# RouteHub

React Router v6 + TypeScript + Vite + Tailwind v4. An admin dashboard and a blog reader.

    npm install
    npm run dev

Demo login: admin@demo.dev / demo1234 (or click "Continue with demo account").

Routes
    /                              home (module switcher)
    /login                         mock sign-in
    /admin                         overview            (protected)
    /admin/users?role=&status=&q=  filterable table    (protected)
    /admin/users/:userId           user detail         (protected)
    /admin/settings/{profile,security,notifications}   (protected, nested tabs)
    /blog, /blog/category/:slug, /blog/categories, /blog/post/:slug, /blog/about
    *                              404
