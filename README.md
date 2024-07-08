# PERSONNEL API

### ERD:

![ERD](./erdPersonnelAPI.png)

### Folder/File Structure:

```
    .env
    .gitignore
    index.js
    readme.md
    src/
        configs/
            dbConnection.js
        controllers/
            department.controller.js
            personnel.controller.js
        helpers/
            passwordEncrypt.js
        middlewares/
            errorHandler.js
            findSearchSortPage.js
        models/
            department.model.js
            personnel.model.js
        routes/
            department.router.js
            personnel.router.js
```

## Project requirements

-   [x] We will have Department and Personnel tables, and we will link them together. Each department will have its own personnel.
-   [x] Each department will have only one Lead.
-   [x] Admin or Lead; the response will change dynamically based on the request coming in the URL. In other words, when we want to list the personnel of departments, we will do it through a single URL: departments/id/personnels
-   [x] Admin can perform CRUD operations for new personnel (Admin means authorized personnel; you can refer to it with a different name).
-   [x] Personnel can only read and update their own information but will not have the authority to delete; only the Admin will have this authority.
-   [x] Only Admin has the authority to delete personnel.
        Inactive personnel cannot log into the system.
-   [x]Logged-in users can read and list departments, but only the admin can perform CRUD operations..
-   [x] We will use token authentication. When a user logs out, we will delete the token. Only the admin will handle token operations.
